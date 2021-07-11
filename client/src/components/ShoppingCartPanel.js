import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import Button from "react-bootstrap/esm/Button"

const ShoppingCartPanel = ({ totalPrice, handleSubmitOrders }) => {
  return (
    <Row className="card sticky-top bg-light-yellow cart-panel">
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
        lg={{ span: 8, offset: 2 }}
        className="pt-2"
      >
        <h4>Varauskori</h4>
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Row className="px-3 justify-content-between">
          <h5>YHTEENSÄ</h5>
          <h5> {totalPrice}e</h5>
        </Row>
      </Col>
      <Col
        xs={12}
        md={{ span: 10, offset: 1 }}
        lg={{ span: 8, offset: 2 }}
        className="mb-3 pb-0 justify-content-center"
      >
        <Button variant="success" onClick={handleSubmitOrders} block>
          Lähetä varaus
        </Button>
      </Col>
    </Row>
  )
}

export default ShoppingCartPanel
