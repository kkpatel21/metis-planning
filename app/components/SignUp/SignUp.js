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
      pWordR: "",
      checked: false
    }
  }

  onChecked = () => {
    this.setState({checked: !this.state.checked})
  }

  onSignUp = () => {
    if(this.state.checked === false) {
      return alert('Please agree to the Terms & Conditions.')
    }
    fetch('/api/signup', {
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
      } else if(text === 'email') {
        alert('Please enter a valid email.')
      } else if(text === 'exists') {
        alert('Account already exists. Please log in.')
      } else {
        this.setState({
          fName: "",
          lName: "",
          email: "",
          pWord: "",
          pWordR: "",
          checked: false
        })
        alert('You are registered!')
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
            value={this.state.fName}
            onChange={(e) => this.setState({fName: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder='Last Name'
            value={this.state.lName}
            onChange={(e) => this.setState({lName: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder='Email'
            value={this.state.email}
            onChange={(e) => this.setState({email: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            value={this.state.pWord}
            onChange={(e) => this.setState({pWord: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Password Repeat</label>
          <input
            type='password'
            placeholder='Password Repeat'
            value={this.state.pWordR}
            onChange={(e) => this.setState({pWordR: e.target.value})}
          />
        </Form.Field>
        <Form.Field>
          <div onClick={this.onChecked}>
          <Checkbox inline label='I agree to the terms and conditions.' />
        </div>
        </Form.Field>
        <Button type='submit' onClick={this.onSignUp}>Sign Up</Button>
      </Form>
    )
  }
};

export default SignUp;
