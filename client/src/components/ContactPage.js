import React, { useState } from "react"
import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import ArrowLeftIcon from "../media/arrow-left.svg"
import ContactForm from "./ContactForm"
import NotificationSuccess from "./NotificationSuccess"
import NotificationError from "./NotificationError"

const ContactPage = ({ user }) => {
  const [notification, setNotification] = useState(undefined)

  return (
    <div>
      <NotificationSuccess
        show={notification === "success"}
        handleClose={() => setNotification(undefined)}
        delay={5000}
        message="Viesti lähetetty"
      />
      <NotificationError
        show={notification === "error"}
        handleClose={() => setNotification(undefined)}
        delay={5000}
        message="Viestin lähettäminen epäonnistui"
      />
      <Nav className="py-2">
        <Nav.Item>
          <Button as={Link} to="/profile" variant="light" size="lg" className="mr-1">
            <img src={ArrowLeftIcon} width="24" height="24" alt="Return to profile" />
          </Button>
        </Nav.Item>
      </Nav>
      <Row className="mx-2">
        <Col xs={12} className="mb-4 text-center">
          <h2 className="mb-4">Ota yhteyttä</h2>
        </Col>
        <ContactForm user={user} setNotification={setNotification} />
      </Row>
    </div>
  )
}

export default ContactPage
