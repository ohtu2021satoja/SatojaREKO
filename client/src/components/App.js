import { useEffect, useState } from "react";
// import userAPI from "../services/users";
import "./App.css";
import Container from "react-bootstrap/Container";
import NavigationBar from "./navigation/NavigationBar";
import Routes from "./navigation/Routes";
import LoginPage from "./LoginPage";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Get users form API
    // const allUsers = userAPI.getAll()
    const allUsers = [
      {
        id: 1,
        email: "user1@a.com",
        password: "pw1",
        products: ["milk", "bread"],
      },
      {
        id: 2,
        email: "user2@a.com",
        password: "pw2",
        products: ["blueberries", "mushroome"],
      },
    ];

    setUsers(allUsers);
  }, []);

  const getCurrentUser = (email, password) => {
    const currentUser = users.find(
      (user) => user.email === email && user.password === password
    );

    setUser(currentUser);
  };

  const logOut = () => {
    setUser({});
  };

  return (
    <Container fluid>
      {Object.keys(user).length === 0 ? (
        <LoginPage handleLogin={getCurrentUser} />
      ) : (
        <div>
          <NavigationBar />
          <Routes user={user} logOut={logOut} />
        </div>
      )}
    </Container>
  );
};

export default App;
