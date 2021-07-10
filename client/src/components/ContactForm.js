import { sendMail } from "../services/mail"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormFieldText from "./FormFieldText"
import FormFieldTextArea from "./FormFieldTextArea"
import FormFieldEmail from "./FormFieldEmail"
import FormErrorMessage from "./FormErrorMessage"

const mailSchema = Yup.object().shape({
  firstname: Yup.string().required("Nimi edellytetään"),
  email: Yup.string().email("Virhellinen sähköposti").required("Sähköposti edellytetään"),
  subject: Yup.string().required("Aihe edellytetään"),
  message: Yup.string().required("Viesti edellytetään"),
})

const ContactForm = ({ user, setNotification }) => {
  const handleMail = async (message) => {
    const response = await sendMail(message)
    setNotification(response)
    return response
  }
  return (
    <Col
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 6, offset: 3 }}
    >
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          email: user.email || "",
          subject: "",
          message: "",
        }}
        enableReinitialize={true}
        validationSchema={mailSchema}
        onSubmit={async (values, { resetForm }) => {
          const newMessage = {
            firstname: values.firstname,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }
          const response = await handleMail(newMessage)
          console.log(newMessage)
          if (response === "success") {
            resetForm({
              values: {
                subject: "",
                message: "",
              },
            })
          }
        }}
      >
        {() => (
          <Form>
            <Field name="firstname" id="name" label="Nimi" component={FormFieldText} />
            <ErrorMessage name="firstname" component={FormErrorMessage} />
            <Field
              name="email"
              id="email"
              label="Sähköposti"
              component={FormFieldEmail}
            />
            <ErrorMessage name="email" component={FormErrorMessage} />
            <Field
              name="subject"
              id="subject"
              label="Otsikko"
              component={FormFieldText}
            />
            <ErrorMessage name="subject" component={FormErrorMessage} />
            <Field
              name="message"
              id="message"
              label="Viesti"
              component={FormFieldTextArea}
              rows="5"
            />
            <ErrorMessage name="message" component={FormErrorMessage} />
            <Button type="submit" variant="success" size="lg" className="w-100 mb-2">
              Lähetä viesti
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default ContactForm
