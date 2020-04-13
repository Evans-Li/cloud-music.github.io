import React, { useEffect } from 'react';
import { Container } from './style'
function Album(props){
  const { route } = props
  useEffect(()=>{
    console.log('album')
  },[])
  return(
      <Container>
        dddd
      </Container>
  )
}

export default React.memo(Album)