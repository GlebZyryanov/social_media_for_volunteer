import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByID } from "../http/authAPI";
import UserProfile from "../components/UserProfile";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { createPrivateChat } from "../http/chatAPI";
import { CHATPAGE_ROUTE } from "../utils/consts";

const UserPage = observer(() => {
  const { id } = useParams();
  console.log(useParams());
  const { user: UserStore } = useContext(Context);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByID(id);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);
  const handleCreateOrGetPrivateChat = async (targetUserID) => {
    try {
      const chat = await createPrivateChat(targetUserID);
      
      navigate(CHATPAGE_ROUTE + "/" + chat.chat_id);
    } catch (error) {
     
      console.error("Failed to create or get private chat:", error);
     
    }
  };
  const currentUser = UserStore.user;
  console.log("Fetching user with ID:", id);
  console.log("Current user from context:", currentUser);
  if (loading) {
    return <div>Loading...</div>;
  }

  return userData ? (
    <UserProfile user={userData} currentUser={currentUser} onMessageUser={handleCreateOrGetPrivateChat}/>
  ) : (
    <div>User not found</div>
  );
});

export default UserPage;
