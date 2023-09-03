"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ConfirmationModal from "../minuteComponents/confirmationModal";
import functionsSpace from "@/features/functions/functions";
import EditUserProfile from "./editProfile";
import moment from "moment";
import _ from "lodash";
import Image from "next/image";
import EditQuestion from "./editQuestion2";
import CreateQuestion from "./createQuestion";
import EditModule from "./editModule";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import Greendome from "../../asset/greendome.jpg";
import { HoverModal } from "@/features/functions/functionSlice";
import Link from "next/link";
import { AiFillSetting, AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

const initialState = {
  id: "",
  email: "",
  country: "",
  mobilenumber: "",
  image: "",
  roles: "",
  certificate: "",
  classesId: "",
  firstname: "",
  lastname: "",
  username: "",
  biography: "",
  createdAt: "",
  updatedAt: "",
};
const UserView = ({ userid }) => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [user, setUser] = useState(initialState);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { ishover } = useSelector((strore) => strore.functions);
  const { users } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(HoverModal(false));
    const fetchCourse = async () => {
      try {
        const course = await axios.get(
          "http://localhost:8000/greendometech/ng/course/admin/view-all-course",
          {
            withCredentials: true,
          }
        );
        const courses = course.data.course;
        setCourses(courses);
      } catch (error) {
        return { msg: error?.response.data };
      }

      //   console.log(cookie);
    };
    const fetchProfiles = async () => {
      try {
        const profiles = await axios.get(
          `http://localhost:8000/greendometech/ng/auth/users/${userid}`,
          {
            withCredentials: true,
          }
        );

        const users = profiles.data.user;
        const {
          _id,
          email,
          country,
          mobilenumber,
          image,
          roles,
          certificate,
          classesId,
          firstname,
          lastname,
          username,
          biography,
          createdAt,
          updatedAt,
        } = users;
        const img = image === undefined || image === "" ? "" : image;
        // console.log(username);
        setUser({
          id: _id,
          email,
          country,
          mobilenumber,
          image: img,
          roles,
          certificate,
          classesId,
          firstname,
          lastname,
          username,
          biography,
          createdAt,
          updatedAt,
        });
      } catch (error) {
        return { msg: error?.response };
      }

      //   console.log(cookie);
    };

    // setDeleteHover(false);
    fetchCourse();
    fetchProfiles();
  }, []);

  const {
    id,
    email,
    country,
    mobilenumber,
    certificate,
    roles,
    firstname,
    lastname,
    username,
    image,
    classesId,
    biography,
    createdAt,
    updatedAt,
  } = user;

  const authorCourses = courses?.filter((item) => item.createdBy === userid);
  const assinged = classesId;
  // const singleAss = assinged.flat(1);
  const paidCourses = courses.filter((i) => assinged.includes(i._id));

  const contentDisplay = paidCourses?.map((item, id) => {
    const { image } = item;
    const imageType = image === undefined || image === "" ? "" : image;
    return (
      <div key={id}>
        {imageType !== "" ? (
          <Image width={200} height={200} src={image} alt="image" />
        ) : (
          <Image width={200} height={200} src={Greendome} alt="image" />
        )}
        <h2 key={id}>title: {item.name}</h2>
        <small>id: {item._id}</small>
      </div>
    );
  });

  const phoneNumber = `${country}-${mobilenumber}`;
  const Roles = functionsSpace(roles);
  const Certificate = functionsSpace(certificate);
  const created = moment(createdAt).format("YYYY-MM-DD HH:MM:SS");
  const updated = moment(updatedAt).format("YYYY-MM-DD HH:MM:SS");

  const headers = authorCourses.map((item, id) => {
    const {
      party_type,
      Serial_key,
      author,
      createdBy,
      fee,
      name,
      assigned_tutor,
      _id,
    } = item;
    const parties = _.toString(functionsSpace(party_type));
    const stringifyTutors = _.toString(functionsSpace(assigned_tutor));
    const AssignedTutor = users.filter((i) => assigned_tutor.includes(i.id));
    const AssignedStudent = users.filter((i) => i.classesId.includes(_id));
    const AssignStudentDisplay = AssignedStudent?.map((item, idx) => {
      const { username, id, image } = item;
      const imageType = image === "" || image === undefined ? "" : image;
      return (
        <div key={idx}>
          <label title={username}>{username}</label>
          {imageType !== "" ? (
            <Image width={200} height={200} src={image} alt="image" />
          ) : (
            <Image width={200} height={200} src={Greendome} alt="image" />
          )}
        </div>
      );
    });
    const AssignTutorDisplay = AssignedTutor?.map((item, idx) => {
      const { username, id, image } = item;
      const imageType = image === "" || image === undefined ? "" : image;
      return (
        <div key={idx}>
          <label title={username}>{username}</label>
          {imageType !== "" ? (
            <Image width={200} height={200} src={image} alt="image" />
          ) : (
            <Image width={200} height={200} src={Greendome} alt="image" />
          )}
        </div>
      );
    });
    // console.log(AssignedTutor);
    // console.log(AssignedStudent);
    const courseTutors = `${stringifyTutors}`;

    return (
      <tbody key={id}>
        <tr key={id} className="">
          <td className=" text-center">{name}</td>
          <td className=" text-center ">{Serial_key}</td>
          <td className=" text-center ">{AssignStudentDisplay}</td>
          <td className=" text-center ">{AssignTutorDisplay}</td>
          <td className=" text-center ">{fee}</td>
          <td className=" text-center ">{parties}</td>
          <td className=" text-center ">{author}</td>
        </tr>
      </tbody>
    );
  });

  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };
  const imageType = image === undefined || image === "" ? "" : image;

  return (
    <main>
      <EditUserProfile
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        studentid={userid}
        setUser={setUser}
      />

      <button onClick={() => onClosed()}>back</button>
      <section>
        <div>{`welcome  ${username}, please view your profile`}</div>
        <div className="">
          <div>
            <p>{id}</p>
            {imageType !== "" ? (
              <Image width={200} height={200} src={image} alt="image" />
            ) : (
              <Image width={200} height={200} src={Greendome} alt="image" />
            )}
            <div>
              <h3>Username: </h3> <h2>{username}</h2>
            </div>
            <div>
              <h3>firstname: </h3> <h2>{firstname}</h2>
            </div>
            <div>
              <h3>Lastname: </h3> <h2>{lastname}</h2>
            </div>
            <div>
              <h3>email: </h3> <h2>{email}</h2>
            </div>
            <div>
              <h3>Mobile: </h3> <h2>{`+${phoneNumber}`}</h2>
            </div>
            <div>
              <h3>Role: </h3> <h2>{Roles}</h2>
            </div>
            <div>
              <h3>Active membership: </h3> <h2>{contentDisplay}</h2>
            </div>
            <div>
              <h3>Biography: </h3> <h2>{biography}</h2>
            </div>
            <div>
              <h3>Member since: </h3> <h2>{created}</h2>
            </div>
            <div>
              <h3>Last Updated: </h3> <h2>{updated}</h2>
            </div>
            <div>
              <h3>Certificate: </h3> <h2>{Certificate}</h2>
            </div>
          </div>
          <button onClick={() => toggleMenu()}>update user</button>
          {ishover && (
            <div>
              {/* <button onClick={() => setDeleteHover(true)}>delete</button> */}
              <button onClick={() => setModalOpen(true)}>update</button>
            </div>
          )}
        </div>
        <div>
          <table className=" max-w-thead p-responsive bg-purple border outline-zinc-400">
            <thead>
              <tr className="">
                <th className="  bg-dark w-80">name</th>
                <th className=" w-80">serial key</th>
                <th className=" w-80">no. of students</th>
                <th className=" w-80">instructors</th>
                <th className=" w-80">fee</th>
                <th className=" w-80">party-tpye</th>
                <th className=" w-80">author</th>
              </tr>
            </thead>
            {headers}
          </table>
        </div>
        <div>
          <p>Edit</p>
          <button onClick={() => setModalOpen(true)}>
            <AiFillSetting />
          </button>
        </div>
      </section>
    </main>
  );
};

export default UserView;
{
  /* <Link key={id} href={`${url}/${name}/${_id}`}></Link>; */
}
