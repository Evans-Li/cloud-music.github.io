import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { Container } from './style'
function Album(props){

  const [showStatus, setShowStatus] = useState (true);

  useEffect(()=>{
    console.log('album')
  },[])
  return(

    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        sss
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Album)