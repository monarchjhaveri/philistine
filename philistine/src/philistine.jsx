import merge from 'deepmerge';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

export default class Philistine {
  constructor(initialState) {
    this.state =  initialState;
    this.Context = React.createContext(initialState);
    this.partial = this.Context.Consumer;
  }

  render(reactComponent, domElement) {
    this.reactComponent = this.reactComponent || reactComponent;
    this.domElement = this.domElement || domElement;

    const Provider = this.Context.Provider;

    ReactDOM.render(
      <Provider value={this.state}>
        {this.reactComponent}
      </Provider>
    , this.domElement);
  }

  partial(initialState, callback) {
    return (
      <this.Context.Consumer>
        { callback }
      </this.Context.Consumer>
    )
  }

  update(updateObj) {
    // uses immutability-helpers
    // TODO: use something less cumbersome than immutability-helpers
    this.state = update(this.state, updateObj);
    this.render();
  }
}


