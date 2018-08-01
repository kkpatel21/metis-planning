import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      pWord: "",
      pWordR: ""
    }
  }

  onSignUp = () => {
    fetch('http://localhost:8888/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: this.state.fName,
        lastname: this.state.lName,
        email: this.state.email,
        password: this.state.pWord,
        passwordRepeat: this.state.pWordR
      })
    })
    .then((response) => response.text())
    .then((text) => {
      if(text === 'incomplete') {
        alert('Please fill in all fields.')
      } else if(text === 'passwords') {
        alert('Passwords must match.')
      } else if(text === 'exists') {
        alert('Account already exists. Please log in.')
      } else {
        alert('User Signed Up!')
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <Form inverted>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder='First Name'
            onChange={(e) => this.setState({fName: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder='Last Name'
            onChange={(e) => this.setState({lName: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder='Password'
            onChange={(e) => this.setState({pWord: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Password Repeat</label>
          <input
            placeholder='Password Repeat'
            onChange={(e) => this.setState({pWordR: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox inline label='I agree to the terms and conditions' required />
        </Form.Field>
        <Button type='submit' onClick={this.onSignUp}>Submit</Button>
      </Form>
    )
  }
};

export default SignUp;
