import React from "react";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EVENTPAGE_ROUTE } from "../utils/consts";

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
          e.target.src =
            "https://steamuserimages-a.akamaihd.net/ugc/1835802620427924961/F005E68A9567D2C1098172DA117A07F0A790EA45/?imw=512&amp;imh=365&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true";
        }}
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
