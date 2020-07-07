import { produce } from 'immer';
import { CHANGE_PULL_UP_LOADING, CHANGE_LOADING , CHANGE_CURRENT_ALBUM} from './constants'

const defaultState = {
  currentAlbum: {
    creator: {},
  },
  pullUpLoading: false,
  loading: false,
  startIndex: 0,
  totalCount: 0,
  scrollY: 0,
};

export default ( state = defaultState, action: any)=>{
  return produce( state, draft => {
    switch(action.type){
      case CHANGE_CURRENT_ALBUM:
        draft.currentAlbum = action.data
        break;
      case CHANGE_PULL_UP_LOADING:
        draft.pullUpLoading = action.data
        break;
      case CHANGE_LOADING: 
        draft.loading = action.data
        break;
      default: 
        return draft
    }
  })
}