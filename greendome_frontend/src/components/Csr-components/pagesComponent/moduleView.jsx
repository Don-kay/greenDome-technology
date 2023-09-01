"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationModal from "../minuteComponents/confirmationModal";
import _ from "lodash";
import Image from "next/image";
import EditQuestion from "./editQuestion2";
import CreateQuestion from "./createQuestion";
import EditModule from "./editModule";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import Greendome from "../../asset/greendome.jpg";
import { HoverModal } from "@/features/functions/functionSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialState = {
  title: "",
  id: "",
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
const ModuleView = ({ coursename, courseid, moduleid }) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [modules, setModules] = useState(initialState);
  const [moduleRetrieved, setModuleRetrieved] = useState(false);
  const [question, setQuestion] = useState();
  const [questionId, setQuestionId] = useState("");
  const [deleteHover, setDeleteHover] = useState(false);
  const [modalOpen, setModalOpen] = useState({
    setQuestion: false,
    editQuestion: false,
    editModule: false,
  });
  const [retrieve, setRetrieve] = useState("");
  const { ishover } = useSelector((strore) => strore.functions);

  const [response, setResponse] = useState({ moduleMsg: "", questionMsg: "" });

  const moduleurl = "/panel/admin_dashboard/view-module";
  const url = "/panel/edit-question";
  const createurl = "/panel/admin_dashboard/create-module";
  const router = useRouter();

  // const paramID = course.id;
  const paramName = coursename;
  // console.log(courseid);
  // console.log(paramName);
  // console.log(paramID);
  // console.log(paramName);

  const confirmDelete = async (id) => {
    // console.log(id);
    // let fetchCont = [];
    try {
      await axios
        .all(
          question.map((i) =>
            axios.delete(
              `http://localhost:8000/greendometech/ng/module/assessment/admin/delete-question/${i._id}/${id}`,
              {
                withCredentials: true,
              }
            )
          ),
          axios.delete(
            `http://localhost:8000/greendometech/ng/module/admin-delete-module/${id}`,
            {
              withCredentials: true,
            }
          )
        )
        .then(
          axios.spread(function (question, module) {
            console.log(question, module);
          })
        );
    } catch (error) {
      return error.repsonse;
    }
    // for (let i = 0; i < question.length; i++) {
    //   // console.log(question[i]._id);
    //     const question = axios.delete(
    //       `http://localhost:8000/greendometech/ng/module/assessment/admin/questions/delete/${question[i]._id}/${id}`,
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     fetchCont.push(question)
    //     // console.log(resp.data.msg);
    //     // setResponse({ questionMsg: resp.data.msg });
    //   // } catch (error) {
    //   //   return { msg: error.response };
    //   // }
    // }

    setTrigger(true);
    router.push(`${moduleurl}/${coursename}/${courseid}`, {
      shallow: true,
    });
  };
  const ignoreDelete = async () => {
    setDeleteHover(false);
  };
  const Done = () => {
    router.push(`${moduleurl}/${coursename}/${courseid}`, {
      shallow: true,
    });
  };
  const handleEditQuestion = (id) => {
    setModalOpen(true);
    setQuestionId(id);
    setModalOpen({ editQuestion: true });
  };

  useEffect(() => {
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
        // console.log(resp.data);
        dispatch(HoverModal(false));
        setRetrieve(resp.data);
        if (_id !== "" || _id !== undefined) {
          setModules({
            title,
            id: _id,
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
          setModuleRetrieved(true);
        }
      } catch (error) {
        return { msg: error.response.data };
      }
    };
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
    setDeleteHover(false);
    fetchQuestion();
    fetchModule();
  }, [trigger]);

  // const question = questions.question;
  // const questionCount = questions.count;

  const {
    title,
    id,
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

  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };
  const imageType = image === undefined || image === "" ? "" : image;

  // const courseProp = { data: Courses.modules, count: Courses.count };
  // const mod = courseProp.data;
  // // console.log(data);
  // const modules = mod.filter((i) => i._id === moduleId);
  // console.log(modules);
  return (
    <main>
      <CreateQuestion
        onClosed={() => setModalOpen({ setQuestion: false })}
        isOpen={modalOpen.setQuestion}
        moduleid={moduleid}
        courseid={courseid}
        paramsName={paramName}
        Question={question}
        setQuestion={setQuestion}
      />
      <EditQuestion
        onClosed={() => setModalOpen({ editQuestion: false })}
        isOpen={modalOpen.editQuestion}
        moduleParam={moduleid}
        courseid={courseid}
        paramName={paramName}
        questionParam={questionId}
        Questions={question}
        setQuestion={setQuestion}
      />
      <EditModule
        onClosed={() => setModalOpen({ editModule: false })}
        isOpen={modalOpen.editModule}
        triggerMod={setTrigger}
        paramName={paramName}
        courseId={courseid}
        module={modules}
        moduleRetrieved={moduleRetrieved}
        setModule={setModules}
      />
      {deleteHover && (
        <div>
          <ConfirmationModal
            deleteModule={confirmDelete}
            retainModule={ignoreDelete}
            moduleid={moduleid}
          />
        </div>
      )}
      <button onClick={() => Done()}>Done</button>
      {retrieve === "" || retrieve === undefined ? (
        <h1>sorry module doesnt exist {response.moduleMsg}</h1>
      ) : (
        <section>
          <div>{`questions set to ${coursename}`}</div>
          <button onClick={(e) => setModalOpen({ setQuestion: true })}>
            set question
          </button>
          {/* <Link href={`${createurl}/${paramName}/${courseid}/${moduleid}`}>
            <button onClick={(e) => setModalOpen({ module: true })}>
              set question
            </button>
          </Link> */}
          <div className="">
            <div>
              {imageType !== "" ? (
                <Image width={200} height={200} src={image} alt="image" />
              ) : (
                <Image width={200} height={200} src={Greendome} alt="image" />
              )}
            </div>
            <h2>title: {title}</h2>
            <h4>id: {id}</h4>
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
          <button onClick={() => toggleMenu()}>update module</button>
          {ishover && (
            <div>
              <button onClick={() => setDeleteHover(true)}>delete</button>
              <button onClick={() => setModalOpen({ editModule: true })}>
                update
              </button>
            </div>
          )}
        </section>
      )}
      {question?.length === 0 ? (
        <h1> no question has been set{response.questionMsg}</h1>
      ) : (
        <div>
          {question?.map((item, id) => {
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
            return (
              <div key={id}>
                <div className="">
                  <div key={id}>
                    {image && (
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
                <div>
                  <button onClick={(e) => handleEditQuestion(_id)}>Edit</button>
                  {/* <Link
                    key={id}
                    href={`${url}/${coursename}/${courseid}/${moduleid}/${_id}`}
                  >
                    <button>Edit</button>
                  </Link> */}
                </div>

                {/* <Link key={id} href={`${url}/${_id}`}>
               <button>Delete</button>
               </Link>  */}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ModuleView;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
