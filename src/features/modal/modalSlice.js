import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    id: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.id = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.id = null;
    }
  }
});

const modalReducer = modalSlice.reducer;

export default modalReducer;

export const {
  openModal,
  closeModal
} = modalSlice.actions;

export const selectModal = (state) => state.modal;