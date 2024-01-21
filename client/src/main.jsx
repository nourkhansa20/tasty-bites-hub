import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qes4jwm0nrs4vzn6.us.auth0.com"
      clientId="IhNRP2w9YJrLozs5AuF61vGyhUnBYcn9"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience:'https://www.tastybiteshub-api.com',
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
)
