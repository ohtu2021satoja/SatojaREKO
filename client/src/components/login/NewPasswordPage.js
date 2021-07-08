import React, { useState } from "react"
import emailService from "../../services/email"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplateTopNav from "../TemplateTopNav"
import FormPasswordReset from "./FormPasswordReset"
import NotificationSuccess from "../NotificationSuccess"
import NotificationError from "../NotificationError"

const NewPasswordPage = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  const changePassword = async (email, password) => {
    const response = await emailService.ResetPassword(email, password)

    response === "error" ? setShowError(true) : setShowSuccess(true)
  }

  return (
    <>
      <NotificationSuccess
        show={showSuccess}
        handleClose={() => setShowSuccess(false)}
        delay={5000}
        message={"Onnistuit vaihtamaan salasanasi"}
      />
      <NotificationError
        show={showError}
        handleClose={() => setShowError(false)}
        delay={5000}
        message={"Tarkista, että sähköpostisi on oikein ja yritä uudelleen"}
      />
      <Row>
        <TemplateTopNav
          navLink="/login"
          altText="Palaa kirjautumissivulle"
          navHeader="Luo uusi salasana"
        />
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 3 }}
          lg={{ span: 4, offset: 4 }}
        >
          <FormPasswordReset handleChangePassword={changePassword} />
        </Col>
      </Row>
    </>
  )
}

export default NewPasswordPage
