
import React from 'react';
import { Redirect } from "react-router-dom";
import { RouteConfig } from 'react-router-config';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import Album from '../components/Album'

const routes: RouteConfig[] =[
  {
    // path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      {
        path: "/recommend",
        key: 'recommend',
        component: Recommend,
        routes:[
          {
            path: '/recommend/:id',
            component: Album
          }
        ]
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]


export default routes