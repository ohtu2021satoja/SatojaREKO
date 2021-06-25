import { Field, FieldArray } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormSellerAreas = ({ areas }) => {
  //console.log("AREAS", areas)
  return (
    <Col xs={{ span: 10, offset: 1 }} className="mb-3">
      <div className="text-center">
        <h5 className="mb-4">REKO-ryhmät, joihin kuulut tuottajana</h5>
        <h6 className="mb-4">Etelä-Savo</h6>
      </div>
      <FieldArray
        name="friends"
        render={() => (
          <div>
            {areas && areas.length > 0 ? (
              areas.map((area, index) => (
                <div key={index}>
                  <Field
                    name={areas[index]}
                    id={area.id}
                    value={area.belongs}
                    label={area.name}
                    component={FormFieldCheckbox}
                  />
                </div>
              ))
            ) : (
              <p>Tällä alueella ei ole noutopaikkoja.</p>
            )}
          </div>
        )}
      />
    </Col>
  )
}

export default FormSellerAreas
