import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CHATPAGE_ROUTE, UPDATEUSER_ROUTE } from "../utils/consts";

const UserProfile = observer(({ user, currentUser,onMessageUser }) => {
  const navigate = useNavigate();
  const isCurrentUser = currentUser.user_id === user.user_id;
  console.log("userid", user.user_id);
  console.log("currentuserid", currentUser.user_id);

  return (
    <Card
      className="mt-2 d-flex flex-column align-items-start"
      style={{ width: "100%", padding: "10px" }}
      border="light"
    >
      <div style={{ display: "flex", width: "100%" }}>
        <Image
          src={`${process.env.REACT_APP_API_URL}/${user.image_path}`}
          style={{
            width: "50%",
            marginRight: "10px",
            objectFit: "contain",
            maxWidth: 400,
            maxHeight: 400,
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://steamuserimages-a.akamaihd.net/ugc/1835802620427924961/F005E68A9567D2C1098172DA117A07F0A790EA45/?imw=512&amp;imh=365&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true";
          }}
        />
        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <Card.Title style={{ fontSize: "2rem" }}>
            {user.name} {user.surname}
          </Card.Title>
          <Card.Text>{user.profile}</Card.Text>
          {user.phone && <Card.Text>Телефон: {user.phone}</Card.Text>}
          {user.email && <Card.Text>Email: {user.email}</Card.Text>}
        </div>
      </div>
      <div style={{ width: "50%", marginTop: "10px" }}>
        <Button
          variant={isCurrentUser ? "primary" : "success"}
          onClick={() =>
            navigate(
              isCurrentUser
                ? UPDATEUSER_ROUTE + "/" + user.user_id
                : onMessageUser(user.user_id) //функция для создания чата
            )
          }
        >
          {isCurrentUser ? "Редактировать профиль" : "Написать сообщение"}
        </Button>
      </div>
    </Card>
  );
});

export default UserProfile;
