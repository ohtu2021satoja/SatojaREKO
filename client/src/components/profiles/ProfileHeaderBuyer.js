import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

const ProfileHeaderBuyer = ({ user, openModal }) => (
  <Col
    xs={{ span: 10, offset: 1 }}
    sm={{ span: 8, offset: 2 }}
    md={{ span: 6, offset: 3 }}
    className="mb-4 text-center"
  >
    <h2 className="mb-4">Omat tiedot</h2>
    <div className="mb-4">
      <Image
        src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${user.buyers_image_url}`}
        rounded
        fluid
        alt={`kuvassa ${user.firstname} ${user.lastname}`}
      />
    </div>
    <Button
      variant="outline-secondary"
      size="lg"
      type="button"
      className="w-100"
      onClick={openModal}
    >
      Vaihda kuva
    </Button>
  </Col>
)

export default ProfileHeaderBuyer
