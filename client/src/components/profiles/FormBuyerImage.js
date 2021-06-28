import { useEffect } from "react"
import { updateBuyerImage } from "../../services/users"
import * as Yup from "yup"
import { useFormikContext, Formik, Form, ErrorMessage } from "formik"
import AddImageModal from "./AddImageModal"
import FormFieldImageFile from "./FormFieldImageFile"
import FormErrorMessage from "../FormErrorMessage"

// Yup
const ImageSchema = Yup.object().shape({
  buyers_image_url: Yup.string(),
})

const AutoSubmitFrom = ({ handleClose }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    // submit the form imperatively as soon as value change
    if (values.buyers_image_url !== "") {
      submitForm()
      handleClose()
    }
  }, [values, submitForm, handleClose])

  return null
}

const FormBuyerImage = ({
  user,
  show,
  handleClose,
  handleUpload,
  handleError,
  handleUserUpdate,
}) => {
  // change the image for current user
  const changeImage = async (str) => {
    const response = await updateBuyerImage(user.id, str)
    // update current user (if successful)
    response === "error" ? handleError() : handleUserUpdate()
  }

  return (
    <Formik
      initialValues={{
        buyers_image_url: "",
      }}
      validationSchema={ImageSchema}
      onSubmit={async (values, { resetForm }) => {
        const image_public_id = await handleUpload(values.buyers_image_url)

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
              id="user-image-buyer"
              name="buyers_image_url"
              label="Lataa kuva laitteeltasi"
              setFieldValue={setFieldValue}
            />
            <ErrorMessage name="buyers_image_url" component={FormErrorMessage} />
          </AddImageModal>
          <AutoSubmitFrom handleClose={handleClose} />
        </Form>
      )}
    </Formik>
  )
}

export default FormBuyerImage
