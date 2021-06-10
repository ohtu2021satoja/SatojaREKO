import "./PopUp.css"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"

const DeleteProductPopUp = (props) => {
  const handleDeleteButton = () => {
    console.log("delete this product")
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <Row className="mb-2">
          <Col>
            Haluatko todella poistaa {props.products[props.productIndexi].name} Henkilön{" "}
            {props.orderers[props.buyerIndexi].name} tilauksesta
          </Col>
          <div className="exitButton">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
              onClick={() => props.setPopUp(false)}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </Row>
        <Row>
          <Col className="text-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              style={{ color: "red" }}
              onClick={handleDeleteButton}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DeleteProductPopUp
