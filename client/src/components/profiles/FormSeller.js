import { useEffect } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form } from "formik"
import { updateAuthedUser } from "../../services/users"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormSellerDetails from "./FormSellerDetails"
import FormSellerAreas from "./FormSellerAreas"
import FormSellerSettings from "./FormSellerSettings"

// Yup
const SellerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimipituus 2 kirjainta")
    .max(25, "Maksimipituus 25 kirjainta")
    .matches(/^[aA-zZ\s]+$/, "Voi sisältää vain kirjaimia"),
  firstname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .matches(/^[aA-zZ\s]+$/, "Voi sisältää vain kirjaimia")
    .required("Etunimi edellytetään"),
  lastname: Yup.string()
    .min(2, "Minimipituus 2 kirjainta")
    .max(25, "Maksimipituus 25 kirjainta")
    .matches(/^[aA-zZ\s]+$/, "Voi sisältää vain kirjaimia")
    .required("Sukunimi edellytetään"),
  phonenumber: Yup.string()
    .min(6, "Minimipituus 6 numeroa")
    .max(14, "Maksimipituus 14 numeroa")
    .required("Puhelinnumero edellytetään"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  address: Yup.string().max(40, "Maksimipituus 40 merkkiä"),
  zipcode: Yup.string()
    .min(5, "Minimipituus 5 merkkiä")
    .max(7, "Maksimipituus 7 merkkiä"),
  city: Yup.string()
    .min(2, "Minimipituus 2 merkkiä")
    .max(30, "Maksimipituus 30 merkkiä")
    .matches(/^[aA-zZ\s]+$/, "Voi sisältää vain kirjaimia"),
  business_id: Yup.string()
    .min(6, "Minimipituus 6 numeroa")
    .max(14, "Maksimipituus 14 numeroa"),
  homepage: Yup.string().url("Täytyy olla URL-osoite"),
  description: Yup.string().max(400, "Maksimipituus 400 merkkiä"),
  reko_areas: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      belongs: Yup.boolean(),
    })
  ),
  salesreport_check: Yup.boolean(),
})

const AutoSubmitForm = ({ user }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    const changedUser = { ...user, ...values }
    // submit the form imperatively 5 seconds after values have changed
    if (user !== changedUser) {
      setTimeout(() => {
        submitForm()
      }, 5000)
    }
  }, [user, values, submitForm])

  return null
}

const FormSeller = ({ user, handleUserUpdate, handleError }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          name: user.name || undefined,
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phonenumber: user.phonenumber || "",
          email: user.email || "",
          address: user.address || undefined,
          zipcode: user.zipcode || undefined,
          city: user.city || undefined,
          business_id: user.business_id || undefined,
          homepage: user.homepage || undefined,
          description: user.description || undefined,
          reko_areas: user.reko_areas,
          salesreport_check: user.salesreport_check,
        }}
        enableReinitialize={true}
        validationSchema={SellerSchema}
        onSubmit={async (values) => {
          // TODO: do this with a function
          const resetValues = {
            name: values.name === undefined ? null : values.name,
            firstname: values.firstname,
            lastname: values.lastname,
            phonenumber: values.phonenumber,
            email: values.email,
            address: values.address === undefined ? null : values.address,
            zipcode: values.zipcode === undefined ? null : values.zipcode,
            city: values.city === undefined ? null : values.city,
            business_id: values.business_id === undefined ? null : values.business_id,
            homepage: values.homepage === undefined ? null : values.homepage,
            description: values.description === undefined ? null : values.description,
            reko_areas: values.reko_areas,
            salesreport_check: values.salesreport_check,
          }

          const updatedUser = { ...user, ...resetValues }
          console.log("UPDATED_USER", updatedUser)

          // push updatedUser to the server
          const response = await updateAuthedUser(updatedUser)

          // if successful, update store, else show error
          response !== "error" ? handleUserUpdate() : handleError()
        }}
      >
        {({ values }) => (
          <Form>
            <Row>
              <FormSellerDetails />
              <FormSellerAreas values={values} />
              <Col className="text-center mb-5">
                <p>
                  Puuttuko ryhmä listalta?
                  <Button as={Link} to="/contact" variant="link" className="px-1 pt-1">
                    Ota yhteyttä
                  </Button>
                </p>
              </Col>
              <FormSellerSettings />
            </Row>
            <AutoSubmitForm user={user} />
          </Form>
        )}
      </Formik>
    </Col>
  )
}

export default FormSeller
