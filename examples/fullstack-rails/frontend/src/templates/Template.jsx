import React from 'react';
import phil from '../data/phil';

export default ({ children }) => (
  <div className="main-wrapper">
    <header>
      <h1>Calico</h1>
    </header>
    <div>
      <phil.consumer>
        { 
          (state) => state.options.routes && state.options.routes.map(route => {
            if (route.showIf && !route.showIf(state)) {
              return null;
            }

            let path = route.path;
            if (route.pathParamMapping) {
              const mappings = route.pathParamMapping(state);
              Object.keys(mappings).forEach(param => {
                path = path.replace(':' + param, mappings[param])
              })
            }

            return (
              <nav key={path}>
                <phil.link to={path} >
                  <h1>{route.name}</h1>
                </phil.link>
              </nav>
            );
          })
        }
      </phil.consumer>
      <phil.consumer>
        { ({state}) => { return (

          <div>
            { state.successMessage && 
              <div className="success-message">
                { state.successMessage }
                <div className="close-button" onClick={() => phil.dispatch('HIDE_SUCCESS')}>x</div>
              </div>
            }
            { state.errorMessage && 
              <div className="error-message">
                { state.errorMessage }
                <div className="close-button" onClick={() => phil.dispatch('HIDE_ERROR')}>x</div>
              </div>
            }
          </div>
        )}}
      </phil.consumer>
      { children }
    </div>
  </div>
);
