import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getUserDetails = createAsyncThunk(
  'data/getUser',
  async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    const response = await axios.get('http://localhost:5000/users/get-userdetails',{headers});
    return response.data;
  }
);

// export const editProfile = createAsyncThunk(
//     'data/editUser',
//     async (data) => {
        
//       const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${data.token}`
//         };
//       const response = await axios.patch('http://localhost:5000/users/edit-profile',{name:data.name},{headers});
//       return response.data;
//     }
//   );

export const editProfile = createAsyncThunk(
    'data/editUser',
    async (data, { rejectWithValue }) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data.token}`,
      };
  
      try {
        const response = await axios.patch('http://localhost:5000/users/edit-profile', { name: data.name,email:data.email  }, { headers });
        return response.data;
      } catch (error) {
        // Check if there's a response from the server and return the error message
        if (error.response) {
          // Server responded with a status code other than 2xx
          return rejectWithValue(error.response.data.msg); // Return the error message
        } else if (error.request) {
          // The request was made but no response was received
          return rejectWithValue('No response received from server.');
        } else {
          // Something happened in setting up the request
          return rejectWithValue('An error occurred: ' + error.message);
        }
      }
    }
  );
  




export const getUserSlice = createSlice({
  name: 'UserDetails',
  initialState: {
    getUserDetailsData: [],
    editUserprofileData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getUserDetailsData = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //handle edit prfile
      .addCase(editProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.editUserprofileData = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      
  },
});

export default getUserSlice.reducer;
