import Nav from "react-bootstrap/esm/Nav"

const OrderSellerNavigationBar = (props) => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="product">
      <Nav.Item>
        <Nav.Link
          onClick={props.HandleProductButton}
          eventKey={"product"}
          style={{ textDecoration: "none" }}
        >
          Tuotteet
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={props.HandleOrderButton}
          eventKey={"order"}
          style={{ textDecoration: "none" }}
        >
          Tilaajat
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
export default OrderSellerNavigationBar
