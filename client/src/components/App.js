import "./App.css";
import { Container, Row } from "react-bootstrap";
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
