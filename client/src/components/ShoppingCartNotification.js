import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/Row"
import { Link } from "react-router-dom"

const ShoppingCartNotification = () => {
  return (
    <Row className="bg-light-green w-100 px-5 mx-0" style={{ marginTop: 200 }}>
      <Col className="w-100 mt-3 text-center ">
        <h2>Varaus lähetetty.</h2>
        <p>
          Löydät varauksen <Link to="/orders/buyer">Noudot-sivulta.</Link>
        </p>
      </Col>
    </Row>
  )
}

export default ShoppingCartNotification
