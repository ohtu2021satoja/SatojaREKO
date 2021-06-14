import { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ProfileHeader from "./ProfileHeader"
import FormSeller from "./FormSeller"
// Test modal
import TemplateModal from "../TemplateModal"
import FormSellerModal from "./FormSellerModal"

const ProfilePageSeller = ({ user }) => {
  // Test modal
  const [modalShow, setModalShow] = useState(false)

  const handleClose = () => setModalShow(false)

  const handleSubmit = () => {
    setModalShow(false)
  }

  return (
    <Row className="mt-5 mx-2">
      <Col xs={12} className="py-5 text-center">
        <Button
          className="w-50"
          variant="outline-success"
          onClick={() => setModalShow(true)}
        >
          Testi pop-up
        </Button>
      </Col>

      <TemplateModal
        show={modalShow}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title="Täydennä puuttuvat tiedot"
        cancelButtonLabel="Peruuta"
        submitButtonLabel="Vahvista"
      >
        <FormSellerModal />
      </TemplateModal>

      <ProfileHeader user={user} />
      <FormSeller user={user} />
    </Row>
  )
}

export default ProfilePageSeller
