import { useEffect } from "react"
import { addImage } from "../../services/images"
import { updateBuyerImage } from "../../services/users"
import * as Yup from "yup"
import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik"
import AddImageModal from "./AddImageModal"
import FormFieldImageFile from "./FormFieldImageFile"
import FormErrorMessage from "../FormErrorMessage"

// Yup
const ImageSchema = Yup.object().shape({
  sellers_image_url: Yup.string(),
})

const AutoSubmitImage = ({ handleClose }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    // submit the form imperatively as soon as values change
    if (values.buyers_image_url !== "") {
      submitForm()
      handleClose()
    }
  }, [values, submitForm, handleClose])

  return null
}

const FormBuyerImage = ({ user, show, handleClose }) => {
  const uploadImage = async (file) => {
    // upload image to cloudinary
    const response = await addImage(file)

    // if image was uploaded successfully
    // update buyer image
    if (response !== "error") {
      updateBuyerImage(user.id, file)
    }
  }

  return (
    <Formik
      initialValues={{
        buyers_image_url: "",
      }}
      validationSchema={ImageSchema}
      onSubmit={(values, { resetForm }) => {
        // removes fakepath from chrome, opera, safari
        var filename = values.buyers_image_url.replace(/^.*\\/, "")

        uploadImage(filename)
        resetForm()
      }}
    >
      {() => (
        <Form>
          <AddImageModal show={show} handleClose={handleClose}>
            <Field
              name="buyers_image_url"
              id="user-image-buyer"
              label="Lataa kuvatiedosto"
              component={FormFieldImageFile}
            />
            <ErrorMessage name="buyers_image_url" component={FormErrorMessage} />
          </AddImageModal>
          <AutoSubmitImage handleClose={handleClose} />
        </Form>
      )}
    </Formik>
  )
}

export default FormBuyerImage
