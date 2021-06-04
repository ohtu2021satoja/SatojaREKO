import * as Yup from "yup"
import { Formik, Form } from "formik"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormBuyerDetails from "./FormBuyerDetails"
import FormBuyerSettings from "./FormBuyerSettings"

// Yup
const BuyerSchema = Yup.object().shape({
  name: Yup.string().required(),
  surname: Yup.string().required(),
  phone: Yup.string().required(),
  emailSettings: Yup.array(),
})

const FormBuyer = (/*{ user }*/) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          phone: "",
          emailSettings: [],
        }}
        validationSchema={BuyerSchema}
        handleSubmit={console.log}
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
