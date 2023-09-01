"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  createCourse,
  resetStats,
  resetCourse,
} from "@/features/course/courseSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "@/components/FormRow";
import _ from "lodash";

const initialStates = {
  name: "",
  fee: "",
  description: "",
  Serial: "",
};

const CreateCourse = () => {
  const router = useRouter();
  const [values, setValues] = useState(initialStates);
  const [category, setCategory] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [file, setFile] = useState();
  const [img, setImg] = useState(false);
  const disPatch = useDispatch();

  // console.log(stats);
  // console.log(course);
  useEffect(() => {
    disPatch(resetStats());
    disPatch(resetCourse());
  }, []);

  const { stats, course } = useSelector((strore) => strore.course);
  const name = course?.name;
  const id = course?._id;

  useEffect(() => {
    if (stats === 201 && course !== undefined) {
      router.push(`/panel/admin_dashboard/view-module/${name}/${id}`, {
        shallow: true,
      });
    }
  }, [stats]);

  // const statusOptions = [
  //   { value: "1", label: "visible" },
  //   { value: "2", label: "not visible" },
  // ];
  const categoryOptions = [
    { value: "1", label: "none" },
    { value: "2", label: "machine learning" },
    { value: "3", label: "html" },
    { value: "4", label: "css" },
    { value: "4", label: "node js" },
    { value: "4", label: "react js" },
    { value: "4", label: "full stack development" },
    { value: "4", label: "UI/UX" },
  ];
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

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        if (reader.result !== "") {
          setImg(false);
          setFile(reader.result);
        }
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };

  const handleSelectedCategory = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setCategory(label);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    const { name, fee, description, Serial } = values;
    if (!name || !description || !fee || !Serial) {
      toast.error("please fill out all details");
      return;
    }

    const fileType = file === undefined ? "" : file;
    console.log(values);
    disPatch(
      createCourse({
        name: name,
        fee: parseFloat(fee),
        description: description,
        image: fileType,
        category: category,
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
          name="description"
          value={values.description}
          handleChange={handleChange}
        />
        <div>
          <small>must be above 9 didgits</small>
          <FormRow
            type="text"
            name="Serial"
            value={values.Serial}
            handleChange={handleChange}
          />
        </div>

        <FormRow
          type="file"
          accept="image/*"
          name="profile-image"
          // value={values.password}
          handleChange={handleImageFile}
        />
        <div>
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file === "" || file === undefined ? (
            ""
          ) : (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>
        <div>
          <h5>category</h5>
          <Select
            components={makeAnimated()}
            name="category"
            options={categoryOptions}
            onChange={handleSelectedCategory}
            isMulti="true"
            id="status"
            isSearchable
            noOptionsMessage={() => "status not available"}
            placeholder="none"
          />
        </div>
      </form>
    </main>
  );
};

export default CreateCourse;
