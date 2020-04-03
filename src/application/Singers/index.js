import React, { useRef, useState, useEffect } from 'react';
import Horizontal from '../../baseUI/HorizontalItem'
import { categoryTypes, alphaTypes } from '../../api/config'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
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

function Singers(props) {
  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
  const { updateDispatch, getHotSingerDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch} = props
  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')
  const handleUpdateAlpha = (val) => {
    setAlpha(val)
    updateDispatch(category, val)
  }
  const handleUpdateCategory = (val) => {
    setCategory(val)
    updateDispatch(val, alpha)
  }

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map((item,index) => {
            return (
              <ListItem key={index}>
                <div className='img_wrapper'>
                  <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt='music' />
                </div>
                <span className='name'>{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  useEffect(()=>{
    getHotSingerDispatch()
  },[])
  useEffect(()=>{
    console.log(props.singerList);
  },[])


  return (
    <div>
      <NavContainer>
        <Horizontal
          list={categoryTypes}
          title={'分类 (默认热门):'}
          handleClick={handleUpdateCategory}
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
        <Scroll>
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
      pullDownRefreshDispatch(category, alpha){
        dispatch(changePullDownLoading(true))
        dispatch(changePageCount(0))
        if(category === '' && alpha === ''){
          dispatch(getHotSingerList())
        } else {
          dispatch(getSingerList(category, alpha)) 
        }
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));

