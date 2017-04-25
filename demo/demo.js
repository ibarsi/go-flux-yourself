/* ---------------------------------------------
    DEMO
---------------------------------------------- */
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Action, Reducer, container } from '../src'; // 'go-flux-yourself'

// ACTIONS

const INCREMENT = 'INCREMENT';

const increment = Action(INCREMENT);

// REDUCER

const reducer = Reducer({
    initial_state: () => ({
        counter: 0
    }),
    actions: {
        /* Action used to increment state value. */
        [ INCREMENT ]: (state, payload) =>
            Object.assign({}, state, {
                counter: state.counter + payload
            }),
        /* Default action, demonstration only. */
        default: state => state,
        /* Finally action, logs state to console on every change. */
        finally: state => {
            console.log(state);
            return state;
        }
    }
});

// COMPONENT

const Demo = ({ state, dispatch }) =>
    <div>
        <h1>
            Hello World!
        </h1>

        <button type="button" onClick={ () => dispatch(increment(1)) }>
            Increment
        </button>

        <p>
            { state.counter }
        </p>
    </div>;

const DemoContainer = container(reducer)(Demo);

ReactDOM.render(<DemoContainer />, document.getElementById('main'));
