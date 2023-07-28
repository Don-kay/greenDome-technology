import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import _ from "lodash";

async function fetchModules() {
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

    const Courses = resp.data;
    return Courses;
  } catch (error) {
    return { msg: error.response.data };
  }
}

const ViewModules = async ({ paramsId, paramsName }) => {
  const Courses = await fetchModules();
  const url = "/panel/admin_dashboard/view-module";

  // console.log(paramsId);
  // console.log(paramsName);

  const courseProp = { data: Courses.course, count: Courses.count };
  const { data, count } = courseProp;
  // console.log(data);
  const modules = data.filter((i) => i.classId === paramsId);
  // const className = data.filter((i) => i.classId === paramsId);
  // console.log(modules);

  return (
    <main>
      <div>{`All Modules beleonging to ${paramsName}`}</div>
      <section>
        <div>
          {modules.map((item, id) => {
            const { _id, title } = item;
            return (
              <div key={id}>
                <Link key={id} href={`${url}/${paramsName}/${title}/${_id}`}>
                  <div
                    key={id}
                    className=" flex justify-center items-center flex-row"
                  >
                    <h2>{title}</h2>
                    <h4>{_id}</h4>
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

export default ViewModules;
