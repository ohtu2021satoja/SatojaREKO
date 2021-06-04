import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormBuyerSettings = () => {
  return (
    <Col xs={{ span: 10, offset: 1 }}>
      <h5 className="mb-4 text-center">Sähköpostiasetukset</h5>
      <Field
        name="emailSettings"
        label="Uutiskirje (max. 1 per viikko)"
        value="email1"
        component={FormFieldCheckbox}
      />
      <Field
        name="emailSettings"
        label="Ilmoitus, jos myyjä peruu tilauksen"
        value="email2"
        component={FormFieldCheckbox}
      />
    </Col>
  )
}

export default FormBuyerSettings
