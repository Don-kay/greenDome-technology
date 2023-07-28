"use client";
import React, { useEffect, useState } from "react";
import RolesCharts from "../minuteComponents/rolesCharts";
import CourseCharts from "../minuteComponents/courseCharts";
import RevenueCharts from "../minuteComponents/revenueCharts";
import StudentsSlice from "../minuteComponents/slicedRolecomp";
import Calender from "../minuteComponents/calender";
import EventsChart from "../minuteComponents/eventsChart";
import { GetAllCourse } from "@/features/course/courseSlice";
import RatedCourse from "../minuteComponents/ratedCourse";
import { GetAllUsers } from "@/features/profile/profileSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Overview = () => {
  const dispatch = useDispatch();
  const [course, setCourses] = useState([]);
  // const { course, TotalCourse } = useSelector((strore) => strore.course);

  // console.log(users);

  const getAllcourses = async () => {
    try {
      const profiles = await axios.get(
        "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      const resp = { data: profiles.data, stats: profiles.status };
      setCourses(resp);
    } catch (error) {
      return { msg: error.response.data };
    }
  };

  useEffect(() => {
    dispatch(GetAllCourse());
    getAllcourses();
  }, []);
  console.log(course);
  // console.log(TotalCourse);

  return (
    <main className="flex h-fit justify-center bg-bubblegum gap-2 ">
      <section className=" h-fit bg-purple p-responsive3 border-dark min-w-innerlay">
        <RolesCharts />
        <CourseCharts />
        <RevenueCharts />
        <StudentsSlice />
      </section>
      <section className="min-w-innerlay2 bg-red-700">
        Calender % student rating
        <Calender />
        <EventsChart />
        <RatedCourse />
      </section>
    </main>
  );
};

export default Overview;
