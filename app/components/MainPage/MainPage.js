import React, { Component } from 'react';
import { Grid, Header, Button, Checkbox, Form, Divider, Segment} from 'semantic-ui-react'
import Login from '../Login/Login.js';
import SignUp from '../SignUp/SignUp.js';
import './MainPage.css';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }


render() {
  return (
    <div className="entire-page">
      <h1 className="header"> Welcome to Metis </h1>
      <div className="main-page">
        <Grid divided>
            <Grid.Row>
              <Grid.Column width={8}>
                <div className="Login">
                  <h2 className="loginHeader"> Log In </h2>
                  <Divider />
                  <Login />
                </div>
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="SignUp">
                  <h2 className="signupHeader"> Sign Up </h2>
                  <Divider />
                  <SignUp />
                </div>
              </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    </div>
    )
  }
}

export default MainPage;
