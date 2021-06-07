import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormSellerSettings = () => {
  return (
    <Col xs={{ span: 10, offset: 1 }}>
      <h5 className="mb-4 text-center">Sähköpostiasetukset</h5>
      <Field
        name="emailReport"
        id="user-settings"
        label="Lähetä tilaisuuskohtainen myyntiraportti, kun tilausaika on umpeutunut"
        component={FormFieldCheckbox}
      />
    </Col>
  )
}

export default FormSellerSettings
