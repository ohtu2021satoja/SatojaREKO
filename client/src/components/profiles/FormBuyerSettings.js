import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormBuyerSettings = () => (
  <Col xs={{ span: 10, offset: 1 }}>
    <h5 className="mb-4 text-center">Sähköpostiasetukset</h5>
    <Field
      name="newsletter"
      id="user-newsletter"
      label="Uutiskirje (max. 1 per viikko)"
      component={FormFieldCheckbox}
    />
    <Field
      name="notification"
      id="user-notification"
      label="Ilmoitus, jos myyjä peruu tilauksen"
      component={FormFieldCheckbox}
    />
  </Col>
)

export default FormBuyerSettings
