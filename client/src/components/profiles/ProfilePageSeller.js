// import { useState } from "react"
import Row from "react-bootstrap/Row"
import ProfileHeader from "./ProfileHeader"
import FormSeller from "./FormSeller"
// Test notification
import NotificationSuccess from "../NotificationSuccess"

const ProfilePageSeller = ({ user }) => {
  // Test modal
  //const [modalShow, setModalShow] = useState(false)

  // const handleClose = () => setModalShow(false)

  /*const handleSubmit = () => {
    setModalShow(false)
  }*/

  return (
    <Row className="mt-5 mx-2">
      <NotificationSuccess />

      <ProfileHeader user={user} />
      <FormSeller user={user} />
    </Row>
  )
}

export default ProfilePageSeller
