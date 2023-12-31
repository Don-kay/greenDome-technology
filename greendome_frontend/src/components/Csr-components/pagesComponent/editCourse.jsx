"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Image from "next/image";
import _ from "lodash";
import { HoverModal } from "@/features/functions/functionSlice";
import { GetAllUsers } from "@/features/profile/profileSlice";
import { useRouter } from "next/navigation";
import FormRow from "@/components/FormRow";
import UpdateDropDown from "../minuteComponents/updateDropDown";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditCourse({ courseParam, isOpen, onClosed, setCourse }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const { users } = useSelector((strore) => strore.profiles);

  // console.log(moduleParam);
  // console.log(moduleName);
  // console.log(courseName);
  const url = "/panel/admin_dashboard/view-module";
  const initialState = {
    Serial_key: "",
    author: "",
    description: "",
    fee: "",
    name: "",
    party_type: [],
    id: "",
    createdAt: "",
    createdBy: "",
    updatedAt: "",
    assigned_tutor: [],
  };
  const [updatedCourse, setUpdatedCourse] = useState(initialState);
  const [tutor, setTutor] = useState([]);
  const [modules, setModules] = useState();
  const [trigger, setTrigger] = useState("");
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState("");
  const [img, setImg] = useState(false);
  const { ishover } = useSelector((strore) => strore.functions);
  // const [party, setParty] = useState();
  // console.log(contentValue);
  // console.log(updatedCourse.content10);

  const Tutor = users?.filter((i) => i.roles.includes("tutor"));
  const authorObj = users?.filter((i) => i.id === updatedCourse.createdBy);
  const author = authorObj?.map((i) => {
    return i.roles;
  });

  const customStyles = {
    content: {
      position: "relative",
      top: "0%",
      left: "20vw",
      minWidth: "100vw",
      maxHeight: "100vh",
      overflowY: "auto",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
  };

  const AssignedTutor = users?.filter((i) =>
    updatedCourse.assigned_tutor.includes(i.id)
  );
  const TutorId = Tutor?.map((i) => {
    return { username: i.username, id: i.id, image: i.image };
  });
  const assignTuTor = async (id) => {
    const assignedTutor = await axios.put(
      `http://localhost:8000/greendometech/ng/course/admin-assign-tutor/${courseParam}`,
      {
        assigned_tutor: id,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    // setTrigger(id);
    // setChecked((prev) => !prev);
    // console.log(assignedTutor.status);
    const status = assignedTutor.status;
    if (status === 200) {
      setTrigger(id);
    } else {
      setTrigger();
    }

    // console.log(TutorObj);
  };

  useEffect(() => {
    dispatch(HoverModal(false));
    dispatch(GetAllUsers());
    try {
      const fetch = async () => {
        const course = await axios.get(
          `http://localhost:8000/greendometech/ng/course/admin/${courseParam}`,
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const resp = { data: course.data.course };
        const singleCourse = resp.data;
        // console.log(resp.data);
        setUpdatedCourse({
          Serial_key: singleCourse.Serial_key,
          author: singleCourse.author,
          description: singleCourse.description,
          fee: singleCourse.fee,
          name: singleCourse.name,
          party_type: singleCourse.party_type,
          id: singleCourse._id,
          createdBy: singleCourse.createdBy,
          createdAt: singleCourse.createdAt,
          updatedAt: singleCourse.updatedAt,
          assigned_tutor: singleCourse.assigned_tutor,
        });
        setFile(singleCourse.image);

        const modresp = await axios.get(
          "http://localhost:8000/greendometech/ng/module/view-all-module",
          { withCredentials: true }
        );
        const module = modresp.data.modules;
        const CourseModules = module.filter(
          (i) => i.classId === singleCourse._id
        );
        setModules(CourseModules);
        // setQuestionCont(resp.data);
      };

      fetch();
    } catch (error) {
      return { msg: error.response.data };
    }
  }, [trigger]);

  // const id = _.toString(singleQuestion?.map((i) => i._id));
  // console.log(AssignedTutor);

  // console.log(file);
  // console.log(updatedCourse.image);

  const handleSelected = async () => {
    const assignedTutor = await axios.put(
      `http://localhost:8000/greendometech/ng/course/admin-assign-tutor/${courseParam}`,
      {
        assigned_tutor: tutor,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    // setTrigger(id);
    setChecked(false);
    // console.log(assignedTutor);
    setTrigger(assignedTutor);
    // console.log(TutorObj);
  };
  const handleUnassign = async (id) => {
    const assignedTutor = await axios.put(
      `http://localhost:8000/greendometech/ng/course/admin-unassign-tutor/${courseParam}`,
      {
        assigned_tutor: id,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    // setTrigger(id);
    // setChecked((prev) => !prev);
    // console.log(assignedTutor);
    setTrigger(assignedTutor);
    // console.log(TutorObj);
  };

  const handleChecked = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked === true) {
      setTutor([...tutor, value]);
    } else {
      setTutor((prevstate) => prevstate?.filter((i) => i !== value));
    }
    // console.log(checked);
    // console.log(TutorObj);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatedCourse({ ...updatedCourse, [name]: value });
  };

  const AssignTutorDisplay = AssignedTutor?.map((item, idx) => {
    const { username, id, image } = item;
    return (
      <div key={idx}>
        <label title={username}>{username}</label>
        <Image src={image} width={100} height={100} alt="image" />
        <button onClick={() => handleUnassign(id)}>unassign</button>
      </div>
    );
  });
  // const contentDisplay = contentArr?.map((item, id) => {
  //   return (
  //     <div key={id}>
  //       <FormRow
  //         type="text"
  //         name={`${item.id}`}
  //         value={item.content}
  //         handleChange={handleChange}
  //       />
  //     </div>
  //   );
  // });
  const toggleMenu = () => {
    dispatch(HoverModal(true));
  };

  const handleImageFile = (e) => {
    e.preventDefault();
    const file = e.target.files;

    if (file[0]?.size < 1024 * 1024 && file[0].type.startsWith("image/")) {
      setImageFiletoBase(file[0]);
      // console.log(file[0]?.name);
    } else if (
      file[0]?.size > 1024 * 1024 &&
      file[0].type.startsWith("image/")
    ) {
      setImg(true);
    }
  };
  const setImageFiletoBase = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // console.log(reader.result);
        if (reader.result !== "") {
          setImg(false);
          setFile(reader.result);
        }
      };
    } catch (error) {
      return;
    }

    // setFile(file[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { description, fee, name } = updatedCourse;

    const resp = await axios.patch(
      `http://localhost:8000/greendometech/ng/course/admin/update/${courseParam}`,
      {
        description: description,
        fee: fee,
        name: name,
        party_type: author[0],
        image: file,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );
    const res = resp.data.course;
    if (res) {
      setCourse({
        name: res.name,
        id: res._id,
        fee: res.fee,
        party_type: res.party_type,
        author: res.author,
        Serial_key: res.Serial_key,
        assigned_tutor: res.assigned_tutor,
        description: res.description,
        image: res.image,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      });
      onClosed();
    }

    // router.push(`${url2}/${paramName}/${courseid}/${moduleParam}`);

    return;

    // console.log(res.data);
    // console.log(file);
    // console.log(author[0]);
    //router.back();
    // router.push(`${url}/${courseName}/${moduleName}/${moduleParam}`)
  };
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <div>edit course {updatedCourse.name}</div>
      <button onClick={() => onClosed()}>back</button>
      <form onSubmit={handleSubmit}>
        <h1>{updatedCourse.id}</h1>
        <h1>{updatedCourse.Serial_key}</h1>
        <h1>{updatedCourse.party_type}</h1>

        <div>
          <FormRow
            type="text"
            name="name"
            value={updatedCourse.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="description"
            value={updatedCourse.description}
            handleChange={handleChange}
            // handleOnFocus={handleOnFocus}
            // handleOnBlur={handleOnBlur}
          />
          <FormRow
            type="text"
            name="fee"
            value={updatedCourse.fee}
            handleChange={handleChange}
          />
          <FormRow
            type="file"
            accept="image/*"
            name="profile-image"
            // value={values.password}
            handleChange={handleImageFile}
          />
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}

          {file === "" || file === undefined ? (
            ""
          ) : (
            <Image src={file} width={100} height={100} alt="image" />
          )}

          <button>update course</button>
        </div>
      </form>
      {modules?.length === 0 ? (
        <div>
          <h1>no module created </h1>
        </div>
      ) : (
        <div>
          <h3>modules</h3>
          {modules?.map((item, id) => {
            const { _id, title } = item;
            return (
              <section key={id}>
                <div
                  key={id}
                  className=" flex justify-center cursor-pointer items-center flex-row"
                  onClick={() => toggleMenu()}
                >
                  <h2>{title}</h2>
                  <h4>{item.code}</h4>
                </div>

                {ishover && (
                  <div>
                    <UpdateDropDown id={_id} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
      <div>
        {TutorId?.length < 0 ? (
          <div>
            <p>no available tutor at the moment</p>
          </div>
        ) : (
          <div>
            <h5>assigned tutor</h5>
            {TutorId?.map((item, idx) => {
              const { username, id, image } = item;
              return (
                <div key={idx}>
                  <FormRow
                    type="checkbox"
                    name={username}
                    value={id}
                    handleChange={handleChecked}
                  />
                  <Image src={image} width={100} height={100} alt="image" />
                  <button key={idx} onClick={() => assignTuTor(id)}>
                    {updatedCourse.assigned_tutor.includes(id)
                      ? "signed"
                      : "assign"}
                  </button>
                </div>
              );
            })}
            <button onClick={() => handleSelected()}>submit selected</button>
          </div>
        )}
        {AssignedTutor?.length < 0 ? (
          <div>
            <h5>assigned tutor</h5>
            <p>this course has no signed tutor</p>
          </div>
        ) : (
          <div>
            <h5>assigned tutor</h5>
            {AssignTutorDisplay}
          </div>
        )}
      </div>
    </Modal>
  );
}

export default EditCourse;
