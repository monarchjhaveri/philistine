import React, { Component } from 'react';
import MealCard from '../partials/MealCard.jsx';

import phil from '../data/phil';

class Meals extends Component {
  componentWillMount() {
    const userId = this.props.match.params.userId
    phil.dispatch('FETCH_MEALS', userId);
  }

  render() {
    const userId = this.props.match.params.userId;

    return (
      <phil.consumer>
      {
        ({state}) => {
          if (!state.user) {
            return <phil.redirect to="/" />
          } else {
            return (
              <div className="meals-page">
                <h1>Meals</h1>
                { state.meals && state.meals.map(meal => (
                  <phil.link to={`/users/${userId}/meals/${meal.id}/edit`} key={meal.id}>
                    <MealCard meal={meal} id={meal.id}/>
                  </phil.link>
                )) }
              </div>
            )
          }
        }
      }
      </phil.consumer>
    );
  }
}

export default Meals;