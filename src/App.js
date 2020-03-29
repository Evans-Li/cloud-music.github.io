import React from 'react';
import { GlobalStyle } from './style'
import { IconStyle } from '../src/assets/iconfont/iconfont'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import routes from './routes'
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>

  );
}

export default App;
