import React from 'react';
import MealForm from '../partials/MealForm.jsx';

import phil from '../data/phil';

const EditMeal = () => (
  <phil.consumer>
    {
      ({state}) => {
        if (!state.user) {
          return <phil.redirect to="/" />
        } else {
          return (
            <div className="edit-meal-page">
              <h1>Edit Meal</h1>
              <MealForm onSubmit={(value) => {
                value.user_id = state.user.id;
                phil.dispatch('EDIT_MEAL', value);
              }} />
            </div>
          );
        }
      }
    }
  </phil.consumer>
);

export default EditMeal;