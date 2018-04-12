import Philistine, {partial} from '../../../philistine/src/philistine.jsx';
import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <phil.partial>
          { ({message}) => message }
        </phil.partial>
      </div>
    )
  }
}

const initialState = {message: 'Not working yet!'};
const phil = new Philistine(initialState);
phil.render(<App />, document.getElementById('out'));
