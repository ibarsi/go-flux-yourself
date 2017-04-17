# go-flux-yourself

`go-flux-yourself` is a light implementation of the [Flux](https://facebook.github.io/flux/) architecture for uni-directional state management with a React component wrapper included. The tools provided by this library allow you to write pure functional components and define state management through the use of reducers (also pure functions), leaving all the dirty work under the hood where it belongs!

The library's general design comes from other personal implementations of this architecture that covered fairly simple, straightforward use cases that would not make full use of all the "bells and whistles" provided by some other, more popular implementations (ie. Redux). For the most part, this library is a way for me to play around with new tech and expand my knowledge ⚡️

## Install

```
npm install go-flux-yourself
```

## API

```js
import { Action, Reducer, container } from 'go-flux-yourself';
```

### Action(type)

Factory function used to generate an "action function" that's invoked in turn to create an action to be dispatched.

Example usage:

```js
import { Action } from 'go-flux-yourself';

// Type of action to be constructed.
const INCREMENT = 'INCREMENT';

// Factory function that returns an action.
const increment = Action(INCREMENT);

// Hypothetical dispatch invocation.
dispatch(increment(1));
```

### Reducer(options)

Factory function used to create a "reducer function", which is then passed into the React container wrapper and used internally to manage state.

The `options` argument is expected to provide the following properties:
* `initial_state: Object` - This is the expected state for the wrapped React component at the beginning of it's lifecycle.
* `actions: Object` - These are the expected state-mutating actions to be performed on the wrapped React component. The properties on this object should follow the following type annotation: `[type: string]: (state: Object, payload: mixed) => Object`.

Example usage:

```js
import { Reducer, container } from 'go-flux-yourself';

// Type of the action to be handled (see example for Action above).
const INCREMENT = 'INCREMENT';

// Reducer with options.
const reducer = Reducer({
    initial_state: {
        counter: 0
    },
    actions: {
        [ INCREMENT ]: (state, payload) =>
            Object.assign({}, state, {
                counter: state.counter + payload
            }),
        default: state => state
    }
});

// Hypothetical container wrapper invocation.
const DemoContainer = container(reducer)(<Demo />);
```

### container(reducer)(Component)

Higher-Order React Component, which takes a reducer and returns a function that wraps a React component with the functionality needed to handle actions and maintain state through the logic defined in the reducer.

The wrapped component is provided with the following props:
* `state: Object` - This is essentially the "real" state of the component. This is not to be confused with the `this.state` property provided when extending `React.Component`. All that state management is handled by this component wrapper, so the state _your_ components should be concerned with (as defined by your actions and reducers) can be found here.
* `dispatch: (action) => void` - Plain-old event emitter used to dispatch your actions. These actions are then interpreted by your reducer and the appropriate state mutations are applied and stored in the `state` prop.

Example usage:

```js
// Component to be wrapped (notice the props available).
const Demo = ({ state, dispatch }) =>
    <div>
        <button type="button" onClick={ () => dispatch(increment(1)) }>
            Increment
        </button>

        <p>
            { state.counter }
        </p>
    </div>;

// The invocation of the wrapper.
const DemoContainer = container(reducer)(Demo);

// Render the newly wrapped component!
ReactDOM.render(<DemoContainer />, document.getElementById('main'));
```

That's it! Your component is now wrapped and ready to go. All your state is managed behind the scenes, leaving you to only worry about displaying it :)

Fully functioning demo can be found under `/demo`. To run locally, see steps below.

## GETTING STARTED

After cloning the repo, run the following commands:
* `npm install` - Install all dependencies.
* `flow-typed install` - Install flow type annotations for typed dependencies.

There are several `npm scripts` that are configured for development, listed below:

* `build` - Transpiles source files and generates distributables in `/dist`.
* `dev` - Runs demo page (`/demo/index.html`) at `http://localhost:8080`.