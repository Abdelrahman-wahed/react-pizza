import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async (latitude, longitude) => {
    const response = await getAddress(latitude, longitude);
    const address = `${response?.locality}, ${response?.city} ${response?.postcode}, ${response?.countryName}`;
    return address;
  },
);

const initialState = {
  fullName: "",
  phoneNumber: "",
  address: "",
  status: "idle",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createName(state, action) {
      state.fullName = action.payload;
    },
    createPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.address = action.payload;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "failed";
      });
  },
});
export const { createName ,createPhoneNumber } = userSlice.actions;
export default userSlice.reducer;
