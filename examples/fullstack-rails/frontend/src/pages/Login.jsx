import React from 'react';
import AuthForm from '../partials/AuthForm.jsx';

import phil from '../data/phil';

const Login = () => (
  <phil.consumer>
    {
      ({state}) => {
        if (state.user) {
          return <phil.redirect to="/" />
        } else {
          return (
            <div className="login-page">
              <h1>Login</h1>
              <AuthForm onSubmit={(value) => phil.dispatch('LOGIN', value)} />
            </div>  
          );
        }
      }
    }
  </phil.consumer>
);

export default Login;