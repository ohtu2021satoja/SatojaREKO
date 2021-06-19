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
  name: Yup.string().required(),
  email: Yup.string().required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
})

const ContactForm = ({ user }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          firstname: user.firstname || "",
          email: user.email || "",
          subject: "",
          message: "",
        }}
        enableReinitialize={true}
        validationSchema={mailSchema}
        onSubmit={(values) => {
          const newMessage = {
            firstname: values.firstname,
            email: values.email,
            subject: values.subject,
            message: values.message,
          }

          sendMail(newMessage)
          console.log(newMessage)
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
            />
            <ErrorMessage name="message" component={FormErrorMessage} />
            <Button type="submit" variant="success" size="lg" className="w-100 mb-2">
              Lähetä viesti
            </Button>
            {/*<input type="submit" className="submit" value="Send Message">}*/}
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default ContactForm
