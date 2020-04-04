import React, { useRef, useState, useEffect } from 'react';
import Horizontal from '../../baseUI/HorizontalItem'
import { categoryTypes, alphaTypes } from '../../api/config'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from './style'
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import Scroll from '../../baseUI/Scroll';
import { connect } from 'react-redux'
import Loading from '../../baseUI/Loading'
import LazyLoad, { forceCheck } from 'react-lazyload';


function Singers(props) {
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
  const { updateDispatch, getHotSingerDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props
  // const singerListJS = singerList.toJS()
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')
  const scrollRef = useRef(null);
  const handleUpdateAlpha = (newVal) => {
    if(alpha === newVal) return;
    setAlpha(newVal)
    updateDispatch(category, newVal)
    scrollRef.current.refresh();
  }
  const handleUpdateCategory = (newVal) => {
    if(category === newVal) return;
    setCategory(newVal)
    updateDispatch(newVal, alpha)
    scrollRef.current.refresh();
  }
  const handlePullUp = () => {  //上啦加载
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }
  const handlePullDown = () => {  //下拉刷新
    pullDownRefreshDispatch(category, alpha);
  }

  const renderSingerList = () => {
    const {singerList} = props
    return (
      <List>
        {
          singerList.toJS().map((item, index) => (
            <ListItem key={item.id + index}>
              <div className='img_wrapper'>
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                  <img src={item.picUrl + '?param=300x300'} width='100%' height='100%' alt='music' />
                </LazyLoad>
              </div>
              <span className='name'>{item.name}</span>
            </ListItem>
          )
          )
        }
      </List>
    )
  }

  useEffect(() => {
    if(!singerList.length && !category && !alpha){
      getHotSingerDispatch()
    }
  }, [])
  useEffect(()=>{
    scrollRef.current.refresh();
  },[])

  return (
    <div>

      <NavContainer>
        <Horizontal
          list={categoryTypes}
          title={'分类 (默认热门):'}
          handleClick={val => handleUpdateCategory(val)}
          oldVal={category}
        />
        <Horizontal
          list={alphaTypes}
          title={'歌手首字母: '}
          handleClick={val => handleUpdateAlpha(val)}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        <Scroll
          ref={ scrollRef }
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {enterLoading ? <Loading /> : null}
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0))  //因为改变了分类, 所以count清零
      dispatch(changeEnterLoading(false))
      dispatch(getSingerList(category, alpha))

    },
    //h滑动到底部刷新
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true))
      dispatch(changePageCount(0))
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList())
      } else {
        dispatch(getSingerList(category, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));

