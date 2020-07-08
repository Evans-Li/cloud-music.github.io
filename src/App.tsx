import React from 'react';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { Provider } from 'react-redux'
// import store from './store/index'
import { composeStore } from './store';


import routes from './routes/index';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签


function App() {
  return (
    <div className='app'>
      <Provider store={composeStore}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          {renderRoutes(routes)}
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
