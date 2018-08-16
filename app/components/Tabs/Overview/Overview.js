import React, { Component } from 'react'
import { Header, Progress, Grid, Segment, Icon } from 'semantic-ui-react'
import EditEventModal from '../../Modals/EditEventModal'
import './Overview.css'

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    }
  }

  componentDidMount() {
    this.props.socket.emit('getEventInfo', {eventId: this.props.eventId})
    this.props.socket.on('getEvent', (data) => {
      this.setState({event: data.event})
    })
  }

  render() {
    console.log(this.state.event)

    //Collaborators
    let collaborators = this.state.event.collaborators
    let collaboratorRender = [];
    if (collaborators) {
      collaborators.forEach((person) => {
        collaboratorRender.push(
          <div>
            {person}
          </div>)
      })
    }

    //THIS IS INFO FOR ALL INVITEES -- CAN SHOW INFO BASED ON THE STATUS
    let attending = 0;
    let pending = 0;
    let notComing = 0;
    let total = 0;
    let people = this.state.event.people
    if (people) {
      total = this.state.event.people.length
      this.state.event.people.forEach((people) => {
        if (people.status === 'Coming') {
          attending++;
        } else if (people.status ==='NotComing') {
          notComing++;
        } else {
          pending++;
        }
      })
    }

    //THIS INFO IS FOR SPECIAL GUESTS -- CAN RENDER IT SAME LIKE THE
    let sAttending = 0;
    let sPending = 0;
    let sNotComing = 0;
    let sTotal = 0;
    let caterers = this.state.event.caterers
    if (caterers) {
      sTotal = this.state.event.caterers.length
      this.state.event.caterers.forEach((special) => {
        if (people.status === 'Unable') {
          sNotComing++
        } else if (people.status === 'Able') {
          sAttending++
        } else {
          sPending++
        }
      })
    }

    //budget
    let allocated = 0;
    let totalBudget = 0;
    let percent = 0;
    let budget = this.state.event.budget
    if (budget) {
      totalBudget = this.state.event.budget.total
      this.state.event.budget.budgetItems.forEach((item) => {
        allocated += parseInt(item.amount)
      })
      percent = parseInt(allocated/totalBudget*100)
    }



    //How much funds the event has raised.
    let fundraisers = this.state.event.fundraising
    let totalFundsRaised = 0;
    if (fundraisers) {
      fundraisers.forEach((fund) => {
        fund.data.forEach((donation) => {
          totalFundsRaised += parseInt(donation.amount)
        })
      })
    }

    //Need to figure out how we want to display the budget information Consult Perry and Ellie

    return(
      <div>
        <div className='overview-header'>

          <Header className='header' as='h1'>{this.state.event.title}</Header>
          <br />
          <span className='eventInfo'>
            {this.state.event.date}
            <br />
            {this.state.event.startTime} to {this.state.event.endTime}
            <br />
          </span>
          <EditEventModal socket={this.props.socket} eventId={this.props.eventId} />
        </div>
          <Segment.Group raised clearing>
            <Segment>
              <div className='logisticsInfo'>
                This box will contain the Venue and People
              </div>
            </Segment>
            <Segment>
              <Grid text-align='center' className='dashboardGrid'>
                <Grid.Row>
                  <Grid.Column width={5} className='icon-column'>
                    <Icon color='teal' name='users' size='massive'/>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <div className='peopleInfo'>
                      <h3>People</h3>
                      <div>
                        Invited: {total}
                      </div>
                      <div>
                        Attending: {attending}
                      </div>
                      <div>
                        Pending: {pending}
                      </div>
                      <div>
                        Not Coming: {notComing}
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>
              <Grid text-align='center' className='dashboardGrid'>
                <Grid.Row>
                  <Grid.Column width={11} className='icon-column'>
                    <div className='budget'>
                      <h3>Budget</h3>
                      {percent > 100 ?
                        <Progress className='pbar' percent={percent} progress error />
                        :
                        <Progress className='pbar' percent={percent} progress inverted color='blue'/>
                      }
                      <div>
                        Allocated: ${allocated}
                      </div>
                      <div>
                        Total Budget: ${totalBudget}
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Icon color='teal' name='money' size='massive'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>
              <div className='funds'>
                Your event has raised ${totalFundsRaised} for the event!
              </div>
            </Segment>
          </Segment.Group>
      </div>
    )
  }
}
