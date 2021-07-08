import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormPasswordResetDetails from "./FormPasswordResetDetails"

// Yup
const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  password: Yup.string().required("Salasana edellytetään"),
})

const FormPasswordReset = ({ handleChangePassword }) => (
  <Row className="pt-5">
    <Col xs={12}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={ResetSchema}
        onSubmit={(values) => {
          handleChangePassword(values.email, values.password)
        }}
      >
        {() => (
          <Form>
            <FormPasswordResetDetails />
            <Button type="submit" variant="success" size="lg" className="w-100">
              Vahvista salasana
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  </Row>
)

export default FormPasswordReset
