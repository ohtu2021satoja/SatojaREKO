import Button from "react-bootstrap/Button";

const HomePage = ({ logOut }) => (
  <div>
    <h1>Home Page</h1>
    <Button onClick={logOut} variant="danger" size="lg" type="submit">
      Kirjaudu ulos
    </Button>
  </div>
);
export default HomePage;
