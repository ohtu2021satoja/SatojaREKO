import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
// import { CloudinaryContext, Image, Transformation } from "cloudinary-react"

const ProfileHeaderSeller = ({ user, openModal }) => (
  <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
    <h2 className="mb-4">Omat tiedot</h2>
    <div className="mb-4">
      {/*<CloudinaryContext cloudName="dpk81nwou">
        <Image publicId={user.sellers_image_url}>
          <Transformation
            dpr="auto"
            responsive
            width="auto"
            crop="scale"
            responsiveUseBreakpoints="true"
            alt={`kuvassa ${user.firstname} ${user.lastname}`}
          />
        </Image>
      </CloudinaryContext>*/}
      <Image
        src={user.buyers_image_url}
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

export default ProfileHeaderSeller
