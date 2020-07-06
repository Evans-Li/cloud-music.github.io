import * as actionsType from './constans'
import produce from 'immer';
import { RecommendStateType } from './data.d';

const defaultState: RecommendStateType = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
}

export default (state = defaultState, action: any) => {
  return produce(state, draft => {
    switch (action.type) {
      case actionsType.CHANGE_BANNER:
        draft.bannerList = action.data
        break
      case actionsType.CHANGE_RECOMMEND_LIST:
        draft.recommendList = action.data
        break
      case actionsType.CHANGE_ENTER_LOADING:
        draft.enterLoading = action.data
        break
      default:
        return state
    }
  })
}

