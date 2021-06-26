import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import Accordion from "react-bootstrap/Accordion"
import OrderDeletePopUp from "./OrderDeletePopUp"
import { useState } from "react"

const OrdersSellerBuyers = (props) => {
  const [deleteProductPopUp, setDeleteProductPopUp] = useState(false)
  const [deleteOrderPopUp, setDeleteOrderPopUp] = useState(false)
  const [productIndexi, setProductIndexi] = useState(null)
  const [orderToggle, setOrderToggle] = useState(false)

  const HandleDeleteProductButton = (i) => {
    setDeleteProductPopUp(true)
    setProductIndexi(i)
  }
  const HandleDeleteOrderButton = (i) => {
    setDeleteOrderPopUp(true)
    props.setBuyerIndexi(i)
    // event.stopPropagation()
  }
  const HandleBuyerInfo = (i) => {
    props.setBuyerInfo(true)
    props.setBuyerIndexi(i)
  }

  if (deleteOrderPopUp) {
    return (
      <OrderDeletePopUp setPopUp={setDeleteOrderPopUp}>
        Oletko varma että haluat poistaa {props.orderers[props.buyerIndexi].name}{" "}
        tilauksen
      </OrderDeletePopUp>
    )
  }

  if (deleteProductPopUp) {
    return (
      <OrderDeletePopUp setPopUp={setDeleteProductPopUp}>
        Oletko varma että haluat poistaa {props.orderProducts[productIndexi].name}{" "}
        henkilön {props.orderers[props.buyerIndexi].name} tilauksesta
      </OrderDeletePopUp>
    )
  }
  console.log("buyerinfo ", props.buyerInfo)

  const renderProducts = (product, index) => {
    return (
      <tr key={index}>
        <td>{product.name}</td>
        <td>{product.sold}</td>
        <td>{product.price * product.sold}</td>
        <td>
          <Button
            type="button"
            variant="outline-light"
            area-label="Poista tuote"
            onClick={() => HandleDeleteProductButton(index)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              className="bi bi-x-circle-fill delete-link"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </Button>
        </td>
      </tr>
    )
  }

  const renderBuyers = (buyer, index) => {
    return (
      <Accordion className="mb-1" key={index} onClick={() => props.setBuyerIndexi(index)}>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row className="flex-nowrap align-items-center">
              <Col
                as={Link}
                to="/orders/seller"
                xs={10}
                className="py-2 text-decoration-none text-left"
                onClick={() => HandleBuyerInfo(index)}
              >
                <Card.Text className="mb-1 text-decoration-underline">
                  {buyer.name}
                </Card.Text>
                <Card.Text>{buyer.id}</Card.Text>
              </Col>
              <Col xs={2}>
                {orderToggle === true ? (
                  <Button
                    type="button"
                    variant="outline-light"
                    area-label="Sulje tilaajan tiedot"
                    onClick={() => setOrderToggle(!orderToggle)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width="24"
                      height="24"
                      class="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline-light"
                    area-label="Katso tilaajan tiedot"
                    onClick={() => setOrderToggle(!orderToggle)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width="24"
                      height="24"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                  </Button>
                )}
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <div className="pt-3 text-left">
                <h5 className="mb-1">Varauskori:</h5>
                <Table className="mt-2 text-left">
                  <thead>
                    <tr>
                      <th>Tuote</th>
                      <th>Määrä.</th>
                      <th>Hinta</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.orderProducts.map(renderProducts)}
                    <tr>
                      <td>YHTEENSÄ</td>
                      <td></td>
                      <td>xxx,xx€</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
                <Row className="mb-2 align-items-center">
                  <Col xs={10} className="text-right">
                    Poista koko tilaus:
                  </Col>
                  <Col xs={2}>
                    <Button
                      type="button"
                      variant="outline-light"
                      area-label="Poista koko tilaus"
                      onClick={() => HandleDeleteOrderButton(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill delete-link"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }

  return <div>{props.orderers.map(renderBuyers)}</div>
}

export default OrdersSellerBuyers
