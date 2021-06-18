import * as Yup from "yup"
import { Formik, Form } from "formik"
import { createNewUser, updateUser } from "../../services/users"
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
          name: user.name || "",
          surname: user.surname || "",
          email: user.email || "",
          phone: user.phone || "",
          terms: false,
        }}
        enableReinitialize={true}
        validationSchema={SignUpSchema}
        onSubmit={(values) => {
          const newUser = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            phone: values.phone,
            terms: values.terms,
          }

          user = { ...user, ...newUser }
          user === newUser ? createNewUser(newUser) : updateUser(user)
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
