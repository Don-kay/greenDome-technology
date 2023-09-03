"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MenuDropDown from "@/components/Csr-components/minuteComponents/menuDropDown";
import { HoverModal } from "@/features/functions/functionSlice";
import Image from "next/image";
import Greendome from "../../asset/greendome.jpg";
import ViewCourse from "./viewCourse";
import { GetAllUsers } from "@/features/profile/profileSlice";
import _ from "lodash";

const CourseDisp = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [course, setCourses] = useState();
  const [assignedTutors, setAssignedTutors] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [id, setId] = useState();
  const { ishover } = useSelector((strore) => strore.functions);
  const { users } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(GetAllUsers());
    const fetchCourses = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
          {
            withCredentials: true,
          }
        );

        const Courses = resp.data.course;
        console.log(Courses);
        setData(Courses);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    dispatch(HoverModal(false));

    fetchCourses();
  }, []);

  const classesId = users.map((i) => i.classesId);

  const toggleMenu = (id) => {
    const singleCourse = data?.filter((item) => item._id === id);
    const CourseTutors = singleCourse?.map((item) => item.assigned_tutor);
    const CourseId = _.toString(singleCourse?.map((item) => item._id));
    const AssignedTutor = users.filter((i) => CourseTutors[0].includes(i.id));
    const AssignedStudents = users.filter((i) =>
      i.classesId.includes(CourseId)
    );

    setCourses(singleCourse);
    setAssignedTutors(AssignedTutor);
    setAssignedStudents(AssignedStudents);
    // console.log();
    // console.log(CourseTutors);
    // console.log(CourseTutors);
    // console.log(CourseId);
    // console.log();
    setId(id);
    setModalOpen(true);
    // dispatch(HoverModal(true));
  };

  // const singleAss = assinged.flat(1);

  return (
    <main>
      <div>All Courses</div>
      <section>
        <ViewCourse
          onClosed={() => setModalOpen(false)}
          isOpen={modalOpen}
          course={course}
          assignedStudents={assignedStudents}
          assignedTutors={assignedTutors}
          courseId={id}
          setCourse={setCourses}
        />
        {data?.map((item, id) => {
          const { _id, name, Serial_key, image } = item;
          const imageType = image === "" || image === undefined ? "" : image;

          return (
            <section key={id}>
              <div
                className=" flex justify-center cursor-pointer items-center flex-row"
                onClick={() => toggleMenu(_id)}
              >
                {imageType !== "" ? (
                  <Image width={200} height={200} src={image} alt="image" />
                ) : (
                  <Image width={200} height={200} src={Greendome} alt="image" />
                )}
                <h2>{name}</h2>
                <h2>{_id}</h2>
                <h4>{Serial_key}</h4>
              </div>

              {/* {ishover && (
                <div>
                  <MenuDropDown id={_id} name={name} />
                </div>
              )} */}
            </section>
          );
        })}
      </section>
    </main>
  );
};

export default CourseDisp;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
