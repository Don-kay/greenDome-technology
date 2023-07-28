"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse, setTotalCourse } from "@/features/course/courseSlice";
import _ from "lodash";

const TotalCourseComp = () => {
  const dispatch = useDispatch();
  const { course, TotalCourse, errorMsg } = useSelector(
    (strore) => strore.course
  );
  // console.log(course);

  return <section className="panel relative bg-purple">{TotalCourse}</section>;
};

export default TotalCourseComp;

const CourseRating = () => {};
// students.Layout = adminLayout;

// export function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {},
//   };
// }
