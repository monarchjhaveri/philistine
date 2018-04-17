import merge from 'deepmerge';
import React, { Component } from 'react';
import DOM from 'react-dom';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Route, BrowserRouter } from 'react-router-dom';

function createRouter(routes) {
  return Object.keys(routes).map(route => {
    const component = routes[route];
    return (
      <Route path={route} component={component} key={route.toString()} />
    )
  });
}

export default class Philistine {
  constructor(initialState, options) {
    // decompose and store options
    this.options = options;
    this.state =  initialState;

    // create context
    this.Context = React.createContext(initialState);
    this.partial = this.Context.Consumer;
  }

  render(domElement) {
    this.domElement = this.domElement || domElement;

    const Provider = this.Context.Provider;

    const routes = createRouter(this.options.routes);
    const Template = this.options.template;

    DOM.render(
      <Provider value={this.state}>
        <BrowserRouter>
          <Template>
            { routes }
          </Template>
        </BrowserRouter>
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
