/* ---------------------------------------------
    REDUCER
---------------------------------------------- */

import cloneDeep from 'lodash/cloneDeep';
import mergeWith from 'lodash/mergeWith';

export default function Reducer(options = {}) {
    const defaults = {
        initial_state: {},
        actions: {
            default: state => state
        }
    };

    const config = extend(defaults, options);

    return (state, action) => {
        if (state === undefined) { return config.initial_state; }

        const new_state = extend(config.initial_state, state);

        if (action === undefined) { return config.actions.default(new_state); }

        const { type, payload } = action;

        const func = config.actions[ type ];

        if (func === undefined) { return config.actions.default(new_state, payload); }

        return func(new_state, payload) || config.actions.default(new_state, payload);
    };
}

const extend = (...args) =>
    mergeWith(...args.map(cloneDeep),
        // Overwrite arrays instead of merging their values.
        (objValue, srcValue) => {
            if (Array.isArray(objValue)) { return srcValue; }
        });
