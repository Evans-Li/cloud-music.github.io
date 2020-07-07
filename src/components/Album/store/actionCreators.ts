import {
  CHANGE_CURRENT_ALBUM,
  CHANGE_LOADING,
  CHANGE_PULL_UP_LOADING,
} from './constants';

import { getRecommendListDetailsRequest } from './service'

export const changeCurrentAlbum = (data: any) => ({
  type: changeCurrentAlbum,
  data
})
export const changePullUpLoading = (data: boolean) => ({
  type: CHANGE_PULL_UP_LOADING,
  data
})
export const changeLoading = (data: boolean) => ({
  type: CHANGE_LOADING,
  data
})


export const getAlbumList = (id: number, formUrl: string) => {
  let request: any;
  switch (formUrl) {
    case 'recommend':
      request = getRecommendListDetailsRequest
      break;
    case 'rank':
      break;
    default:
      request = getRecommendListDetailsRequest
  }
  return (dispatch: any) => {
    dispatch(changeLoading(true))
    request(id)
      .then((res:any) => {
        let data = res.playlist
        dispatch(changeCurrentAlbum(data))
        dispatch(changeLoading(false))
      })
      .catch((e: any)=>{
        console.log('获取album数据失败',e)
      })
  }
}
