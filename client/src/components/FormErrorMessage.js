import Form from "react-bootstrap/Form"

const FormErrorMessage = ({ children }) => (
  <Form.Text className="py-2 text-danger">{children}</Form.Text>
)

export default FormErrorMessage
