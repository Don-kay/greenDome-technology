import CreateCourse from "@/components/Csr-components/pagesComponent/createCourse";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllCoursesThunk, CreateCoursesThunk } from "./courseThunk";

const initialState = {
  course: "",
  isLoading: false,
  TotalCourse: 0,
  ratedCourse: "",
};

export const GetAllCourse = createAsyncThunk(
  "course/allcourse",
  AllCoursesThunk
);
export const createCourse = createAsyncThunk(
  "course/createcourse",
  CreateCoursesThunk
);

const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {
    setTotalCourse: (state, action) => {
      state.TotalCourse = action.payload;
    },
    setRatedCourse: (state, action) => {
      state.ratedCourse = action.payload;
    },
  },

  extraReducers: {
    [GetAllCourse.pending]: (state) => {
      state.isLoading = true;
    },
    [GetAllCourse.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      // state.course = payload.data.classes;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [GetAllCourse.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createCourse.pending]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
    [createCourse.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      // state.course = payload.data.course;
      // state.TotalCourse = payload.data.count;
      state.isLoading = false;
    },
    [createCourse.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = true;
    },
  },
});

export const { setTotalCourse, setRatedCourse } = courseSlice.actions;

export default courseSlice.reducer;
