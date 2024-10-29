import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllFertilizers = createAsyncThunk(
  'data/getAllFertilizers',
  async () => {
    
    const response = await axios.get('http://localhost:5000/fertilizers/get-fertilizers');
    return response.data;
  }
);





export const fertilizerSlice = createSlice({
  name: 'fertilizer',
  initialState: {
    getAllFertilizersData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFertilizers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllFertilizers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.getAllFertilizersData = action.payload;
      })
      .addCase(getAllFertilizers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      
  },
});

export default fertilizerSlice.reducer;
