// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../common/constants";
import { toast } from "react-toastify";


// define login async thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      if(error?.code === "ERR_NETWORK"){
        toast.error(error?.message);
        toast.error("Ensure You have an active internet Connection");
      } else{
        toast.error(error?.response?.data?.error);
      }
      throw error;
    }
  }
);

// Define refreshToken async thunk
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState }) => {
    try {
      const { user } = getState().auth;
      const accessToken = user?.data?.access_token;
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update the user token in the Redux state
      const newToken = response.data.token;
      return newToken;
    } catch (error) {
      throw error;
    }
  }
);

// Define logout async thunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    try {
      const { user } = getState().auth;
      const accessToken = user?.data?.access_token;
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      await axios.post(`${API_BASE_URL}auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return null; // Return null after successful logout
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
