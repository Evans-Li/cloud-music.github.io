import React from 'react'
import { renderRoutes, RouteConfig } from "react-router-config";


type propsType = {
  props: RouteConfig
}

function Home(props: RouteConfig) {
  
  return(
    <div>
      home
      {renderRoutes(props.route.routes)}
    </div>
  )
}

export default React.memo(Home)