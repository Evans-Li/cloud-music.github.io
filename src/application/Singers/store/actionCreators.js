import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request'
import { 
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT, 
  CHANGE_ENTER_LOADING, 
  CHANGE_PULLUP_LOADING, 
  CHANGE_PULLDOWN_LOADING}
from './constast'
import { fromJS } from 'immutable'

export const changeSingerList = (data) =>({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
})
export const changePageCount = (data)=>({
  type: CHANGE_PAGE_COUNT,
  data
})  

export const changeEnterLoading = (data) =>({
  type: CHANGE_ENTER_LOADING,
  data
})
export const changePullUpLoading = (data) =>({
  type: CHANGE_PULLUP_LOADING,
  data
})
export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});