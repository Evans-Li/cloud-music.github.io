import React, { useState, useEffect, memo, useRef } from 'react';
import { PropTypes } from 'prop-types'
import Scroll from '../Scroll'
import { List, ListItem } from './style'

function Horizontal(props) {
  const { list, title, oldVal } = props
  const { handleClick } = props
  const Category = useRef(null)
  const clickHandle = (item)=>{
    handleClick(item.key)
  }

useEffect(()=>{
  let catgoryDom = Category.current
  let tagElems = catgoryDom.querySelectorAll('span')
  let totalWidth = 0
  Array.from(tagElems).forEach(ele =>{
    totalWidth += ele.offsetWidth
  })
  catgoryDom.style.width = `${totalWidth}px`
},[])

  return (
    <Scroll direction={"horizontal"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => (clickHandle(item))}
                >
                  {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法
Horizontal.defaultProps = {
  list: [],
  title: '',
  oldVal: '',
  handleClick: null
}

Horizontal.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}


export default memo(Horizontal)