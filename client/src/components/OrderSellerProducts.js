import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import ListGroup from "react-bootstrap/esm/ListGroup"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem"

const OrdersSellerProducts = (props) => {
  const Order = props.Order
  const products = props.Order.events_orders
  let productsList = []
  let userList = []

  const getUsers = (list) => {
    list.events_orders.map((x) => {
      userList.push({
        firstname: x.users_firstname,
        lastname: x.users_lastname,
        order_id: x.order_id,
        user_id: x.user_id,
        user_orders: x.user_orders,
      })
    })
  }

  const getProducts = (list) => {
    const products = []
    const lista = []
    for (let i = 0; i < list.length; i++) {
      products.push(list[i].user_orders)
    }
    products.map((x) => {
      for (let i = 0; i < x.length; i++) {
        lista.push({
          name: x[i].product_name,
          quantity: x[i].quantity,
          price: x[i].price,
          id: x[i].product_id,
          image: x[i].product_image_url,
          removed: x[i].removed,
        })
      }
    })
    productsList = []
    lista.forEach((x) => {
      const tulos = productsList.find((t) => t.name === x.name)
      if (!tulos) {
        productsList.push({
          name: x.name,
          quantity: x.quantity,
          price: x.price,
          image: x.image,
          removed: x.removed,
        })
      } else {
        tulos.quantity = tulos.quantity + x.quantity
      }
    })
  }

  getProducts(products)
  getUsers(Order)

  const HandleSingleBuyerButton = () => {
    props.setListView(false)
  }
  const Buyers = (props) => {
    const names = []
    props.userList.map((dude) => {
      dude.user_orders.map((yksikko) => {
        if (yksikko.product_name === props.product_name) {
          names.push({
            firstname: dude.firstname,
            lastname: dude.lastname,
            id: dude.order_id,
          })
        }
      })
    })
    function getUnique(dudes, index) {
      const unique = []
      dudes.map((dude) => {
        if (unique.find((x) => x.id === dude.id)) {
        } else {
          unique.push(dude)
        }
      })
      return unique
    }
    const uniqueUsers = getUnique(names)

    return uniqueUsers.map((dude, index) => {
      return (
        <ListGroupItem className="border-0 px-0 pt-3 text-left" key={index}>
          <Row className="flex-nowrap align-items-center">
            <Col xs={9}>
              <Card.Text className="mb-1">
                {dude.firstname} {dude.lastname}
              </Card.Text>
              <Card.Text>Tilausnumero: {dude.id}</Card.Text>
            </Col>
            <Col xs={3}>
              <Button
                type="button"
                variant="outline-light"
                area-label="Katso tilaajan tilaus"
                onClick={HandleSingleBuyerButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-caret-right-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </Button>
            </Col>
          </Row>
        </ListGroupItem>
      )
    })
  }

  const renderOrders = (product, index) => {
    return (
      <Accordion className="mb-1" key={index}>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row className="flex-nowrap align-items-center">
              <Col xs={4}>
                <Card.Img
                  src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${product.image}`}
                  alt="Tuotekuva"
                />
              </Col>
              <Col xs={8} className="text-left">
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Myyty: {product.quantity} kpl
                </Card.Subtitle>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                <Buyers
                  key={index}
                  userList={userList}
                  product_name={product.name}
                  HandleSingleBuyerButton={HandleSingleBuyerButton}
                />
              </ListGroup>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }
  return <div>{productsList.map(renderOrders)}</div>
}

export default OrdersSellerProducts
