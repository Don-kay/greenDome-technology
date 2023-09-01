"use client";
import React, { useState, useEffect } from "react";
import customFetch from "@/utilities/axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { createModules } from "@/features/course/module/moduleSlice";
import CreateQuestionId from "./createQuestionId";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetErrorMsg } from "@/features/course/module/moduleSlice";
import { resetModule } from "@/features/course/module/moduleSlice";
import Image from "next/image";
import FormRow from "@/components/FormRow";
import _, { divide } from "lodash";

const initialStates = {
  title: "",
  description: "",
  content: "",
  code: "",
};

const CreateModule = ({
  paramsName,
  courseid,
  isOpen,
  onClosed,
  modules,
  setModule,
  setTrigger,
  trigger,
}) => {
  const paramName = paramsName;
  //const paramId = paramsId;
  const [values, setValues] = useState(initialStates);
  const [levelCont, setLevelCont] = useState();
  const [modal, setModal] = useState({ show: false, msg: "", type: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [statusCont, setStatusCont] = useState();
  const [file, setFile] = useState();
  const [img, setImg] = useState(false);
  const [onclosetrigger, setOnclosedTrigger] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [module, setObjModule] = useState();
  const [moduleid, setModuleid] = useState();
  const url = "/panel/admin_dashboard/create-module";

  const disPatch = useDispatch();
  const router = useRouter();
  // console.log(paramName);
  // console.log(paramId);

  const statusOptions = [
    { value: "1", label: "visible" },
    { value: "2", label: "not visible" },
  ];
  // const categoryOptions = [
  //   { value: "1", label: "none" },
  //   { value: "2", label: "machine learning" },
  //   { value: "3", label: "html" },
  //   { value: "4", label: "css" },
  //   { value: "4", label: "node js" },
  //   { value: "4", label: "react js" },
  //   { value: "4", label: "full stack development" },
  //   { value: "4", label: "UI/UX" },
  // ];
  const levelOptions = [
    { value: "1", label: "beginner" },
    { value: "2", label: "intermediate" },
    { value: "3", label: "advanced" },
  ];

  const showModal = (show = false, msg = "", type = "") => {
    setModal(show, msg, type);
  };
  useEffect(() => {
    showModal({ show: false });
    disPatch(resetErrorMsg(""));
    disPatch(resetModule(""));
  }, []);
  useEffect(() => {
    onClosed();
  }, [onclosetrigger]);
  // const completedOptions = [
  //   { value: "1", label: true },
  //   { value: "2", label: false },
  // ];
  // const featuredOptions = [
  //   { value: "1", label: true },
  //   { value: "2", label: false },
  // ];

  // useEffect(()=> {
  //   const
  // })
  // const { module, moduleStats, errorMsg } = useSelector(
  //   (strore) => strore.module
  // );
  // const moduleid = module?._id;
  //rerender a module useeeffect
  // if (moduleid !== undefined) {
  //   setModule([...modules, module]);
  //   // setTrigger(true);
  // } else {
  //   null;
  // }

  //console.log(moduleid);

  // useEffect(() => {
  //   if (errorMsg?.msg !== undefined) {
  //     showModal({ show: true });
  //   }
  //   const timeout = setTimeout(() => {
  //     showModal({ show: false });
  //     disPatch(resetErrorMsg(""));
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [errorMsg]);

  // console.log(errorMsg?.msg);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleFeatured = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked === true) {
      setFeatured(true);
    } else {
      setFeatured(false);
    }

    // console.log(checked);
  };

  // console.log(module === "");

  // const handleSelectedcategory = (selectedOptions) => {
  //   const label = selectedOptions.label;
  //   setCategoryCont(label);
  // };

  const customStyles = {
    content: {
      top: "0%",
      left: "0%",
      minWidth: "100vw",
      minHeight: "100vh",
      backgroundColor: "red",
      //   transform: "translate(-50%, -50%)",
      zIndex: 2120,
    },
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

  const handleSelectedLevel = (selectedOptions) => {
    const label = selectedOptions.label;
    setLevelCont(label);
  };
  const handleSelectedStatus = (selectedOptions) => {
    const label = selectedOptions.label;
    setStatusCont(label);
  };
  // const handleSelectedFeatured = (selectedOptions) => {
  //   const label = selectedOptions.label;
  //   setFeaturedCont(label);
  // };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    const { title, description, content, code } = values;
    if (!title || !description || !content || !code) {
      toast.error("please fill out all details");
      return;
    }

    const fileType = file === undefined ? "" : file;

    try {
      const res = await customFetch.post(
        `module/create-module/${paramName}/${courseid}`,
        {
          title: title,
          description: description,
          content: content,
          code: code,
          level: levelCont,
          status: statusCont,
          featured: featured,
          image: fileType,
        },
        {
          withCredentials: true,
          credentials: "includes",
        }
      );
      const resp = { data: res.data, stats: res.status };
      const singleModule = resp.data.modules;
      if (singleModule._id !== "" || singleModule._id !== undefined) {
        setModule([...modules, singleModule]);
        setObjModule(singleModule);
        setModuleid(singleModule._id);
        setValues({ title: "", description: "", content: "", code: "" });
        setFeatured(false);
        setLevelCont("");
        setStatusCont("");
        setFile("");
        setTrigger(true);
      }

      // return console.log(resp);
    } catch (error) {
      return error?.response.data;
      // return console.log(error?.response.data);
      // console.log({ stats: error?.response.status}),

      // stats: error?.response.status,
    }
    // disPatch(
    //   createModules({
    //     title: title,
    //     description: description,
    //     content: content,
    //     code: code,
    //     level: levelCont,
    //     status: statusCont,
    //     featured: featured,
    //     image: fileType,
    //     paramName: paramName,
    //     paramId: courseid,
    //   })
    // );
    // const modules = await axios.get();
  };

  // setTrigger;
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (moduleStats === 201 && module !== "") {

  //     } else {
  //       return;
  //     }
  //   }, 5000);

  //   return () => clearTimeout(timeout);
  // }, [handleSubmitt]);

  return (
    <Modal style={customStyles} isOpen={isOpen} onRequestClose={onClosed}>
      <button onClick={() => onClosed()}>Go Back</button>

      {trigger ? (
        <div style={{ position: "relative", top: "20vh" }}>
          <h1>module successsfully created, would you like to set questions</h1>
          <button onClick={() => onClosed()}>no</button>{" "}
          <button onClick={() => setModalOpen(true)}>yes</button>
        </div>
      ) : (
        <section style={{ position: "relative", top: "20vh" }}>
          <h1>set module for {paramsName}</h1>
          {modal.show && <h2>{errorMsg.msg}</h2>}
          <form action="">
            <button onClick={handleSubmitt} type="submit">
              create
            </button>
            <div>Create Module</div>
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
              {file !== undefined && (
                <Image width={200} height={200} src={file} alt="image" />
              )}
            </div>
            <FormRow
              type="text"
              name="title"
              value={values.title}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="content"
              value={values.content}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="description"
              value={values.description}
              handleChange={handleChange}
            />
            <div>
              <small>should be text and numbers</small>
              <FormRow
                type="text"
                name="code"
                value={values.code}
                handleChange={handleChange}
              />
            </div>

            <FormRow
              type="checkbox"
              name="featured"
              value={featured}
              //   check={featured}
              handleChange={handleFeatured}
            />
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
                placeholder="status"
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
                placeholder="level"
              />
            </div>
          </form>
        </section>
      )}
      <CreateQuestionId
        onClosed={() => setModalOpen(false)}
        isOpen={modalOpen}
        moduleid={moduleid}
        courseid={courseid}
        paramsName={paramName}
        moduler={module}
        setOnclosed={setOnclosedTrigger}
      />
    </Modal>
  );
};

export default CreateModule;

// router.push(`${url}/${paramName}/${courseid}/${moduleid}`);
