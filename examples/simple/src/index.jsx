import React from 'react';
import Philistine from '../../../philistine/src/Philistine.jsx';

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