import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'


// declare global {
//   interface Window { MyNamespace: any; }
// }
// window.MyNamespace = window.MyNamespace || {};
// window.MyNamespace.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
const composeEnhancers =  compose;

const store = createStore (reducer, composeEnhancers (
  applyMiddleware (thunk)
));

export default store;