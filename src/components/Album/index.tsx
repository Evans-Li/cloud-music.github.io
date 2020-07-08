import React, { useState, useRef, useEffect } from 'react'
import { Container } from './style'
import { CSSTransition } from 'react-transition-group'
import { RouteConfigComponentProps } from 'react-router-config';
import Header from '../Header'
import { AppState } from '../../store/index'
import * as actionCreators from './store/actionCreators'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import style from '../../assets/global-style'
import { HEADER_HEIGHT } from '../../api/config'
import Scroll from '../Scroll'
import AlbumDetail from '../AlbumDetail'

interface IPos {
  x: number;
  y: number;
}
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
  const [title, setTitle] = useState('歌单');
  const headerEl = useRef<HTMLDivElement>();
  const handleBack = () => history.goBack()
  
  const [isMarquee, setIsMarquee] = useState(false);
  const {
    params: { id },
  } = match;
  // const musicNoteRef = useRef<IMusicNote>(null);
  useEffect(() => {
    const pathName = history.location.pathname;
    let urlStr: string = '';
    if (/recommend/.test(pathName)) {
      urlStr = '/recommend';
    } else if (/rank/.test(pathName)) {
      urlStr = '/rank';
    }
    getAlbumDataDispatch(id, urlStr);
  }, [id, history.location.pathname, getAlbumDataDispatch]);

  const handleScroll = (pos: IPos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    let headerDom: HTMLDivElement = headerEl.current!;
    // props.changeScrollYDispatch(pos.);
    if (pos.y < minScrollY && headerDom) {
      headerDom.style.backgroundColor = style['theme-color'];
      headerDom.style.opacity = '' + Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = '1';
      setTitle('歌单');
      setIsMarquee(false);
    }
  };

  const handlePullUp = () => {
    changePullUpLoadingStateDispatch(true);
    changePullUpLoadingStateDispatch(false);
  };

  // const musicAnimation = (x: number, y: number) => {
  //   const musicNoteNode = musicNoteRef.current!;
  //   musicNoteNode.startAnimation({ x, y });
  // };
  return (
    <CSSTransition
      in={true}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={handleBack}
    >
      <Container>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {Object.keys(currentAlbum).length !== 0 ? (
          <Scroll
            // onScroll={(pos: IPos) => handleScroll(pos)}
            pullUp={() => handlePullUp()}
            pullUpLoading={pullUpLoading}
            bounceTop={false}
          >
            <AlbumDetail
              currentAlbum={currentAlbum}
              // pullUpLoading={pullUpLoading}
              // musicAnimation={musicAnimation}
            />
          </Scroll>
        ) : null}
        {/* {loading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : null}
        <MusicNote ref={musicNoteRef}></MusicNote> */}
      </Container>
    </CSSTransition>
  );
};

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state: AppState) => ({
  currentAlbum: state.album.currentAlbum,
  loading: state.album.loading,
});

// 映射dispatch到props上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbumDataDispatch(id: number, fromURL: string) {
      dispatch(actionCreators.getAlbumList(id, fromURL));
    },
    changePullUpLoadingStateDispatch(loading: boolean) {
      dispatch(actionCreators.changePullUpLoading(loading));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(withRouter(Album)));












// import React, { useState, useRef } from 'react'
// import { Content } from './style'
// import { CSSTransition } from 'react-transition-group'
// import { RouteConfigComponentProps } from 'react-router-config';
// import Header from '../Header'
// import { AppState } from '../../store/index'
// import * as actionCreators from './store/actionCreators'
// import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// interface AlbumProps extends RouteConfigComponentProps {
//   currentAlbum: any;
//   loading: boolean;
//   pullUpLoading?: boolean;
//   getAlbumDataDispatch: any;
//   changePullUpLoadingStateDispatch: any;
//   history: any;
//   match: any;
// }

// const Album: React.FC<AlbumProps> = ({
//   history,
//   match,
//   currentAlbum,
//   loading,
//   pullUpLoading,
//   getAlbumDataDispatch,
//   changePullUpLoadingStateDispatch,
// }) => {
//   const [showStatus, setShowStatus] = useState(true)
//   const [title, setTitle] = useState('歌单')
//   const [isMarquee, setIsMarquee] = useState(false)
//   const handleBack = () => history.goBack()
//   const headerRef = useRef<HTMLDivElement>()
//   return (
//     <CSSTransition
//       in={true}
//       timeout={300}
//       classNames='fly'
//       appear={true}
//       unmountOnExit
//       onExited={handleBack}
//     >
//       <Content>
//         <Header
//           ref={headerRef}
//           handleClick={handleBack}
//           title={title}
//           isMarquee={isMarquee}>
//         </Header>
//       </Content>
//     </CSSTransition>

//   )
// }
// // 映射redux的全局state到组件的Props上
// const mapStateToProps = (state: AppState) => ({
//   currentAlbum: state.album.currentAlbum,
//   loading: state.album.loading
// })

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     getAlbumDataDispatch(id: number, formUrl: string) {
//       dispatch(actionCreators.getAlbumList(id, formUrl))
//     },
//     changeUpLoadingStateDispatch(loading: boolean) {
//       dispatch(actionCreators.changePullUpLoading(loading))
//     }
//   }
// }

// // export default withRouter(React.memo(Album))

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(React.memo(withRouter(Album)))



