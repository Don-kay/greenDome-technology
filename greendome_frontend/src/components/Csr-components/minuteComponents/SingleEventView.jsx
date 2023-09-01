"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import functionsSpace from "@/features/functions/functions";
import axios from "axios";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import moment from "moment";

const SingleEventView = ({ events, id }) => {
  // const { modalId } = useSelector((strore) => strore.functions);

  const singleEvent = events.filter((i) => i._id === id);

  return (
    <section>
      {singleEvent.map((item, idx) => {
        const { _id, title, start, end, image, description } = item;
        const starter = moment(start).format("YYYY-MM-DD HH:MM:SS");
        const ended = moment(end).format("YYYY-MM-DD HH:MM:SS");

        return (
          <div key={idx}>
            {image === undefined || image === "" ? (
              <Image width={200} height={200} src={Greendome} alt="image" />
            ) : (
              <Image width={200} height={200} src={image} alt="image" />
            )}
            <div>
              <h3>id: </h3> <h2>{_id}</h2>
            </div>
            <div>
              <h3>title: </h3> <h2>{title}</h2>
            </div>
            <div>
              <h3>description: </h3> <h2>{description}</h2>
            </div>
            <div>
              <h3>Start: </h3> <h2>{starter}</h2>
            </div>
            <div>
              <h3>End: </h3> <h2>{ended}</h2>
            </div>
            <div>view single event</div>
          </div>
        );
      })}
    </section>
  );
};

export default SingleEventView;
