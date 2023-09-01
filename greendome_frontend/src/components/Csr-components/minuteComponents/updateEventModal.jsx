import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import Image from "next/image";
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
  const eImage = singleEvent?.image;
  const eDescription = singleEvent?.description;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nuStart, setNustart] = useState(12);
  const [nuEnd, setNuend] = useState(23);
  const [file, setFile] = useState("");
  const [img, setImg] = useState(false);

  const image = !eImage ? "" : eImage;

  useEffect(() => {
    if (etitle === "undefined") {
      return;
    } else {
      setTitle(etitle);
      setNustart(new Date(estart));
      setNuend(new Date(eEnd));
      setFile(image);
      setDescription(eDescription);
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

    const resp = await axios.patch(
      `http://localhost:8000/greendometech/ng/calendar/update-events/${params}`,
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
          type="file"
          accept="image/*"
          name="profile-image"
          // value={url}
          handleChange={handleImageFile}
        />
        <div>
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file !== "" && (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>
        <FormRow
          type="text"
          name="title"
          value={title || " "}
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
