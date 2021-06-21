import { useState } from "react"
import Row from "react-bootstrap/Row"
import FormImage from "./FormImage"
import ProfileHeader from "./ProfileHeader"
import FormBuyer from "./FormBuyer"

const ProfilePageBuyer = ({ user }) => {
  const [show, setShow] = useState(false)

  return (
    <Row className="mt-5 mx-2">
      <FormImage show={show} handleClose={() => setShow(false)} />
      <ProfileHeader user={user} openModal={() => setShow(true)} />
      <FormBuyer user={user} />
    </Row>
  )
}

export default ProfilePageBuyer
