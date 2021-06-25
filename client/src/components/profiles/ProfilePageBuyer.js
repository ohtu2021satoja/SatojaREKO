import { useState } from "react"
import Row from "react-bootstrap/Row"
import FormBuyerImage from "./FormBuyerImage"
import ProfileHeaderBuyer from "./ProfileHeaderBuyer"
import FormBuyer from "./FormBuyer"

const ProfilePageBuyer = ({ user, handleUserUpdate }) => {
  const [show, setShow] = useState(false)

  return (
    <Row className="mt-5 mx-2">
      <FormBuyerImage user={user} show={show} handleClose={() => setShow(false)} />
      <ProfileHeaderBuyer user={user} openModal={() => setShow(true)} />
      <FormBuyer user={user} handleUserUpdate={handleUserUpdate} />
    </Row>
  )
}

export default ProfilePageBuyer
