import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "../FormFieldText"
import FormFieldEmail from "../FormFieldEmail"
import FormErrorMessage from "../FormErrorMessage"

const FormUserDetails = () => (
  <Col xs={12}>
    <Field name="name" id="user-name" label="Etunimi" component={FormFieldText} />
    <ErrorMessage name="name" component={FormErrorMessage} />
    <Field name="surname" id="user-surname" label="Sukunimi" component={FormFieldText} />
    <ErrorMessage name="surname" component={FormErrorMessage} />
    <Field name="email" id="user-email" label="Sähköposti" component={FormFieldEmail} />
    <ErrorMessage name="email" component={FormErrorMessage} />
    <Field name="phone" id="user-phone" label="Puhelinnumero" component={FormFieldText} />
    <ErrorMessage name="phone" component={FormErrorMessage} />
  </Col>
)

export default FormUserDetails
