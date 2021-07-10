import React, { useState } from "react"
import Row from "react-bootstrap/Row"

import ContactForm from "./ContactForm"
import NotificationSuccess from "./NotificationSuccess"
import NotificationError from "./NotificationError"
import TemplateTopNav from "./TemplateTopNav"

const ContactPage = ({ user }) => {
  const [notification, setNotification] = useState(undefined)

  return (
    <>
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
      <TemplateTopNav navLink="/" altText="Palaa kotisivulle" navHeader="Ota yhteyttä" />
      <Row className="pt-4">
        <ContactForm user={user} setNotification={setNotification} />
      </Row>
    </>
  )
}

export default ContactPage
