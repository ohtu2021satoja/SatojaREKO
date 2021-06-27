import { Field /*, FieldArray*/ } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormSellerAreas = ({ values }) => (
  <Col xs={{ span: 10, offset: 1 }} className="mb-3">
    <div className="text-center">
      <h5 className="mb-4">REKO-ryhmät, joihin kuulut tuottajana</h5>
      <h6 className="mb-4">Etelä-Savo</h6>
    </div>
    {values.reko_areas.map((area, index) => (
      <div key={index}>
        <Field
          name={`reko_areas.${index}.belongs`}
          value={area.belongs}
          id={area.id}
          label={area.name}
          component={FormFieldCheckbox}
        />
      </div>
    ))}
  </Col>
)

export default FormSellerAreas
