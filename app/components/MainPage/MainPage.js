import React, { Component } from 'react';
import { Header, Button, Checkbox, Form, Divider} from 'semantic-ui-react'
import Login from '../Login/Login.js';
import SignUp from '../SignUp/SignUp.js';
import './MainPage.css';


let MainPage = ({}) => {
  return (
    <div className="entire-page">
      <h1 className="header"> Welcome to Metis </h1>

        <div className="main-page">
          <div className="Login">
            <h2 className="loginHeader" color="#ffffff"> Log In </h2>
            <Divider />
            <Login />
          </div>

          <Divider vertical> Or </Divider>

          <div className="SignUp">
            <h2 className="signupHeader" color="#ffffff"> Sign Up </h2>
            <Divider />
            <SignUp />
          </div>
        </div>

    </div>
  )
}

export default MainPage;
