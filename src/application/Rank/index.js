import React, { useEffect } from 'react';
import { filterIndex } from '../../api/utils'
import { connect } from 'react-redux';
import {
  Container,
  List,
  ListItem,
  SongList
} from './style'
import Scroll from '../../baseUI/Scroll'
import { getRankList } from './store'
import { EnterLoading } from './../Singers/style'
import { renderRoutes } from 'react-router-config'
import Loading from '../../baseUI/Loading'


function Rank(props) {
  const { list, loading, songsCount } = props;
  const { getRankListDataDispatch } = props;
  const rankList = list.toJS()

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);


  const enterDetail = (detail)=>{
    props.history.push(`/rank/${detail.id}`)
  }
  useEffect(()=>{
    if(!rankList.size){
      getRankListDataDispatch()
    }
  },[])

  const renderRankList = (rankList, global) => {
    return (
      <List globalRank={global}>
        {
          rankList.map((item) => {
            return (
              <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { "display": "none" } : { "display": "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );

}
const mapStateToProps = (state) => ({
  list: state.getIn(['rank', 'list']),
  loading: state.getIn(['rank', 'loading']),
  // songsCount: state.getIn(['player', 'playList']).size
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))  