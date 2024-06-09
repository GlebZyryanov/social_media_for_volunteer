import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ALLEVENTS_ROUTE } from "../utils/consts";
import { deleteEvent } from "../http/eventAPI";
import defaultImage from '../defaultImgStore/defaultimg.jpg';
const EventProfile = observer(({ event, currentUser, onJoin }) => {
  
  const navigate = useNavigate();
  const isAuthor = currentUser.user_id === event.author_id;
  const isAdmin = currentUser.role === 'ADMIN';

  const handleDelete = async () => {
    try {
      console.log("Deleting event with ID:", event.event_id);
      await deleteEvent(event.event_id);
      alert("Event deleted successfully");
      navigate(ALLEVENTS_ROUTE); 
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

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
            e.target.src = defaultImage;
          }}
        />
        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <Card.Title style={{ fontSize: "2rem" }}>{event.name}</Card.Title>
          <Card.Text>{event.info}</Card.Text>
          {event.address && <Card.Text>Адрес: {event.address}</Card.Text>}
          {event.expires_date && <Card.Text>Дата проведения: {new Date(event.expires_date).toLocaleString()}</Card.Text>}
        </div>
      </div>
      {!isAuthor && (
        <div style={{ width: "50%", marginTop: "10px" }}>
          <Button variant="success" onClick={onJoin}>
            Вступить
          </Button>
        </div>
      )}
       {(isAuthor || isAdmin) && (
        <div style={{ width: "50%", marginTop: "10px" }}>
          <Button variant="danger" onClick={handleDelete}>
            Удалить мероприятие
          </Button>
        </div>
      )}
    </Card>
  );
});

export default EventProfile;
