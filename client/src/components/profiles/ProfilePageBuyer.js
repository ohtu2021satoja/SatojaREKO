import Row from "react-bootstrap/Row"
import ProfileHeader from "./ProfileHeader"
import FormBuyer from "./FormBuyer"

const ProfilePageBuyer = ({ user }) => {
  return (
    <Row className="mt-5 mx-2">
      <ProfileHeader user={user} />
      <FormBuyer user={user} />
    </Row>
  )
}

export default ProfilePageBuyer
