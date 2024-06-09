import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EVENTPAGE_ROUTE } from "../utils/consts";
import defaultImage from '../defaultImgStore/defaultimg.jpg';
const EventItem = ({ event }) => {
  
  const navigate = useNavigate();
  return (
    <Card
      className="mt-2 d-flex flex-row align-items-center"
      onClick={() => navigate(EVENTPAGE_ROUTE + "/" + event.event_id)}
      style={{ cursor: "pointer", width: "100%", padding: "10px" }}
      border="light"
    >
      <Image
        src={`${process.env.REACT_APP_API_URL}/${event.image_path}`}
        rounded
        style={{ width: "40%", marginRight: "10px", height: "auto", maxHeight: "200px", backgroundSize: "content" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <div style={{ width: "60%" }}>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>{event.info}</Card.Text>
        <Card.Text>{event.author}</Card.Text>
        <Card.Text>{event.address}</Card.Text>
        <Card.Text>{new Date(event.expires_date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Card.Text>   
      </div>
    </Card>
  );
};

export default EventItem;
