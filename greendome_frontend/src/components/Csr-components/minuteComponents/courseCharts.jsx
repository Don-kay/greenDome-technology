import React from "react";
import { GiTeacher, GiRead } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa";
import TotalCourseComp from "./courseComp";

const CourseCharts = ({ course, params, isStudent }) => {
  return (
    <section className=" flex justify-center items-center gap-6 flex-row border-width1px border-b-blackui p-responsive2">
      <div className=" flex justify-center items-center flex-row flex-wrap gap-2 border-width1px border-b-blackui p-responsive3 ">
        <GiRead />
        <div className=" block gap-2">
          <h2>Total Course</h2>
          <TotalCourseComp params={params} course={course} />
        </div>
      </div>
      {isStudent ? (
        <div></div>
      ) : (
        <div className=" flex justify-center items-center flex-row flex-wrap gap-2 border-width1px border-b-blackui p-responsive3">
          <GiTeacher />
          <div className=" block gap-2">
            <h2>Total Revenue</h2>
            <h3>37</h3>
          </div>
        </div>
      )}

      <div className=" flex justify-center items-center flex-row flex-wrap gap-2 border-width1px border-b-blackui p-responsive3">
        <FaUserTie />
        <div className=" block gap-2">
          <h2>Course Rating</h2>
          <h3>507</h3>
        </div>
      </div>
    </section>
  );
};

export default CourseCharts;
