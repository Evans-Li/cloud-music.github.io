
// import { combineReducers } from 'redux-immutable'
import { combineReducers } from 'redux';
import recommendReducer from '../application/Recommend/store/reducer';
import albumReducer from '../components/Album/store/reducer';



export const rootReducer =  combineReducers({
  recommend: recommendReducer,
  album: albumReducer
})