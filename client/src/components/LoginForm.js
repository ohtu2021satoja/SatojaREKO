import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = () => {
  return (
    <Form
      as={Col}
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 6, offset: 3 }}
      xl={{ span: 4, offset: 4 }}
    >
      <Form.Label as="h3" className="my-4 text-center">
        Kirjaudu palveluun
      </Form.Label>
      <Form.Group>
        <Form.Control
          size="lg"
          type="email"
          placeholder="Sähköposti"
          className="mb-3"
        />

        <Form.Control
          size="lg"
          type="password"
          placeholder="Salasana"
        />
      </Form.Group>
      <Form.Row className="mb-3">
        <Col>
          <Button
            style={{ width: "100%" }}
            variant="success"
            size="lg"
            type="submit"
          >
            Kirjaudu sisään
          </Button>
        </Col>
      </Form.Row>
      <div>
        <a href="/">Salasana unohtunut?</a>
      </div>
    </Form>
  );
};

export default LoginForm;
