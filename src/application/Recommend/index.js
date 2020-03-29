import React, { useEffect } from 'react';
import Slider from '../../components/Slider'
import RecommendList from '../../components/RecommendList'
import { Content } from './style'
import Scroll from '../../baseUI/Scroll'
import * as actionType from './store/actionCreators.js'
import { connect } from 'react-redux'
import { fromJS } from 'immutable';
import { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/Loading'

  function Recommend(props) {

    const { bannerList, recommendList, enterLoading} = props
    const { getBannerDataDispatch, getRecommendDataDispatch } = props

    const bannerListJS = bannerList ? bannerList.toJS() : []
    const recommendListJS = recommendList ? recommendList.toJS() : []

    useEffect(()=>{
      if( !bannerList.size ) getBannerDataDispatch()
      if( !recommendList.size ) getRecommendDataDispatch()
    },[])

    return (
      <Content>
        <Scroll className="list" onScroll={forceCheck}>
          <div>
            <Slider bannerList={bannerListJS}></Slider>
            <RecommendList recommendList={recommendListJS}></RecommendList>
          </div>
        </Scroll>
        { enterLoading ? <Loading/> : null}
      </Content>
    )
  }

  const mapStateToProps = (state)=>({
    bannerList: state.getIn(['recommend','bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading'])
  })
  const mapDispatchToProps = (dispatch) => {
    return{
      getBannerDataDispatch(){
        dispatch(actionType.getBannerList())
      },
      getRecommendDataDispatch(){
        dispatch(actionType.getRecommedList())
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))