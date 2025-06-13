import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    console.log("hitting")
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/login`, {
        email,
        password,
      });
      console.log(response.data)
      return response.data; // { accessToken, refreshToken (optional), user }
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Login failed');
    }
  }
);

// Signup Thunk (optional)
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (signupData, { rejectWithValue }) => {
    try {
        console.log("inside slice")
      const response = await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/signup`, signupData);
      console.log(response.data)
      return response.data; // You can decide what your API returns
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Signup failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally set accessToken + user if your signup returns them
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
