"use client";
import FormRow from "../../FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/user/userSlice";
import { useState, useEffect } from "react";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  mobilenumber: "",
  password: "",
  isMember: true,
};
const Registerpage = () => {
  const [values, setValues] = useState(initialState);
  const { userAuth, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, username, mobilenumber, password } =
      values;
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
      })
    );
    console.log(values);
  };
  return (
    <main>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <button type="submit" className="btn btn-block">
          Register
        </button>
      </form>
    </main>
  );
};

export default Registerpage;
