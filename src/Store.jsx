import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../src/features/user/userSlice'
import cartReducer from '../src/features/cart/cartSlice'
import orderReducer from '../src/features/order/orderSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
