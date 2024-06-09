import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CHATPAGE_ROUTE, UPDATEUSER_ROUTE } from "../utils/consts";
import { banUser, getUserByID, unbanUser } from "../http/authAPI";
import defaultImage from '../defaultImgStore/defaultimg.jpg';


const UserProfile = observer(({ user, currentUser, onMessageUser }) => {
  const navigate = useNavigate();
  const isCurrentUser = currentUser.user_id === user.user_id;
  const isAdministrator = currentUser.role;
  const [isBanned, setIsBanned] = useState(user.isBanned);
  
  console.log("IsAdmin", isAdministrator);
  console.log("userid", user.user_id);
  console.log("currentuserid", currentUser.user_id);


  const handleBanUser = async () => {
    try {
      await banUser(user.user_id);
      setIsBanned(true);
      //alert("User banned successfully");
      
    } catch (error) {
      console.error("Failed to ban user", error);
      alert("Failed to ban user");
    }
  };

  const handleUnbanUser = async () => {
    try {
      await unbanUser(user.user_id);
      //("User unbanned successfully");
      setIsBanned(false)
    } catch (error) {
      console.error("Failed to unban user", error);
      alert("Failed to unban user");
    }
  };

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
            e.target.src = defaultImage;
          }}
        />
        <div style={{ flex: 1, paddingLeft: "10px" }}>
          <Card.Title style={{ fontSize: "2rem" }}>
            {user.name} {user.surname}
          </Card.Title>
          <Card.Text>{user.profile}</Card.Text>
          {user.phone && <Card.Text>Телефон: {user.phone}</Card.Text>}
          {user.email && <Card.Text>Email: {user.email}</Card.Text>}
          {isAdministrator === "ADMIN" && (
            <Card.Text>
              Пароль для получения доступа к функциям администратора:{" "}
              {user.admin_password}
            </Card.Text>
          )}
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
        {isAdministrator === "ADMIN" && !isCurrentUser && (
          <Button
            variant={isBanned ? "warning" : "danger"}
            onClick={isBanned? handleUnbanUser : handleBanUser}
            style={{ marginLeft: "10px" }}
          >
            {isBanned ? "Разбанить" : "Забанить"}
          </Button>
        )}
      </div>
    </Card>
  );
});
export default UserProfile;
