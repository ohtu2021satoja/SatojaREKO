import Button from "react-bootstrap/Button"

const SellerPage = ({ seller, closePage }) => (
  <div>
    <p>Myyjän {seller.name} infosivu</p>
    <Button className="btn btn-primary btn-sm" onClick={closePage}>
      Takaisin karttaan
    </Button>
  </div>
)

export default SellerPage
