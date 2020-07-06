import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Content } from './style';
import Slider from '../../components/Slider';
import { bannerType } from '../../components/Slider';
import {
  renderRoutes,
  RouteConfig,
} from 'react-router-config';
import RecommendList from '../../components/List';
import { forceCheck } from 'react-lazyload';
import * as actionTypes from './store/actionCretors';
import Scroll from '../../components/Scroll';
import { EnterLoading } from '../../assets/global-style';
import Loading from '../../components/Loading/v2';

export type recommendType = {
  name: string;
  id: number;
  picUrl: string;
  playCount: number;
};

interface RecommendProps extends RouteConfig {
  bannerList: bannerType[];
  recommendList: recommendType[];
  enterLoading: boolean;
  getBannerDataDispatch: () => void;
  getRecommendListDataDispatch: () => void;
}

const Recommend: React.FC<RecommendProps> = ({
  bannerList,
  recommendList,
  enterLoading,
  getBannerDataDispatch,
  getRecommendListDataDispatch,
  route,
}) => {
  useEffect(() => {
    if (!bannerList.length) {
      getBannerDataDispatch();
    }
    if (!recommendList.length) {
      getRecommendListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Content>
      <Scroll onScroll={() => forceCheck()}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? (
        <EnterLoading>
          <Loading></Loading>
        </EnterLoading>
      ) : null}
      {renderRoutes(route.routes)}
    </Content>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: any) => ({
  bannerList: state.recommend.bannerList,
  recommendList: state.recommend.recommendList,
  // songsCount: state.recommend.recommendList,
  enterLoading: state.recommend.enterLoading,
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  };
};

// 将ui组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));








// import React from 'react'
// import Slider from '../../components/Slider'
// import RecommendList from '../../components/List'
// import { Content } from './style'
// import Scroll from '../../components/Scroll'
// import { forceCheck } from 'react-lazyload'
// type propsType = {

// }
// type bannerListType = {
//   imageUrl: string
// }


// const Recommend: React.FC<propsType> = (props) => {

//   const bannerList = [1, 2, 3, 4].map((item: any, index: number) => {
//     return {
//       imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
//     }
//   })

//   const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: any, index: number) => {
//     return {
//       id: 1,
//       picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
//       playCount: 17171122,
//       name: "朴树、许巍、李健、郑钧、老狼、赵雷"
//     }
//   });
//   return (
//     <Content>
//       <Scroll onScroll={() => forceCheck()} >
//         <div>
//           <Slider bannerList={bannerList}></Slider>
//           <RecommendList recommendList={recommendList}></RecommendList>
//         </div>
//     </Scroll>

//     </Content>

//   )
// }

// export default Recommend