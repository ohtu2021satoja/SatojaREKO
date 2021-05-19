import "./App.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LoginForm from "./LoginForm";

const App = () => {
  return (
    <Container style={{ backgroundColor: "red" }} fluid>
      <Row>
        <LoginForm />
      </Row>
    </Container>
  );
};

export default App;
