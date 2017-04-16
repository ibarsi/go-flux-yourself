/* ---------------------------------------------
    REDUCER
---------------------------------------------- */
// @flow

import { cloneDeep } from 'lodash';
import { mergeWith } from 'lodash';

import type { TAction } from './action';

interface IOptions {
    initial_state: Object,
    actions: Object
}

export type TReducer = (state?: Object, action?: TAction) => Object;

const defaults: IOptions = {
    initial_state: {},
    actions: {
        default: state => state
    }
};

const Reducer = (options?: IOptions = defaults): TReducer => {
    const config = options === defaults ? options : extend(defaults, options);

    return (state, action) => {
        if (state === undefined) { return config.initial_state; }

        const new_state = extend(config.initial_state, state);

        if (action === undefined) { return config.actions.default(new_state); }

        const { type, payload } = action;

        const func = config.actions[ type ];

        if (func === undefined) { return config.actions.default(new_state, payload); }

        return func(new_state, payload) || config.actions.default(new_state, payload);
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
