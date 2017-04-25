/* ---------------------------------------------
    REDUCER
---------------------------------------------- */
// @flow

import { cloneDeep } from 'lodash';
import { mergeWith } from 'lodash';

import type { TAction } from './action';

interface IOptions {
    initial_state: (props?: Object) => Object,
    actions: Object
}

export type TReducer = (state?: Object, action?: TAction, props?: Object) => Object;

const defaults: IOptions = {
    initial_state: () => ({}),
    actions: {
        default: state => state,
        finally: state => state
    }
};

const Reducer = (options?: IOptions = defaults): TReducer => {
    const config = options === defaults ? options : extend(defaults, options);

    const execute = (action: () => {}, state: Object, payload?: mixed): Object => config.actions.finally(action(state, payload));

    return (state, action, props) => {
        const initial_state = config.initial_state(props);

        if (state === undefined) { return initial_state; }

        const new_state = extend(initial_state, state);

        if (action === undefined) { return execute(config.actions.default, new_state); }

        const { type, payload } = action;

        const func = config.actions[ type ];

        if (func === undefined) { return execute(config.actions.default, new_state, payload); }

        return execute(func, new_state, payload) || execute(config.actions.default, new_state, payload);
    };
};

export default Reducer;

// PRIVATE

function extend<T>(...sources: T[]): T {
    return mergeWith(...sources.map(cloneDeep),
        // Overwrite arrays instead of merging their values.
        (objValue, srcValue) => {
            if (Array.isArray(objValue)) { return srcValue; }
        });
}
