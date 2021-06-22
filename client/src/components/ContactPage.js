<<<<<<< HEAD
import React, { useState } from "react"
import Row from "react-bootstrap/Row"
import ContactForm from "./ContactForm"
import NotificationSuccess from "./NotificationSuccess"
import NotificationError from "./NotificationError"
import ArrowLeftIcon from "../media/arrow-left.svg"
import { Link } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"

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
      <Row className="mt-5 mx-2">
        <Col xs={12} className="mb-4 text-center">
          <h2 className="mb-4">Ota yhteyttä</h2>
        </Col>
        <ContactForm user={user} setNotification={setNotification} />
      </Row>
=======
const ContactPage = ({ user }) => {
  return (
    <div>
      <p>Contact Page</p>
>>>>>>> main
    </div>
  )
}

export default ContactPage
