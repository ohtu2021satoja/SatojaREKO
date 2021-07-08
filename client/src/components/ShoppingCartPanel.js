import Button from "react-bootstrap/esm/Button"
import Col from "react-bootstrap/esm/Col"

const ShoppingCartPanel = ({ totalPrice, handleSubmitOrders }) => {
  return (
    <div className="card sticky-top pt-1 pb-3 px-0 mb-0 light-yellow cart-panel">
      <Col xs={12} className="d-flex justify-content-start">
        <h4>Varauskori</h4>
      </Col>
      <Col xs={12} className="d-flex justify-content-between">
        <h5>YHTEENSÄ</h5>
        <h5> {totalPrice}e</h5>
      </Col>
      <Col xs={12} className="mb-0 pb-0 justify-content-center">
        <Button variant="success" onClick={handleSubmitOrders} block>
          Lähetä varaus
        </Button>
      </Col>
    </div>
  )
}

export default ShoppingCartPanel
