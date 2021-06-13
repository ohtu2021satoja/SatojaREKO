import * as Yup from "yup"
import { Formik, Form } from "formik"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormSellerDetails from "./FormSellerDetails"
import FormSellerGroups from "./FormSellerGroups"
import FormSellerSettings from "./FormSellerSettings"

// Yup
const SellerSchema = Yup.object().shape({
  company: Yup.string().required(),
  name: Yup.string().required(),
  surname: Yup.string().required(),
  phone: Yup.string().required(),
  email: Yup.string().email(),
  address: Yup.string(),
  zipCode: Yup.string(),
  municipality: Yup.string(),
  businessId: Yup.string(),
  businessUrl: Yup.string().url(),
  businessInfo: Yup.string(),
  rekoGroup: Yup.array(),
  emailReport: Yup.boolean(),
})

const FormSeller = (/*{ user }*/) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          company: "",
          name: "",
          surname: "",
          phone: "",
          email: "",
          address: "",
          zipCode: "",
          municipality: "",
          businessId: "",
          businessUrl: "",
          businessInfo: "",
          rekoGroup: [],
          emailReport: false,
        }}
        validationSchema={SellerSchema}
        onSubmit={console.log}
      >
        {() => (
          <Form>
            <Row>
              <FormSellerDetails />
              <FormSellerGroups />
              <FormSellerSettings />
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormSeller
