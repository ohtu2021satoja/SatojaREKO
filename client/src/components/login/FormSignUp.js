import * as Yup from "yup"
import { Formik, Form } from "formik"
import { createNewUser, createNewFacebookUser } from "../../services/users"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormUserDetails from "./FormUserDetails"
import FormSignUpTerms from "./FormSignUpTerms"

// Yup
const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email("invalid email address").required(),
  phonenumber: Yup.string().required(),
  terms_ok: Yup.boolean()
    .test("consent", "you have to agree with our terms", (value) => value === true)
    .required(),
})

const FormSignUp = ({ user, handleRegisterUser }) => {
  //  if user is null, initialValues don't work unless...
  // they are conditional ie. user ? user.name : ""
  if (!user) {
    user = {}
  }

  return (
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          phonenumber: user.phonenumber || "",
          terms_ok: false,
        }}
        enableReinitialize={true}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          const newUser = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            phonenumber: values.phonenumber,
          }

          user = { ...user, ...newUser }
          user === newUser ? createNewUser(newUser) : createNewFacebookUser(user)
          handleRegisterUser(user)
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
