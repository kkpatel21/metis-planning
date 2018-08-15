import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <Form inverted method='POST' action='/api/login'>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' name='username' onChange={(e)=>this.setState({email:e.target.value})} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' name='password' type="password" onChange={(e)=>this.setState({password:e.target.value})} />
          </Form.Field>
        <Button type='submit' >Login</Button>
        <br />
        <br />
        <br />
        <br />
        <div className='socialButtons'>
          <Button color="facebook">
            <Icon name='facebook' /> Facebook
          </Button>
          <Button color="google plus">
            <Icon name='google plus' /> Google Plus
          </Button>
        </div>
      </Form>
    )
  }
}

export default Login
