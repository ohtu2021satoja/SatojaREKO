import * as Yup from "yup"
import { Formik, Form } from "formik"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormUserDetails from "./FormUserDetails"
import FormSignUpTerms from "./FormSignUpTerms"

// Yup
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  email: Yup.string().email("invalid email address").required(),
  phone: Yup.string().required(),
  terms: Yup.boolean()
    .test("consent", "you have to agree with our terms", (value) => value === true)
    .required(),
})

const FormSignUp = ({ user /*, handleSignUp, handleLogout*/ }) => {
  return (
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <Formik
        initialValues={{
          name: user.name ? user.name : "",
          surname: user.surname ? user.surname : "",
          email: user.email ? user.email : "",
          phone: user.phone ? user.phone : "",
          terms: false,
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          /*const updatedUser = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            terms: values.terms,
          }

          handleSignUp(updatedUser)
          handleLogout()*/
        }}
      >
        {() => (
          <Form>
            <Row>
              <Col className="mb-4 text-center">
                <h3>Tarkista ja täydennä tietosi</h3>
              </Col>
              <FormUserDetails />
              <FormSignUpTerms />
            </Row>
            <Button type="submit" variant="success" size="lg" className="w-100 mb-2">
              Rekisteröidy
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormSignUp
