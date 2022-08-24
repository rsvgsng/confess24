import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import * as serviceWorker from './serviceWorker' 



 setTimeout(function() { 
  try {
    if(sessionStorage.getItem("data")){
      sessionStorage.clear();
    }
  
  } catch (error) {
    console.log("vaaaaa") 
  }

   }, 120000); // 2 minutes

const options = {

  position: positions.BOTTOM_CENTER,
  timeout: 4000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(


  <BrowserRouter>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />

    </AlertProvider>
    </BrowserRouter>,


      document.getElementById('root')
);

serviceWorker.unregister()
