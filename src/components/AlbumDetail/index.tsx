import  React, { useEffect } from 'react'
import { TopDesc, Menu} from './style'

interface AlbumDetailProps {
  currentAlbum: object;
  pullUpLoading?: boolean;
  musicAnimation?: boolean;
}


 const AlbumDetail =(props: any) => {
  const {currentAlbum } = props

  useEffect(()=>{
    console.log(currentAlbum)
  },[])

  const renderTopDesc = ()=>{
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className='background'>
          <div className='filter'></div>
        </div>
        <div className='img_wrapper'>
          <div className='decorate'></div>
          <img src={currentAlbum.coverImgUrl} alt='' />
          <div className='play_count'>
            <i className='iconfont play'>&#xe885;;</i>
            <span className='count'>
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>
        <div className='desc_wrapper'>
          <div className='title'>{currentAlbum.name}</div>
          <div className='person'>
            <div className='avatar'>
              <img src={currentAlbum.creator.avatarUrl} alt='' />
            </div>
            <div className='name'>{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  }

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className='iconfont'>&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className='iconfont'>&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className='iconfont'>&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className='iconfont'>&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };
  return (
    <div>
      {renderTopDesc()}
      {renderMenu()}
    </div>
  )
}


export default React.memo(AlbumDetail)
