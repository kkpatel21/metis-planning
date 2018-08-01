import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onLogin = () => {
    fetch('/api/login',{
      method:"POST",
      headers:{
        "Content-Type" : 'application/json',
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password
      })
    })
    .then(user => user.json())
    .then(json => {
      console.log(json)
      if(json.success === true){
        this.props.toggleLogged();
        alert("Logging in!")
      }
    })
    .catch(error => {
      alert("error: " + error)
    })
  }

  render() {
    return (
      <Form inverted>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' onChange={(e)=>this.setState({email:e.target.value})} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' type="password" onChange={(e)=>this.setState({password:e.target.value})} />
          </Form.Field>
        <Button type='submit' onClick={()=>this.onLogin()} >Login</Button>
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
