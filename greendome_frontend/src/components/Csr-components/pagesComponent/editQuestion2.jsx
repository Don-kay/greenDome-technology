"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { getQuestions } from "@/features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import FormRow from "@/components/FormRow";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditQuestion({
  moduleParam,
  questionParam,
  paramName,
  courseid,
  isOpen,
  onClosed,
  Questions,
  setQuestion,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [img, setImg] = useState(false);
  // const { allQuestions } = useSelector((strore) => strore.module);
  const [questionCont, setQuestionCont] = useState([]);
  // console.log(moduleParam);
  // console.log(moduleName);
  // console.log(courseName);
  const url2 = "/panel/admin_dashboard/create-module";
  const initialQuestions = {
    questions: "",
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
    image: "undefined",
  };
  const [updatedQuestion, setUpdatedQuestion] = useState(initialQuestions);

  useEffect(() => {
    try {
      const fetch = async () => {
        const profiles = await axios.get(
          `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleParam}`,
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const resp = { data: profiles.data.question, stats: profiles.status };

        const singleQuestion = resp.data?.filter(
          (item) => item._id === questionParam
        );
        const questions = _.toString(singleQuestion?.map((i) => i.question));
        const answer = _.toString(singleQuestion?.map((i) => i.answer));
        const option1 = _.toString(singleQuestion?.map((i) => i.option1));
        const option2 = _.toString(singleQuestion?.map((i) => i.option2));
        const option3 = _.toString(singleQuestion?.map((i) => i.option3));
        const option4 = _.toString(singleQuestion?.map((i) => i.option4));
        const image = _.toString(singleQuestion?.map((i) => i.image));
        // console.log(image);

        const img = !image ? "" : image;

        setUpdatedQuestion({
          questions: questions,
          answer: answer,
          a: option1,
          b: option2,
          c: option3,
          d: option4,
          image: img,
        });
        setFile(img);
        // setQuestionCont(resp.data);
      };

      fetch();
    } catch (error) {
      return { msg: error.response.data };
    }
  }, [questionParam]);

  // const id = _.toString(singleQuestion?.map((i) => i._id));

  const customStyles = {
    content: {
      position: "relative",
      top: "20vh",
      left: "0%",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      // console.log(file[0]?.name);
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
        // console.log(reader.result);
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedQuestion({ ...updatedQuestion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { questions, a, b, c, d, answer } = updatedQuestion;

    if (!questions || !a || !b || !c || !d || !answer) {
      toast.error("please fill all details");
    }

    const res = await axios.put(
      `http://localhost:8000/greendometech/ng/module/assessment/questions/update/${questionParam}/${moduleParam}`,
      {
        question: questions,
        option1: a,
        option2: b,
        option3: c,
        option4: d,
        answer: answer,
        image: file,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    console.log(res.data);

    const updateQuestion = res.data.questions;
    const updatedId = updateQuestion._id;
    const refreshed = Questions.filter((item) => item._id !== updatedId);

    const refreshedQuestion = [...refreshed, updateQuestion];

    let sortedQuestions = refreshedQuestion.sort((r1, r2) =>
      r1.createdAt > r2.createdAt ? 1 : r1.createdAt < r2.createdAt ? -1 : 0
    );

    setQuestion(sortedQuestions);
    if (updatedId !== "") {
      onClosed();
    }

    // router.push(`${url2}/${paramName}/${courseid}/${moduleParam}`);

    return res.data;
    // dispatch(
    //   adminUpdateUsers({
    //     params: profileParams,
    //     firstname: firstname,
    //     lastname: lastname,
    //     certificate: certCont,
    //     mobilenumber: mobilenumber,
    //     biography: biography,
    //     roles: roleCont,
    //     country: _.toString(countryZip),
    //   })
    // );
    //     dispatch(GetAllUsers());
  };
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <button onClick={() => onClosed()}>Go Back</button>
      <form onSubmit={handleSubmit}>
        {/* <h1>Update {`${username}`} profile</h1> */}

        <FormRow
          type="file"
          accept="image/*"
          name="profile-image"
          // value={url}
          handleChange={handleImageFile}
        />
        <div>
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file !== "" && (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>

        <div>
          <FormRow
            type="text"
            name="questions"
            value={updatedQuestion.questions}
            handleChange={handleChange}
            // handleOnFocus={() => handleOnFocus()}
            // handleOnBlur={handleOnBlur}
          />
          <FormRow
            type="text"
            name={`a`}
            value={updatedQuestion.a}
            handleChange={handleChange}
            // handleOnFocus={handleOnFocus}
            // handleOnBlur={handleOnBlur}
          />
          <FormRow
            type="text"
            name={`b`}
            value={updatedQuestion.b}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="c"
            value={updatedQuestion.c}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="d"
            value={updatedQuestion.d}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="answer"
            value={updatedQuestion.answer}
            handleChange={handleChange}
          />
        </div>

        <button>submit</button>
      </form>
      <div>editProfile</div>;
    </Modal>
  );
}

export default EditQuestion;
