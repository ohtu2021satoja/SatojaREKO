import { useState } from "react"
import imageService from "../../services/images"
import Row from "react-bootstrap/Row"
import NotificationError from "../NotificationError"
import FormBuyerImage from "./FormBuyerImage"
import ProfileHeaderBuyer from "./ProfileHeaderBuyer"
import FormBuyer from "./FormBuyer"

const ProfilePageBuyer = ({ user, handleUserUpdate }) => {
  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)

  // uploads the image to Cloudinary
  // returns image path
  const uploadImage = async (file) => {
    try {
      const response = await imageService.addImage(file)
      return response.data.url
    } catch (err) {
      setShowError(true)
    }
  }

  return (
    <>
      <NotificationError
        show={showError}
        handleClose={() => setShowError(false)}
        delay={5000}
        message="Kuvan lataaminen epäonnistui"
      />
      <Row className="mt-5 mx-2">
        <FormBuyerImage
          user={user}
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleUpload={uploadImage}
          handleError={() => setShowError(true)}
          handleUserUpdate={handleUserUpdate}
        />
        <ProfileHeaderBuyer user={user} openModal={() => setShowModal(true)} />
        <FormBuyer user={user} handleUserUpdate={handleUserUpdate} />
      </Row>
    </>
  )
}

export default ProfilePageBuyer
