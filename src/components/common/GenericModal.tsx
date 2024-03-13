import { Modal } from 'react-bootstrap';
import { StyledButton } from '../../styles/styles';
import { color } from '../../styles/colors';

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
          <h3>{title}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-body px-5 pb-5'>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{ color: color.blackish }}>
        <StyledButton onClick={onClose}>cancel</StyledButton>
        <StyledButton onClick={handleRequest} disabled={isSendingRequest}>
          {isSendingRequest ? 'deleting...' : 'delete'}
        </StyledButton>
      </Modal.Footer>
    </Modal>
  );
};
