import "./App.css";
import Container from "react-bootstrap/Container";
import NavigationBar from "./navigation/NavigationBar";

const App = () => {
  return (
    <Container style={{ backgroundColor: "red" }} fluid>
      <NavigationBar />
    </Container>
  );
};

export default App;
