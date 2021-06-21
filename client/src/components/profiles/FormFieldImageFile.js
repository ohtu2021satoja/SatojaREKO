import Form from "react-bootstrap/Form"

const FormFieldImageFile = ({ field, id, label }) => {
  return (
    <Form.Group className="mb-2">
      <Form.Label htmlFor={id} srOnly>
        {label}
      </Form.Label>
      <Form.File type="file" id={id} accept=".png, .jpg, .jpeg" {...field} />
      <Form.Text className="text-muted">
        Hyväksymme JPEG ja PNG kuvatiedostot. Tiedoston maksimikoko on X.
      </Form.Text>
    </Form.Group>
  )
}

export default FormFieldImageFile
