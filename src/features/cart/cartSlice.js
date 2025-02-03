import { createSlice } from "@reduxjs/toolkit";
import { orderBy, uniqBy } from "lodash";

const initialState = {
  pizzas: [],
  totalQuantity: 0,
  totalPriceOfAllPizzas: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const uniqObjects = uniqBy([action.payload, ...state.pizzas], "pizzaId");
      state.pizzas = orderBy(uniqObjects, ["pizzaId"], ["asc"]);
      state.totalQuantity = state.pizzas?.reduce(
        (acc, curr) => acc + curr?.quantity,
        0,
      );

      state.totalPriceOfAllPizzas = state.pizzas?.reduce(
        (acc, curr) => acc + curr?.totalPrice,
        0,
      );
    },
    removeFromCart(state, action) {
      state.pizzas = state.pizzas.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      );
      state.totalQuantity = state.pizzas?.reduce(
        (acc, curr) => acc + curr?.quantity,
        0,
      );
      state.totalPriceOfAllPizzas = state.pizzas?.reduce(
        (acc, curr) => acc + curr?.totalPrice,
        0,
      );
    },
    removeAllPizza(state) {
      state.pizzas = [];
      state.totalQuantity = 0;
      state.totalPriceOfAllPizzas = 0;
    },
  },
});


export const { addToCart, removeFromCart, removeAllPizza } = cartSlice.actions;
export default cartSlice.reducer;
