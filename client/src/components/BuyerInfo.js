import Col from "react-bootstrap/esm/Col"
import Image from "react-bootstrap/esm/Image"
import Row from "react-bootstrap/esm/Row"

const BuyerInfo = (props) => (
  <Col xs={{ span: 8, offset: 2 }} className="my-4 text-center">
    <h3>{props.orderers[props.buyerIndexi].name}</h3>
    <div className="mb-4">
      <Image
        src={props.orderers[props.buyerIndexi].buyers_image_url}
        rounded
        fluid
        alt={`Kuvassa ${props.orderers[props.buyerIndexi].name}`}
      />
    </div>
    <p className="mb-1">nimi@domain.fi</p>
    <p>040 6333 63333</p>
  </Col>
)

export default BuyerInfo
