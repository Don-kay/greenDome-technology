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
  const { user } = useSelector((strore) => strore.user);
  const { users } = useSelector((state) => state.profiles);
  const loggedInUserId = user.data.user.id;
  const loggedInUser = users.filter((i) => i.id === loggedInUserId);

  const IsStudent = loggedInUser.map((i) => {
    return i.roles.includes("student");
  });

  const student = user.data.user;
  const studentParams = student.id;

  const isStudent = _.toString(IsStudent);
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
      {isStudent ? (
        <section>
          <div className=" h-fit bg-purple p-responsive3 border-dark min-w-innerlay">
            <CourseCharts
              course={course}
              params={studentParams}
              isStudent={isStudent}
            />
          </div>
          <div className="min-w-innerlay2 bg-red-700">
            Calender % student rating
            <Calender params={studentParams} isStudent={isStudent} />
            <EventsChart params={studentParams} isStudent={isStudent} />
            <RatedCourse params={studentParams} isStudent={isStudent} />
          </div>
        </section>
      ) : (
        <section>
          <div className=" h-fit bg-purple p-responsive3 border-dark min-w-innerlay">
            <RolesCharts />
            <CourseCharts params={studentParams} isStudent={isStudent} />
            <RevenueCharts />
            <StudentsSlice />
          </div>
          <div className="min-w-innerlay2 bg-red-700">
            Calender % student rating
            <Calender params={studentParams} isStudent={isStudent} />
            <EventsChart params={studentParams} isStudent={isStudent} />
            <RatedCourse params={studentParams} isStudent={isStudent} />
          </div>
        </section>
      )}
    </main>
  );
};

export default Overview;
