import Form from "react-bootstrap/Form"

const FormFieldImageFile = ({ id, name, label, setFieldValue }) => (
  <Form.Group className="mb-2">
    <Form.Label htmlFor={id} srOnly>
      {label}
    </Form.Label>
    <Form.File
      id={id}
      name={name}
      type="file"
      accept=".png, .jpg, .jpeg"
      onChange={(e) => {
        setFieldValue(name, e.currentTarget.files[0])
      }}
    />
    <Form.Text className="text-muted">Hyväksymme JPEG ja PNG kuvatiedostot.</Form.Text>
  </Form.Group>
)

export default FormFieldImageFile
