import React, { useState } from 'react'
import { Content } from './style'
import { CSSTransition } from 'react-transition-group'
import { RouteConfigComponentProps } from 'react-router-config';
import Header from '../Header'

interface AlbumProps extends RouteConfigComponentProps {
  currentAlbum: any;
  loading: boolean;
  pullUpLoading?: boolean;
  getAlbumDataDispatch: any;
  changePullUpLoadingStateDispatch: any;
  history: any;
  match: any;
}

const Album: React.FC<AlbumProps> = ({
  history,
  match,
  currentAlbum,
  loading,
  pullUpLoading,
  getAlbumDataDispatch,
  changePullUpLoadingStateDispatch,
}) => {
  const [showStatus, setShowStatus] = useState(true)
  const [title, setTitle] = useState('歌单')
  const [isMarquee, setIsMarquee] = useState(false)
  const handleBack = () => history.goBack()
  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={handleBack}
    >
      <Content>
        <Header handleClick={handleBack} title={title} isMarquee={isMarquee}></Header>
      </Content>
    </CSSTransition>

  )
}


export default React.memo(Album)


