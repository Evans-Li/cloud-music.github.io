import * as actionType from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

export const changeBannerList = (data) =>({   //首页轮播图
  type: actionType.CHANGE_BANNER,
  data: fromJS(data)
})

export const changeRecommendList = (data) =>({  // 获取推荐页列表数据
  type: actionType.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

export const changeEnterLoadig = data => ({ // 进场loading dispatch
  type: actionType.CHANGE_RECOMMEND_LOADING,
  data
})

export const getBannerList = () =>{
  return dispatch => {
    getBannerRequest().then((res) => {
      dispatch(changeBannerList(res.banners))
    })
    .catch(()=>{
      console.log('bannerList 数据传输错误')
    })
  }
}



export const getRecommedList = () => {
  return dispatch => {
    getRecommendListRequest()
      .then(
        res => {
          dispatch(changeRecommendList(res.result))
          dispatch(changeEnterLoadig(false))
          
        }
      )
      .catch(e => {
        console.log(e,'recommendList 数据传输错误!')
      })
  }
}