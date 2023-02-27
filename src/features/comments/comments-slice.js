import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

// export const changeVotesCount = createAsyncThunk(
//   'comments/changeVotesCount',
//   async ({ value, commentId }, { getState }) => {
//     const comments = getState().comments;
//     const item = comments.find
//   }
// )

export const newComment = createAsyncThunk(
  'comments/newComment',
  (content, { getState }) => {
    const user = getState().user;
    return {
      id: nanoid(),
      content,
      createdAt: "now",
      score: 0,
      user,
      replies: []
    }
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    addComments: (_, action) => action.payload,
    increaseScore: (state, action) => {
      const id = action.payload;
      state.forEach(itm => {
        itm.id === id
          ? itm.score += 1
          : itm.replies?.forEach(rep => {
            if (rep.id === id) {
              rep.score += 1;
            }
          })
      })
    },
    decreaceScore: (state, action) => {
      const id = action.payload;
      state.forEach(itm => {
        itm.id === id
          ? itm.score -= 1
          : itm.replies?.forEach(rep => {
            if (rep.id === id) {
              rep.score -= 1;
            }
          })
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newComment.fulfilled, (state, action) => {
        console.log(action.payload)
        state.push(action.payload);
      })
  }
})

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;

export const {
  addComments,
  increaseScore,
  decreaceScore,
} = commentsSlice.actions;

export const selectAllComments = (state) => state.comments;