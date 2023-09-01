"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "@/features/profile/profileSlice";
import _ from "lodash";
import moment from "moment";
import Modal from "react-modal";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewProfile from "@/features/profile/viewProfile";
import { ProfileModal } from "@/features/functions/functionSlice";
import SingleProfileView from "./SingleProfileView";

const CourseHover = ({ studentCourse, isOpen, onClosed }) => {
  const customStyles = {
    content: {
      position: "relative",
      top: "40%",
      left: "0%",
      maxWidth: "50vw",
      maxHeight: "50vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };
  // console.log(studentCourse);
  return (
    <main>
      <div onMouseOut={onClosed}>
        {studentCourse?.map((item, id) => {
          const {
            _id,
            name,
            Serial_key,
            description,
            author,
            fee,
            updatedAt,
            createdAt,
            Party_Type,
          } = item;
          return (
            <div
              className=" flex justify-center cursor-pointer items-center flex-row"
              key={id}
            >
              <div
                key={id}
                className=" flex justify-center items-center flex-row"
              >
                <h2>{_id}</h2>
                <h4>{Serial_key}</h4>
                <h2>{name}</h2>
                <h4>{description}</h4>
                <h4>{author}</h4>
                <h4>{fee}</h4>
                <h4>{Party_Type}</h4>
                <h4>{moment(updatedAt).format("YYYY-MM-DD HH:MM:SS")}</h4>
                <h4>{moment(createdAt).format("YYYY-MM-DD HH:MM:SS")}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CourseHover;
