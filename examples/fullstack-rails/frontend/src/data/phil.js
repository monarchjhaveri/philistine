import Philistine from 'philistine';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import NewMeal from '../pages/NewMeal';
import EditMeal from '../pages/EditMeal';
import Logout from '../pages/Logout';
import Template from '../templates/Template.jsx';
import request from 'superagent';

const initialState = {
  user: null,
  meals: null,
  errorMessage: null,
  successMessage: null
};

const options = {
  template: Template,
  routes: {
    '/': { 
      name: 'Home',
      component: Home,
      options: {
        exact: true
      }
    },
    '/register': {
      name: 'Register',
      component: Register,
      showIf: ({state}) => !state.user
    },
    '/login': {
      name: 'Login',
      component: Login,
      showIf: ({state}) => !state.user
    },
    '/logout': {
      name: 'Logout',
      component: Logout,
      showIf: ({state}) => state.user
    },
    '/users/:userId/meals': {
      name: 'Meals',
      component: Meals,
      showIf: ({state}) => state.user,
      pathParamMapping: ({state}) => {
        return {
          userId: state.user && state.user.id
        }
      },
      options: {
        exact: true
      }
    },
    '/users/:userId/meals/new': {
      name: 'New Meal',
      component: NewMeal,
      showIf: ({state}) => state.user,
      pathParamMapping: ({state}) => {
        return {
          user_id: state.user && state.user.id
        }
      }
    },
    '/users/:userId/meals/:mealId/edit': {
      name: 'Edit Meal',
      component: EditMeal,
      showIf: ({state}) => false,
      pathParamMapping: ({state}) => {
        return {
          user_id: state.user && state.user.id
        }
      }
    }
  }
}

const phil = new Philistine(initialState, options);

phil.handle('REGISTER', (draftState, {username, password}) => {
  request
    .post('/api/users/register')
    .send({ username, password })
    .end((err, res) => {
      if (err) {
        phil.dispatch('SHOW_ERROR', 'Failed to register with that username and email.');
      } else {
        phil.dispatch('REGISTER_SUCCESS');
      }
    });
});

phil.handle('REGISTER_SUCCESS', (draftState, token) => {
  phil.dispatch('SHOW_SUCCESS', 'Congratulations, you registered successfully!');
});

phil.handle('LOGIN', (draftState, {username, password}) => {
  request
    .post('/api/users/login')
    .send({ username, password })
    .end((err, res) => {
      if (err) {
        phil.dispatch('SHOW_ERROR', 'Failed! Check your username and password and try again.');
      } else {
        phil.dispatch('LOGIN_SUCCESS', res.body);
      }
    });
});

phil.handle('LOGIN_SUCCESS', (draftState, {token, user}) => {
  localStorage.setItem('calico-token', token);
  draftState.user = user;
  draftState.user.token = token;
  phil.dispatch('SHOW_SUCCESS', 'You are now logged in!');
});

phil.handle('SHOW_ERROR', (draftState, errorMessage) => {
  draftState.errorMessage = errorMessage;
});

phil.handle('HIDE_ERROR', (draftState) => {
  draftState.errorMessage = null
});

phil.handle('SHOW_SUCCESS', (draftState, successMessage) => {
  draftState.successMessage = successMessage;
});

phil.handle('HIDE_SUCCESS', (draftState) => {
  draftState.successMessage = null
});

phil.handle('LOGOUT', (draftState) => {
  request
    .post('/api/users/logout')
    .send({ token: draftState.user.token })
    .end((err, res) => {
      if (err) {
        phil.dispatch('SHOW_ERROR', 'Failed to logout!');
      } else {
        phil.dispatch('LOGOUT_SUCCESS');
      }
    });
});

phil.handle('LOGOUT_SUCCESS', (draftState) => {
  draftState.user = null;
  localStorage.removeItem('calico-token');
  phil.dispatch('SHOW_SUCCESS', 'You are now logged out!');
});

phil.handle('FETCH_MEALS', (draftState, userId) => {
  request
    .get(`/api/users/${userId}/meals`)
    .set('X-API-key', draftState.user && draftState.user.token)
    .end((err, res) => {
      if (err) {
        phil.dispatch('SHOW_ERROR', 'Failed to fetch meals!');
      } else {
        phil.dispatch('FETCH_MEALS_SUCCESS', res.body);
      }
    });
});
phil.handle('FETCH_MEALS_SUCCESS', (draftState, meals) => draftState.meals = meals)

phil.handle('NEW_MEAL', (draftState, value) => {
  request
    .post(`/api/users/${value.user_id}/meals`)
    .set('X-API-key', draftState.user && draftState.user.token)
    .send({meal: value})
    .end((err, res) => {
      if (err) {
        phil.dispatch('SHOW_ERROR', 'Failed to create meal!');
      } else {
        phil.dispatch('NEW_MEAL_SUCCESS', res.body);
      }
    });
});
phil.handle('NEW_MEAL_SUCCESS', (draftState, meals) => {
  phil.dispatch('SHOW_SUCCESS', 'Created new meal.');
  phil.dispatch('FETCH_MEALS', draftState.user.id);
});

phil.handle('EDIT_MEAL', (draftState, value) => {
  request
    .put(`/api/users/${value.user_id}/meals/${value.id}`)
    .set('X-API-key', draftState.user && draftState.user.token)
    .send({meal: value})
    .end((err, res) => {
      if (err) {
        phil.dispatch('SHOW_ERROR', 'Failed to create meal!');
      } else {
        phil.dispatch('NEW_MEAL_SUCCESS', res.body);
      }
    });
});
phil.handle('EDIT_MEAL_SUCCESS', (draftState, meals) => {
  phil.dispatch('SHOW_SUCCESS', 'Edited meal.');
  phil.dispatch('FETCH_MEALS', draftState.user.id);
})

export default phil;