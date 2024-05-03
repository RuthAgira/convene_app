import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter as Router, RouterProvider } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminHome from './admin_screens/Home';
import AdminGroupPage from './admin_screens/Group';
import PublicHome from './public_screens/PublicHome';
import PublicLayout from './layouts/PublicLayout';
import PublicAuthScreen from './public_screens/PublicAuthScreen';
import { AuthContextProvider } from './authLogic';
import AdminViewQUestion from './admin_screens/AdminViewQUestion';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = Router([
  {
    path: '/auth',
    element: <PublicAuthScreen/>
  },
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <PublicHome />
      }
    ]
  },
  {
    path: '/Admin',
    element: <AdminLayout/>,
    children: [
      {
      path: '/Admin',
      element: <AdminHome />
      },
      {
        path: '/Admin/:id',
        element: <AdminGroupPage/>,
      },
      {
        path: '/Admin/:title/:id',
        element: <AdminViewQUestion/>
      }
    ]
  },
])



root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <div className='App'>
        <RouterProvider key={'router'} router={router}/>
      </div>
    </AuthContextProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
