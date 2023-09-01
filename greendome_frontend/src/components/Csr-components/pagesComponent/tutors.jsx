"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers, setTutors } from "@/features/profile/profileSlice";
import ProfileActions from "@/features/profile/profileActions.jsx";
import { TotalTutorsProps } from "../minuteComponents/sudentPops.jsx";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Tutors = () => {
  const dispatch = useDispatch();
  const [tutor, setTutor] = useState([]);
  const { users } = useSelector((strore) => strore.profiles);
  const [rowId, setRowId] = useState(null);
  // console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const profiles = await axios.get(
          "http://localhost:8000/greendometech/ng/auth/users",
          {
            withCredentials: true,
            credentials: "include",
          }
        );
        const resp = { data: profiles.data, stats: profiles.status };
        //  console.log(resp.data.user);
        const data = resp.data.user;

        const tutorObj = data.filter((item) => {
          return item.roles.includes("tutor");
        });
        const tutors = tutorObj.map((item) => {
          return {
            id: item.id,
            email: item.email,
            username: item.username,
            firstname: item.firstname,
            roles: _.toString(item.roles),
            lastname: item.lastname,
            createdAt: item.createdAt,
            classesId: item.classesId,
          };
          // item.roles, item.id;
        });

        setTutor(tutors);
        dispatch(setTutors(tutors.length));
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetchUsers();
    dispatch(GetAllUsers());
  }, []);

  // console.log(users);
  // const User = users?.data;
  // const allUsers = User?.user;

  // console.log(studentObj);

  // const studentId = studentObj.map((key) => key.id);

  useEffect(() => {
    dispatch(setTutors(tutor.length));
  }, [users]);

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
      { field: "createdAt", headerName: "Created At", width: 220 },
      {
        field: "actions",
        headerName: "Actions",
        width: 220,
        renderCell: (params) => <ProfileActions {...{ params }} />,
      },
    ],
    [rowId]
  );

  return (
    <section className="panel relative top-10   h-screen bg-purple">
      <div>board</div>
      {/* <button onClick={() => view}>view all users</button> */}
      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{ textAlign: "center", mt: 3, mb: 3 }}
        >
          manage tutors
        </Typography>
        <DataGrid columns={columns} rows={tutor} getRowId={(row) => row.id} />
      </Box>
      <div className="relative top-40 flex items-center justify-around flex-row">
        <TotalTutorsProps />
      </div>
    </section>
  );
};

export default Tutors;

// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
