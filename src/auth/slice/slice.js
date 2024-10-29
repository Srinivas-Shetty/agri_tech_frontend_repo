import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (phoneNumber) => {
    console.log(phoneNumber,"phoneNumber");
    
    const response = await axios.post('http://localhost:5000/auth/send-otp',{mobileNumber:phoneNumber});
    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  'data/verifyOtp',
  async (  data ) => {
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.token}`
    };
    const response = await axios.post('http://localhost:5000/auth/login', 
      {userOtp:data.userOtp },
      { headers },
      
    );
    return response.data;
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    sendOtpData: [],
    verifyOtpData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sendOtpData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle verify OTP actions
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.verifyOtpData = action.payload; // Store OTP verification response
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
