import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

const ProfileHeader = (/*{ user }*/) => (
  <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
    <h2 className="mb-4">Omat tiedot</h2>
    <div className="mb-4">
      <Image src="https://via.placeholder.com/500" rounded fluid alt="User photo" />
    </div>
    <Button variant="outline-danger" size="lg" type="button" className="w-100">
      Poista kuva
    </Button>
  </Col>
)

export default ProfileHeader
