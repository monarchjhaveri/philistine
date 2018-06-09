import phil from './data/phil';
import './index.css';
import request from 'superagent';

window['phil'] = phil;

function render() {
  phil.render(document.getElementById('root'));
}

function init() {
  const token = (localStorage.getItem('calico-token'));
  if (!token) {
    render();
    return;
  } else {
    request
      .post('/api/users/verify')
      .send({token})
      .end((err, res) => {
        if (!err && !!res) {
          phil.state.state.user = res.body;
          phil.state.state.user.token = token;
          phil.state.state.meals = res.body.meals;
        } else {
          localStorage.removeItem('calico-token');
        }
        render();
      });
  }
}

init();

