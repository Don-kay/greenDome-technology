"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MenuDropDown from "@/components/Csr-components/minuteComponents/menuDropDown";
import { HoverModal } from "@/features/functions/functionSlice";
import _ from "lodash";

const CourseDisp = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { ishover } = useSelector((strore) => strore.functions);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
          {
            withCredentials: true,
          }
        );

        const Courses = resp.data.course;
        setData(Courses);
      } catch (error) {
        return { msg: error.response.data };
      }
    };
    dispatch(HoverModal(false));

    fetchCourses();
  }, []);

  const toggleMenu = ({ ...item }) => {
    // const param = { ...item };
    // console.log(param);
    // setId(param);
    dispatch(HoverModal(true));
  };
  return (
    <main>
      <div>All Courses</div>
      <section>
        <div>
          {data?.map((item, id) => {
            const { _id, name, Serial_key } = item;
            return (
              <section key={id}>
                <div
                  key={id}
                  className=" flex justify-center cursor-pointer items-center flex-row"
                  onClick={() => toggleMenu({ _id, name })}
                >
                  <h2>{name}</h2>
                  <h4>{Serial_key}</h4>
                </div>

                {ishover && (
                  <div>
                    <MenuDropDown id={_id} name={name} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default CourseDisp;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
