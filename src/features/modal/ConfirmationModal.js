import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../comments/comments-slice';
import { closeModal, selectModal } from './modalSlice';

Modal.setAppElement('#root');

const ConfirmationModal = () => {

  const dispatch = useDispatch();

  const { isOpen, id } = useSelector(selectModal);

  const close = () => {
    dispatch(closeModal());
  }

  const confirm = () => {
    dispatch(deleteComment(id));
    close();
  }

  return (
    <Modal
      isOpen={isOpen}
      className='absolute w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white outline-none px-6 py-6 rounded-lg flex flex-col gap-y-4'
      onRequestClose={() => dispatch(closeModal())}
      overlayClassName='fixed overflow-hodden  top-0 left-0 right-0 bottom-0 bg-black/50'
      contentLabel="Confirmation modal"
      preventScroll={true}
    >
      <h2 className='text-2xl font-medium'>Delete comment</h2>
      <p className='text-gray-500'>Are you sure you want to delete this comment? This will remove the comment and can`t be undone</p>
      <div className='flex gap-x-6'>
        <button onClick={close} className='flex-grow bg-graydark text-white py-3 rounded-lg uppercase hover:bg-grayhover transition-colors'>No, cancel</button>
        <button onClick={confirm} className='flex-grow bg-red text-white py-3 rounded-lg uppercase hover:bg-palered transition-colors'>Yes, delete</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;