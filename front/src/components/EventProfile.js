import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const EventProfile = observer(({ event, currentUser, onJoin }) => {
  const navigate = useNavigate();
  const isAuthor = currentUser.user_id === event.author_id;

  return (
    <Card className="mt-2 d-flex flex-column align-items-start" style={{ width: "100%", padding: "10px" }} border="light">
      <div style={{ display: "flex", width: "100%" }}>
        <Image
          src={`${process.env.REACT_APP_API_URL}/${event.image_path}`}
          style={{
            width: "50%",
            marginRight: "10px",
            objectFit: "contain",
            maxWidth: 400,
            maxHeight: 400,
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://steamuserimages-a.akamaihd.net/ugc/1835802620427924961/F005E68A9567D2C1098172DA117A07F0A790EA45/?imw=512&amp;imh=365&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true";
          }}
        />
        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <Card.Title style={{ fontSize: "2rem" }}>{event.name}</Card.Title>
          <Card.Text>{event.info}</Card.Text>
          {event.address && <Card.Text>Адрес: {event.address}</Card.Text>}
          {event.expires_date && <Card.Text>Дата окончания: {new Date(event.expires_date).toLocaleString()}</Card.Text>}
        </div>
      </div>
      {!isAuthor && (
        <div style={{ width: "50%", marginTop: "10px" }}>
          <Button variant="success" onClick={onJoin}>
            Вступить
          </Button>
        </div>
      )}
    </Card>
  );
});

export default EventProfile;
