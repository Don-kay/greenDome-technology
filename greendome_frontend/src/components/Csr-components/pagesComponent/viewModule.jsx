"use client";
import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CourseconfirmationModal } from "../minuteComponents/confirmationModal";
import CreateModule from "./createModule";
import EditCourse from "./editCourse";
import _ from "lodash";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { HoverModal } from "@/features/functions/functionSlice";
import { resetModule } from "@/features/course/module/moduleSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Greendome from "../../asset/greendome.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

// async function fetchCourse() {
//   const cookiesStore = cookies();
//   const cookie = cookiesStore.get("myToken")?.value;

//   try {
//     const res = await customFetch.get(
//       "/course/admin/view-all-course",
//       {
//         headers: {
//           Cookie: "myToken=" + cookie,
//         },
//       },
//       { withCredentials: true }
//     );
//     const resp = { data: res.data, stats: res.status };
//     return resp.data;
//   } catch (error) {
//     return { msg: error?.response.data };
//   }
// }
const courseState = {
  name: "",
  id: "",
  fee: "",
  party_type: "",
  author: "",
  Serial_key: "",
  assigned_tutor: "",
  description: "",
  image: "",
  createdAt: "",
  updatedAt: "",
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
  content: "",
  createdBy: "",
  createdAt: "",
  updatedAt: "",
};
//

const ViewModules = ({ paramsId, paramsName }) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [modules, setModules] = useState([]);
  const [courses, setCourse] = useState(courseState);
  const [question, setQuestion] = useState([]);
  const [deleteHover, setDeleteHover] = useState(false);
  const [modalOpen, setModalOpen] = useState({ module: false, course: false });
  const [retrieve, setRetrieve] = useState("");
  const { ishover } = useSelector((strore) => strore.functions);

  const [response, setResponse] = useState({ moduleMsg: "", questionMsg: "" });

  const moduleurl = "/panel/admin_dashboard/view-module";
  const url = "/panel/edit-question";
  const createurl = "/panel/admin_dashboard/create-module";
  const router = useRouter();
  // const url = "/panel/admin_dashboard/view-module";
  // const createurl = "/panel/admin_dashboard/create-module";

  // console.log(paramsName);
  // console.log(data);
  // const modules = data.filter((i) => i.classId === paramsId);
  // const course = data1.filter((i) => i._id === paramsId);
  const onModuleAdded = (moduleProp) => {
    setData([...modules, moduleProp]);
    setCount(modules.length + 1);
  };
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8000/greendometech/ng/course/admin/${paramsId}`,
          {
            withCredentials: true,
          }
        );

        const res = resp.data.course;
        const {
          name,
          _id,
          fee,
          party_type,
          author,
          Serial_key,
          assigned_tutor,
          description,
          image,
          createdAt,
          updatedAt,
        } = res;
        // console.log(res);
        //console.log(resp.data);
        dispatch(HoverModal(false));
        setRetrieve(resp.data);
        setCourse({
          name,
          id: _id,
          fee,
          party_type,
          author,
          Serial_key,
          assigned_tutor,
          description,
          image,
          createdAt,
          updatedAt,
        });
      } catch (error) {
        return { msg: error?.response.data };
      }
    };
    const fetchModule = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8000/greendometech/ng/module/admin/course/view-module/${paramsId}`,
          {
            withCredentials: true,
          }
        );

        const res = resp.data.modules;
        // console.log(res);
        // console.log(resp.data.modules);
        dispatch(HoverModal(false));
        setRetrieve(resp.data);
        setModules(res);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    const fetchQuestion = async () => {
      try {
        const question = await axios.get(
          `http://localhost:8000/greendometech/ng/module/assessment/admin/all-questions/${paramsId}`,
          {
            withCredentials: true,
          }
        );
        const questionData = question.data.question;

        // const course = res.filter((i) => i._id === paramid);
        // console.log(questionData);
        setQuestion(questionData);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    setDeleteHover(false);
    fetchCourse();
    fetchQuestion();
    fetchModule();
  }, [trigger]);

  const Done = () => {
    router.push(moduleurl, {
      shallow: true,
    });
  };
  const addModule = () => {
    setModalOpen({ module: true });
    setTrigger(false);
  };

  const confirmDelete = async (id) => {
    // console.log(id);
    // let fetchCont = [];
    try {
      await axios
        .all(
          question.map((i) =>
            axios.delete(
              `http://localhost:8000/greendometech/ng/module/assessment/admin/questions/delete/${i._id}/${id}`,
              {
                withCredentials: true,
              }
            )
          ),
          modules.map((i) =>
            axios.delete(
              `http://localhost:8000/greendometech/ng/module/admin-delete-module/${i._id}/${id}`,
              {
                withCredentials: true,
              }
            )
          ),
          axios.delete(
            `http://localhost:8000/greendometech/ng/course/admin/delete/${id}`,
            {
              withCredentials: true,
            }
          )
        )
        .then(
          axios.spread(function (question, module, course) {
            console.log(question, module, course);
          })
        );
      //setResponse({ moduleMsg: data });
    } catch (error) {
      return error;
    }

    setTrigger(true);
    router.push(moduleurl, {
      shallow: true,
    });
  };
  const ignoreDelete = async () => {
    setDeleteHover(false);
  };

  const UpdateCourse = "/panel/admin-update-course";

  const {
    name,
    id,
    fee,
    party_type,
    author,
    Serial_key,
    assigned_tutor,
    description,
    image,
    createdAt,
    updatedAt,
  } = courses;

  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };

  return (
    <main>
      <div>{`All Modules beleonging to ${name}`}</div>
      <CreateModule
        onClosed={() => setModalOpen({ module: false })}
        isOpen={modalOpen.module}
        courseid={paramsId}
        paramsName={paramsName}
        modules={modules}
        setModule={setModules}
        setTrigger={setTrigger}
        trigger={trigger}
      />
      <EditCourse
        onClosed={() => setModalOpen({ course: false })}
        isOpen={modalOpen.course}
        course={courses}
        setCourse={setCourse}
        courseParam={paramsId}
      />
      <section>
        {deleteHover && (
          <div>
            <CourseconfirmationModal
              deleteModule={confirmDelete}
              retainModule={ignoreDelete}
              courseid={paramsId}
            />
          </div>
        )}
        <button onClick={() => Done()}>Done</button>
        <div className=" flex justify-center items-center flex-row">
          <button onClick={() => addModule()}> add module </button>
        </div>
        {/* <Link href={`${createurl}/${paramsName}/${paramsId}`}>
          <div className=" flex justify-center items-center flex-row">
            <button>add module</button>
          </div>
        </Link> */}
        <div>
          <div className=" flex justify-center items-center flex-row">
            <h2>Title: {name}</h2>
            <h4>Serial Key{Serial_key}</h4>
            <h4>Author {author}</h4>
            <h4>fee: {fee}</h4>
          </div>
          <h3>Id: {id}</h3>
          <h3>Party_Type: {party_type}</h3>
          <h3>assigned tutor: {assigned_tutor}</h3>
          <h3>Description: {description}</h3>
          {image && <Image width={200} height={200} src={image} alt="image" />}

          <h3>Created: {createdAt}</h3>
          <h3>Last Updated: {updatedAt}</h3>
          <button onClick={() => toggleMenu()}>update course</button>
        </div>
        {ishover && (
          <div>
            <button onClick={() => setDeleteHover(true)}>delete</button>
            <button onClick={(e) => setModalOpen({ course: true })}>
              Edit course
            </button>
          </div>
        )}

        {modules?.length === 0 ? (
          <div className=" flex justify-center items-center flex-row">
            <h1>no module created</h1>
          </div>
        ) : (
          <div>
            {modules?.map((item, id) => {
              const { _id, title, image } = item;
              const imageType =
                image === undefined || image === "" ? "" : image;
              // console.log(image);
              return (
                <div key={id}>
                  <div>
                    {imageType !== "" ? (
                      <Image width={200} height={200} src={image} alt="image" />
                    ) : (
                      <Image
                        width={200}
                        height={200}
                        src={Greendome}
                        alt="image"
                      />
                    )}
                  </div>
                  <Link href={`${moduleurl}/${paramsName}/${paramsId}/${_id}`}>
                    <div className=" flex justify-center items-center flex-row">
                      <h2>{title}</h2>
                      <h4>{_id}</h4>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default ViewModules;
