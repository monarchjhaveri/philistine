import React from 'react';
import { Form, Text } from 'react-form';
 
export default ({onSubmit}) => (
  <div className="auth-form">
    <Form onSubmit={onSubmit}
     render={({submitForm}) => (
      <form onSubmit={submitForm}>
        <Text field="username" placeholder='Username' />
        <Text field="password" placeholder='Password' type="password"/>
        <button type="submit">Submit</button>
      </form>
    )} />
  </div>
)
