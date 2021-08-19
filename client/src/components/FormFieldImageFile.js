import Form from "react-bootstrap/Form"

const FormFieldImageFile = ({ field, id, label, setFieldValue }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.File
      id={id}
      type="file"
      accept=".png, .jpg, .jpeg"
      onChange={(e) => {
        setFieldValue(field.name, e.currentTarget.files[0])
      }}
    />
    <Form.Text className="text-muted">Hyväksymme JPEG ja PNG kuvatiedostot.</Form.Text>
  </Form.Group>
)

export default FormFieldImageFile
