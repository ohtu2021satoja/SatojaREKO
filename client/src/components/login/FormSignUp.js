import * as Yup from "yup"
import { useHistory } from "react-router-dom"
import { Formik, Form } from "formik"
import { createNewFacebookUser } from "../../services/users"
import { createNewUser } from "../../services/auth"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormUserDetails from "./FormUserDetails"
import FormSignUpTerms from "./FormSignUpTerms"

// Yup
const SharedSchema = {
  firstname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Etunimi edellytetään"),
  lastname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Sukunimi edellytetään"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  phonenumber: Yup.string().required(),
  terms_ok: Yup.boolean()
    .test(
      "consent",
      "Edellytämme, että hyväksyt käyttöehtomme",
      (value) => value === true
    )
    .required("Tämä on oltava valittuna"),
}

const SignUpSchema = Yup.object().shape({
  ...SharedSchema,
  password: Yup.string()
    .min(8, "Salasanan minimipituus on 8 merkkiä")
    .required("Salasana edellytetään"),
})

const FacebookSignUpSchema = Yup.object().shape({
  ...SharedSchema,
  password: Yup.string(),
})

const FormSignUp = ({ user, facebookUser, handleLoginWithFacebook }) => {
  const history = useHistory()

  // if user is null, importing values from user data don't work unless...
  // they are conditional ie. user ? user.name : ""
  if (!user) {
    user = {}
  }

  const createFacebookUser = () => {
    handleLoginWithFacebook()
    history.push("/register")
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="text-center">
          {facebookUser === false ? (
            <h4>Tai täydennä tiedot:</h4>
          ) : (
            <h4>Tarkista ja täydennä tietosi</h4>
          )}
        </div>
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
          validationSchema={facebookUser === false ? SignUpSchema : FacebookSignUpSchema}
          onSubmit={(values) => {
            const newUser = {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              phonenumber: values.phonenumber,
            }

            user = { ...user, ...newUser }
            facebookUser === false
              ? createNewUser({ password: values.password, ...newUser })
              : createNewFacebookUser(user)

            facebookUser === false ? history.push("/") : createFacebookUser()
          }}
        >
          {() => (
            <Form>
              <FormUserDetails facebookUser={facebookUser} />
              <FormSignUpTerms />
              <Button variant="success" size="lg" type="submit" className="w-100 mb-3">
                {facebookUser === false
                  ? "Rekisteröidy"
                  : "Viimeistele rekisteröityminen"}
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

export default FormSignUp
