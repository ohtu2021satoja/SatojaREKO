import { useEffect } from "react"
import { updateSellerImage } from "../../services/users"
import * as Yup from "yup"
import { useFormikContext, Formik, Form, ErrorMessage } from "formik"
import AddImageModal from "./AddImageModal"
import FormFieldImageFile from "./FormFieldImageFile"
import FormErrorMessage from "../FormErrorMessage"

// Yup
const ImageSchema = Yup.object().shape({
  sellers_image_url: Yup.string(),
})

const AutoSubmitFrom = ({ handleClose }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    // submit the form imperatively as soon as value change
    if (values.sellers_image_url !== "") {
      submitForm()
      handleClose()
    }
  }, [values, submitForm, handleClose])

  return null
}

const FormSellerImage = ({
  user,
  show,
  handleClose,
  handleUpload,
  handleError,
  handleUserUpdate,
}) => {
  // change the image for current user
  const changeImage = async (str) => {
    console.log("RUNNING SUBMITTING IMAGE")
    const response = await updateSellerImage(user.id, str)
    // update current user (if successful)
    response === "error" ? handleError() : handleUserUpdate()
  }

  return (
    <Formik
      initialValues={{
        sellers_image_url: "",
      }}
      validationSchema={ImageSchema}
      onSubmit={async (values, { resetForm }) => {
        const image_public_id = await handleUpload(values.sellers_image_url)

        if (image_public_id !== "error") {
          changeImage(image_public_id)
        }

        resetForm()
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <AddImageModal show={show} handleClose={handleClose}>
            <FormFieldImageFile
              id="user-image-seller"
              name="sellers_image_url"
              label="Lataa kuva laitteeltasi"
              setFieldValue={setFieldValue}
            />
            <ErrorMessage name="sellers_image_url" component={FormErrorMessage} />
          </AddImageModal>
          <AutoSubmitFrom handleClose={handleClose} />
        </Form>
      )}
    </Formik>
  )
}

export default FormSellerImage
