import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

const ProfileHeaderSeller = ({ user, openModal }) => (
  <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
    <h2 className="mb-4">Omat tiedot</h2>
    <div className="mb-4">
      <Image
        src={user.sellers_image_url}
        rounded
        fluid
        alt={`kuvassa ${user.firstname} ${user.lastname}`}
      />
      <Button
        variant="outline-secondary"
        size="lg"
        type="button"
        className="w-100"
        onClick={openModal}
      >
        Vaihda kuva
      </Button>
    </div>
  </Col>
)

export default ProfileHeaderSeller