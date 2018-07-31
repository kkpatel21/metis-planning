import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Divider} from 'semantic-ui-react'
import Login from '../Login/Login.js';
import SignUp from '../SignUp/SignUp.js';
import './MainPage.css';


let MainPage = ({}) => {
  return (
    <div>
      <h1 className="Title"> Welcome to Metis, Event Planning </h1>
      <div className="intro-page">
        <div className="Login">
          <Login />
        </div>

        <Divider vertical> Or </Divider>

        <div className="SignUp">
          <SignUp />
        </div>
      </div>
    </div>
  )
}

export default MainPage;
