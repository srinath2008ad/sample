import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId="1066290582003-v6kfbh9ev0n64dl6jqok0j0pk69vi21e.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
