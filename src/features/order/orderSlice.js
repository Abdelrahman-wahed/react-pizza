import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  priority: 0,
  totalPriceAfterPriority:0,
  
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addPriority(state, action) {
      state.priority = action.payload;
    },
    finalPrice(state,action){
      state.totalPriceAfterPriority = action.payload
    },
    removePriorityAndTotalPrice(state){
      state.priority=0;
      state.totalPriceAfterPriority=0
    }
  },
});
export const { addPriority,finalPrice,removePriorityAndTotalPrice } = orderSlice.actions;
export default orderSlice.reducer;
