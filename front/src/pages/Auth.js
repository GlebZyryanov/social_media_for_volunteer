import React, { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ALLEVENTS_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { login, registration } from "../http/authAPI";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation(); //хук ползволяет получить маршрут в строке запроса
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const click = async () => {
    //универсальная функция для регистрации и авторизации
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(name,email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(ALLEVENTS_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  console.log(location);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 85 }}
    >
      <Card style={{ width: 600, fontFamily: "Montserrat" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form
          className="d-flex flex-column"
          style={{ fontFamily: "Montserrat" }}
        >
          {isLogin ? (
            <Form>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form>
          ) : (
            <Form>
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Как вас зовут?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Form>
          )}
          <Button
            className="mt-3 align-self-center "
            variant="outline-success"
            style={{ fontFamily: "Montserrat" }}
            onClick={click}
          >
            {isLogin ? "Войти" : "Регистрация"}
          </Button>
          {isLogin ? (
            <div
              className="align-self-center "
              style={{ fontFamily: "Montserrat" }}
            >
              Нет аккаунта?
              <NavLink
                to={REGISTRATION_ROUTE}
                style={{
                  textDecoration: "none",
                  marginLeft: 3,
                  fontFamily: "Montserrat",
                }}
              >
                Регистрация!
              </NavLink>
            </div>
          ) : (
            <div
              className="align-self-center "
              style={{ fontFamily: "Montserrat" }}
            >
              Есть аккаунт?
              <NavLink
                to={LOGIN_ROUTE}
                style={{ textDecoration: "none", marginLeft: 3 }}
              >
                Войти!
              </NavLink>
            </div>
          )}
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
