import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

let SignUp = ({handleSignUp}) => {
  return (
    <Form inverted>
      <Form.Field>
        <label>First Name</label>
        <input
          placeholder='First Name'
          onChange={() }
        />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <input
          placeholder='Last Name'
          onChange={() }
         />
      </Form.Field>
      <Form.Field>
        <label>Email</label>
        <input placeholder='Email' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input placeholder='Password' />
      </Form.Field>
      <Form.Field>
        <label>Password Repeat</label>
        <input placeholder='Password Repeat' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button onClick={handleSignUp} type='submit'>Submit</Button>
    </Form>
  )
}

export default SignUp
