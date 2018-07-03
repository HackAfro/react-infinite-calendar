import React from 'react';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const EventDetails = ({ dateEventDetails }) => {
  const { events, date } = dateEventDetails;
  const dateStr = format(parse(date), 'ddd MMM DD');
  const timeStr = format(parse(date), 'h a');

  return (
    <div className="details">
      <div className="date">{dateStr}</div>
      <div className="event-list">
        <h5>All Day</h5>
        {events.map((event) => (
          <div key={event.title} className="event">
            {timeStr}
          </div>
        ))}
      </div>
      <div className="description-list">
        <h5>Event Description</h5>
        {events.map((event) => (
          <div key={event.title} className="description">
            <h4 className="title">{event.title}</h4>
            <p className="description-text">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
