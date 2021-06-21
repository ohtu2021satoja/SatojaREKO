import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "../FormFieldText"
import FormFieldEmail from "../FormFieldEmail"
import FormErrorMessage from "../FormErrorMessage"

const FormUserDetails = () => (
  <Col xs={12}>
    <Field name="firstname" id="user-name" label="Etunimi" component={FormFieldText} />
    <ErrorMessage name="firstname" component={FormErrorMessage} />
    <Field name="lastname" id="user-surname" label="Sukunimi" component={FormFieldText} />
    <ErrorMessage name="lastname" component={FormErrorMessage} />
    <Field name="email" id="user-email" label="Sähköposti" component={FormFieldEmail} />
    <ErrorMessage name="email" component={FormErrorMessage} />
    <Field
      name="phonenumber"
      id="user-phone"
      label="Puhelinnumero"
      component={FormFieldText}
    />
    <ErrorMessage name="phonenumber" component={FormErrorMessage} />
  </Col>
)

export default FormUserDetails
