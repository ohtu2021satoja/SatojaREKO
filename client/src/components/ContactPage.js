import Row from "react-bootstrap/Row"
import ContactForm from "./ContactForm"

const ContactPage = ({ user }) => {
  return (
    <Row className="mt-5 mx-2">
      <h2 className="mb-4">Ota yhteyttä</h2>
      <ContactForm user={user} />
    </Row>
  )
}

export default ContactPage
