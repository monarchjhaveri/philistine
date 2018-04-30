import React from 'react';
import { Form, Text, Hidden } from 'react-form';
 
export default ({userId, onSubmit}) => (
  <div className="auth-form">
    <Form onSubmit={onSubmit}
     render={({submitForm}) => (
      <form onSubmit={submitForm}>
        <Text field="description" placeholder='Description' />
        <Text field="calories" placeholder='Calories' type="number"/>
        <button type="submit">Submit</button>
      </form>
    )} />
  </div>
)
