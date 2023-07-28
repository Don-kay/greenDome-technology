"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "@/features/profile/profileSlice";
import _ from "lodash";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewProfile from "@/features/profile/viewProfile";
import { ProfileModal } from "@/features/functions/functionSlice";
import SingleEventView from "./SingleEventView";

const AllEvents = () => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState([]);
  const { profileView, modalId } = useSelector((strore) => strore.functions);

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(ProfileModal({ bool: false }));
  }, []);

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
  // const { users, errorMsg } = useSelector((strore) => strore.profiles);
  // const { profileView, modalId } = useSelector((strore) => strore.functions);
  // const [rowId, setRowId] = useState(null);

  // const studentObj = users.filter((item) => {
  //   return item.roles.includes("student");
  // });

  const allEvent = event.map((item) => {
    return {
      id: item._id,
      start: item.start,
      end: item.end,
      title: item.title,
    };
    // item.roles, item.id;
  });

  const columns = useMemo(() => [
    { field: "id", headerName: "Id", width: 220 },
    { field: "title", headerName: "Title", width: 120 },
    { field: "start", headerName: "Start", width: 170 },
    { field: "end", headerName: "End", width: 170 },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => <ViewProfile {...{ params }} />,
    },
  ]);
  return (
    <section>
      <div>All Attendees</div>
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", mt: 0, mb: 0 }}
        >
          view all attendees
        </Typography>
        <DataGrid
          columns={columns}
          rows={allEvent}
          getRowId={(row) => row.id}
        />
      </Box>
      {profileView && (
        <div>
          <SingleEventView />
        </div>
      )}
    </section>
  );
};

export default AllEvents;
