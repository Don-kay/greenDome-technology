import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import Greendome from "../../../../../components/asset/greendome.jpg";
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
      },
      { withCredentials: true }
    );

    const Courses = resp.data;
    return Courses;
  } catch (error) {
    return { msg: error.response.data };
  }
}

const AllCourseDisp = async () => {
  const Courses = await fetchCourses();
  const url = "/panel/admin_dashboard/view-module";

  const courseProp = { data: Courses.course, count: Courses.count };
  const { data, count } = courseProp;

  return (
    <main>
      <div>All course</div>
      <section>
        <div>
          {data?.map((item, id) => {
            const { _id, name, Serial_key, image } = item;
            const imageType = image === "" || image === undefined ? "" : image;
            return (
              <div key={id}>
                <Link key={id} href={`${url}/${name}/${_id}`}>
                  <div
                    key={id}
                    className=" flex justify-center items-center flex-row"
                  >
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
