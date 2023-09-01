"use client";
import React from "react";

const ConfirmationModal = ({ deleteModule, retainModule, moduleid }) => {
  return (
    <div>
      <h4>are you sure?</h4>
      <button onClick={() => deleteModule(moduleid)}>yes</button>
      <button onClick={() => retainModule()}>no</button>
    </div>
  );
};
export const CourseconfirmationModal = ({
  deleteModule,
  retainModule,
  courseid,
}) => {
  return (
    <div>
      <h4>are you sure to delete course?</h4>
      <button onClick={() => deleteModule(courseid)}>yes</button>
      <button onClick={() => retainModule()}>no</button>
    </div>
  );
};

export default ConfirmationModal;
