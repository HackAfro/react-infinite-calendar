import React from 'react';
import { render } from 'react-dom';
import InfiniteCalendar from '../../src';
import EventDetails from './event-details';
import '../../styles.css';
import './demo.css';

const events = [
  {
    title: 'Conference',
    date: '2018-07-08T07:00:00.000Z',
    description: 'Big conference for very important people',
    toggled: false,
  },
  {
    title: 'MAX trip',
    date: '2018-07-08T07:00:00.000Z',
    description: 'Get MAX trip for champion that came to the market early',
    toggled: true,
  },
  {
    title: 'Call Bisi',
    date: '2018-07-23T07:00:00.000Z',
    description: 'Call Bisi to get food from the market',
    toggled: true,
  },
  {
    title: 'Check the bank',
    date: '2018-07-13T07:00:00.000Z',
    description: 'Check the bank to get my ATM',
    toggled: false,
  },
  {
    title: 'Restock the fridge',
    date: '2018-07-02T07:00:00.000Z',
    description:
      'Check the items needed from the fridge and get it from Shoprite',
    toggled: true,
  },
  {
    title: 'Restock the car',
    date: '2018-07-02T07:00:00.000Z',
    description:
      'Check the items needed from the car and get it from the mechanic',
    toggled: true,
  },
  {
    title: 'Get the PC',
    date: '2018-07-27T07:00:00.000Z',
    description: 'Visit the repairers to get my PC back',
    toggled: false,
  },
  {
    title: 'Grow',
    date: '2018-07-15T07:00:00.000Z',
    description: "It's time to grow up man and get things right",
    toggled: false,
  },
];

class EventCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
      dateEventDetails: {},
      eventDetailsVisible: false,
      events,
    };
    this.eventToggled = this.eventToggled.bind(this);
  }

  eventToggled(events, date) {
    if (events.length) {
      this.setState({
        dateEventDetails: {
          date,
          events,
        },
        eventDetailsVisible: true,
      });
    }
  }

  render() {
    const { events, eventDetailsVisible, dateEventDetails } = this.state;
    return (
      <div className="calendar-container">
        <InfiniteCalendar
          width={Math.min(window.innerWidth, 400)}
          events={events}
          eventToggled={this.eventToggled}
        />
        {eventDetailsVisible && (
          <EventDetails dateEventDetails={dateEventDetails} />
        )}
      </div>
    );
  }
}

render(<EventCalendar />, document.querySelector('#demo'));
