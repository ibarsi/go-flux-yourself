/* ---------------------------------------------
    CONTAINER
---------------------------------------------- */

import React from 'react';
import { subscribe, publish } from 'pubsub-js';
import uid from 'uid';

const container = reducer =>
    WrappedComponent => {
        const module_instance = uid();

        const new_props = {
            module_instance,
            dispatch(value) {
                publish(module_instance, value);
            }
        };

        class Container extends React.Component {
            constructor(props) {
                super(props);

                this.state = {
                    state: reducer()
                };

                this.setStateSerial = this.setStateSerial.bind(this);

                subscribe(new_props.module_instance, (type, actions) => {
                    if (!Array.isArray(actions)) {
                        Promise.resolve(reducer(this.state.state, actions))
                            .then(new_state => this.setState({ state: new_state }));
                        return;
                    }

                    this.setStateSerial(this.state.state, actions);
                });
            }

            setStateSerial(old_state, [ action, ...actions ]) {
                if (action === undefined) { return; }

                Promise.resolve(reducer(old_state, action))
                    .then(new_state => this.setState({ state: new_state }, this.setStateSerial(new_state, actions)));
            }

            render() {
                return <WrappedComponent { ...this.props } { ...this.state } { ...new_props } />;
            }
        }

        Container.displayName = `${ getDisplayName(WrappedComponent) }Container`;

        return Container;
    };

export default container;

// PRIVATE

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
