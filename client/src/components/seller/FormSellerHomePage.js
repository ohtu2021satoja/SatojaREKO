import { useEffect } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form, Field } from "formik"
import { updateAuthedSeller } from "../../services/users"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormSellerAreas from "../profiles/FormSellerAreas"
import FormFieldCheckbox from "../FormFieldCheckbox"
import { isEqual } from "lodash"

let timer

// Yup
const SellerRekoSchema = Yup.object().shape({
  reko_areas: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      belongs: Yup.boolean(),
    })
  ),
  reko_areas_nil: Yup.boolean(),
})

const AutoSubmitForm = ({ user }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    const doStuff = async () => {
      const changedUser = { ...user, ...values }
      changedUser.reko_areas =
        changedUser.reko_areas === undefined ? null : changedUser.reko_areas
      // submit the form imperatively 5 seconds after values have changed
      const isSame = await isEqual(user, changedUser)
      console.log("isSame", isSame)
      clearTimeout(timer)
      if (!isSame) {
        console.log("NOT THE SAME")
        timer = setTimeout(() => {
          submitForm()
        }, 500)
      }
    }
    doStuff()
  }, [user, values, submitForm])

  return null
}

const FormSellerHomePage = ({ user, handleUserUpdate, handleError }) => {
  return (
    <Col xs={12} sm={{ span: 10, offset: 1 }}>
      <Formik
        initialValues={{
          reko_areas: user.reko_areas,
          reko_areas_nil: false,
        }}
        enableReinitialize={true}
        validationSchema={SellerRekoSchema}
        onSubmit={async (values) => {
          // TODO: do this with a function
          const resetValues = {
            reko_areas: values.reko_areas,
          }

          const updatedUser = { ...user, ...resetValues }
          console.log("UPDATED_USER", updatedUser)

          // push updatedUser to the server
          const response = await updateAuthedSeller(updatedUser)

          // if successful, update store, else show error
          response !== "error" ? handleUserUpdate() : handleError()
        }}
      >
        {({ values }) => (
          <Form>
            <Row>
              <FormSellerAreas values={values} />
              <Col className="mb-1">
                <Field
                  name="reko_areas_nil"
                  id="user-areas-nil"
                  label="En kuulu yhteenkään Facebookin Reko-ryhmään tuottajana"
                  component={FormFieldCheckbox}
                />
              </Col>
              {values.reko_areas_nil === true && (
                <Col xs={12} className="mb-1">
                  <a
                    href="https://satoja.fi/index.php/kuinka-liittya-tuottajana-facebookin-reko-ryhmaan/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button variant="link">
                      Lue lisää: Kuinka liittyä Reko-ryhmiin tuottajana
                    </Button>
                  </a>
                </Col>
              )}
              <Col xs={12}>
                <p style={{ fontSize: "1em" }}>
                  Puuttuko ryhmä listalta?
                  <Button as={Link} to="/contact" variant="link" className="px-1 pt-1">
                    Ota yhteyttä
                  </Button>
                </p>
              </Col>
            </Row>
            <AutoSubmitForm user={user} />
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormSellerHomePage
