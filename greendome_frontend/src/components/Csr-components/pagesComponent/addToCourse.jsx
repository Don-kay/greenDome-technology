"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetAllUsers } from "@/features/profile/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import CourseHover from "../minuteComponents/courseHover";
import Link from "next/link";
import _ from "lodash";

const AllCourseDisp = ({ params }) => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState([]);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [studentCourses, setStudentCourses] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [studentCourse, setStudentCourse] = useState();
  const { users, errorMsg } = useSelector((strore) => strore.profiles);
  const [rowId, setRowId] = useState(null);

  const url = "/panel/admin_dashboard/view-module";
  const route = "/panel/admin_dashboard/all-students";
  useEffect(() => {
    dispatch(GetAllUsers());

    const fetch = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",

          {
            withCredentials: true,
            credentials: "includes",
          }
        );

        const Courses = resp.data.course;
        // console.log(Courses);

        const student = users.filter((item) => item.id === params);
        const studentName = student.map((i) => {
          return i.username;
        });
        const studentClas = student.map((i) => {
          return i.classesId;
        });
        console.log(studentClas);
        const studentClasses = studentClas[0];

        const studentsCourses = Courses.filter((i) =>
          studentClasses.includes(i._id)
        );
        console.log(studentsCourses);
        setName(_.toString(studentName));
        // console.log(student);
        // console.log(studentClasses);
        // setStudentClass(userClasses)
        // console.log(studentsCourses);
        setStudentCourses(studentsCourses);

        // const allAttendees = s.map((item) => {
        //   return {
        //     id: item.id,
        //     email: item.email,
        //     username: item.username,
        //     firstname: item.firstname,
        //     roles: _.toString(item.roles),
        //     lastname: item.lastname,
        //   }});
        setCourse(Courses);
      } catch (error) {
        return { msg: error.response.data };
      }
    };

    fetch();
  }, []);

  const AddToCourse = async (_id) => {
    axios.defaults.withCredentials = true;
    try {
      const resp = await axios.put(
        `http://localhost:8000/greendometech/ng/course/myclasses/assign-students/${params}/classes/${_id}`,
        {
          method: "PUT",
          withCredentials: true,
          credentials: "includes",
        }
      );

      const userClasses = resp.data.user.classesId;
      const studentsCourses = course.filter((i) => userClasses.includes(i._id));

      // setStudentClass(userClasses)
      //console.log(userClasses);
      setStudentCourses(studentsCourses);
    } catch (error) {
      return { msg: error.response.data };
    }
  };
  const CourseView = (_id) => {
    setId(_id);
    setModalOpen(true);
  };
  useEffect(() => {
    if (id !== "") {
      const dataHov = studentCourses?.filter((i) => i._id === id);
      const singleCourse = dataHov?.map((item) => {
        return {
          id: item._id,
          name: item.name,
          Serial_key: item.Serial_key,
          author: item.author,
          fee: item.fee,

          Party_Type: item.party_type,
          description: item.description,
          // <h3>Content: {item.content}</h3>
          // <h3>Content: {item.content1}</h3>
          // <h3>Content: {item.content2}</h3>
          // <h3>Content: {item.content3}</h3>
          // <h3>Content: {item.content4}</h3>
          // {cont}
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        };
      });
      setStudentCourse(singleCourse);
      // console.log(dataHov);
      // console.log(singleCourse);
    }
  }, [id]);
  // console.log(id);
  return (
    <main>
      <section>
        <div>
          <div>Assign a Course</div>
          <div>
            {course?.map((item, id) => {
              const { _id, name, Serial_key } = item;
              return (
                <div
                  className=" flex justify-center cursor-pointer items-center flex-row"
                  key={id}
                  onClick={() => AddToCourse(_id)}
                >
                  <div
                    key={id}
                    className=" flex justify-center items-center flex-row"
                  >
                    <h2>{_id}</h2>
                    <h2>{name}</h2>
                    <h4>{Serial_key}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div>{`${name}'s paid courses`}</div>
          <div>
            {studentCourses?.map((item, id) => {
              const { _id, name, Serial_key, description, author } = item;
              return (
                <div
                  className=" flex justify-center cursor-pointer items-center flex-row"
                  key={id}
                  onClick={() => AddToCourse(_id)}
                >
                  <div
                    key={id}
                    className=" flex justify-center items-center flex-row"
                    onMouseOver={() => CourseView(_id)}
                  >
                    <h2>{_id}</h2>
                    <h4>{Serial_key}</h4>
                    <h2>{name}</h2>
                    <h4>{description}</h4>
                    <h4>{author}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Link href={route}>
          <button>back</button>
        </Link>
      </section>
      <section>
        <CourseHover
          studentCourse={studentCourse}
          // onClosed={() => setModalOpen(false)}
          // isOpen={modalOpen}
        />
      </section>
    </main>
  );
};

export default AllCourseDisp;
