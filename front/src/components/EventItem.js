import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EVENTPAGE_ROUTE } from "../utils/consts";

const EventItem = ({ event }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="mt-2 d-flex flex-row align-items-center"
      onClick={() => navigate(EVENTPAGE_ROUTE + "/" + event.id)}
      style={{ cursor: "pointer", width: "100%", padding: "10px" }}
      border="light"
    >
      <Image
        src={event.image_path}
        rounded
        style={{ width: "40%", marginRight: "10px", height: "auto", maxHeight: "200px", backgroundSize: "content" }}
      />
      <div style={{ width: "60%" }}>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.info}</Card.Text>
        <Card.Text>{event.address}</Card.Text>
        <Card.Text>{event.expires_date}</Card.Text>
      </div>
    </Card>
  );
};

export default EventItem;
