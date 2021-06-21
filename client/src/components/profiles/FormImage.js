import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import AddImageModal from "./AddImageModal"
import FormFieldImageFile from "./FormFieldImageFile"
import FormErrorMessage from "../FormErrorMessage"

// Yup
const ImageSchema = Yup.object().shape({
  image: Yup.string(),
})

const FormImage = ({ show, handleClose }) => {
  return (
    <Formik
      initialValues={{
        imgUrl: undefined,
      }}
      validationSchema={ImageSchema}
    >
      {() => (
        <Form>
          <AddImageModal show={show} handleClose={handleClose}>
            <Field
              name="imgUrl"
              id="user-image"
              label="Lataa kuvatiedosto"
              component={FormFieldImageFile}
            />
            <ErrorMessage name="imgUrl" component={FormErrorMessage} />
          </AddImageModal>
        </Form>
      )}
    </Formik>
  )
}

export default FormImage
