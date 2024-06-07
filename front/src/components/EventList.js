import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import EventItem from "./EventItem";
import { fetchEvents } from "../http/eventAPI";

const EventList = observer(() => {
  const { event } = useContext(Context);


  return (
    <Row className="d-flex flex-column">
      {event.filteredEvents.map((event) => (
        <EventItem key={event.event_id} event={event} />
      ))}
    </Row>
  );
});

export default EventList;
