"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { getQuestions } from "@/features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import FormRow from "@/components/FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditQuestion({ moduleParam, questionParam, courseName, moduleName }) {
  const router = useRouter();
  const dispatch = useDispatch();
  // const { allQuestions } = useSelector((strore) => strore.module);
  const [questionCont, setQuestionCont] = useState([]);
  // console.log(moduleParam);
  // console.log(moduleName);
  // console.log(courseName);
  const url = "/panel/admin_dashboard/view-module";
  const initialQuestions = {
    questions: "",
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
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
        setUpdatedQuestion({
          questions: questions,
          answer: answer,
          a: option1,
          b: option2,
          c: option3,
          d: option4,
        });
        // setQuestionCont(resp.data);
      };

      fetch();
    } catch (error) {
      return { msg: error.response.data };
    }
  }, []);

  // const id = _.toString(singleQuestion?.map((i) => i._id));

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
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    console.log(res.data);

    router.push(`${url}/${courseName}/${moduleName}/${moduleParam}`);

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
    <main>
      <form onSubmit={handleSubmit}>
        {/* <h1>Update {`${username}`} profile</h1> */}

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
    </main>
  );
}

export default EditQuestion;
