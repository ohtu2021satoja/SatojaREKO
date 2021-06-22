import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormSellerGroups = () => {
  return (
    <Col xs={{ span: 10, offset: 1 }} className="mb-3">
      <div className="text-center">
        <h5 className="mb-4">REKO-ryhmät, joihin kuulut tuottajana</h5>
        <h6 className="mb-4">Etelä-Savo</h6>
      </div>
      <Field
        name="rekoGroup"
        id="reko-group-1"
        label="Ristiina"
        value="group1"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        id="reko-group-2"
        label="Mikkeli"
        value="group2"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        id="reko-group-3"
        label="Mäntyharju"
        value="group3"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        id="reko-group-4"
        label="Pertunmaa"
        value="group4"
        component={FormFieldCheckbox}
      />
      <Field
        name="rekoGroup"
        id="reko-group-5"
        label="Pieksämäki"
        value="group5"
        component={FormFieldCheckbox}
      />
    </Col>
  )
}

export default FormSellerGroups
