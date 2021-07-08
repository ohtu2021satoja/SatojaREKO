import { useState } from "react"
import imageService from "../../services/images"
import Row from "react-bootstrap/Row"
import NotificationError from "../NotificationError"
import FormSellerImage from "./FormSellerImage"
import ProfileHeaderSeller from "./ProfileHeaderSeller"
import FormSeller from "./FormSeller"

const ProfilePageSeller = ({ user, handleUserUpdate }) => {
  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showUpdateError, setShowUpdateError] = useState(false)

  // uploads the image to Cloudinary
  // returns image path
  const uploadImage = async (file) => {
    try {
      const response = await imageService.addImage(file)
      return response.data.public_id
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
      <NotificationError
        show={showUpdateError}
        handleClose={() => setShowUpdateError(false)}
        delay={5000}
        message="Profiilin päivitys epäonnistui"
      />
      <Row className="bg-basic mt-5 mx-2">
        <FormSellerImage
          user={user}
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleUpload={uploadImage}
          handleError={() => setShowError(true)}
          handleUserUpdate={handleUserUpdate}
        />
        <ProfileHeaderSeller user={user} openModal={() => setShowModal(true)} />
        <FormSeller
          user={user}
          handleUserUpdate={handleUserUpdate}
          handleError={() => setShowUpdateError(true)}
        />
      </Row>
    </>
  )
}

export default ProfilePageSeller
