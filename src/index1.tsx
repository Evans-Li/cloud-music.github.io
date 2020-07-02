// import * as React from 'react';
import React, { FC, useEffect } from 'react'


interface IProps {
  // CSSProperties提供样式声明的类型信息
  // 用户传入style的时候就能够获得类型检查和代码补全
  style?: React.CSSProperties;
  // 使用@types/react提供的事件类型定义，这里指定event.target的类型是HTMLButtonElement
  // onClick(event: React.MouseEvent<HTMLButtonElement>): void;
// ...
}




type MyComponentProps ={
  className?: string;
  style?: React.CSSProperties;
  d?: number

}

const IndexPage: React.FC<MyComponentProps> = (props)=>{

  useEffect(()=>{
    console.log(props);
  },[])
  return(
    <div>
      <p>{props.className}</p>
      <p>{props.d}</p>
      <p>{props.children}</p>
    </div>
  )
}

export default React.memo(IndexPage)

// export default IndexPage



