"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import functionsSpace from "@/features/functions/functions";
import axios from "axios";

const SingleEventView = () => {
  const { modalId } = useSelector((strore) => strore.functions);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    try {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:8000/greendometech/ng/calendar/get-events",
          // setEvent(response.data),
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const data = response.data;
        console.log(data);
        setEvent(data.event);
        //  setCount(data.count);
      };
      fetch();
    } catch (error) {
      return { msg: error.response.data };
    }
  }, []);
  const singleEvent = event.filter((i) => i._id === modalId);

  return (
    <section>
      {singleEvent.map((item, idx) => {
        const { id, title, start, end } = item;

        return (
          <div key={idx}>
            <p>{id}</p>
            <div>
              <h3>id: </h3> <h2>{id}</h2>
            </div>
            <div>
              <h3>title: </h3> <h2>{title}</h2>
            </div>
            <div>
              <h3>Start: </h3> <h2>{start}</h2>
            </div>
            <div>
              <h3>End: </h3> <h2>{end}</h2>
            </div>
            <div>view single event</div>
          </div>
        );
      })}
    </section>
  );
};

export default SingleEventView;
