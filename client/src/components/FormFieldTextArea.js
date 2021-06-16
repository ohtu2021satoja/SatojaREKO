import Form from "react-bootstrap/Form"

const FormFieldTextArea = ({ field, id, label }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id} srOnly>
      {label}
    </Form.Label>
    <Form.Control
      as="textarea"
      rows={3}
      size="lg"
      id={id}
      placeholder={label}
      {...field}
    />
  </Form.Group>
)

export default FormFieldTextArea
