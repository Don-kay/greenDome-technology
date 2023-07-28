import customFetch from "@/utilities/axios";

export const AllCoursesThunk = async (_, thunkApi) => {
  try {
    const res = await customFetch.get("/classes/admin/view-all-classes", {
      withCredentials: true,
      credentials: "includes",
    });
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
export const CreateCoursesThunk = async (course, thunkApi) => {
  console.log(course);
  try {
    const res = await customFetch.post("course/create-course", course, {
      withCredentials: true,
      credentials: "includes",
    });
    const resp = { data: res.data, stats: res.status };
    return resp;
  } catch (error) {
    thunkApi.rejectWithValue({
      msg: error?.response.data,
      stats: error?.response.status,
    });
  }
};
