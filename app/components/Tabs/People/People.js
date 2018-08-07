import React, { Component } from 'react'
import { List, Icon, Button, Grid, Divider, Message, Checkbox, Input } from 'semantic-ui-react'
import './People.css'

export default class People extends React.Component {
  constructor() {
    super();

  }


  handleEmail = () => {

    fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      creditials: 'same-origin',
    })

    console.log('Done')
  }

  render() {
    let statusRender;
    let status = 'green'
    if (status === 'red') {
      statusRender = (<Message color='red' visibile>Not Attending</Message>)
    } else if (status === 'green') {
      statusRender = (<Message color='green' visibile>Attending</Message>)
    } else {
      statusRender = (<Message color='teal' visibile>Pending</Message>)
    }
    return (

        <div className="entire list">
          <Grid columns={5} divided='vertically'>
            <Grid.Row>
              <Grid.Column>
                Name
                <Divider />
              </Grid.Column>
              <Grid.Column>
                Email
                <Divider />
              </Grid.Column>
              <Grid.Column>
                Status
                <Divider />
              </Grid.Column>
              <Grid.Column>
                Notes
                <Divider />
              </Grid.Column>
              <Grid.Column>
                Actions
                <Divider />
                {/*Map through all invitees of event*/}
                <Button size='small' animated>
                  <Button.Content hidden>Add New</Button.Content>
                  <Button.Content visible>
                    <Icon name='plus'/>
                  </Button.Content>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    )
  }
}
