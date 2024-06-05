import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check, getCurrentUser } from "./http/authAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getCurrentUser();
          if (userData) {
            user.setUser(userData);
            user.setIsAuth(true);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
      setLoading(false); // Устанавливаем загрузку в false после завершения fetchUser
    };

    fetchUser();
  }, [user]);

  if (loading) {
    return <Spinner animation="grow" />; // Отображаем спиннер во время загрузки
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
