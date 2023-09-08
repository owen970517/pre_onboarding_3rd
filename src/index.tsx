import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {  RouterProvider } from 'react-router-dom';
import { Router } from './Router';
import './styles/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);
