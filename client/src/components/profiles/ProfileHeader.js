import Col from "react-bootstrap/Col"
// import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

const ProfileHeader = ({ user, openModal }) => (
  <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
    <h2 className="mb-4">Omat tiedot</h2>
    {/*
      <div className="mb-4">
        <Image
          src={user.imgUrl}
          rounded
          fluid
          alt={`kuvassa ${user.firstname} ${user.lastname}`}
        />
        <Button variant="outline-danger" size="lg" type="button" className="w-100">
          Poista kuva
        </Button>
      </div>
    )*/}
    <Button
      variant="primary"
      size="lg"
      type="button"
      className="w-100"
      onClick={openModal}
    >
      Lisää profiilikuva
    </Button>
  </Col>
)

export default ProfileHeader
