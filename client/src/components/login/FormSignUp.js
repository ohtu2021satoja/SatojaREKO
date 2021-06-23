import { useEffect, useState } from "react"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import { createNewFacebookUser } from "../../services/users"
import { createNewUser } from "../../services/auth"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormUserDetails from "./FormUserDetails"
import FormSignUpTerms from "./FormSignUpTerms"
import FacebookSignUpButton from "./FacebookSignUpButton"

// Yup
const SignUpSchema = (facebookUser) =>
  Yup.object().shape({
    showPassword: Yup.boolean(),
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email("invalid email address").required(),
    phonenumber: Yup.string().required(),
    password:
      facebookUser === false
        ? Yup.string().min(8, "password must be at least 8 characters").required()
        : Yup.string(),
    terms_ok: Yup.boolean()
      .test("consent", "you have to agree with our terms", (value) => value === true)
      .required(),
  })

const FormSignUp = ({ user, handleFacebookSignUp, handleRegisterUser }) => {
  // https://github.com/jquense/yup/issues/736
  const [facebookUser, setFacebookUser] = useState(false)
  const [schema, setSchema] = useState(() => SignUpSchema(facebookUser))

  // if user is null, importing values from user data don't work unless...
  // they are conditional ie. user ? user.name : ""
  if (!user) {
    user = {}
  }

  useEffect(() => {
    // update form, if user registered via Facebook
    setSchema(SignUpSchema(facebookUser))
    // set the user staatus
    user && user.facebook_id ? setFacebookUser(true) : setFacebookUser(false)
  }, [user, setSchema, facebookUser])

  return (
    <Col xs={12} md={{ span: 8, offset: 2 }}>
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          phonenumber: "",
          password: "",
          terms_ok: false,
        }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values) => {
          const newUser = {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            phonenumber: values.phonenumber,
          }

          user = { ...user, ...newUser }
          user === newUser
            ? createNewUser({ password: values.password, ...newUser })
            : createNewFacebookUser(user)

          handleRegisterUser(user)
        }}
      >
        {() => (
          <Form>
            <Row>
              <Col className="mb-4 text-center">
                {facebookUser === false ? (
                  <h3>Täydennä tietosi</h3>
                ) : (
                  <h3>Tarkista ja täydennä tietosi</h3>
                )}
              </Col>
              <FormUserDetails facebookUser={facebookUser} />
              <FormSignUpTerms />
            </Row>
            <Button variant="success" size="lg" type="submit" className="w-100 mb-3">
              {facebookUser === false
                ? "Rekisteröidy Sähköpostilla"
                : "Viimeistele Rekisteröityminen"}
            </Button>
            {facebookUser === false && (
              <FacebookSignUpButton handleFacebookSignUp={handleFacebookSignUp} />
            )}
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormSignUp
