import React, { Component } from 'react';
import AuthForm from '../partials/AuthForm.jsx';

import phil from '../data/phil';

class Logout extends Component {
  componentDidMount() {
    phil.dispatch('LOGOUT');
  }

  render() {
    return (
      <phil.consumer>
        {
          ({state}) => {
            if (!state.user) {
              return <phil.redirect to="/" />
            } else {
              return (
                <div className="login-page">
                  <h1>Logging out...</h1>
                </div>  
              );
            }
          }
        }
      </phil.consumer>
    )
  }
};

export default Logout;