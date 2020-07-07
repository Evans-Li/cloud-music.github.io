import React from 'react'
import { ListWrapper, List, ListItem } from './style'
import LazyLoad from 'react-lazyload'
import { getCount } from '../../api/utils'
import { withRouter } from 'react-router-dom';




function RecommendList(props: any) {

  const { recommendList } = props

  const enterDetails = (id: string | number) => {
    props.history.push(`/recommend/${id}`)
  }

  return (
    <ListWrapper>
      <h1 className='title'>推荐歌单</h1>
      <List>
        {
          !!recommendList.length && recommendList.map((item: any, index: number) => {
            return (
              <ListItem key={item.id} onClick={() => enterDetails(item.id)} >
                <div className='img-wrapper'>
                  <div className='decorate'></div>
                  <LazyLoad
                    placeholder={
                      <img
                        width='100%'
                        height='100%'
                        src={require('./music.png')}
                        alt='music'
                      />
                    }
                  >
                    <img
                      src={item.picUrl + '?param=300x300'}
                      width='100%'
                      height='100%'
                      alt='music'
                    />
                  </LazyLoad>
                  <div className='play-count'>
                    <i className='iconfont'>&#xe885;</i>
                    <span className='count'>
                      {getCount(item.playCount)}
                    </span>
                  </div>
                </div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}


export default withRouter(React.memo(RecommendList))