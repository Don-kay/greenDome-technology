import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import _ from "lodash";

async function fetchModules(moduleId) {
  const cookiesStore = cookies();
  const cookie = cookiesStore.get("myToken")?.value;

  try {
    const resp = await axios.get(
      "http://localhost:8000/greendometech/ng/module/view-all-module",
      {
        headers: {
          Cookie: "myToken=" + cookie,
        },
      },
      { withCredentials: true }
    );
    // const res = await axios.get(
    //   `http://localhost:8000/greendometech/ng/course/assessment/questions/${moduleId}`,
    //   {
    //     headers: {
    //       Cookie: "myToken=" + cookie,
    //     },
    //   },
    //   { withCredentials: true }
    // );

    // console.log(res);
    const Courses = resp.data;
    return Courses;
  } catch (error) {
    return { msg: error.response.data };
  }
}
async function fetchquestions(moduleId) {
  const cookiesStore = cookies();
  const cookie = cookiesStore.get("myToken")?.value;

  try {
    const res = await axios.get(
      `http://localhost:8000/greendometech/ng/module/assessment/all-questions/${moduleId}`,
      {
        headers: {
          Cookie: "myToken=" + cookie,
        },
      },
      { withCredentials: true }
    );
    const resp = res.data;
    return resp;
  } catch (error) {
    return { msg: error.response.data };
  }
}

const moduleDisp = async (req) => {
  const course = req.params.nameid;
  const module = req.params.moduleid;
  const moduleId = req.params.moduleDisp;
  const Courses = await fetchModules();
  const questions = await fetchquestions(moduleId);
  const url = "/panel/edit-question";

  function replaceAll(string, token, newtoken) {
    while (string.indexOf(token) != -1) {
      string = string.replace(token, newtoken);
    }
    return string;
  }
  const courseName = replaceAll(course, "%20", " ");
  const moduleName = replaceAll(module, "%20", " ");
  // console.log(paramsName);
  // console.log(courseName);
  // console.log(moduleName);
  // console.log(moduleId);
  // console.log(questions);
  const question = questions.question;
  const questionCount = questions.count;

  const Edithandler = (_id) => {
    const singleQuestion = question.filter((i) => i === _id);
    // console.log(singleQuestion);
  };

  const courseProp = { data: Courses.course, count: Courses.count };
  const { data, count } = courseProp;
  // console.log(data);
  const modules = data.filter((i) => i._id === moduleId);
  // console.log(modules);

  return (
    <main>
      <div>{`This module belongs to ${courseName}`}</div>
      <section>
        <div>
          {modules.map((item, id) => {
            const {
              _id,
              title,
              status,
              party_type,
              category,
              level,
              completed,
              featured,
              description,
              code,
              content,
              createdBy,
              createdAt,
              updatedAt,
            } = item;
            return (
              <div key={id}>
                <div key={id} className="">
                  <h2>title: {title}</h2>
                  <h4>id: {_id}</h4>
                  <h4>status: {status}</h4>
                  <h4>party: {party_type}</h4>
                  <h4>category: {category}</h4>
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
            );
          })}
        </div>
        <div>
          {question.map((item, id) => {
            const {
              _id,
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
                <Link
                  key={id}
                  href={`${url}/${courseName}/${moduleName}/${moduleId}/${_id}`}
                >
                  <button>Edit</button>
                </Link>
                {/* <Link key={id} href={`${url}/${_id}`}>
               <button>Delete</button>
               </Link>  */}
              </div>
            );
          })}
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default moduleDisp;
