import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import { Link } from "react-router-dom"
import Table from "react-bootstrap/Table"
import OrderDeletePopUp from "./OrderDeletePopUp"
import { useState } from "react"
import { useSelector } from "react-redux"
import { deleteProductOrder, deleteOrder } from "../services/orders"

const OrdersSellerBuyers = (props) => {
  const [deleteProductPopUp, setDeleteProductPopUp] = useState(false)
  const [deleteOrderPopUp, setDeleteOrderPopUp] = useState(false)
  const [productIndexi, setProductIndexi] = useState(null)
  const [productName, setProductName] = useState("")
  const [orderToggle, setOrderToggle] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [sizeId, setSizeId] = useState(null)

  const Order = props.Order
  const sellerId = useSelector((state) => state.authedUser.id)

  async function DeleteProductOrder() {
    const response = await deleteProductOrder(sellerId, orderId, sizeId)
    console.log("response ", response)
  }

  async function DeleteOrder() {
    const response = await deleteOrder(sellerId, orderId)
    console.log("response ", response)
  }

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
    console.log("productIndexi ", productIndexi)
    return (
      <OrderDeletePopUp
        setPopUp={setDeleteOrderPopUp}
        DeleteOrder={DeleteOrder}
        deleteOrderPopUp={deleteOrderPopUp}
      >
        Oletko varma että haluat poistaa {props.Order[productIndexi].users_firstname}{" "}
        {props.Order[productIndexi].users_lastname} tilauksen
      </OrderDeletePopUp>
    )
  }

  if (deleteProductPopUp) {
    return (
      <OrderDeletePopUp
        setPopUp={setDeleteProductPopUp}
        DeleteProductOrder={DeleteProductOrder}
        deleteProductPopUp={deleteProductPopUp}
      >
        Oletko varma että haluat poistaa henkilön{" "}
        {props.Order[productIndexi].users_firstname}{" "}
        {props.Order[productIndexi].users_lastname} tilauksesta {productName}
      </OrderDeletePopUp>
    )
  }

  const renderProducts = (product, index) => {
    return (
      <tr key={index}>
        <td>{product.product_name}</td>
        <td>{product.quantity}</td>
        <td>{(product.price * product.quantity) / 100}€</td>
        <td>
          <Button
            type="button"
            variant="outline-light"
            area-label="Poista tuote"
            onClick={() => {
              HandleDeleteProductButton()
              setProductIndexi(index)
              setProductName(product.product_name)
              setSizeId(product.size_id)
              DeleteProductOrder()
            }}
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
  const OverallPrice = (Order) => {
    var price = 0
    for (let i = 0; i < Order.user_orders.length; i++) {
      price = (Order.user_orders[i].quantity * Order.user_orders[i].price) / 100 + price
    }
    return price
  }

  const renderBuyers = (buyer, index) => {
    const overallPrice = OverallPrice(buyer)
    return (
      <Accordion
        className="mb-1"
        key={index}
        onClick={() => props.setBuyerIndexi(buyer.user_id)}
      >
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row className="flex-nowrap align-items-center">
              <Col
                as={Link}
                to="/orders/seller"
                xs={9}
                className="py-2 text-decoration-none text-left"
                onClick={() => {
                  HandleBuyerInfo()
                  props.setBuyerIndexi(index)
                }}
              >
                <Card.Text style={{ textDecorationLine: "underline" }}>
                  {buyer.users_firstname} {buyer.users_lastname}
                </Card.Text>
                <Card.Title>{buyer.order_id}</Card.Title>
              </Col>
              <Col xs={3}>
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
                      className="bi bi-caret-up-fill"
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
                    onClick={() => {
                      setOrderToggle(!orderToggle)
                      setOrderId(buyer.order_id)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      width="24"
                      height="24"
                      className="bi bi-caret-down-fill"
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
                    </tr>
                  </thead>
                  <tbody>
                    {buyer.user_orders.map(renderProducts)}
                    <tr>
                      <td>YHTEENSÄ</td>
                      <td></td>
                      <td>{overallPrice}€</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
                <Row className="mb-2 align-items-center">
                  <Col xs={9} className="text-right">
                    Poista koko tilaus:
                  </Col>
                  <Col xs={3}>
                    <Button
                      type="button"
                      variant="outline-light"
                      area-label="Poista koko tilaus"
                      onClick={() => {
                        HandleDeleteOrderButton()
                        setProductIndexi(index)
                      }}
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

  return <div>{Order.map(renderBuyers)}</div>
}

export default OrdersSellerBuyers
