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
          <Form.Input label="First Name" placeholder="First Name" width={16} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="Last Name" placeholder="Last Name" width={16} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="Email" placeholder="Email" width={16} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="Password" placeholder="Password" width={16} />
        </Form.Field>
        <Form.Field>
          <Form.Input label="Password Repeat" placeholder="Password" width={16} />
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
