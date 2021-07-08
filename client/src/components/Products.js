import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Nav from "react-bootstrap/Nav"
import Accordion from "react-bootstrap/Accordion"
import productService from "../services/products"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setProducts } from "../reducers/products"
const Products = () => {
  const [productsei, setProductsei] = useState([])
  const id = useSelector((state) => state.authedUser.id)

  const dispatch = useDispatch()

  //when user has own products
  console.log("id ", id)
  useEffect(() => {
    async function fetchData() {
      const productsii = await productService.getSellerProducts(id)
      setProductsei(productsii)
    }
    fetchData()
  }, [id])
  dispatch(setProducts(productsei))

  const renderProducts = (product, index) => {
    return (
      <Accordion className="mb-3" key={index}>
        <Accordion.Toggle as={Button} className="p-0" variant="text" eventKey="0">
          <Card>
            <Card.Header>
              <h3>{product.name}</h3>
            </Card.Header>
            <Card.Img
              src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${product.image_url}`}
              alt="Tuotekuva"
              className="mb-2"
            />
            <Accordion.Collapse eventKey="0">
              <Card.Body className="text-left">
                <Card.Text className="mb-1">{product.description}</Card.Text>
                <Card.Text className="mb-1">
                  Luomua: {product.organic ? "kyllä" : "ei"}
                </Card.Text>
                <Card.Text className="mb-1">
                  myyty {product.quantity_left}/{product.batch_quantity}
                </Card.Text>
                <Card.Text className="mb-4">Kappalehinta {product.unit_price}€</Card.Text>
                <Nav>
                  <Button
                    as={Link}
                    to={`/update/${product.id}`}
                    variant="outline-success"
                    size="lg"
                    className="w-100"
                  >
                    Muokkaa ilmoitusta
                  </Button>
                </Nav>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion.Toggle>
      </Accordion>
    )
  }
  return (
    <Row className="h-100 mb-5 flex-column bg-light-yellow">
      <Col xs={12} className="mt-5 mb-5 py-2 text-center">
        <h2>Tuotteet</h2>
      </Col>
      <Col xs={12} md={{ span: 8, offset: 2 }}>
        {productsei.map(renderProducts)}
      </Col>
    </Row>
  )
}

export default Products
