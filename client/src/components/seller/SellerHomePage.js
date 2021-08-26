import { useState } from "react"
//import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import NotificationError from "../NotificationError"
import FormSellerHomePage from "./FormSellerHomePage"

const SellerHomePage = ({ user, handleUserUpdate }) => {
  const [showError, setShowError] = useState(false)

  return (
    <>
      <NotificationError
        show={showError}
        handleClose={() => setShowError(false)}
        delay={5000}
        message="Ryhmien tallentaminen epäonnistui"
      />
      <Row className="h-100 bg-light-yellow">
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          className="pt-4"
        >
          <Row>
            <Col xs={12} className="mb-4 text-start">
              <FormSellerHomePage
                user={user}
                handleUserUpdate={handleUserUpdate}
                handleError={() => setShowError(true)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
export default SellerHomePage
