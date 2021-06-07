/* CURRENTLY NOT IN USE
import { useState } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const FormLogin = ({ handleLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    handleLogin(email, password)

    setEmail("")
    setPassword("")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label as="h3" className="my-4 text-center">
        Kirjaudu palveluun
      </Form.Label>
      <Form.Group>
        <Form.Control
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          size="lg"
          type="email"
          placeholder="Sähköposti"
          className="mb-3"
        />

        <Form.Control
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          size="lg"
          type="password"
          placeholder="Salasana"
        />
      </Form.Group>
      <Form.Row className="mb-3">
        <Col>
          <Button style={{ width: "100%" }} variant="success" size="lg" type="submit">
            Kirjaudu sisään
          </Button>
        </Col>
      </Form.Row>
      <div>
        <a href="/">Salasana unohtunut?</a>
      </div>
    </Form>
  )
}

export default FormLogin
*/
