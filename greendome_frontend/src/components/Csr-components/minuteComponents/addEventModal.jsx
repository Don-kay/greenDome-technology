import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import axios from "axios";
import FormRow from "@/components/FormRow";
import _ from "lodash";

const AddEventModal = ({ isOpen, onClosed, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [nuStart, setNustart] = useState(new Date());
  const [nuEnd, setNuend] = useState(new Date());

  // console.log(start);
  // console.log(end);

  const customStyles = {
    content: {
      top: "0%",
      left: "0%",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const start = nuStart._d;
    const end = nuEnd._d;

    // const schedule = { title, start, end };
    // console.log(schedule);
    // console.log(typeof start);

    const resp = await axios.post(
      "http://localhost:8000/greendometech/ng/calendar/create-event",
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
    const createdEvent = await resp.data.event;

    //  setEvent([...refreshed, updatedEvent]);

    console.log(createdEvent);

    onEventAdded(createdEvent);

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
          value={title}
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
          <Datetime value={nuStart} onChange={(date) => setNustart(date)} />
        </div>

        <div>
          <label>end date</label>
          <Datetime value={nuEnd} onChange={(date) => setNuend(date)} />
        </div>
        <button>Add event</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
