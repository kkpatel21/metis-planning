import React, { Component } from 'react'
import { Header, Progress, Grid, Segment, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'
import EditEventModal from '../../Modals/EditEventModal'
import './Overview.css'

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      userName: '',
    }
  }

  componentDidMount() {
    this.props.socket.emit('getEventInfo', {eventId: this.props.eventId})
    this.props.socket.on('getEvent', (data) => {
      // this.props.loaded()
      this.setState({event: data.event, userName: data.user})
    })
  }

  updateEvent = (event) => {
    let saveEvent = this.state.event
    saveEvent.title = event.title
    saveEvent.date = event.date
    saveEvent.startTime = event.startTime
    saveEvent.endTime = event.endTime
    this.setState({
      event: saveEvent
    })
  }
  //time
  convertTime = (time) => {
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

    //Date
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let fullDay = '';
    let startTime = '';
    let endTime = '';
    if (this.state.event.date && this.state.event.startTime && this.state.event.endTime) {
      fullDay = moment(this.state.event.date.substring(0,10)).format('dddd, MMMM, Do YYYY')
      startTime = this.convertTime(this.state.event.startTime);
      endTime = this.convertTime(this.state.event.endTime);
    }


    //Collaborators
    let collaborators = this.state.event.collaborators
    let collaboratorRender = [];
    let ownerRender;
    if (collaborators) {
      let colors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black'
      ]
      collaborators.forEach((person) => {
        let randomIndex = Math.floor(Math.random() * Math.floor(13));
        collaboratorRender.push(
          <Label circular color={colors[randomIndex]} key={colors[randomIndex]}>
            {person.name.substring(0,1)}
          </Label>
        )
      })
      let randomOwner = Math.floor(Math.random() * Math.floor(13));
      ownerRender = (
        <Label circular color={colors[randomOwner]} key={colors[randomOwner]}>
          {this.state.userName}
        </Label>
      )
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
        if (venue.vORp === 'venue') {
          venue.data.forEach(venueData => {
            if(venueData.status === 'Confirmed') {
              venueDetails.push({venueName: venueData.name, venueAddress: venueData.address})
            }
          })
        }
      })
    }
    let catererDetails = [];
    if(logistics) {
      this.state.event.allLogistics.forEach((caterer) => {
        if (caterer.vORp === 'caterer') {
          caterer.data.forEach(catererData => {
            if(catererData.status === 'Confirmed') {
              console.log("DATA", catererData)
              catererDetails.push({catererName: catererData.name, catererContact: catererData.contact})
              console.log(catererDetails)
            }
          })
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

    return(
      <div>
        <div className='overview-header'>
          <div className='collaborators'>
            Event Shared With:
            <br />
            {collaboratorRender.map((render) => {
              return render
            })}
            {ownerRender}
          </div>
          <div>
            <Header className='header' as='h1'>{this.state.event.title}</Header>
            <span>
              {fullDay}
              <br />
              {startTime} to {endTime}
              <br />
            </span>
          </div>
          <div className='edit-event-button'>
            <EditEventModal updateEvent={this.updateEvent} socket={this.props.socket} eventId={this.props.eventId} />
          </div>
        </div>
        <Segment.Group raised clearing>
          <Segment>
            <div className='segment-block space-between'>
              <div className='logistics-title'>
                <h2>Logistics</h2>
                <Icon color='teal' name='clipboard' size='massive'/>
              </div>
              <div className='logistics-fields'>
                Venue:
                {venueDetails.map((venue) => <ul><li>{venue.venueName} | {venue.venueAddress}</li></ul>)}
              </div>
              <div className='logistics-fields'>
                Caterers:
                {catererDetails.map((caterer) => <ul><li>{caterer.catererName} | {caterer.catererContact}</li></ul>)}
              </div>
            </div>
          </Segment>
          <Segment>
            <div className='segment-block space-between'>
              <div className='people-fields'>
                Invited:
                <div>{total}</div>
              </div>
              <div className='people-fields'>
                Attending:
                <div>{attending}</div>
              </div>
              <div className='people-fields'>
                Pending:
                <div>{pending}</div>
              </div>
              <div className='people-fields'>
                Not Coming:
                <div>{notComing}</div>
              </div>
              <div className='people-title'>
                <h2 className='people-header'>People</h2>
                <Icon color='teal' name='users' size='massive'/>
              </div>
            </div>
          </Segment>
          <Segment>
            <div className='segment-block'>
              <div className='budget-title'>
                <h2>Budget</h2>
                <Icon color='teal' name='usd' size='massive'/>
              </div>
              <div className='budget-block'>
                {budgetPercent > 100 ?
                  <Progress className='pbar' percent={budgetPercent} progress active error />
                  :
                  <Progress className='pbar' percent={budgetPercent} progress active inverted color='blue'/>
                }
                <div className='budget-info-block'>
                  <div className='budget-fields'>
                    Allocated: ${allocated}
                  </div>
                  <div className='budget-fields'>
                    Total Budget: ${totalBudget}
                  </div>
                </div>
              </div>
            </div>
          </Segment>
          <Segment>
            <div className='segment-block space-between'>
              <div className='fundraising-block'>
                {fundraisingPercent > 100 ?
                  <Progress className='pbar' percent={fundraisingPercent} progress indicating success />
                  :
                  <Progress className='pbar' percent={fundraisingPercent} progress indicating inverted color='violet'/>
                }
                <div className='fundraising-info-block'>
                  <div className='fundraising-fields'>
                    Total Raised: ${totalFundsRaised}
                  </div>
                  <div className='fundraising-fields'>
                    Total Goal: ${totalGoal}
                  </div>
                </div>
              </div>
              <div className='fundraising-fields'>
                Campaigns:
                {campaigns.map((campaign) => <ul><li>{campaign}</li></ul>)}
              </div>
              <div className='fundraising-title'>
                <h2 className='fundraising-header'>Fundraising</h2>
                <Icon color='teal' name='money' size='massive'/>
              </div>
            </div>
          </Segment>
          <Segment className='bottom-segment'></Segment>
        </Segment.Group>
      </div>
    )
  }
}
