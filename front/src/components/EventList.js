import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row, Col } from "react-bootstrap";
import EventItem from "./EventItem";

const EventList = observer(() => {
  const { event } = useContext(Context);
  return (
    <Row className="d-flex flex-column">
      {event.events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Row>
  );
});

export default EventList;
