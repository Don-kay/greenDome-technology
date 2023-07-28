import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import axios from "axios";
import FormRow from "@/components/FormRow";
import _ from "lodash";

const UpdateEventModal = ({
  isOpen,
  onClosed,
  singleEvent,
  params,
  events,
  setEvent,
}) => {
  const etitle = singleEvent?.title;
  const estart = singleEvent?.start;
  const eEnd = singleEvent?.end;
  const [title, setTitle] = useState("");
  const [nuStart, setNustart] = useState(12);
  const [nuEnd, setNuend] = useState(23);

  useEffect(() => {
    if (etitle === "undefined") {
      return;
    } else {
      setTitle(etitle);
      setNustart(new Date(estart));
      setNuend(new Date(eEnd));
    }
  }, [singleEvent, onClosed]);
  // console.log(start);

  const customStyles = {
    content: {
      top: "0%",
      left: "0%",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundColor: "green",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const start = nuStart._d;
    const end = nuEnd._d;

    const resp = await axios.patch(
      `http://localhost:8000/greendometech/ng/calendar/update-events/${params}`,
      {
        title,
        start,
        end,
      },
      {
        withCredentials: true,
        credentials: "includes",
      }
    );
    const updatedEvent = await resp.data.event;
    const updatedId = updatedEvent._id;
    const refreshed = events.filter((item) => item._id !== updatedId);

    setEvent([...refreshed, updatedEvent]);

    onClosed();
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <button onClick={() => onClosed()}>Go Back</button>
      <form
        style={{
          position: "relative",
          top: "80%",
          left: "20%",
          maxWidth: "50vw",
          backgroundColor: "cornflowerblue",
        }}
        onSubmit={onSubmit}
      >
        <FormRow
          type="text"
          name="title"
          value={title || " "}
          handleChange={(e) => setTitle(e.target.value)}
        />
        {/* <input
          style={{ zIndex: 1000 }}
          placeholder="Title"
          //   value={title}
          //   onChange={(e) => setTitle(e.target.value)}
        /> */}
        <div>
          <label>start date</label>
          <Datetime
            value={nuStart || " "}
            onChange={(date) => setNustart(date)}
          />
        </div>

        <div>
          <label>end date</label>
          <Datetime value={nuEnd || " "} onChange={(date) => setNuend(date)} />
        </div>
        <button>Add event</button>
      </form>
    </Modal>
  );
};

export default UpdateEventModal;
