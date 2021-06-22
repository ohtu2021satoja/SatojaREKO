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

// Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email address").required(),
  password: Yup.string().min(8, "password must be at least 8 characters").required(),
})

const FormLogin = ({ handleSigned }) => {
  return (
    <Row className="mb-3 py-3 px-1 border border-2 border-success rounded">
      <Col xs={12} className="mb-2 text-center">
        <h4 className="text-success">Kirjaudu sisään</h4>
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

            loginUser(credentials)
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
              <Button type="submit" variant="success" size="lg" className="w-100 mb-2">
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
