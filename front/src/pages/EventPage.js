import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getEventByID, joinEvent } from "../http/eventAPI";
import EventProfile from "../components/EventProfile";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const EventPage = observer(() => {
  const { id } = useParams();
  const { user: UserStore } = useContext(Context);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      //await joinEvent(id);
      alert("You have successfully joined the event!");
      // Optionally, refresh event data to reflect changes
     // const data = await getEventByID(id);
     // setEventData(data);
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
    <EventProfile event={eventData} currentUser={currentUser} onJoin={handleJoinEvent} />
  ) : (
    <div>Event not found</div>
  );
});

export default EventPage;
