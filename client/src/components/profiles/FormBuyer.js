import { useEffect } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form } from "formik"
import { updateAuthedBuyer } from "../../services/users"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormBuyerDetails from "./FormBuyerDetails"
import FormBuyerSettings from "./FormBuyerSettings"
import { isEqual } from "lodash"

// Yup
const BuyerSchema = Yup.object().shape({
  firstname: Yup.string()
    .max(20, "Maksimipituus 20 kirjainta")
    .required("Etunimi edellytetään"),
  lastname: Yup.string()
    .max(20, "Maksimipituus 20 kirjainta")
    .required("Sukunimi edellytetään"),
  phonenumber: Yup.string()
    .max(14, "Maksimipituus 14 numeroa")
    .required("Puhelinnumero edellytetään"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  newsletter: Yup.boolean(),
  notification: Yup.boolean(),
})

let timer

const AutoSubmitForm = ({ user }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    const changedUser = { ...user, ...values }
    // submit the form imperatively 5 seconds after values have changed
    const isSame = isEqual(user, changedUser)
    clearTimeout(timer)
    if (!isSame) {
      timer = setTimeout(() => {
        submitForm()
      }, 5000)
    }
  }, [user, values, submitForm])

  return null
}

const FormBuyer = ({ user, handleUserUpdate, handleError }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phonenumber: user.phonenumber || "",
          email: user.email || "",
          newsletter_check: user.newsletter_check,
          cancel_notification_check: user.cancel_notification_check,
        }}
        enableReinitialize={true}
        validationSchema={BuyerSchema}
        onSubmit={async (values) => {
          const updatedUser = { ...user, ...values }
          console.log("UPDATED_USER", updatedUser)

          // push updatedUser to the server
          const response = await updateAuthedBuyer(updatedUser)

          // if successful, update store, else show error
          response !== "error" ? handleUserUpdate() : handleError()
        }}
      >
        {() => (
          <Form>
            <Row>
              <FormBuyerDetails />
              <FormBuyerSettings />
            </Row>
            <AutoSubmitForm user={user} />
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormBuyer
