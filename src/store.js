import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/comments/comments-slice";
import userReducer from "./features/user/user-slice";

const store = configureStore({
  devTools: true,
  reducer: {
    comments: commentsReducer,
    user: userReducer,
  },
});

export default store;