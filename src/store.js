import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/comments/comments-slice";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/user-slice";

const store = configureStore({
  devTools: true,
  reducer: {
    comments: commentsReducer,
    user: userReducer,
    modal: modalReducer
  },
});

export default store;