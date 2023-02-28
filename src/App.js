import { useEffect } from 'react';
import './App.css';
import CommentList from './features/comments/CommentList';
import data from './data.json'
import { useDispatch } from 'react-redux';
import { setUser } from './features/user/user-slice';
import NewComment from './features/comments/NewComment';
import ConfirmationModal from './features/modal/ConfirmationModal';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(data.currentUser));
  }, [dispatch]);

  return (
    <div className="container m-auto lg:px-10 lg:py-16 md:px-6 md:py-10 p-4">
      <ConfirmationModal />
      <CommentList />
      <NewComment />
    </div>
  );
}

export default App;
