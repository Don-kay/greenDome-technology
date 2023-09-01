import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TotalStudentPops() {
  const { users, totalStudents, errorMsg } = useSelector(
    (strore) => strore.profiles
  );

  return (
    <section className=" bg-silver flex items-center justify-center flex-col m-auto relative max-w-xmd p-responsive ">
      <h3>Total students</h3>
      <h1>{totalStudents}</h1>
    </section>
  );
}

export const ActiveStudentPops = () => {
  const { activeStudent, errorMsg } = useSelector((strore) => strore.profiles);
  // console.log(activeStudent);

  return (
    <section className=" bg-silver flex items-center justify-center flex-col m-auto relative max-w-xmd p-responsive ">
      <h3>Active students</h3>
      <h1>{`Dear Admin, there are ${activeStudent} active students`}</h1>
    </section>
  );
};
export const TotalTutorsProps = () => {
  const { totalTutors, errorMsg } = useSelector((strore) => strore.profiles);

  // console.log(totalTutors);
  return (
    <section className=" bg-silver flex items-center justify-center flex-col m-auto relative max-w-xmd p-responsive ">
      <h3>Active Tutors</h3>
      <h1>{` ${totalTutors} `}</h1>
    </section>
  );
};
export const TotalAdminProps = () => {
  const { totalAdmin, errorMsg } = useSelector((strore) => strore.profiles);
  // console.log(totalAdmin);

  return (
    <section className=" bg-silver flex items-center justify-center flex-col m-auto relative max-w-xmd p-responsive ">
      <h3>Total Admin </h3>
      <h1>{` ${totalAdmin} `}</h1>
    </section>
  );
};
