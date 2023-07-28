import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import _ from "lodash";

async function fetchCourses() {
  const cookiesStore = cookies();
  const cookie = cookiesStore.get("myToken")?.value;

  try {
    const resp = await axios.get(
      "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
      {
        headers: {
          Cookie: "myToken=" + cookie,
        },
      }
    );

    const Courses = resp.data;
    return Courses;
  } catch (error) {
    return { msg: error.response.data };
  }
}

const AllCourseDisp = async () => {
  const Courses = await fetchCourses();
  const url = "/panel/admin_dashboard/create-module";

  const courseProp = { data: Courses.classes, count: Courses.count };
  const { data, count } = courseProp;

  return (
    <main>
      <div>AllCourses</div>
      <section>
        <div>
          {data.map((item, id) => {
            const { _id, name } = item;
            return (
              <div key={id}>
                <Link key={id} href={`${url}/${name}/${_id}`}>
                  <div
                    key={id}
                    className=" flex justify-center items-center flex-row"
                  >
                    <h2>{item.name}</h2>
                    <h4>{item.Serial_key}</h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default AllCourseDisp;
