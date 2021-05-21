import Row from 'react-bootstrap/Row';
import LoginForm from "./LoginForm";

const LoginPage = ({ handleLogin }) => {
  return (
    <Row>
      <LoginForm handleLogin={handleLogin} />
    </Row>
  );
};

export default LoginPage;