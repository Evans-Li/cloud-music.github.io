import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request'
import { 
  CHANGE_SINGER_LIST,
  CHANGE_PAGE_COUNT, 
  CHANGE_ENTER_LOADING, 
  CHANGE_PULLUP_LOADING, 
  CHANGE_PULLDOWN_LOADING}
from './constast'
import { fromJS } from 'immutable'
// import { changeEnterLoadig } from '../../Recommend/store/actionCreators'

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

//第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then((res) => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    })
    .catch(()=> {
      console.log('获取热门歌手失败！');
    })
  }
}

// 加载更多热门歌手数据
export const refreshMoreHotSingerList = () => {
  return ((dispatch, getState)=>{
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getHotSingerListRequest(pageCount).then((res)=>{
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(()=>{
      console.log('获取热门歌手数据失败!');
    })
  })
}

// 第一次加载对应类别歌手
export const getSingerList = ( category, alpha )=>{
  return ((dispatch)=>{
    getSingerListRequest(category, alpha, 0).then((res)=>{
      let data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(()=>{
      console.log('歌手列表数据获取失败');
    })
  })
}

//加载跟多歌手
export const refreshMoreSingerList = (category, alpha)=>{
  return((dispatch, getState)=>{
    let pageCount = getState().getIn(['singers', 'pageCount'])
    let singerList = getState().getIn(['singers', 'singerList'])
    getSingerListRequest(category,alpha, pageCount).then((res)=>{
      let data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(()=>{
      console.log('更多歌手数据获取失败')
    })
  })
}