import { useEffect } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form } from "formik"
import { updateAuthedUser } from "../../services/users"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormBuyerDetails from "./FormBuyerDetails"
import FormBuyerSettings from "./FormBuyerSettings"

// Yup
const BuyerSchema = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  phonenumber: Yup.string().required(),
  email: Yup.string().email("invalid email address").required(),
  newsletter: Yup.boolean(),
  notification: Yup.boolean(),
})

const AutoSubmitForm = ({ user }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    const changedUser = { ...user, ...values }
    // submit the form imperatively 5 seconds after values have changed
    if (user !== changedUser) {
      setTimeout(() => {
        submitForm()
      }, 5000)
    }
  }, [user, values, submitForm])

  return null
}

const FormBuyer = ({ user, handleUserUpdate }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phonenumber: user.phonenumber || "",
          email: user.email || "",
          newsletter_check: false,
          cancel_notification_check: false,
        }}
        enableReinitialize={true}
        validationSchema={BuyerSchema}
        onSubmit={async (values) => {
          const updatedUser = { ...user, ...values }
          // push updatedUser to the server
          const response = await updateAuthedUser(updatedUser)

          if (response === "success") {
            handleUserUpdate()
          }

          console.log("UPDATED_USER", updatedUser)
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
