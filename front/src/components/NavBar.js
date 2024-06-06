import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../index";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Image } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import {
  ADMIN_ROUTE,
  ALLCHATS_ROUTE,
  ALLEVENTS_ROUTE,
  ALLUSERS_ROUTE,
  CREATEEVENT_ROUTE,
  LOGIN_ROUTE,
  UPGRADEROLE_ROUTE,
  USERPAGE_ROUTE,
  REGISTRATION_ROUTE,
} from "../utils/consts";
import { getCurrentUser, login, logout } from "../http/authAPI";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  // console.log(user);
  // console.log(user.user.name, user.user.image_path, user.isAuth);
  // console.log("id", user.user.user_id);
  // console.log("name", user.user.name);
  // console.log("surname", user.user.surname);
  // console.log("image", user.user.image_path);
  // console.log("email", user.user.email);
  // console.log("profile", user.user.profile);
  // console.log("phone", user.user.phone);
  // console.log("password", user.user.password);
  // console.log("admin_password", user.user.admin_password);
  // console.log("isActive", user.user.isActive);
  // console.log("role", user.user.role);
  const navigate = useNavigate();
  const location = useLocation();

  const logOutUser = async () => {
    user.setUser({});
    user.setIsAuth(false);

    console.log(user.isAuth);
    if (!user.isAuth) {
      navigate(LOGIN_ROUTE);
      logout()
    }
  };

  const goToProfile = () => {
    navigate(`${USERPAGE_ROUTE}/${user.user.user_id}`);
  };

  const isAuthRoute = [LOGIN_ROUTE, REGISTRATION_ROUTE].includes(
    location.pathname
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "white",
          }}
        >
          {isAuthRoute ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "40px", height: "40px" }}></div>{" "}
              <div
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "30px",
                  fontFamily: "Montserrat",
                }}
              >
                Volonteer
              </div>
            </div>
          ) : (
            <div
              onClick={goToProfile}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image
                src={`${process.env.REACT_APP_API_URL}${user.user.image_path}`}
                roundedCircle
                width="40"
                height="40"
                className="me-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://steamuserimages-a.akamaihd.net/ugc/1835802620427924961/F005E68A9567D2C1098172DA117A07F0A790EA45/?imw=512&amp;imh=365&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true";
                }}
              />
              {user.user.name}
            </div>
          )}
        </Navbar.Brand>
        {!isAuthRoute && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate(CREATEEVENT_ROUTE)}
                >
                  Добавить мероприятие
                </Button>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate(ALLEVENTS_ROUTE)}
                >
                  Мероприятия
                </Button>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate(ALLCHATS_ROUTE)}
                >
                  Чаты
                </Button>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate(ALLUSERS_ROUTE)}
                >
                  Пользователи
                </Button>
              </Nav>
              <Nav>
                {user.role === "ADMIN" ? (
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate(ADMIN_ROUTE)}
                  >
                    Админ Панель
                  </Button>
                ) : (
                  <Button
                    variant="outline-light"
                    className="me-2"
                    onClick={() => navigate(UPGRADEROLE_ROUTE)}
                  >
                    Апгрейд Роли
                  </Button>
                )}
                <Button variant="outline-light" onClick={logOutUser}>
                  Выйти
                </Button>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
