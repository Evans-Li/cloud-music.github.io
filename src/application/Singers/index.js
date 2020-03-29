import React, { useRef, useState, useEffect } from 'react';
import Horizontal from '../../baseUI/HorizontalItem'
import { categoryTypes, alphaTypes } from '../../api/config'
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from './style'
import Scroll from '../../baseUI/Scroll';
function Singers() {
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17].map(item => {
    return {
      picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
      name: "隔壁老樊",
      accountId: 277313426,
    }
  });


  const [category, setCategory] = useState('')
  const [alpha, setAlpha] = useState('')
  let handleUpdateAlpha = (val) => {
    setAlpha(val)
  }
  let handleUpdateCategory = (val) => {
    setCategory(val)
  }

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.map(item => {
            return (
              <ListItem>
                <div className='img_wrapper'>
                  <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt='music' />
                </div>
                <span className='name'>{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizontal
          list={categoryTypes}
          title={'分类 (默认热门):'}
          handleClick={handleUpdateCategory}
          oldVal={category}
        />
        <Horizontal
          list={alphaTypes}
          title={'歌手首字母: '}
          handleClick={val => handleUpdateAlpha(val)}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        <Scroll>
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </div>

  )
}

export default React.memo(Singers)