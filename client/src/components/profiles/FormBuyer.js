import * as Yup from "yup"
import { Formik, Form } from "formik"
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

const FormBuyer = ({ user }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phonenumber: user.phonenumber || "",
          email: user.email || "",
          newsletter: false,
          notification: false,
        }}
        enableReinitialize={true}
        validationSchema={BuyerSchema}
        onSubmit={console.log}
      >
        {() => (
          <Form>
            <Row>
              <FormBuyerDetails />
              <FormBuyerSettings />
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormBuyer
