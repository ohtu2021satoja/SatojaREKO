import Row from "react-bootstrap/Row"
import ProfileHeader from "./ProfileHeader"
import FormSeller from "./FormSeller"

const ProfilePageSeller = ({ user }) => (
  <Row className="mt-5 mx-2">
    <ProfileHeader user={user} />
    <FormSeller user={user} />
  </Row>
)

export default ProfilePageSeller
