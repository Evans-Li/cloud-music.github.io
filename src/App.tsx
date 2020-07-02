import React from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import IndexPage from './index1'

import routes from './routes/index';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签

type hello = {
  d:number
}

function App() {
  return (
    <div className='app'>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <i className="iconfont">&#xe62b;</i>
        {renderRoutes(routes)}

      </HashRouter>


    </div>

  );
}

export default App;
