import * as Yup from "yup"
import { Formik, Form } from "formik"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormSellerDetails from "./FormSellerDetails"
import FormSellerGroups from "./FormSellerGroups"
import FormSellerSettings from "./FormSellerSettings"

// Yup
const SellerSchema = Yup.object().shape({
  company: Yup.string(),
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  phonenumber: Yup.string().required(),
  email: Yup.string().email("invalid email address").required(),
  address: Yup.string(),
  zipCode: Yup.string(),
  municipality: Yup.string(),
  businessId: Yup.string(),
  businessUrl: Yup.string().url(),
  businessInfo: Yup.string(),
  rekoGroup: Yup.array(),
  emailReport: Yup.boolean(),
})

const FormSeller = ({ user }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          company: "",
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phonenumber: user.phonenumber || "",
          email: user.email || "",
          address: "",
          zipCode: "",
          municipality: "",
          businessId: "",
          businessUrl: "",
          businessInfo: "",
          rekoGroup: [],
          emailReport: false,
        }}
        enableReinitialize={true}
        validationSchema={SellerSchema}
        onSubmit={console.log}
      >
        {() => (
          <Form>
            <Row>
              <FormSellerDetails />
              <FormSellerGroups />
              <Col className="text-center mb-5">
                <p>
                  Puuttuko ryhmä listalta? <Link to="/contact">Ota yhteyttä</Link>
                </p>
              </Col>
              <FormSellerSettings />
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormSeller
