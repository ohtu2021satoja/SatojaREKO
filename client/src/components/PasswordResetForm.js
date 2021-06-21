import React from "react"
import Button from "react-bootstrap/Button"
import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import emailService from "../services/email"

// Yup

const PasswordResetForm = ({ setAddingEvent }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Vaadittu"),
    password: Yup.string().required("Vaadittu"),
  })
  const handleSubmit = async ({ email, password }) => {
    emailService.ResetPassword(email, password)
  }
  return (
    <div>
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
                <EventFormDetails />
              </Row>
              <Button type="submit">Palauta salasana</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </div>
  )
}

const EventFormDetails = () => {
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
