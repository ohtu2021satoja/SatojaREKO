import { useState } from "react"
import Row from "react-bootstrap/Row"
import FormImage from "./FormImage"
import ProfileHeader from "./ProfileHeader"
import FormSeller from "./FormSeller"

const ProfilePageSeller = ({ user }) => {
  const [show, setShow] = useState(false)

  return (
    <Row className="mt-5 mx-2">
      <FormImage show={show} handleClose={() => setShow(false)} />
      <ProfileHeader user={user} openModal={() => setShow(true)} />
      <FormSeller user={user} />
    </Row>
  )
}

export default ProfilePageSeller
