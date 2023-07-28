"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  createModules,
  createQuestions,
} from "@/features/course/module/moduleSlice";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "@/components/FormRow";

const initialStates = {
  title: "",
  description: "",
  content: "",
  code: "",
};
const questionsinitialStates = {
  question: "",
  a: "",
  b: "",
  c: "",
  d: "",
  answer: "",
};

const CreateModule = ({ paramsName, paramsId }) => {
  const paramName = paramsName;
  const paramId = paramsId;
  const [values, setValues] = useState(initialStates);
  const [questioner, setquestioners] = useState(questionsinitialStates);
  const [categoryCont, setCategoryCont] = useState();
  const [levelCont, setLevelCont] = useState();
  const [statusCont, setStatusCont] = useState();
  const [featured, setFeatured] = useState(false);
  const { module } = useSelector((strore) => strore.module);
  const disPatch = useDispatch();

  const statusOptions = [
    { value: "1", label: "visible" },
    { value: "2", label: "not visible" },
  ];
  const categoryOptions = [
    { value: "1", label: "none" },
    { value: "2", label: "machine learning" },
    { value: "3", label: "html" },
    { value: "4", label: "css" },
    { value: "4", label: "node js" },
    { value: "4", label: "react js" },
    { value: "4", label: "full stack development" },
    { value: "4", label: "UI/UX" },
  ];
  const levelOptions = [
    { value: "1", label: "beginner" },
    { value: "2", label: "intermediate" },
    { value: "3", label: "advanced" },
  ];
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const handleQuestionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setquestioners({ ...questioner, [name]: value });
  };
  const handleFeatured = (e) => {
    const value = e.target.value;
    setFeatured(!featured);
    console.log(featured);
  };

  const handleSelectedcategory = (selectedOptions) => {
    const label = selectedOptions.label;
    setCategoryCont(label);
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

    const myCode = parseFloat(code);
    disPatch(
      createModules({
        title: title,
        description: description,
        content: content,
        code: myCode,
        category: categoryCont,
        level: levelCont,
        status: statusCont,
        featured: featured,
        paramName: paramName,
        paramId: paramId,
      })
    );
    // const modules = await axios.get();
  };
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    const { _id } = module;
    const { question, a, b, c, d, answer } = questioner;
    if (!question || !a || !b || !c || !d || !answer) {
      toast.error("please fill out all details");
      return;
    }

    disPatch(
      createQuestions({
        moduleId: _id,
        question: question,
        option1: a,
        option2: b,
        option3: c,
        option4: d,
        answer: answer,
      })
    );
    console.log(_id);
    console.log(questioner.question);
    // const modules = await axios.get();
  };

  return (
    <main>
      <section>
        <form action="">
          <button onClick={handleSubmitt} type="submit">
            create
          </button>
          <div>Create Module</div>
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

          <FormRow
            type="text"
            name="code"
            value={values.code}
            handleChange={handleChange}
          />
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
            <h5>category</h5>
            <Select
              components={makeAnimated()}
              name="category"
              options={categoryOptions}
              onChange={handleSelectedcategory}
              id="category"
              isSearchable
              noOptionsMessage={() => "status not available"}
              placeholder="category"
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
          {/* <div>
          <h5>Featured</h5>
          <Select
            components={makeAnimated()}
            name="featured"
            options={featuredOptions}
            onChange={handleSelectedFeatured}
            id="featured"
            isSearchable
            noOptionsMessage={() => "featured not available"}
            placeholder="featured"
          />
        </div> */}
          {/* <div>
          <h5>Completed</h5>
          <Select
            components={makeAnimated()}
            name="completed"
            options={completedOptions}
            id="completed"
            isSearchable
            noOptionsMessage={() => "checkbox not available"}
            placeholder="completed"
          />
        </div> */}
        </form>
      </section>
      <section>
        <form action="" onSubmit={handleSubmitQuestion}>
          <div>set questions</div>
          <FormRow
            type="text"
            name="question"
            value={questioner.question}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="a"
            value={questioner.a}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="b"
            value={questioner.b}
            handleChange={handleQuestionChange}
          />

          <FormRow
            type="text"
            name="c"
            value={questioner.c}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="d"
            value={questioner.d}
            //   check={featured}
            handleChange={handleQuestionChange}
          />
          <FormRow
            type="text"
            name="answer"
            value={questioner.answer}
            //   check={featured}
            handleChange={handleQuestionChange}
          />
          <button style={{ position: "relative", left: "50%" }} type="submit">
            create
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateModule;
