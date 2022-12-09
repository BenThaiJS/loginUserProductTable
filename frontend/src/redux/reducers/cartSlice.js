import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ keyword, page, limit }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products/?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (err) {
      const message = err.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (productId, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:5000/products/${productId}`);
  } catch(err) {
    const message = err.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
})

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter((item) => item.id !== action.payload);
      state.cart = removeItem;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
