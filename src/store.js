import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/comments/comments-slice";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/user-slice";

import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  comments: commentsReducer,
  user: userReducer,
  modal: modalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [
        FLUSH,
        PAUSE,
        PERSIST,
        PURGE,
        REHYDRATE,
        REGISTER
      ]
    }
  })
});

export const persistor = persistStore(store);

export default store;