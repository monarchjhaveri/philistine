import merge from 'deepmerge';
import React, { Component } from 'react';
import DOM from 'react-dom';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Route, BrowserRouter, Link } from 'react-router-dom';

class PhilistineRoute {
  constructor(path, {name, component, options}) {
    this.path = path;
    this.component = component;
    this.name = name;
    this.options = options;
  }
}

function createRouter(routes) {
  return routes.map(route => {
    const component = route.component;
    const path = route.path;

    return (
      <Route path={path} component={component} key={path.toString()} {...route.options}/>
    )
  });
}

export default class Philistine {
  constructor(initialState, options) {
    const routes = Object.keys(options.routes).map(path => new PhilistineRoute(path, options.routes[path]))
    const template = options.template;

    const state = {
      options: {
        routes, template
      },
      state: initialState
    }

    this.state = state;

    // create context
    this.Context = React.createContext(state);
    this.partial = this.Context.Consumer;
    this.routes = ({children}) => (
      <this.partial>
        {
          ({options}) => children(options.routes)
        }
      </this.partial>
    );
  }

  render(domElement) {
    this.domElement = this.domElement || domElement;

    const Provider = this.Context.Provider;

    const routes = createRouter(this.state.options.routes);
    const Template = this.state.options.template;

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

  update(updateObj) {
    // uses immutability-helpers
    // TODO: use something less cumbersome than immutability-helpers
    this.state = update(this.state, updateObj);
    this.render();
  }
}

Philistine.prototype.link = Link;