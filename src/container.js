/* ---------------------------------------------
    CONTAINER
---------------------------------------------- */
// @flow

import React from 'react';
import eventstop from 'eventstop';
import uid from 'uid';

import type { TAction } from './action';
import type { TReducer } from './reducer';

const { on, emit } = eventstop();

const container = (reducer: TReducer) =>
    (WrappedComponent: any) => {
        const module_instance = uid();

        const new_props = {
            module_instance,
            dispatch(value) {
                emit(module_instance, value);
            }
        };

        class Container extends React.Component {
            state: {
                state: Object
            };

            constructor(props: Object) {
                super(props);

                this.state = {
                    state: reducer(undefined, undefined, props)
                };

                on(new_props.module_instance, actions => {
                    if (Array.isArray(actions)) {
                        this.setStateSerial(this.state.state, actions);
                        return;
                    }

                    reducer(this.state.state, actions, props)
                        .then(new_state => this.setState({ state: new_state }));
                });
            }

            componentDidMount() {
                const self: any = this;

                self.setStateSerial = this.setStateSerial.bind(this);
            }

            setStateSerial(old_state: Object, [ action, ...actions ]: TAction[]) {
                if (action === undefined) { return; }

                reducer(old_state, action, this.props)
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

function getDisplayName(WrappedComponent: any): string {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
