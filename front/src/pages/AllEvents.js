import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import EventList from "../components/EventList";

import { Context } from "../index";
import { getAllTypesEvents, getAllEvents } from "../http/eventAPI";

const AllEvents = () => {
  const { event } = useContext(Context);
 
  
  useEffect(() => {
    getAllTypesEvents().then((data) => event.setTypes(data));
    
  }, [event]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        event.setEvents(events); // Сохраняем пользователей в UserStore
        console.log(events);
      } catch (e) {
        console.error("Failed to fetch chats:", e);
      }
    };

    fetchEvents();
    
  }, [event]);
  
  return (
    <Container className="mt-3 ">
      <Row className="d-flex ">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <EventList />
        </Col>
      </Row>
    </Container>
  );
};

export default AllEvents;
