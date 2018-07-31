import React, { Component } from 'react';
import { connect } from 'react-redux';
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
            <Header className="loginHeader" size="large"> Log In </Header>
            <Login />
          </div>

          <Divider vertical> Or </Divider>

          <div className="SignUp">
            <Header className="signupHeader" size="large"> Sign Up </Header>
            <SignUp />
          </div>
        </div>

    </div>
  )
}

export default MainPage;
