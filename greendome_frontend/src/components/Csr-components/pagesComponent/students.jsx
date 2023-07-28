"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllUsers,
  setStudents,
  setActiveStudent,
  setRefresh,
} from "@/features/profile/profileSlice";
import ProfileActions from "@/features/profile/profileActions.jsx";
import TotalStudentPops, {
  ActiveStudentPops,
} from "../minuteComponents/sudentPops.jsx";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Students = () => {
  const dispatch = useDispatch();
  // const [users, setUsers] = useState([]);
  const { users } = useSelector((strore) => strore.profiles);
  const [rowId, setRowId] = useState(null);
  // console.log(users);

  // const fetchUsers = async () => {
  //   try {
  //     const profiles = await axios.get(
  //       "http://localhost:8000/greendometech/ng/auth/users",
  //       {
  //         withCredentials: true,
  //         credentials: "include",
  //       }
  //     );
  //     const resp = { data: profiles.data, stats: profiles.status };
  //     console.log(profiles);
  //     setUsers(resp);
  //   } catch (error) {
  //     return { msg: error.response.data };
  //   }
  // };

  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);

  // console.log(users);
  // const User = users?.data;
  // const allUsers = User?.user;

  const studentObj = users.filter((item) => {
    return item.roles.includes("student");
  });
  const activeStudents = users.filter((item) => {
    return (
      item.roles.includes("student") &&
      (item.classesId.length !== 0 || item.classesId === undefined)
    );
  });

  // console.log(studentObj);
  const students = studentObj.map((item) => {
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
  // const studentId = studentObj.map((key) => key.id);

  useEffect(() => {
    dispatch(setStudents(students?.length));

    if (activeStudents.length === 0) {
      dispatch(setActiveStudent(0));
    } else {
      dispatch(setActiveStudent(activeStudents?.length));
    }
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
          manage students
        </Typography>
        <DataGrid
          columns={columns}
          rows={students}
          getRowId={(row) => row.id}
        />
      </Box>
      <div className="relative flex items-center justify-around flex-row">
        <TotalStudentPops />
        <ActiveStudentPops />
      </div>
    </section>
  );
};

export default Students;

// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
