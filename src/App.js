import { useEffect, useMemo } from 'react';
import './App.css';
import CommentList from './features/comments/CommentList';
import data from './data.json'
import { useDispatch } from 'react-redux';
import { addComments } from './features/comments/comments-slice';
import { setUser } from './features/user/user-slice';
import NewComment from './features/comments/NewComment';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addComments(data.comments));
  }, [dispatch, data.comments]);

  useEffect(() => {
    dispatch(setUser(data.currentUser));
  }, [dispatch, data.currentUser]);
  
  return (
    <div className="container m-auto px-10 py-16">
      <CommentList />
      <NewComment />
    </div>
  );
}

export default App;
