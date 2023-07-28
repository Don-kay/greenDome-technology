"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import { GrOverview } from "react-icons/gr";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

const CalendarFunction = ({ params, onclosed, ondelete }) => {
  // const { users } = useSelector((strore) => strore.profiles);
  // console.log(studentId);
  const eventId = params.id;
  const route = "/panel/admin_dashboard/all-students";
  // console.log(studentId);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Fab
        onClick={() => onclosed(eventId)}
        color="primary"
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <AiFillSetting />
      </Fab>
      <Fab onClick={() => ondelete(eventId)}>
        <AiFillDelete />
      </Fab>
    </Box>
  );
};

export default CalendarFunction;
