"use client";
import React from "react";
import { Box, Fab } from "@mui/material";
import Link from "next/link";
import { GrOverview } from "react-icons/gr";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";

const ProfileActions = ({ params }) => {
  // const { users } = useSelector((strore) => strore.profiles);
  // console.log(studentId);
  const studentId = params.id;
  const route = "/panel/admin_dashboard/all-students";
  // console.log(studentId);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Link href={`${route}/${studentId}`}>
        <Fab>
          <GrOverview />
        </Fab>
      </Link>

      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <AiFillSetting />
      </Fab>
    </Box>
  );
};

export default ProfileActions;

export async function getStaticPaths() {
  return {};
}
