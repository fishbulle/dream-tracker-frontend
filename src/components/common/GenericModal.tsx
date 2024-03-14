import { Modal } from 'react-bootstrap';
import { StyledButton, StyledButtonWarning } from '../../styles/styles';

interface IModal {
  title: string;
  body: string;
  show: boolean;
  onClose: () => void;
  handleRequest: () => void;
  isSendingRequest: boolean;
}

export const GenericModal = (props: IModal) => {
  const { title, body, show, onClose, handleRequest, isSendingRequest } = props;

  return (
    <Modal show={show} onCose={onClose} size='lg' centered className='modal'>
      <Modal.Header className='modal-header border-0 px-5 pt-5 text-center'>
        <Modal.Title>
          <h2 style={{ fontWeight: 'bold' }}>{title}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body px-5 pb-2'>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer className='border-0'>
        <StyledButton onClick={onClose}>cancel</StyledButton>
        <StyledButtonWarning
          onClick={handleRequest}
          disabled={isSendingRequest}
        >
          {isSendingRequest ? 'deleting...' : 'delete'}
        </StyledButtonWarning>
      </Modal.Footer>
    </Modal>
  );
};
