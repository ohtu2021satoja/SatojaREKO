import "./App.css";
import Container from "react-bootstrap/Container";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "./navigation/Routes";

const App = () => {
  return (
    <Container style={{ backgroundColor: "red" }} fluid>
      <NavigationBar />
      <Routes />
    </Container>
  );
};

export default App;
