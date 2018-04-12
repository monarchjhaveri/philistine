

// class App extends React.Component {
//   render() {
//     return (<div>
//       <h1> App </h1>
//       <j.Context.Consumer>
//         { 
//           ({message, changeMessage}) => (<div>
//             {message}
//             rootComponent
//             <button onClick={ () => j.changeMessage('ok3') } />
//           </div>)
//         }
//       </j.Context.Consumer>
//     </div>)
//   }
// }


import Philistine, {partial} from '../../../philistine/src/philistine.jsx';
import React from 'react';
import ReactDom from 'react-dom';

const initialState = {message: 'Not working yet!'};

const phil = new Philistine(initialState);

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

phil.render(<App />, document.getElementById('out'));
