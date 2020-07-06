
// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux';
import recommendReducer from '../application/Recommend/store/reducer';


export const rootReducer =  combineReducers({
  recommend: recommendReducer
})