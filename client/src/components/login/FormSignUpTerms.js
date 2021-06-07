import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckboxInline from "../FormFieldCheckboxInline"
import FormErrorMessage from "../FormErrorMessage"

const FormSignUpTerms = () => (
  <Col xs={12} className="mb-2">
    <Field
      name="terms"
      id="user-terms"
      label="Jatkamalla sitoudut noudattamaan"
      component={FormFieldCheckboxInline}
    />
    <a href="/">käyttöehtojamme</a>
    <ErrorMessage name="terms" component={FormErrorMessage} />
  </Col>
)

export default FormSignUpTerms
