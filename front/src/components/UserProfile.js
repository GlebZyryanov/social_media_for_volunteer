import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CHATPAGE_ROUTE, UPDATEUSER_ROUTE } from "../utils/consts";
import UserStore from "../store/UserStore"; // Убедитесь, что путь к вашему store правильный

const UserProfile = observer(({ user }) => {
  const navigate = useNavigate();
  const isCurrentUser =false;

  return (
    <Card
      className="mt-2 d-flex flex-column align-items-start"
      style={{ width: "100%", padding: "10px" }}
      border="light"
    >
      <div style={{ display: "flex", width: "100%" }}>
        <Image
          src={user.image_path}
          roundedCircle
          style={{ width: "50%", marginRight: "10px", objectFit: "cover" }}
        />
        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <Card.Title style={{ fontSize: "2rem" }}>{user.name} {user.surname}</Card.Title>
          <Card.Text>{user.profile}</Card.Text>
          {user.phone && (
            <Card.Text>Телефон: {user.phone}</Card.Text>
          )}
        </div>
      </div>
      <div style={{ width: "50%", marginTop: "10px" }}>
        <Button
          variant={isCurrentUser ? "primary" : "success"}
          onClick={() =>
            navigate(isCurrentUser ? UPDATEUSER_ROUTE : CHATPAGE_ROUTE + "/" + user.id)
          }
        >
          {isCurrentUser ? "Редактировать профиль" : "Написать сообщение"}
        </Button>
      </div>
    </Card>
  );
});

export default UserProfile;
