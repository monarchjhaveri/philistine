import React from 'react';
import MealForm from '../partials/MealForm.jsx';

import phil from '../data/phil';

const NewMeal = () => (
  <phil.consumer>
    {
      ({state}) => {
        if (!state.user) {
          return <phil.redirect to="/" />
        } else {
          return (
            <div className="new-meal-page">
              <h1>Enter Meal</h1>
              <MealForm onSubmit={(value) => {
                value.user_id = state.user.id;
                phil.dispatch('NEW_MEAL', value);
              }} />
            </div>
          );
        }
      }
    }
  </phil.consumer>
);

export default NewMeal;