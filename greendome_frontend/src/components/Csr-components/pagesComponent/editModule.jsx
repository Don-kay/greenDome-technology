"use client";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Image from "next/image";
import Modal from "react-modal";
import _, { stubString } from "lodash";
import { GetAllUsers } from "@/features/profile/profileSlice";
import { useRouter } from "next/navigation";
import FormRow from "@/components/FormRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function EditModule({
  triggerMod,
  isOpen,
  onClosed,
  module,
  setModule,
  courseId,
  moduleRetrieved,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { users } = useSelector((strore) => strore.profiles);

  // console.log(moduleParam);
  // console.log(moduleName);
  // console.log(courseName);
  const url = "/panel/admin_dashboard/view-module";
  const initialState = {
    title: "",
    content: "",
    description: "",
    featured: "",
    id: "",
    code: "",
    level: "",
    status: "",
  };
  const [course, setCourse] = useState();
  const [updatedModule, setUpdatedModule] = useState(initialState);
  const [statusCont, setStatusCont] = useState();
  const [FeatCont, setFeatCont] = useState();
  const [levelCont, setLevelCont] = useState();
  const [trigger, setTrigger] = useState(false);
  const [img, setImg] = useState(false);
  const [file, setFile] = useState();
  const [checked, setChecked] = useState(false);

  const statusOptions = [
    { value: "1", label: "visible" },
    { value: "2", label: "not visible" },
  ];

  const levelOptions = [
    { value: "1", label: "beginner" },
    { value: "2", label: "intermediate" },
    { value: "3", label: "advanced" },
  ];
  const featuredOptions = [
    { value: "1", label: "true" },
    { value: "2", label: "false" },
  ];
  //console.log(updatedModule);

  useEffect(() => {
    const image = module.image;
    console.log(module);
    const img = image === undefined || image === "" ? "" : image;

    setUpdatedModule({
      title: module.title,
      content: module.content,
      description: module.description,
      id: module.id,
      featured: module.featured,
      status: module.status,
      code: module.code,
      level: module.level,
      status: module.status,
    });
    setFile(img);
    // dispatch(GetAllUsers());
    try {
      const fetch = async () => {
        // const modresp = await axios.get(
        //   `http://localhost:8000/greendometech/ng/module/view-module/${moduleParam}`,
        //   { withCredentials: true }
        // );
        // const module = modresp.data.modules;
        // const courseId = module.classId;

        // const image = module.image;

        // // console.log(image);
        // const img = image === undefined ? undefined : image;

        // setUpdatedModule({
        //   title: module.title,
        //   content: module.content,
        //   description: module.description,
        //   id: module._id,
        //   featured: module.featured,
        //   status: module.status,
        //   code: module.code,
        //   level: module.level,
        //   status: module.status,
        // });
        // setFile(img);
        //console.log(module);
        //  setModules(CourseModules);

        const course = await axios.get(
          `http://localhost:8000/greendometech/ng/course/admin/${courseId}`,
          {
            withCredentials: true,
            credentials: "includes",
          }
        );
        const resp = { data: course.data.course };
        // console.log(resp.data);
        if (resp.data !== undefined) {
          setTrigger(true);
        }
        setCourse(resp.data);
      };

      fetch();
    } catch (error) {
      return { msg: error.response.data };
    }
  }, [trigger, moduleRetrieved]);

  useEffect(() => {
    setLevelCont(_.toString(updatedModule.level));
    setFeatCont(_.toString(updatedModule.featured));
    setStatusCont(_.toString(updatedModule.status));
  }, [updatedModule]);

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

  const handleSelectedStatus = (selectedOptions) => {
    const label = selectedOptions.label;
    setStatusCont(label);
  };
  const handleSelectedFeat = (selectedOptions) => {
    const label = selectedOptions.label;
    setFeatCont(label);
  };

  const handleSelectedLevel = (selectedOptions) => {
    const label = selectedOptions.label;
    setLevelCont(label);
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

  // const handleChecked = (e) => {
  //   const value = e.target.value;
  //   const checked = e.target.checked;
  //   if (checked === true) {
  //     setTutor([...tutor, value]);
  //   } else {
  //     setTutor((prevstate) => prevstate?.filter((i) => i !== value));
  //   }
  //   // console.log(checked);
  //   // console.log(TutorObj);
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdatedModule({ ...updatedModule, [name]: value });
  };

  // const contentValue = contentArr.filter((i) => i.content !== "");
  // const AssignTutorDisplay = AssignedTutor?.map((item, idx) => {
  //   const { username, id } = item;
  //   return (
  //     <div key={idx}>
  //       <label title={username}>{username}</label>
  //       <button onClick={() => handleUnassign(id)}>unassign</button>
  //     </div>
  //   );
  // });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, content, featured, id } = updatedModule;

    const fileType = file === undefined || file === "" ? "" : file;

    // const myCode = parseFloat(code);
    const res = await axios.patch(
      `http://localhost:8000/greendometech/ng/module/admin-update-module/${id}`,
      {
        title: title,
        description: description,
        content: content,
        level: levelCont,
        status: statusCont,
        featured: FeatCont,
        image: fileType,
      },
      {
        withCredentials: true,
        credentials: "include",
      }
    );

    const resp = res.data;
    //console.log(res);
    // console.log(resp.data);
    setModule({
      title: resp.title,
      id: resp._id,
      status: resp.status,
      party_type: resp.party_type,
      level: resp.level,
      completed: resp.completed,
      featured: resp.featured,
      description: resp.description,
      image: resp.image,
      content: resp.content,
      createdAt: resp.createdAt,
      createdBy: resp.createBy,
      updatedAt: resp.updatedAt,
    });
    triggerMod(true);
    if (resp._id !== "" || resp._id !== "") {
      onClosed();
    }
    //console.log(resp._id);
    // console.log(author[0]);
    // router.back();
    // router.push(`${url}/${courseName}/${moduleName}/${moduleParam}`)
  };
  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <button onClick={() => onClosed()}>Go Back</button>
      <div>
        <h3>course</h3>

        <h1>{course?.name}</h1>
        <h4>{course?.Serial_key}</h4>
        <h4>{course?.author}</h4>
        <h4>{course?.fee}</h4>
        {trigger && (
          <Image
            src={trigger && course?.image}
            width={100}
            height={100}
            alt="image"
          />
        )}

        <h4>{course?.createBy}</h4>
      </div>
      <div>edit Module</div>
      <form onSubmit={handleSubmit}>
        <h1>{updatedModule.title}</h1>
        <h1>{updatedModule.id}</h1>
        <h1>{updatedModule.code}</h1>
        <h1>{updatedModule.featured}</h1>
        <FormRow
          type="file"
          accept="image/*"
          name="profile-image"
          // value={url}
          handleChange={handleImageFile}
        />
        <div>
          {img && (
            <small style={{ color: "red" }}>
              image exceeds 1mb, choose another inage
            </small>
          )}
          {file !== "" && (
            <Image width={200} height={200} src={file} alt="image" />
          )}
        </div>
        <div>
          <FormRow
            type="text"
            name="title"
            value={updatedModule.title}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="description"
            value={updatedModule.description}
            handleChange={handleChange}
            // handleOnFocus={handleOnFocus}
            // handleOnBlur={handleOnBlur}
          />
          <FormRow
            type="text"
            name="content"
            value={updatedModule.content}
            handleChange={handleChange}
          />
          <div>
            <h5>featured</h5>
            <Select
              components={makeAnimated()}
              name="featured"
              options={featuredOptions}
              onChange={handleSelectedFeat}
              id="feat"
              isSearchable
              // noOptionsMessage={() => "level not available"}
              placeholder={_.toString(updatedModule.featured)}
            />
          </div>

          <div>
            <h5>Level</h5>
            <Select
              components={makeAnimated()}
              name="level"
              options={levelOptions}
              onChange={handleSelectedLevel}
              id="level"
              isSearchable
              noOptionsMessage={() => "level not available"}
              placeholder={_.toString(updatedModule.level)}
            />
          </div>
          <div>
            <h5>Status</h5>
            <Select
              components={makeAnimated()}
              name="status"
              options={statusOptions}
              onChange={handleSelectedStatus}
              id="status"
              isSearchable
              noOptionsMessage={() => "status not available"}
              placeholder={_.toString(updatedModule.status)}
            />
          </div>
        </div>{" "}
        <button>update course</button>
      </form>
    </Modal>
  );
}

export default EditModule;
