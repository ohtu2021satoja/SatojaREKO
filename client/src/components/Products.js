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
  }, [])
  dispatch(setProducts(productsei))

  const renderProducts = (product, index) => {
    return (
      <Accordion className="mb-2" key={index}>
        <Accordion.Toggle as={Button} className="p-0" variant="text" eventKey="0">
          <Card>
            <Card.Header>
              <h3>{product.name}</h3>
            </Card.Header>
            <Card.Img src={product.image_url} />
            <Accordion.Collapse eventKey="0">
              <Card.Body className="text-center">
                <Card.Text>
                  {product.description}
                  <br />
                  Luomua: {product.organic ? "kyllä" : "ei"}
                  <br />
                  myyty {product.quantity_left}/{product.batch_quantity}
                  <br />
                  Kappalehinta {product.unit_price}€
                </Card.Text>
                <Nav>
                  <Nav.Link
                    as={Button}
                    variant="outline-secondary"
                    size="lg"
                    className="w-100"
                    href={`/update/${product.id}`}
                  >
                    muokkaa tuotetta
                  </Nav.Link>
                </Nav>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion.Toggle>
      </Accordion>
    )
  }
  return (
    <Row className="mt-5">
      <Col xs={12} className="text-center mb-4">
        <h2>Tuotteet</h2>
      </Col>
      <Col xs={12}>{productsei.map(renderProducts)}</Col>
    </Row>
  )
}

export default Products
