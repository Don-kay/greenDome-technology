"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse, setTotalCourse } from "@/features/course/courseSlice";
import _ from "lodash";

const TotalCourseComp = ({ params, course }) => {
  const dispatch = useDispatch();
  const { TotalCourse, errorMsg } = useSelector((strore) => strore.course);
  const { users } = useSelector((state) => state.profiles);

  const loggedInUserId = params;
  const courses = course.data?.classes;
  const loggedInUser = users?.filter((i) => i.id === loggedInUserId);
  const UserClasses = loggedInUser.map((i) => {
    return i.classesId;
  });

  const classId = courses?.filter((i) => UserClasses.includes(i._id));

  // const IsStudent = loggedInUser.map((i) => {
  //   return i.roles.includes("student");
  // });
  // console.log(course);
  const stats = course.stats;

  const count = course.data?.count;
  console.log(courses);
  console.log(loggedInUser);
  console.log(UserClasses);
  console.log(classId);

  return (
    <section className="panel relative bg-purple">{classId?.length}</section>
  );
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
