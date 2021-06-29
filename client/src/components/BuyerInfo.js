import Col from "react-bootstrap/esm/Col"
import Image from "react-bootstrap/esm/Image"
import Row from "react-bootstrap/esm/Row"
import Button from "react-bootstrap/esm/Button"

const BuyerInfo = (props) => {
  console.log("props, ", props)
  const HandleBuyerInfoButton = () => {
    props.setBuyerInfo(false)
  }
  return (
    <Col xs={{ span: 8, offset: 2 }} className="mb-4 text-center">
      <Col xs={12} className="text-left">
        <Button
          type="button"
          variant="outline-light"
          area-label="Poista koko tilaus"
          onClick={HandleBuyerInfoButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              className="bi bi-arrow-left-circle"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />
          </svg>
        </Button>
      </Col>
      <Row>
        <Col>
          {props.user.users_firstname} {props.user.users_lastname}
        </Col>
      </Row>
      <div className="mb-4">
        <Image src={props.user.users_image_url} rounded fluid alt="User photo" />
      </div>
      <Row>
        <Col>{props.user.users_email}</Col>
      </Row>
      <Row>
        <Col>{props.user.users_phonenumber}</Col>
      </Row>
    </Col>
  )
}
export default BuyerInfo
