"use client";
import React from "react";
import { GiTeacher, GiRead } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import TotalSudentPops, {
  TotalAdminProps,
  TotalTutorsProps,
} from "./sudentPops";

const RolesCharts = () => {
  return (
    <section className=" flex justify-center items-center gap-6 flex-row border-width1px border-b-blackui p-responsive2">
      <div className=" flex justify-center items-center flex-row flex-wrap gap-2 border-width1px border-b-blackui p-responsive3 ">
        <GiRead />
        <div className=" block gap-2">
          <h2>Students</h2>
          <TotalSudentPops />
        </div>
      </div>
      <div className=" flex justify-center items-center flex-row flex-wrap gap-2 border-width1px border-b-blackui p-responsive3">
        <GiTeacher />
        <div className=" block gap-2">
          <h2>Tutors</h2>
          <TotalTutorsProps />
        </div>
      </div>
      <div className=" flex justify-center items-center flex-row flex-wrap gap-2 border-width1px border-b-blackui p-responsive3">
        <FaUserTie />
        <div className=" block gap-2">
          <h2>Admin</h2>
          <TotalAdminProps />
        </div>
      </div>
    </section>
  );
};

export default RolesCharts;
