import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import emailService from "../services/email"
import NotificationSuccess from "./NotificationSuccess"

/*
Parent Component:
- the success notification should be placed apart from the main content
- set a delay in milliseconds (5000 = 5 sec) for how long the notification should be displayed

const Parent = () => {
    const [show, setShow] = React.useState(false);

  return (
    <>
      <NotificationSuccess
        show={show}
        handleClose={() => setShow(false)}
        delay={ms}
        message="message"
      />

      <div>
        Other content
      </div>
    </>
  );
*/

const PasswordResetForm = () => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Vaadittu"),
    password: Yup.string().required("Vaadittu"),
  })
  const handleSubmit = async ({ email, password }) => {
    const response = await emailService.ResetPassword(email, password)
    console.log(response.data)
    setShow(true)
    setMessage(response.data)
  }
  return (
    <div>
      <NotificationSuccess
        show={show}
        handleClose={() => setShow(false)}
        delay={5000}
        message={message}
      />
      <h2>Palauta salasana</h2>
      <Col xs={12}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Row>
                <PasswordResetFormDetails />
              </Row>
              <Button type="submit">Palauta salasana</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </div>
  )
}

const PasswordResetFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field name="email" id="email" label="Sähköposti" component={FormFieldText} />
      <ErrorMessage name="email" component={FormErrorMessage} />
      <Field
        name="password"
        id="password"
        label="Uusi salasana"
        component={FormFieldText}
      />
      <ErrorMessage name="password" component={FormErrorMessage} />
    </Col>
  )
}

export default PasswordResetForm
