import { getRankListRequest } from '../../../api/request'
import { fromJS } from 'immutable'

export const CHANGE_RANK_LIST = 'home/rank/changeRankList'
export const CHANGE_LOADING  = 'home/rank/changeLoadig'

const changeRankList = (data)=>({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
})

const changeLoading = (data)=>({
  type: CHANGE_LOADING,
  data
})

export const getRankList = ()=>{
  return dispatch =>{
    getRankListRequest().then((res)=>{
      let list = res.list
      dispatch(changeRankList(list))
      dispatch(changeLoading(false))
    })
  }
}


const defaultState = fromJS({
  list: [],
  loading: true
})

const reducer = (state = defaultState, action) =>{
  switch(action.type){
    case CHANGE_RANK_LIST:
      return state.set('list',action.data)
    case CHANGE_LOADING:
      return state.set('loading',action.data)
    default:
      return state
  }
}

export { reducer }