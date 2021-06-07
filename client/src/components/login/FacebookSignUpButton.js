import Button from "react-bootstrap/Button"

const FacebookSignUpButton = ({ handleSignUp }) => {
  const getUserFormFacebook = () => {
    const facebookUser = {
      name: "Olli",
      surname: "Ostaja",
      email: "olli@gmail.com",
    }

    handleSignUp(facebookUser)
  }

  return (
    <Button
      onClick={() => getUserFormFacebook()}
      variant="outline-primary"
      size="lg"
      type="submit"
      className="w-100"
    >
      Rekisteröidy Facebookilla
    </Button>
  )
}

export default FacebookSignUpButton
