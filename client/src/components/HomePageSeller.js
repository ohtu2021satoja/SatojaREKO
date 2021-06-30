import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const HomePageSeller = () => (
  <Row className="h-100 bg-light-yellow">
    <Col
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 6, offset: 3 }}
      xl={{ span: 4, offset: 4 }}
      className="pt-4"
    >
      <Row>
        <Col xs={12} className="mb-4 text-start">
          <h3>Tervetuloa!</h3>

          <p>Satoja.fi on palvelu, jonka avulla voit ostaa ja myydä lähiruokaa.</p>

          <p>
            Täällä tuottaja puolella voit luoda myynti-ilmoituksia Reko-tilaisuuksiin.
          </p>

          <p>
            Palvelun kautta pääset muokkaamaan jo luotuja myynti-ilmoituksia. Voit myös
            helposti tarkistaa tilaisuus kohtaisesti tuotteiden varaustilanteen ja
            ostajat.
          </p>

          <p>
            Tutustu myös palvelun ostopuoleen varaamalla tuotteita muilta tuottajilta.
          </p>

          <p>
            Jos tarvitset apua tai lisätietoa liittyen palvelun toimintaan tai
            Reko-tilaisuuksiin, niin ota yhteyttä:{" "}
            <a href="mailto:​asiakaspalvelu@satoja.fi">asiakaspalvelu@satoja.fi</a>
          </p>

          <p classNAme="mb-0">Kesäisin terveisin!</p>
          <p>Team Satoja</p>
        </Col>
      </Row>
    </Col>
  </Row>
)
export default HomePageSeller
