"use client";
import React from "react";
import FormRow from "@/components/FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setRole } from "../../../features/user/userSlice";
import { ROlE_LIST, STUDENT_LIST } from "@/components/ROLE_LISTS";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  mobilenumber: "",
  password: "",
  isMember: true,
};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Loginpage = (session) => {
  const router = useRouter();
  const [values, setValues] = useState(initialState);
  const [data, setData] = useState({});
  const [err, setError] = useState("");
  const dispatch = useDispatch();
  const { user, isLoading, role } = useSelector((strore) => strore.user);
  // const token = user?.token;
  // const roles = userRole?.roles;
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("please fill out all details");
    }
    setError("");
    const user1 = await axios
      .post(
        "http://localhost:8000/greendometech/ng/auth/login/email",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .catch((err) => {
        setError(err.response);
      });
    // setData(user1);

    console.log(user1);
    const userRole = user1?.data.user?.roles;
    const error = data.data;
    console.log(userRole);
    const isStudent = userRole?.some((ai) => STUDENT_LIST.includes(ai));
    const isPanel = userRole?.some((ai) => ROlE_LIST.includes(ai));

    // console.log(error);
    if (user1?.status === 200 && isPanel) {
      router.push("/panel/admin_dashboard");
    }
    if (user1?.status === 200 && userRole === isStudent) {
      router.push("/panel/student_dashboard");
    }
    router.reload;
    // dispatch(setRole(userRole));

    dispatch(
      loginUser({
        email: email,
        password: password,
      })
    );
    // console.log(user);
  };
  // const getUser = async () => {
  //   // const user = await axios.get("/api/user");
  //   const user = await axios.get("/api/login");
  //   console.log(user);
  // };
  return (
    <main>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <FormRow
          type="email"
          name="email"
          value={values.email}
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
          Login
        </button>
        {/* <button onClick={() => getUser()} className="btn btn-block">
          user
        </button> */}
      </form>
      {err?.status === 404 || err?.status === 400 ? <h1> {err.data}</h1> : null}
    </main>
  );
};
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
// export async function getServerSideProps(context) {
//   try {
//     const session = context.req.cookies.myToken;
//     if (session) {
//       return {
//         props: { session },
//       };
//     } else {
//       return {
//         props: {},
//       };
//     }
//   } catch (error) {
//     throw new Error("no session in use");
//   }
// }
export default Loginpage;
