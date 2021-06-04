import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormSellerGroups = () => {
  return (
    <Col xs={{ span: 10, offset: 1 }} className="mb-5">
      <div className="text-center">
        <h5 className="mb-4">REKO-ryhmät, joihin kuulut tuottajana</h5>
        <h6 className="mb-4">Etelä-Savo</h6>
      </div>
      <Field
        name="rekoGroup"
        label="Ristiina"
        value="group1"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        label="Mikkeli"
        value="group2"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        label="Mäntyharju"
        value="group3"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        label="Pertunmaa"
        value="group4"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        label="Pieksämäki"
        value="group5"
        component={FormFieldCheckbox}
      />
    </Col>
  )
}

export default FormSellerGroups
