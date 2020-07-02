import styled from 'styled-components'
import style from '../../assets/global-style'

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    padding-left: 2vw;
    font-size: 1rem;
    line-height: 3rem;
  }
`

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .decorate{
    position: absolute;
    top: 0;
    background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    height: 4vh;
    border-radius: 3px;
  }
  .img-wrapper{
    position: relative;
    height: 0;
    .play-count{
      position: absolute;
      top: 2;
      left: 2;
      font-size: ${style['font-size-s']};
      color: ${style['theme-color']};
      line-height: 2vh;
      .play{
        vertical-aligh: top;
      }
    }
    .img {
      position: absolute;
      height: 100%;
      width: 100%;
      border-radius: 3px;
    }
  }
  .desc {
    overflow: hidden;
    margin-top: 2px;
    padding: 0 2px;
    height: 50px;
    text-align: left;
    font-size: ${style['font-size-s']};
    line-height: 1.4;
    color: ${style['font-color-desc']};
  }
`