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
import Image from "next/image";
import moment from "moment";

const AllStaff = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(ProfileModal({ bool: false }));
  }, []);
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const { profileView, modalId } = useSelector((strore) => strore.functions);
  const [pageSize, setpageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const staffObj = users?.filter((item) => {
    return item.roles.includes("Admin");
  });

  const allAttendees = staffObj?.map((item) => {
    return {
      id: item.id,
      image: item.image,
      username: item.username,
      roles: _.toString(item.roles),
    };
    // item.roles, item.id;
  });

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 220,
        renderCell: (params) => (
          <Image width={100} height={100} src={params.row.image} alt="image" />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "id", headerName: "Id", width: 220 },
      { field: "username", headerName: "Username", width: 120 },
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
      {
        field: "createdAt",
        headerName: "Member since",
        width: 220,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "updatedAt",
        headerName: "Last updated",
        width: 220,
        renderCell: (params) =>
          moment(params.row.updatedAt).format("YYYY-MM-DD HH:MM:SS"),
      },
    ],
    [rowId]
  );
  return (
    <section>
      <div>All Tutors</div>
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
          view all Tutors
        </Typography>
        {users.length !== 0 ? (
          <DataGrid
            columns={columns}
            rows={allAttendees}
            getRowId={(row) => row.id}
            pagination={true}
            {...columns}
            initialState={{
              ...columns.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            // paginationMode="server"
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        ) : (
          <h1>no user available</h1>
        )}
      </Box>
      {profileView && (
        <div>
          <SingleProfileView users={users} id={modalId} />
        </div>
      )}
    </section>
  );
};

export default AllStaff;
