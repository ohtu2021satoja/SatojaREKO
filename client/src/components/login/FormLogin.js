import { useState } from "react"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { loginUser } from "../../services/auth"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormFieldEmail from "../FormFieldEmail"
import FormFieldPassword from "../FormFieldPassword"
import FormErrorMessage from "../FormErrorMessage"
import SignUpButton from "./SignUpButton"
import PasswordResetButton from "./PasswordResetButton"

// Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  password: Yup.string().required("Salasana edellytetään"),
})

const FormLogin = ({ handleSigned, handleLogin }) => {
  const [fail, setFail] = useState(false)

  const checkCredentials = async (obj) => {
    const response = await loginUser(obj)
    console.log("RESPONSE", response)
    response === "error" ? setFail(true) : handleLogin()
    // TODO: instead of setTimeout
    // remove error message when input value changes
    setTimeout(() => {
      setFail(false)
    }, 4000)
  }

  return (
    <Row className="mb-3 py-3 px-1 bg-white border border-1 border-secondary rounded">
      <Col xs={12} className="mb-2 text-center">
        <h3>Kirjaudu palveluun</h3>
      </Col>
      <Col xs={12}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            const credentials = {
              email: values.email,
              password: values.password,
            }

            checkCredentials(credentials)
          }}
        >
          {() => (
            <Form>
              <Field
                name="email"
                id="user-email"
                label="Sähköposti"
                component={FormFieldEmail}
              />
              <ErrorMessage name="email" component={FormErrorMessage} />
              <Field
                name="password"
                id="user-password"
                label="Salasana"
                component={FormFieldPassword}
              />
              <ErrorMessage name="password" component={FormErrorMessage} />
              <PasswordResetButton />
              {fail === true && (
                <p className="text-center text-danger">
                  Virheellinen sähköposti tai salasana
                </p>
              )}
              <Button
                type="submit"
                variant="success"
                size="lg"
                className="w-100 mb-2"
                id="login-button"
              >
                Kirjaudu
              </Button>
              <SignUpButton handleSigned={handleSigned} />
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

export default FormLogin
