import Modal from "react-bootstrap/Modal"

const AddImageModal = ({ show, handleClose, children }) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>Lataa kuva laitteeltasi</Modal.Title>
    </Modal.Header>
    <Modal.Body className="my-3">{children}</Modal.Body>
  </Modal>
)

export default AddImageModal
