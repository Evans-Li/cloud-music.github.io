import React from 'react'
import Slider from '../../components/Slider'

type propsType = {

}
type bannerListType = {
  imageUrl: string
}


const Recommend: React.FC<propsType> = (props) =>{

  const bannerList = [1,2,3,4].map((item,index) =>{
    return{
      imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
    }
  })
  return(
    <div>
      <Slider bannerList={bannerList} />
    </div>
  )
}

export default Recommend