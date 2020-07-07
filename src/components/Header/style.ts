import styled, { keyframes } from 'styled-components'
import style from '../../assets/global-style'


const titleMarquee = keyframes`
  0%{
    transform: translate(0, 0);
  }
  100%{
    transform: translate(-100%, 0);
  }
`
export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 1vh;
  padding-left: 1vw;
  height: 4rem;
  color: ${style['font-color-light']}
  width: 100%;
  .back{
    margin-left: 2vw;
    line-height: 3rem;
    width: 2rem;
    margin-right: 3vw;
  }
  .marquee{
    padding-left: 2vw;
    display: inline-block;
    overflow: hidden;
    wite-space: nowrap;
  }
  .marquee h1{
    animation: ${titleMarquee} 3s linear infinite;
    // padding-left: 100%;
    width:100%;
    font-weight: 700;
    // color: ${style['font-color-light']};
    position: relative;
    top: -2px;
  }
  h1{
    display: inline-block !important;
    font-weight: 800;
    position: relative;
    top: -2px;
  }
`


