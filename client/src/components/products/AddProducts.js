import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProductForm from "./ProductForm"

const AddProducts = () => {
  return (
    <Row className="h-100 px-3 bg-light-yellow">
      <Col xs={12} className="py-5 text-center">
        <h3>Uusi Ilmoitus</h3>
      </Col>
      <Col xs={12} md={{ span: 6, offset: 3 }}>
        <ProductForm />
      </Col>
    </Row>
  )
}

export default AddProducts
