"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import customFetch from "@/utilities/axios";
import Image from "next/image";
import Select from "react-select";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import EditQuestion from "./editQuestion2";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import { resetErrorMsg } from "@/features/course/module/moduleSlice";
import FormRow from "@/components/FormRow";
import _ from "lodash";

const questionsinitialStates = {
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  answer: "",
  image: "",
};
const initialState = {
  title: "",
  _id: "",
  status: "",
  party_type: "",
  level: "",
  completed: "",
  featured: "",
  description: "",
  code: "",
  image: "",
  content: "",
  createdBy: "",
  createdAt: "",
  updatedAt: "",
};

const CreateQuestion = ({
  paramsName,
  courseid,
  moduleid,
  isOpen,
  onClosed,
  moduler,
  setOnclosed,
}) => {
  const paramname = paramsName;
  const courseId = courseid;
  const [modules, setModules] = useState(initialState);
  const [questioner, setquestioners] = useState(questionsinitialStates);
  const [check, setCheck] = useState(null);
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [questions, setQuestion] = useState([]);
  // const [Question, setQuestion] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [img, setImg] = useState(false);
  const [questionId, setQuestionId] = useState("");
  const [file, setFile] = useState();
  const { module, errorMsg, allQuestions } = useSelector(
    (strore) => strore.module
  );
  const router = useRouter();
  const disPatch = useDispatch();
  //console.log(paramname);

  const url = "/panel/admin_dashboard/view-module";
  const {
    _id,
    title,
    status,
    party_type,
    level,
    completed,
    featured,
    description,
    code,
    image,
    content,
    createdBy,
    createdAt,
    updatedAt,
  } = modules;
  //console.log(typeof image);

  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };
  const Done = () => {
    setOnclosed(true);
    onClosed();

    router.push(`${url}/${paramname}/${courseId}`, {
      shallow: true,
    });
  };

  const customStyles = {
    content: {
      top: "0%",
      left: "0%",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };

  const deleteQuestion = async (_id) => {
    try {
      const question = await axios.delete(
        `http://localhost:8000/greendometech/ng/module/assessment/admin/delete-question/${_id}/${moduleid}`,
        {
          withCredentials: true,
        }
      );
      const questionData = question.data.questions;

      // // const course = res.filter((i) => i._id === paramid);
      // // console.log(questionData);
      // //   const updateQuestion = res.data.questions;
      const deletedId = questionData._id;
      const newQuestions = questions.filter((item) => item._id !== deletedId);
      setQuestion(newQuestions);
      // console.log(deletedId);
      // console.log(newQuestions);
      // console.log(question);
      setTrigger(true);
    } catch (error) {
      return { msg: error?.response };
    }
    // console.log(singleQuestion);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const question = await axios.get(
          `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleid}`,
          {
            withCredentials: true,
          }
        );
        const questionData = question.data.question;

        // const course = res.filter((i) => i._id === paramid);
        //console.log(questionData);
        setQuestion(questionData);
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetchQuestion();
  }, [moduleid]);

  // const { _id, title } = module;
  // const moduleid = _id;
  // console.log(module);
  useEffect(() => {
    showModal({ show: false });
    disPatch(resetErrorMsg(""));
    // disPatch(getQuestions());

    try {
      const fetchModule = async () => {
        try {
          const resp = await axios.get(
            `http://localhost:8000/greendometech/ng/module/admin/view-module/${moduleid}`,
            {
              withCredentials: true,
            }
          );

          const res = resp.data.modules;
          const {
            title,
            _id,
            status,
            party_type,
            level,
            completed,
            featured,
            description,
            code,
            image,
            content,
            createdBy,
            createdAt,
            updatedAt,
          } = res;
          // console.log(res);
          setModules({
            title,
            _id,
            status,
            party_type,
            level,
            completed,
            featured,
            description,
            code,
            image,
            content,
            createdAt,
            createdBy,
            updatedAt,
          });
        } catch (error) {
          return console.log(error?.response);
        }
      };
      // const fetchQuestion = async () => {
      //   const res = await axios.get(
      //     `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleid}`,
      //     {
      //       withCredentials: true,
      //     }
      //   );
      //   const resp = res.data.question;
      //   setQuestion(resp);
      // };
      if (moduleid !== "" || moduleid !== undefined) {
        // fetchQuestion();
        fetchModule();
      } else {
        return;
      }

      // const fetchCourses = async () => {
      //   try {
      //     const resp = await axios.get(
      //       `http://localhost:8000/greendometech/ng/course/admin/${paramsId}`,
      //       {
      //         withCredentials: true,
      //       }
      //     );

      //     const Courses = resp.data.course;
      //     console.log(Courses);
      //     //  setData(Courses);
      //   } catch (error) {
      //     return { msg: error.response.data };
      //   }
      // };

      // fetchCourses();
    } catch (error) {
      return console.log(error?.response);
    }
  }, [moduler, check, trigger]);

  useEffect(() => {
    if (errorMsg?.msg !== undefined) {
      showModal({ show: true });
    }
    const timeout = setTimeout(() => {
      showModal({ show: false });
      disPatch(resetErrorMsg(""));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [errorMsg]);
  // useEffect(() => {
  //   if (file !== "" || file !== undefined) {
  //     setImg(false);
  //   }
  // }, [img]);

  const handleQuestionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setquestioners({ ...questioner, [name]: value });
  };
  const handleEditQuestion = (id) => {
    setModalOpen(true);
    setQuestionId(id);
  };

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;
    // console.log(file);

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      // console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }

    // setFile(file[0].name);
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

  // const handleSelectedFeatured = (selectedOptions) => {
  //   const label = selectedOptions.label;
  //   setFeaturedCont(label);
  // };

  // useEffect(() => {
  //   const mit = setTimeout(() => {
  //     if (errorMsg.msg !== undefined) {
  //       setModal(true);
  //     }
  //   }, 3000);
  //   return () => clearTimeout(mit);
  // }, [createModules]);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    // console.log("hello");
    // const { _id, title } = module;
    const { question, a, b, c, d, answer } = questioner;
    if (!question || !a || !b || !c || !d || !answer) {
      toast.error("please fill out all details");
      return;
    }
    const fileType = file === undefined ? "" : file;
    console.log(question);

    try {
      const res = await customFetch.post(
        `module/assessment/create_question/${moduleid}/${courseId}`,
        {
          question: question,
          option1: a,
          option2: b,
          option3: c,
          option4: d,
          answer: answer,
          image: fileType,
        },
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      const resp = { data: res.data, stats: res.status };
      console.log(resp);
      setFile("");
      setCheck(res.data.question);
      const questioner = res.data.question;
      setQuestion([...questions, questioner]);
      //reset input field
      setquestioners({ question: "", a: "", b: "", c: "", d: "", answer: "" });
      // setQuestion([...Question], resp.data.question);
    } catch (error) {
      return {
        msg: error.response,
      };
    }

    // disPatch(
    //   createQuestions({
    //     moduleId: moduleid,
    //     question: question,
    //     option1: a,
    //     option2: b,
    //     option3: c,
    //     option4: d,
    //     answer: answer,
    //   })
    // );
    // console.log(_id);
    // console.log(questioner.question);
    // const modules = await axios.get();
  };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <section>
        <h2>{`Module: ${title} `}</h2>
        <div>
          <div className="">
            <div>
              {image === undefined || image === "" ? (
                <Image width={200} height={200} src={Greendome} alt="image" />
              ) : (
                <Image width={200} height={200} src={image} alt="image" />
              )}
            </div>
            <h2>title: {title}</h2>
            <h4>id: {_id}</h4>
            <h4>status: {status}</h4>
            <h4>party: {party_type}</h4>
            <h4>level: {level}</h4>
            <h4>completed: {_.toString(completed)}</h4>
            <h4>featured: {_.toString(featured)}</h4>
            <h4>description: {description}</h4>
            <h4>code: {code}</h4>
            <h4>content: {content}</h4>
            <h4>createdBy: {createdBy}</h4>
            <h4>createdAt: {createdAt}</h4>
            <h4>updatedAt: {updatedAt}</h4>
          </div>
        </div>
      </section>
      <section>
        <form action="" onSubmit={handleSubmitQuestion}>
          <div>set questions</div>
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
          <FormRow
            type="text"
            name="question"
            value={questioner.question}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="a"
            value={questioner.a}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="b"
            value={questioner.b}
            handleChange={handleQuestionChange}
          />

          <FormRow
            type="text"
            name="c"
            value={questioner.c}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="d"
            value={questioner.d}
            //   check={featured}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="answer"
            value={questioner.answer}
            //   check={featured}
            handleChange={handleQuestionChange}
          />
          <button style={{ position: "relative", left: "50%" }}>create</button>
        </form>
      </section>
      <div>
        <EditQuestion
          onClosed={() => setModalOpen(false)}
          isOpen={modalOpen}
          moduleParam={moduleid}
          courseid={courseid}
          paramName={paramname}
          questionParam={questionId}
          Questions={questions}
          setQuestion={setQuestion}
        />
      </div>
      {questions?.length === 0 ? (
        <h1> no question has been created</h1>
      ) : (
        <section>
          {questions?.map((item, id) => {
            const {
              _id,
              image,
              question,
              option1,
              option2,
              option3,
              option4,
              answer,
              createdAt,
              updatedAt,
            } = item;

            // console.log(image);

            const url = "/panel/create-page-edit-question";
            return (
              <div key={id}>
                <div className="">
                  <div key={id}>
                    {image !== "" && (
                      <Image width={200} height={200} src={image} alt="image" />
                    )}
                  </div>

                  <h2>questions: {question}</h2>
                  <h2>questionsId: {_id}</h2>
                  <h4>
                    {`"(a)."`}
                    {option1}
                  </h4>
                  <h4>
                    {`"(b)."`} {option2}
                  </h4>
                  <h4>
                    {`"(c)."`} {option3}
                  </h4>
                  <h4>
                    {`"(d)."`} {option4}
                  </h4>
                  <h4>answer: {answer}</h4>
                  <h4>createdAt: {createdAt}</h4>
                  <h4>updatedAt: {updatedAt}</h4>
                </div>

                <button onClick={(e) => handleEditQuestion(_id)}>Edit</button>
                {/* <Link
                key={id}
                href={`${url}/${paramname}/${courseId}/${moduleid}/${_id}`}
              >
                <button>Edit</button>
              </Link> */}
                <button onClick={() => deleteQuestion(_id)}>delete</button>
              </div>
            );
          })}
        </section>
      )}
      <button onClick={() => Done()}>Done</button>
    </Modal>
  );
};

export default CreateQuestion;
