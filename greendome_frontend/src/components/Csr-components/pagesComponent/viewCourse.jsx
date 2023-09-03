"use client";
import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { CourseconfirmationModal } from "../minuteComponents/confirmationModal";
import CreateModule from "./createModule";
import EditCourse from "./editCourse";
import _ from "lodash";
import Modal from "react-modal";
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

const ViewCourse = ({
  isOpen,
  onClosed,
  course,
  assignedTutors,
  assignedStudents,
  courseId,
  setCourse,
}) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [singleCourse, setSingleCourse] = useState([]);
  const { ishover } = useSelector((strore) => strore.functions);
  const [response, setResponse] = useState({ moduleMsg: "", questionMsg: "" });
  const moduleurl = "/panel/admin_dashboard/view-module";
  const url = "/panel/edit-question";
  const createurl = "/panel/admin_dashboard/create-module";
  const router = useRouter();

  const Done = () => {};
  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     try {
  //       const course = await axios.get(
  //         `http://localhost:8000/greendometech/ng/course/admin/${courseId}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       const courses = course.data.course;
  //       setSingleCourse(courses);
  //     } catch (error) {
  //       return { msg: error?.response.data };
  //     }

  //     //   console.log(cookie);
  //   };
  // }, [course]);

  const customStyles = {
    content: {
      position: "relative",
      top: "0vh",
      left: "15%",
      minWidth: "100vw",
      overflow: "auto",
      maxHeight: "100vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };

  const AssignedTutors = assignedTutors?.map((item, id) => {
    const { image } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div key={id}>
        {imageType !== "" ? (
          <Image width={200} height={200} src={image} alt="image" />
        ) : (
          <Image width={200} height={200} src={Greendome} alt="image" />
        )}
        <h2>title: {item.username}</h2>
        <h2>certificate: {item.certificate}</h2>
        <h2>roles: {item.roles}</h2>
        <h2>email: {item.email}</h2>
        <small>id: {item.id}</small>
      </div>
    );
  });
  const AssignedStudents = assignedStudents?.map((item, id) => {
    const { image } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div key={id}>
        {imageType !== "" ? (
          <Image width={200} height={200} src={image} alt="image" />
        ) : (
          <Image width={200} height={200} src={Greendome} alt="image" />
        )}
        <h2>title: {item.username}</h2>
        <h2>certificate: {item.certificate}</h2>
        <h2>roles: {item.roles}</h2>
        <h2>email: {item.email}</h2>
        <small>id: {item.id}</small>
      </div>
    );
  });

  // const toggleMenu = () => {
  //   dispatch(HoverModal(true));
  // };

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      {/* <EditCourse
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        courseParam={courseId}
        setSingleCourse={setSingleCourse}
        setCourse={setCourse}
      /> */}
      {course?.map((i, id) => {
        const {
          name,
          Serial_key,
          author,
          image,
          fee,
          _id,
          party_type,
          description,
          createdAt,
          updatedAt,
        } = i;
        const imageType = image === undefined || image === "" ? "" : image;
        return (
          <section key={id}>
            <div>{` ${name}`}</div>
            <button onClick={() => onClosed()}>Done</button>
            <div>
              {imageType !== "" ? (
                <Image width={200} height={200} src={image} alt="image" />
              ) : (
                <Image width={200} height={200} src={Greendome} alt="image" />
              )}
              <div className=" flex justify-center items-center flex-row">
                <h3>Id: {_id}</h3>
                <h2>Title: {name}</h2>
                <h4>Serial Key{Serial_key}</h4>
                <h4>Author {author}</h4>
                <h4>fee: {fee}</h4>
              </div>
              <h3>Party_Type: {party_type}</h3>
              <h3>Description: {description}</h3>

              <h3>Created: {createdAt}</h3>
              <h3>Last Updated: {updatedAt}</h3>
            </div>
            <div>
              assigned tutors
              {AssignedTutors}
            </div>
            <div>
              assigned students
              {AssignedStudents}
            </div>
            {/* <button onClick={() => setModalOpen(true)}>edit course</button> */}
            {/* {ishover && (
              <div>
                <button onClick={() => setDeleteHover(true)}>delete</button>
                <button onClick={(e) => setModalOpen({ course: true })}>
                  Edit course
                </button>
              </div>
            )} */}
          </section>
        );
      })}
    </Modal>
  );
};

export default ViewCourse;
