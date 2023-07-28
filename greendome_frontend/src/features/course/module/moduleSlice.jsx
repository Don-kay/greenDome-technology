import CreateCourse from "@/components/Csr-components/pagesComponent/createCourse";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateModulesThunk,
  CreateQuestionThunk,
  getQuestionThunk,
} from "./moduleThunk";

const initialState = {
  module: "",
  isLoading: false,
  TotalCourse: 0,
  ratedCourse: "",
  singleQuestion: "",
  allQuestions: "",
};

export const GetCourseModules = createAsyncThunk("modules/coursemodules");
// export const GetAllModules = createAsyncThunk(
//   "modules/all-modules",
//   AllCoursesThunk
// );
export const createModules = createAsyncThunk(
  "course/createmodule",
  CreateModulesThunk
);
export const createQuestions = createAsyncThunk(
  "course/createquestions",
  CreateQuestionThunk
);
export const getQuestions = createAsyncThunk(
  "course/getquestions",
  async (question, thunkApi) => {
    return getQuestionThunk(question, thunkApi);
  }
);

const moduleSlice = createSlice({
  name: "module",
  initialState,

  reducers: {
    setTotalModule: (state, action) => {
      state.TotalCourse = action.payload;
    },
    setCourseModule: (state, action) => {
      state.TotalCourse = action.payload;
    },
  },

  extraReducers: {
    [GetCourseModules.pending]: (state) => {
      state.isLoading = true;
    },
    [GetCourseModules.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      // state.course = payload.data.classes;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [GetCourseModules.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createModules.pending]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createModules.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.module = payload?.data.course;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [createModules.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createQuestions.pending]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createQuestions.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.singleQuestion = payload?.data.question;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [createQuestions.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [getQuestions.pending]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [getQuestions.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.allQuestions = payload?.data.question;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [getQuestions.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
  },
});

export const { setTotalModule } = moduleSlice.actions;

export default moduleSlice.reducer;
