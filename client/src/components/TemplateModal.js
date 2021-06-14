import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

/*
parent component should include:

const Parent = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const handleSubmit = () => {
        what happens on submit
        setModalShow(false)
    }

  return (
    <>
      <Button onClick={() => setModalShow(true)}>
        open modal
      </Button>

      <TemplateModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleSubmit={handleSubmit}
        title="Modal title"
        cancelButtonLabel="Cancel"
        submitButtonLabel="Submit"
      >
        add modal content here
      </TemplateModal>
    </>
  );
*/

const TemplateModal = ({
  show,
  handleClose,
  handleSubmit,
  title,
  cancelButtonLabel,
  submitButtonLabel,
  children,
}) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Row className="w-100">
        <Col xs={6}>
          <Button className="w-100" variant="outline-secondary" onClick={handleClose}>
            {cancelButtonLabel}
          </Button>
        </Col>
        <Col xs={6}>
          <Button className="w-100" variant="success" onClick={handleSubmit}>
            {submitButtonLabel}
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </Modal>
)

export default TemplateModal
