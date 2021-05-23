import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePageSeller = () => (
  <div>
    <Row style={{ paddingTop: 70, paddingBottom: 70 }}>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        xl={{ span: 4, offset: 4 }}
      >
        <Row>
          <Col xs={12} className="mb-4 text-center">
            Täällä taas!
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);
export default HomePageSeller;
