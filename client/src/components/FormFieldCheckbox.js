import Form from "react-bootstrap/Form"

const FormFieldCheckbox = ({ field, label }) => {
  return <Form.Check className="mb-2" type="checkbox" label={label} {...field} />
}

export default FormFieldCheckbox
