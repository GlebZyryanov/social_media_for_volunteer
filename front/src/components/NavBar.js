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

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const logOutUser = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  const logOutAdmin = () => {
    user.setUser({});
    user.setIsAdmin(false);
  };

  const goToProfile = () => {
    navigate(`${USERPAGE_ROUTE}/${user.id}`);
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
                src={user.image_path}
                roundedCircle
                width="40"
                height="40"
                className="me-2"
              />
              {user.name}
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
                {user.role === "ADMIN" ? (
                  <Button variant="outline-light" onClick={logOutAdmin}>
                    Выйти
                  </Button>
                ) : (
                  <Button variant="outline-light" onClick={logOutUser}>
                    Выйти
                  </Button>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
