import { useState } from "react"
import Row from "react-bootstrap/Row"
import FormSellerImage from "./FormSellerImage"
import ProfileHeaderSeller from "./ProfileHeaderSeller"
import FormSeller from "./FormSeller"

const ProfilePageSeller = ({ user, handleUserUpdate }) => {
  const [show, setShow] = useState(false)

  return (
    <Row className="mt-5 mx-2">
      <FormSellerImage user={user} show={show} handleClose={() => setShow(false)} />
      <ProfileHeaderSeller user={user} openModal={() => setShow(true)} />
      <FormSeller user={user} handleUserUpdate={handleUserUpdate} />
    </Row>
  )
}

export default ProfilePageSeller
