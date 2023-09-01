import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserThunk, loginUserThunk } from "./userThunk";
import { toast } from "react-toastify";
import { addUserLocalStorage } from "../../utilities/localStorage";

// const { setToken, setStatus, setRole } = useGlobalContext();
const initialState = {
  isLoading: true,
  successMsg: "",
  user: "",
  role: [],
  isloggedIn: false,
  userName: "",
  email: "",
  phoneNumber: "",
  errorMsg: "",
  status: "",
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkApi) => {
    return registerUserThunk("/auth/register", user, thunkApi);
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkApi) => {
    return loginUserThunk("/auth/login/email", user, thunkApi);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },

  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      const name = payload.user;
      state.user = name;
      state.isLoading = false;
      // addUserLocalStorage(payload); //stored user token
      toast.success(`welcom dear ${name.lastname}`);
    },
    [registerUser.rejected]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      const data = { data: payload.data, stats: payload.stats };
      state.user = data;
      state.status = data.stats;
      //paload is grabbing data from the res.data endpoint
      state.isLoading = false;
      // addUserLocalStorage(data);
      toast.success(`Welcome Back ${name}`);
    },
    [loginUser.rejected]: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.isLoading = false;
      state.errorMsg = payload?.msg;
      state.status = payload?.stats;
      // state.user = payload.response.data;
      toast.error(payload);
    },
  },
});

export const { setRole } = userSlice.actions;

export default userSlice.reducer;
