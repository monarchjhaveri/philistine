import merge from 'deepmerge';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// from https://medium.freecodecamp.org/replacing-redux-with-the-new-react-context-api-8f5d01a00e8c
export default class Philistine {
  constructor(initialState) {
    this.state =  initialState;
    this.Context = React.createContext(initialState);
    this.partial = this.Context.Consumer;
  }

  render(reactComponent, domElement) {
    const Provider = this.Context.Provider;

    ReactDOM.render(
      <Provider value={this.state}>
        { reactComponent }
      </Provider>
    , domElement);
  }

  partial(initialState, callback) {
    return (
      <this.Context.Consumer>
        { callback }
      </this.Context.Consumer>
    )
  }
}


