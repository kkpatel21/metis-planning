import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      email: "",
      pWord: ""
    };
  }

  render() {
    return (

      <Form inverted>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" placeholder='Password' />
        </Form.Field>
        <Form.Field>
          <label>Password Repeat</label>
          <input type="password" placeholder='Password Repeat' />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

export default SignUp
