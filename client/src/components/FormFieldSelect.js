import Form from "react-bootstrap/Form"

const FormFieldSelect = ({ field, id, label, items, setFieldValue }) => {
  return (
    <Form.Group className="mb-2">
      <div className="text-center">
        <Form.Label htmlFor={id}>{label}</Form.Label>
      </div>
      <Form.Control
        as="select"
        size="lg"
        id={id}
        custom
        onChange={(e) => setFieldValue(field.name, e.target.value)}
      >
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default FormFieldSelect
