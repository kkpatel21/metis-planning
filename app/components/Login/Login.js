import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form inverted>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' />
          </Form.Field>
        <Button type='submit'>Submit</Button>
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
