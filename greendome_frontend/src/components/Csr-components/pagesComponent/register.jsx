"use client";
import React from "react";
import FormRow from "../../FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/user/userSlice";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Image from "next/image";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  mobilenumber: "",
  password: "",
  isMember: true,
  biography: "",
};
const Registerpage = () => {
  const [values, setValues] = useState(initialState);
  const [file, setFile] = useState();
  const [certCont, setCertCont] = useState();
  const [countryZip, setCountryZip] = useState([]);
  const [isTutor, setisTutor] = useState(false);
  const { userAuth, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const roles = isTutor ? "tutor" : "student";

  const certifiedOptions = [
    { value: "1", label: "none" },
    { value: "2", label: "AWS Developer" },
    { value: "3", label: "Software Engineer" },
    { value: "4", label: "Web Developer" },
    { value: "5", label: "Data Analyst" },
    { value: "6", label: "IT Engineer" },
  ];
  const countryOptions = [
    { value: "1", label: "234" },
    { value: "2", label: "141" },
    { value: "3", label: "199" },
    { value: "4", label: "444" },
    { value: "5", label: "205" },
    { value: "6", label: "363" },
  ];

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
      return file;
    }

    setImageFiletoBase(file[0]);
    // setFile(file[0].name);
    console.log(file[0]?.name);
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(reader.result);
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleSelectedCert = (selectedOptions) => {
    const label = selectedOptions.map((i) => i.label);
    setCertCont(label);
  };
  const handleSelectedCountry = (selectedOptions) => {
    const label = selectedOptions.label;
    setCountryZip(_.toString(label));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      username,
      mobilenumber,
      password,
      biography,
    } = values;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !username ||
      !mobilenumber ||
      !password
    ) {
      toast.error("please fill out all details");
      return;
    }
    dispatch(
      registerUser({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        mobilenumber: mobilenumber,
        password: password,
        image: file,
        biography: biography,
        country: _.toString(countryZip),
        certificate: certCont,
        roles: roles,
      })
    );
    console.log(values);
    console.log(file);
    console.log(_.toString(countryZip));
    console.log(certCont);
    console.log(roles);
  };
  return (
    <main>
      <section>
        <h3 style={{ cursor: "pointer" }} onClick={() => setisTutor(false)}>
          Student
        </h3>
        <h3 style={{ cursor: "pointer" }} onClick={() => setisTutor(true)}>
          Tutor
        </h3>
      </section>
      {isTutor ? (
        <form action="" className="form" onSubmit={handleSubmit}>
          <h1>Register as a Tutor</h1>
          <FormRow
            type="text"
            name="firstname"
            value={values.firstname}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastname"
            value={values.lastname}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="mobilenumber"
            value={values.mobilenumber}
            handleChange={handleChange}
          />
          {/* password field */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="biography"
            value={values.biography}
            handleChange={handleChange}
          />
          <div>
            <h4>(*) only accept image that is below 1mb, up to 3 images</h4>
          </div>
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={values.password}
            handleChange={handleImageFile}
          />

          <div>
            <h5>country</h5>
            <Select
              components={makeAnimated()}
              name="country"
              options={countryOptions}
              id="certificate"
              onChange={handleSelectedCountry}
              // isMulti={true}
              // isSearchable
              // noOptionsMessage={() => "certificate does not exist yet"}
              placeholder="country"
            />
          </div>
          <div>
            <h5>certificate</h5>
            <Select
              components={makeAnimated()}
              name="certificate"
              options={certifiedOptions}
              id="certificate"
              onChange={handleSelectedCert}
              isMulti={true}
              // isSearchable
              // noOptionsMessage={() => "certificate does not exist yet"}
              placeholder="certificate"
            />
          </div>
          <div>
            {file === "" || file === undefined ? (
              ""
            ) : (
              <Image width={200} height={200} src={file} alt="image" />
            )}
          </div>
          <button type="submit" className="btn btn-block">
            Register
          </button>
        </form>
      ) : (
        <form action="" className="form" onSubmit={handleSubmit}>
          <h1>Register as a student</h1>
          <FormRow
            type="text"
            name="firstname"
            value={values.firstname}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="lastname"
            value={values.lastname}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="username"
            value={values.username}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="mobilenumber"
            pattern="[1-9]{1}[0-9]{9}"
            maxLength="10"
            value={values.mobilenumber}
            handleChange={handleChange}
          />
          {/* password field */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="biography"
            value={values.biography}
            handleChange={handleChange}
          />
          <div>
            <h4>(*) only accept image that is below 1mb, up to 3 images</h4>
          </div>
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={values.password}
            handleChange={handleImageFile}
          />

          <div>
            <h5>country</h5>
            <Select
              components={makeAnimated()}
              name="country"
              options={countryOptions}
              id="certificate"
              onChange={handleSelectedCountry}
              // isMulti={true}
              isSearchable={false}
              // noOptionsMessage={() => "certificate does not exist yet"}
              placeholder="country"
            />
          </div>
          <div>
            {file === "" || file === undefined ? (
              ""
            ) : (
              <Image width={200} height={200} src={file} alt="image" />
            )}
          </div>
          <button type="submit" className="btn btn-block">
            Register
          </button>
        </form>
      )}
    </main>
  );
};

export default Registerpage;
