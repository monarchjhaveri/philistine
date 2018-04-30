import React from 'react';
import AuthForm from '../partials/AuthForm.jsx';

import phil from '../data/phil';

const Register = () => (
  <phil.consumer>
    {
      ({state}) => {
        if (state.user) {
          return <phil.redirect to="/" />
        } else {
          return (
            <div className="register-page">
              <h1>Register</h1>
              <AuthForm onSubmit={(value) => phil.dispatch('REGISTER', value)} />
            </div>
          );
        }
      }
    }
  </phil.consumer>
);

export default Register;