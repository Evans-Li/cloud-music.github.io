import React from 'react'
import { HeaderContainer } from './style'

interface HeaderPropsType {
  handleClick: ()=> void;
  title: string;
  isMarquee: boolean;
}

const Header = React.forwardRef((props: HeaderPropsType, ref) => {
  const {
    handleClick = ()=>{},
    title = '歌单',
    isMarquee = false
  } = props
  return (
    <HeaderContainer ref={ ref as any}>
        <i className='iconfont back' onClick={handleClick}> &#xe655;</i>
        {// eslint-disable-next-line
          isMarquee
            ?
            (<div className='marquee'>
              <h1>{title}</h1>
            </div>)
            :
            (<h1>{title}</h1>)
        }
    </HeaderContainer>

  )
})

export default React.memo(Header)