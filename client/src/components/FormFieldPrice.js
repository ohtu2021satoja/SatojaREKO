import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"

const FormFieldPrice = ({ field, id, label, placeholder, disabled }) => (
  <Form.Group className="mb-2">
    <div className="text-center">
      <Form.Label htmlFor={id}>{label}</Form.Label>
    </div>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>€</InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        type="text"
        size="lg"
        id={id}
        placeholder={placeholder}
        {...field}
        disabled={disabled}
        style={{ textAlign: "right" }}
      />
    </InputGroup>
  </Form.Group>
)

export default FormFieldPrice
