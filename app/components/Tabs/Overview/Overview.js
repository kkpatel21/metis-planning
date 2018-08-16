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

  //time
  convertTime = (time) => {
    console.log(time)
    let timeSplit = time.split(':')
    let hour = timeSplit[0]
    if(timeSplit[0]>12) {
      timeSplit.splice(0,1,hour-12)
      return timeSplit.join(':') + ' PM'
    } else {
      return time + ' AM'
    }
  }

  render() {
    console.log(this.state.event)

    //Date
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let date = 0;
    let day = '';
    let month = '';
    let year = 0;
    let startTime = '';
    let endTime = '';
    if (this.state.event.date && this.state.event.startTime && this.state.event.endTime) {
      date = new Date(this.state.event.date).getDate()+1;
      day = dayNames[new Date(this.state.event.date).getDay()];
      month = monthNames[new Date(this.state.event.date).getMonth()];
      year = new Date(this.state.event.date).getFullYear();
      startTime = this.convertTime(this.state.event.startTime);
      endTime = this.convertTime(this.state.event.endTime);
    }


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
    let budget = this.state.event.budget
    let allocated = 0;
    let totalBudget = 0;
    let budgetPercent = 0;
    if (budget) {
      totalBudget = this.state.event.budget.total
      this.state.event.budget.budgetItems.forEach((item) => {
        allocated += parseInt(item.amount)
      })
      budgetPercent = parseInt(allocated/totalBudget*100)
    }

    //logistics
    let logistics = this.state.event.allLogistics;
    let venueDetails = [];
    if (logistics) {
      this.state.event.allLogistics.forEach((venue) => {
        console.log(venue)
        if (venue.status === 'Confirmed') {
          venueDetails.push({venueName: venue.name, venueAddress: venue.address})
        }
      })
    }

    //How much funds the event has raised.
    let fundraisers = this.state.event.fundraising;
    let campaigns = [];
    let totalFundsRaised = 0;
    let totalGoal = 0;
    let fundraisingPercent = 0
    if (fundraisers) {
      fundraisers.forEach((fund) => {
        campaigns.push(fund.title)
        totalGoal += parseInt(fund.goal)
        fund.data.forEach((donation) => {
          totalFundsRaised += parseInt(donation.amount)
        })
      })
      fundraisingPercent = parseInt(totalFundsRaised/totalGoal*100)
    }

    //Need to figure out how we want to display the budget information Consult Perry and Ellie

    return(
      <div>
        <div className='overview-header'>

          <Header className='header' as='h1'>{this.state.event.title}</Header>
          <br />
          <span className='eventInfo'>
            {day}, {month} {date}, {year}
            <br />
            {startTime} to {endTime}
            <br />
          </span>
          <EditEventModal socket={this.props.socket} eventId={this.props.eventId} />
        </div>
          <Segment.Group raised clearing>
            <Segment>
              <div className='logisticsInfo'>
                <h3>Logistics</h3>
                <div>
                  Venue:
                  {venueDetails.map((venue) => <ul><li>{venue.venueName} | {venue.venueAddress}</li></ul>)}
                </div>
                <div>
                  Caterers:

                </div>
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
                      {budgetPercent > 100 ?
                        <Progress className='pbar' percent={budgetPercent} progress error />
                        :
                        <Progress className='pbar' percent={budgetPercent} progress inverted color='blue'/>
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
                <h3>Fundraising</h3>
                {fundraisingPercent > 100 ?
                  <Progress className='pbar' percent={fundraisingPercent} progress success />
                  :
                  <Progress className='pbar' percent={fundraisingPercent} progress inverted color='teal'/>
                }
                <div>
                  Campaigns:
                  {campaigns.map((campaign) => <ul><li>{campaign}</li></ul>)}
                </div>
                <div>
                  Total Raised: ${totalFundsRaised}
                </div>
                <div>
                  Total Goal: ${totalGoal}
                </div>
              </div>
            </Segment>
          </Segment.Group>
      </div>
    )
  }
}
