import merge from 'deepmerge';
import React, { Component } from 'react';
import DOM from 'react-dom';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Redirect, Route, BrowserRouter, Link } from 'react-router-dom';
import produce from 'immer';

class PhilistineRouteConfig {
  constructor(path, {name, component, options, showIf}) {
    this.path = path;
    this.component = component;
    this.name = name;
    this.options = options;
    this.showIf = showIf;
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
    const routes = Object.keys(options.routes).map(path => new PhilistineRouteConfig(path, options.routes[path]))
    const template = options.template;

    const state = {
      options: {
        routes, template
      },
      state: initialState,
      eventHandlers: {} // key is string, value is array of eventHandler
    }

    this.state = state;

    // create context
    this.Context = React.createContext(state);
    this.consumer = this.Context.Consumer;
    this.routes = ({children}) => (
      <this.consumer>
        {
          ({options}) => children(options.routes)
        }
      </this.consumer>
    );
  }

  handle(eventName, reducer) {
    this.state.eventHandlers[eventName] = this.state.eventHandlers[eventName] || [];
    this.state.eventHandlers[eventName].push(reducer);
  }

  dispatch(eventName, payload) {
    const actions = () => {
      const eventHandlers = this.state.eventHandlers[eventName];
      if (!eventHandlers) throw new Error(`Unknown event ${eventName}`);

      let newState = this.state.state;
      eventHandlers.forEach(reducer => {
        newState = produce(newState, draftState => {
          reducer(draftState, payload);
        });
      });

      this.update(newState);
    }

    setTimeout(actions, 0);
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

  update(newState) {
    this.state.state = newState;
    this.render();
  }
}

Philistine.prototype.link = Link;
Philistine.prototype.redirect = Redirect;