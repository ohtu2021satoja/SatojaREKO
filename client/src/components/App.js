import "./App.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import LoginForm from "./LoginForm";
import NavigationBar from "./NavigationBar";

const App = () => {
  return (
    <Container style={{ backgroundColor: "red" }} fluid>
      <Row>
        <LoginForm />
      </Row>
      <NavigationBar />
    </Container>
  );
};

export default App;
