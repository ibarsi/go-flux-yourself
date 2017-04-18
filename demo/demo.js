/* ---------------------------------------------
    DEMO
---------------------------------------------- */
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import Action from '../src/action';
import Reducer from '../src/reducer';
import container from '../src/container';

// ACTIONS

const INCREMENT = 'INCREMENT';

const increment = Action(INCREMENT);

// REDUCER

const reducer = Reducer({
    initial_state: () => ({
        counter: 0
    }),
    actions: {
        [ INCREMENT ]: (state, payload) =>
            Object.assign({}, state, {
                counter: state.counter + payload
            }),
        default: state => state
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
