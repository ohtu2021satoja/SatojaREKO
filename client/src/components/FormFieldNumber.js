import Form from "react-bootstrap/Form"

const FormFieldNumber = ({ field, id, label }) => (
  <Form.Group className="mb-2">
    <div className="text-center">
      <Form.Label htmlFor={id}>{label}</Form.Label>
    </div>
    <Form.Control
      type="text"
      size="lg"
      id={id}
      placeholder={label}
      {...field}
      style={{ textAlign: "right" }}
    />
  </Form.Group>
)

export default FormFieldNumber
