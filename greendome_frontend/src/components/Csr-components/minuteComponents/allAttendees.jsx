"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "@/features/profile/profileSlice";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ViewProfile from "@/features/profile/viewProfile";
import { ProfileModal } from "@/features/functions/functionSlice";
import SingleProfileView from "./SingleProfileView";

const AllAttendees = () => {
  const dispatch = useDispatch();
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const { profileView, modalId } = useSelector((strore) => strore.functions);
  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(ProfileModal({ bool: false }));
  }, []);

  const [rowId, setRowId] = useState(null);

  const allAttendees = users.map((item) => {
    return {
      id: item.id,
      email: item.email,
      username: item.username,
      firstname: item.firstname,
      roles: _.toString(item.roles),
      lastname: item.lastname,
    };
    // item.roles, item.id;
  });

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 220 },
      { field: "username", headerName: "Username", width: 120 },
      { field: "firstname", headerName: "Firstname", width: 170 },
      { field: "lastname", headerName: "Lastname", width: 170 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 200,
        valueGetter: (params) => {
          const role = params.row.roles;
          return role;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 220,
        renderCell: (params) => <ViewProfile {...{ params }} />,
      },
    ],
    [rowId]
  );
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
          rows={allAttendees}
          getRowId={(row) => row.id}
        />
      </Box>
      {profileView && (
        <div>
          <SingleProfileView />
        </div>
      )}
    </section>
  );
};

export default AllAttendees;
