import React from 'react';
import styled from 'styled-components'
import style from '../../assets/global-style.js'
import PropTypes from 'prop-types'

const HeaderContainer = styled.div`
  position: fixed;
  padding: 6px 10px;
  padding-top: 10px;
  width: 100%;
  height: 35px;
  display: flex;
  line-hight: 35px;
  z-index: 100;
  color: ${style["font-color-light"]};
  .back{
    margin-left: 10px;
    font-size: 20px;
    width: 20px;
  }
  >h1{
    padding-left: 10px;
    font-size: ${style['font-size-l']};
    font-weight: 700;
    line-hight: 35px;
    position: relative;
    top: 2px;
  }
  .head{
    position: absolute;
    top: 4px;
  }
  
`

const Header = React.forwardRef((props, ref)=>{

  
  const { isMarquee, title, handleClick } = props
  return(
    <div>
      <HeaderContainer ref={ref}>
        <i className='back iconfont' onClick={handleClick}>&#xe655;</i>
        {
          isMarquee ? (<marquee><h1 className='head'>{title}</h1></marquee>)
        : <h1>{title}</h1>
        }
      </HeaderContainer>
    </div>
  )
})

Header.defaultProps = {
  handleClick: ()=>{},
  title: '标题',
  isMarquee: false
}

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
}

export default React.memo(Header)