import { axiosInstance } from '../../../api/request'

export const getRecommendListDetailsRequest  = (id: number)=>{
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}