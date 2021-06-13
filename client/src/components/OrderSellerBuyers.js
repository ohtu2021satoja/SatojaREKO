import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"
import ListGroup from "react-bootstrap/esm/ListGroup"
import OrderDeletePopUp from "./OrderDeletePopUp"
import { useState } from "react"

const OrdersSellerBuyers = (props) => {
  const renderProducts = (product, index) => {
    return (
      <ListGroupItem key={index}>
        <Row>
          <Col>{product.name}</Col>
          <Col>{product.sold}</Col>
          <Col>{product.price * product.sold}€</Col>
          <Col>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
              style={{ color: "red" }}
              onClick={() => {
                HandleDeleteProductButton()
                setProductIndexi(index)
              }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Col>
        </Row>
      </ListGroupItem>
    )
  }

  const [deleteProductPopUp, setDeleteProductPopUp] = useState(false)
  const [deleteOrderPopUp, setDeleteOrderPopUp] = useState(false)
  const [productIndexi, setProductIndexi] = useState(null)
  const [buyerIndexi, setBuyerIndexi] = useState(null)

  const HandleDeleteProductButton = () => {
    setDeleteProductPopUp(true)
  }
  const HandleDeleteOrderButton = () => {
    setDeleteOrderPopUp(true)
    // event.stopPropagation()
  }
  const HandleBuyerInfo = () => {
    props.setBuyerInfo(true)
  }

  if (deleteOrderPopUp) {
    return (
      <OrderDeletePopUp setPopUp={setDeleteOrderPopUp}>
        Oletko varma että haluat poistaa {props.orderers[buyerIndexi].name} tilauksen
      </OrderDeletePopUp>
    )
  }

  if (deleteProductPopUp) {
    return (
      <OrderDeletePopUp setPopUp={setDeleteProductPopUp}>
        Oletko varma että haluat poistaa {props.orderProducts[productIndexi].name}{" "}
        henkilön {props.orderers[buyerIndexi].name} tilauksesta
      </OrderDeletePopUp>
    )
  }
  const renderBuyers = (buyer, index) => {
    return (
      <Accordion
        className="mb-2"
        key={index}
        onClick={() => {
          setBuyerIndexi(index)
        }}
      >
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row>
              <Col xs={8} className="text-left">
                <Card.Title
                  style={{ textDecorationLine: "underline" }}
                  onClick={HandleBuyerInfo}
                >
                  {buyer.name}
                </Card.Title>
                <Card.Title>{buyer.id}</Card.Title>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <Col>
                <ListGroup>
                  <Row className="mt-5">
                    <Col>
                      <h6>Varauskori:</h6>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>Tuote</Col>
                    <Col>Määrä.</Col>
                    <Col>Hinta</Col>
                    <Col> </Col>
                  </Row>
                  {props.orderProducts.map(renderProducts)}
                  <Row className="mt-5">
                    <Col>
                      <h6>YHTEENSÄ</h6>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>xxx,xx€</Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                        style={{ color: "red" }}
                        onClick={() => {
                          HandleDeleteOrderButton()
                          setBuyerIndexi(index)
                        }}
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </Col>
                  </Row>
                </ListGroup>
              </Col>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }

  return <div>{props.orderers.map(renderBuyers)}</div>
}

export default OrdersSellerBuyers
