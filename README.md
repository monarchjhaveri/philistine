# Philistine

Dead simple, minimally opinionated React library --- because SPA development isn't rocket science.

## Philosophy

Freedom is a very good thing. It works when it comes to governing nations. But the tradeoff is (as the saying goes) eternal vigilance. In other words, it introduces overhead and uncertainty. That cost is unnecessary in software projects whose requirements are well-defined and belong in software domains where most problems have already been solved. 

We assert that SPA development is one of these cases. Philistine aims to offer an opinionated framework for React that comes with batteries included.

## In progress

Philistine is an ideal. It isn't ready yet. Don't use it in production projects with dollar bills riding on it.

## Usage

### Installation

```
  npm install philistine
```

Note: `philistine` has peer depends on `react`, `react-dom` and `prop-types`. You will have to have these libraries installed on your project in order for `philistine` to function as expected.

### Construction

```
const initialState = { message: "Hello, World!" };
const phil = new Philistine(initialState);
phil.render(<YourRootComponent />, document.getElementById('your-main-div'));
```

### Accessing state

`phil.consumer` contains an React component that takes a single callback as a child. That callback receives the entire state of the application.


You can use `phil.consumer` at any depth in the application without passing props down in chains.

```
  <phil.consumer>
    { ({message}) => message }
  </phil.consumer>
```

Philistine uses React's `Context` API. The `consumer` construct located at `new Philistine({}).consumer` is nothing but a `Context.Consumer`. Please see [React's Context API](https://reactjs.org/docs/context.html) for more info.

### Updating State

Philistine has a single state that is accessible at all points in the application. 

Philistine uses React's [immutability-helper](https://reactjs.org/docs/update.html).  This is likely to change in the future, because `immutability-helper` introduces cumbersome syntax for very simple updates --- but it works for now.

To update state, you can call `phil.update` like this:

```
phil.update({message: { $set: 'Hello World!' }});
```

### Sample code

```
import React from 'react';
import Philistine from 'philistine';

// Our app
class App extends React.Component {
  getMessage(phil) {
    // retrieve the current message from global state
    return <div>{ phil.state.message }</div>;
  }

  updateMessage() {
    // when the button is clicked, update the message
    phil.dispatch('UPDATE_MESSAGE', 'Hello World!');
  }

  render() {
    return (
      <div>
        <phil.consumer>
          {this.getMessage}
        </phil.consumer>
        <button onClick={this.updateMessage}>
          Click me
        </button>
      </div>
    )
  }
}

// set the initial state and the options, then create the Philistine instance
const initialState = {message: 'Click the button below to get a special message'};
const options = { template: App }
const phil = new Philistine(initialState, options);

// Add the handler for the button
phil.handle('UPDATE_MESSAGE', (draftState, newMessage) => {
  draftState.message = newMessage;
  return draftState;
});

// render the app
phil.render(document.getElementById('root'));
```

### Development
1. `yarn link`
2. `yarn install-peers`
3. `yarn start`

Now you can run `yarn link philistine` in your local project to use Philistine in it.