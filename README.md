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

`phil.partial` contains an React component that takes a single callback as a child. That callback receives the entire state of the application.


You can use `phil.partial` at any depth in the application without passing props down in chains.

```
  <phil.partial>
    { ({message}) => message }
  </phil.partial>
```

Philistine uses React's `Context` API. The `partial` construct located at `new Philistine({}).partial` is nothing but a `Context.Consumer`. Please see [React's Context API](https://reactjs.org/docs/context.html) for more info.

### Updating State

Philistine has a single state that is accessible at all points in the application. 

Philistine uses React's [immutability-helper](https://reactjs.org/docs/update.html).  This is likely to change in the future, because `immutability-helper` introduces cumbersome syntax for very simple updates --- but it works for now.

To update state, you can call `phil.update` like this:

```
phil.update({message: { $set: 'Hello World!' }});
```

### Sample code

```
import Philistine, {partial} from 'philistine';
import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <phil.partial>
          { ({message}) => message }
        </phil.partial>
        <button onClick={() => phil.update({message: { $set: 'Hello World!' }})}>
          Click me
        </button>
      </div>
    )
  }
}

const initialState = {message: 'Not working yet!'};
const phil = new Philistine(initialState);
phil.render(<App />, document.getElementById('out'));
```

### Development

Make sure you run `npm run install-peers` to install various peerDependencies that Philistine needs during development.