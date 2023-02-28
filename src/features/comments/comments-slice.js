import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import findCommentById from "../../utils/findCommentById";

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

export const newReply = createAsyncThunk(
  'comments/newReply',
  ({ id, replyingTo, content }, { getState }) => {
    const user = getState().user;

    return {
      main: {
        id: nanoid(),
        content,
        createdAt: "now",
        score: 0,
        replyingTo,
        user
      },
      to: id
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
    changeContent: (state, action) => {
      for (const comment of state) {
        if (comment.id === action.payload.id) {
          comment.content = action.payload.content;
        }
        else {
          for (const reply of comment.replies) {
            if (reply.id === action.payload.id) {
              reply.content = action.payload.content;
            }
          }
        }
      }
    },
    deleteComment: (state, action) => {

      state.forEach(({ id, replies }, ind, arr) => {
        if (id === action.payload) {
          arr.splice(ind, 1);
        }
        replies.forEach(({ id }, ind, arr) => {
          if (id === action.payload) {
            arr.splice(ind, 1);
          }
        })
      });

      //   for (const comment of state) {
      //     if (comment.id === action.payload) {
      //       const idx = state.findIndex(com => com.id === comment.id)
      //       state.splice(idx, 1);
      //     }
      //     const ind = comment.replies.findIndex(({ id }) => id === action.payload);
      //     if (ind !== -1) {
      //       comment.replies.splice(ind, 1);
      //     }
      //   }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newComment.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(newReply.fulfilled, (state, action) => {
        const comment = state.find(({ id }) => id === action.payload.to);
        comment.replies.push(action.payload.main);
      })
  }
})

const commentsReducer = commentsSlice.reducer;

export default commentsReducer;

export const {
  addComments,
  increaseScore,
  decreaceScore,
  changeContent,
  deleteComment
} = commentsSlice.actions;

export const selectCommentById = (state, commentId) => {
  return state.comments.find((comment) => {
    return comment.id === commentId
  });
}

export const selectRepliesById = (state, commentId) => {
  return state.comments.find((comment) => {
    return comment.id === commentId
  }).replies;
}

export const selectAllComments = (state) => state.comments;