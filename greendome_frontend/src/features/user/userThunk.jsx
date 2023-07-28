import customFetch from "../../utilities/axios";

// import { useSignIn } from "react-auth-kit";

export const registerUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.status;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
  //this fetches the the bass url and builds upp the rest domain
};
export const loginUserThunk = async (url, user, thunkApi) => {
  try {
    const resp = await customFetch.post(url, user, {
      withCredentials: true,
      credentials: "include",
    });
    const response = { data: resp.data, stats: resp.status };

    return response;
  } catch (error) {
    return thunkApi.rejectWithValue({
      msg: error.response.data,
      stats: error.response.status,
    });
  }
  //this fetches the the bass url and builds upp the rest domain
};
