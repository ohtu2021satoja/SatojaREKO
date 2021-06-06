import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "../FormFieldText"
import FormErrorMessage from "../FormErrorMessage"

const FormSellerDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field
        name="company"
        id="user-company-name"
        label="Yrityksen / Tilan nimi"
        component={FormFieldText}
      />
      <ErrorMessage name="company" component={FormErrorMessage} />
      <Field name="name" id="user-name" label="Etunimi" component={FormFieldText} />
      <ErrorMessage name="name" component={FormErrorMessage} />
      <Field
        name="surname"
        id="user-surname"
        label="Sukunimi"
        component={FormFieldText}
      />
      <ErrorMessage name="surname" component={FormErrorMessage} />
      <Field
        name="phone"
        id="user-phone"
        label="Puhelinnumero"
        component={FormFieldText}
      />
      <ErrorMessage name="phone" component={FormErrorMessage} />
    </Col>
  )
}

export default FormSellerDetails
