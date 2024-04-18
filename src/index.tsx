import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/root.tsx';
import Main from './routes/main.tsx';
import Policy from './routes/policy.tsx';
import ErrorPage from './routes/error.tsx';

import './index.css';
import { Context, Store } from './lib/store.ts';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main/>,
      },
      {
        path: "/policy",
        element: <Policy/>,
      },
    ],
  },
]);

const store = new Store();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <RouterProvider router={router}/>
    </Context.Provider>
  </React.StrictMode>,
)
