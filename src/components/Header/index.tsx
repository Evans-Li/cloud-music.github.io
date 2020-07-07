import React, { useState } from 'react'
import { HeaderContainer } from './style'

interface HeaderPropsType {
  handleClick: ()=> void;
  title: string;
  isMarquee: boolean;
}

const Header = React.forwardRef((props: HeaderPropsType, ref) => {
  const {
    handleClick = ()=>{console.log(111)},
    title = '歌单',
    isMarquee = false
  } = props
  // const [title, setTitle] = useState('歌单')
  // const [isMarquee, setIsMarquee] = useState(true)

  // const handleClick = () => {

  // }
  return (
    <HeaderContainer>
      <div>
        <i className='iconfont back' onClick={handleClick}> &#xe655;</i>
        {
          isMarquee
            ?
            (<div className='marquee'>
              <h1>{title}</h1>
            </div>)
            :
            (<h1>{title}</h1>)
        }
      </div>
    </HeaderContainer>

  )
})

export default React.memo(Header)