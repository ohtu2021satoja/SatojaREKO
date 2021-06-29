import * as Yup from "yup"
import { Formik, Form } from "formik"
import { createNewFacebookUser } from "../../services/users"
import { createNewUser } from "../../services/auth"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormUserDetails from "./FormUserDetails"
import FormSignUpTerms from "./FormSignUpTerms"
import FacebookSignUpButton from "./FacebookSignUpButton"
import { useSelector } from "react-redux"
import { logoutUser } from "../../services/auth"
import { setAuthedUser } from "../../actions/authedUser"
import { useHistory } from "react-router-dom"

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

const FormSignUp = ({
  facebookUser,
  handleSigned,
  handleFacebookSignUp,
  handleRegisterUser,
}) => {
  const history = useHistory()

  const createNewFacebook = async (user) => {
    await createNewFacebookUser(user)
    await logoutUser()
    await setAuthedUser(null)
    await history.push("/")
    await window.location.reload()
  }
  let user = useSelector((state) => state.authedUser)
  // if user is null, importing values from user data don't work unless...
  // they are conditional ie. user ? user.name : ""
  if (!user) {
    user = {}
  }

  return (
    <Col xs={12} md={{ span: 8, offset: 2 }} className="mt-4">
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
            : createNewFacebook(user)

          facebookUser === false ? handleSigned() : handleRegisterUser()
        }}
      >
        {() => (
          <Form>
            <FormUserDetails facebookUser={facebookUser} />
            <FormSignUpTerms />
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
