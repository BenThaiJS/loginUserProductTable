import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../redux/reducers/authSlice";
import { cartReducer } from "./reducers/cartSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
