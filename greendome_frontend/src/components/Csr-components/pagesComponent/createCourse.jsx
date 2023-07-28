"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { toast } from "react-toastify";
import { createCourse } from "@/features/course/courseSlice";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "@/components/FormRow";

const initialStates = {
  name: "",
  fee: "",
  description: "",
  content: "",
  content1: "",
  content2: "",
  content3: "",
  content4: "",
  content5: "",
  content6: "",
  content7: "",
  content8: "",
  content9: "",
  content10: "",
  Serial: "",
};

const CreateCourse = () => {
  const [values, setValues] = useState(initialStates);
  const { isLoading } = useSelector((store) => store.user);
  const disPatch = useDispatch();

  // const statusOptions = [
  //   { value: "1", label: "visible" },
  //   { value: "2", label: "not visible" },
  // ];
  // const categoryOptions = [
  //   { value: "1", label: "none" },
  //   { value: "2", label: "Machine Learning" },
  //   { value: "3", label: "Html" },
  //   { value: "4", label: "Css" },
  //   { value: "4", label: "Node js" },
  //   { value: "4", label: "React js" },
  //   { value: "4", label: "Full stack development" },
  //   { value: "4", label: "UI/UX" },
  // ];
  // const levelOptions = [
  //   { value: "1", label: "beginner" },
  //   { value: "2", label: "intermediate" },
  //   { value: "3", label: "advanced" },
  // ];
  // const completedOptions = [
  //   { value: "1", label: true },
  //   { value: "2", label: false },
  // ];
  // const featuredOptions = [
  //   { value: "1", label: true },
  //   { value: "2", label: false },
  // ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    const {
      name,
      fee,
      description,
      content,
      content1,
      content2,
      content3,
      content4,
      content5,
      content6,
      content7,
      content8,
      content9,
      content10,
      Serial,
    } = values;
    if (
      !name ||
      !description ||
      !content ||
      !content1 ||
      !content2 ||
      !content3 ||
      !content4 ||
      !Serial
    ) {
      toast.error("please fill out all details");
      return;
    }
    console.log(values);
    disPatch(
      createCourse({
        name: name,
        fee: fee,
        description: description,
        content: content,
        content1: content1,
        content2: content2,
        content3: content3,
        content4: content4,
        content5: content5,
        content6: content6,
        content7: content7,
        content8: content8,
        content9: content9,
        content10: content10,
        Serial_key: Serial,
      })
    );
  };

  return (
    <main>
      <form action="">
        <button onClick={handleSubmitt} type="submit">
          create
        </button>
        <div>CreateCourse</div>
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />

        <FormRow
          type="number"
          name="fee"
          value={values.fee}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content"
          value={values.content}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content1"
          value={values.content1}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content2"
          value={values.content2}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content3"
          value={values.content3}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content4"
          value={values.content4}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content5"
          value={values.content5}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content6"
          value={values.content6}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content7"
          value={values.content7}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content8"
          value={values.content8}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content9"
          value={values.content9}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="content10"
          value={values.content10}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="description"
          value={values.description}
          handleChange={handleChange}
        />

        <FormRow
          type="text"
          name="Serial"
          value={values.Serial}
          handleChange={handleChange}
        />
        {/* <div>
          <h5>Status</h5>
          <Select
            components={makeAnimated()}
            name="status"
            options={statusOptions}
            id="status"
            isSearchable
            noOptionsMessage={() => "status not available"}
            placeholder="none"
          />
        </div>
        <div>
          <h5>category</h5>
          <Select
            components={makeAnimated()}
            name="category"
            options={categoryOptions}
            id="status"
            isSearchable
            noOptionsMessage={() => "status not available"}
            placeholder="none"
          />
        </div>
        <div>
          <h5>Level</h5>
          <Select
            components={makeAnimated()}
            name="level"
            options={levelOptions}
            id="status"
            isSearchable
            noOptionsMessage={() => "level not available"}
            placeholder="none"
          />
        </div> */}
        {/* <div>
          <h5>Featured</h5>
          <Select
            components={makeAnimated()}
            name="featured"
            options={featuredOptions}
            id="status"
            isSearchable
            noOptionsMessage={() => "featured not available"}
            placeholder="none"
          />
        </div>
        <div>
          <h5>Completed</h5>
          <Select
            components={makeAnimated()}
            name="completed"
            options={completedOptions}
            id="status"
            isSearchable
            noOptionsMessage={() => "checkbox not available"}
            placeholder="none"
          />
        </div> */}
      </form>
    </main>
  );
};

export default CreateCourse;
