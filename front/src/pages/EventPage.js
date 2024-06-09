import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEventByID, joinEvent } from "../http/eventAPI";
import EventProfile from "../components/EventProfile";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const EventPage = observer(() => {
  const { id } = useParams();
  const { user: UserStore } = useContext(Context);
  const {user} = useContext(Context);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isBanned = user.user.isBanned;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventByID(id);
        setEventData(data);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    try {
      if (isBanned) {
        alert("You have been banned.Now you cant create and join events");
      } else {
        const data = await getEventByID(id);
        await joinEvent(id);
        setEventData(data);
        alert("You have successfully joined the event!");
        
      }
    } catch (error) {
      console.error("Failed to join event:", error);
      alert("Failed to join the event.");
    }
  };

  const currentUser = UserStore.user;

  if (loading) {
    return <div>Loading...</div>;
  }

  return eventData ? (
    <EventProfile
      event={eventData}
      currentUser={currentUser}
      onJoin={handleJoinEvent}
    />
  ) : (
    <div>Event not found</div>
  );
});

export default EventPage;
