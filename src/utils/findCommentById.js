const findCommentById = (comments, findedId) => {
  for (const comment of comments) {
    if (comment.id === findedId) {
      return comment;
    }
    else {
      for (const reply of comment.replies) {
        if (reply.id === findedId) {
          return reply;
        }
      }
    }
  }
}


export default findCommentById;