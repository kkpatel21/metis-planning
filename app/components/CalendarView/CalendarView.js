import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import './CalendarView.css'
import AddEventModal from '../Modals/AddEventModal.js'



export default class CalendarView extends React.Component {
  constructor(props) {
    super(props);
  }

  createNewEvent = () => {
    console.log('clicked')
  }

  render() {
    return(
      <div>
        <h1 className='month-heading'>August 2018</h1>
        <Table basic='very' inverted>

          <Table.Header>
            <Table.Row verticalAlign='bottom' textAlign='center' className='day-names'>
              <Table.HeaderCell>SUN</Table.HeaderCell>
              <Table.HeaderCell>MON</Table.HeaderCell>
              <Table.HeaderCell>TUE</Table.HeaderCell>
              <Table.HeaderCell>WED</Table.HeaderCell>
              <Table.HeaderCell>THU</Table.HeaderCell>
              <Table.HeaderCell>FRI</Table.HeaderCell>
              <Table.HeaderCell>SAT</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign='left' verticalAlign='top' className='date-number'>
              <Table.Cell onClick={this.createNewEvent}>1</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>2</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>3</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>4</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>5</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>6</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>7</Table.Cell>
            </Table.Row>
            <Table.Row textAlign='left' verticalAlign='top' className='date-number'>
              <Table.Cell onClick={this.createNewEvent}>8</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>9</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>10</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>11</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>12</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>13</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>14</Table.Cell>
            </Table.Row>
            <Table.Row textAlign='left' verticalAlign='top' className='date-number'>
              <Table.Cell onClick={this.createNewEvent}>15</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>16</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>
                17<br />
                Event 1<br />
                2PM - 5PM<br />
              </Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>18</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>19</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>20</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>21</Table.Cell>
            </Table.Row>
            <Table.Row textAlign='left' verticalAlign='top' className='date-number'>
              <Table.Cell onClick={this.createNewEvent}>22</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>23</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>24</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>25</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>26</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>
                27<br />
                Event 1<br />
                2PM - 5PM<br />
              </Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>28</Table.Cell>
            </Table.Row>
            <Table.Row textAlign='left' verticalAlign='top' className='date-number'>
              <Table.Cell onClick={this.createNewEvent}>29</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>30</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>31</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>1</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>2</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>3</Table.Cell>
              <Table.Cell onClick={this.createNewEvent}>4</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
};
