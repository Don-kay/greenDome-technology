import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import axios from "axios";
import FormRow from "@/components/FormRow";
import Image from "next/image";
import _ from "lodash";

const AddEventModal = ({ isOpen, onClosed, onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [nuStart, setNustart] = useState(new Date());
  const [nuEnd, setNuend] = useState(new Date());
  const [file, setFile] = useState();
  const [img, setImg] = useState(false);

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
  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        if (reader.result !== "") {
          setImg(false);
          setFile(reader.result);
        }
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const start = nuStart._d;
    const end = nuEnd._d;
    const image = file;

    // const schedule = { title, start, end };
    // console.log(schedule);
    // console.log(typeof start);
    try {
      const resp = await axios.post(
        "http://localhost:8000/greendometech/ng/calendar/create-event",
        {
          title,
          start,
          end,
          image,
          description,
        },
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      // console.log(resp.data);
      const createdEvent = await resp.data.event;
      onEventAdded(createdEvent);
      onClosed();
      setTitle("");
      setDescription("");
      setNustart("");
      setNuend("");
      setFile("");
    } catch (error) {
      setError(error?.response.data);
      setTrigger(true);
    }
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <button onClick={() => onClosed()}>Go Back</button>

      {trigger && <h2>{`input ${error}`}</h2>}
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
        <FormRow
          type="text"
          name="description"
          value={description || " "}
          handleChange={(e) => setDescription(e.target.value)}
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
        <FormRow
          type="file"
          accept="image/*"
          name="profile-image"
          // value={values.password}
          handleChange={handleImageFile}
        />
        <div>
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file === "" || file === undefined ? (
            ""
          ) : (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>
        <button>Add event</button>
      </form>
    </Modal>
  );
};

export default AddEventModal;
