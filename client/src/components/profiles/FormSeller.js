import { useEffect } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form } from "formik"
import { updateAuthedSeller } from "../../services/users"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormSellerDetails from "./FormSellerDetails"
import FormSellerAreas from "./FormSellerAreas"
import FormSellerSettings from "./FormSellerSettings"
import { isEqual } from "lodash"

let timer

const re =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

// Yup
const SellerSchema = Yup.object().shape({
  name: Yup.string().max(25, "Maksimipituus 25 kirjainta"),
  firstname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Etunimi edellytetään"),
  lastname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Sukunimi edellytetään"),
  phonenumber: Yup.string()
    .min(6, "Minimipituus 6 numeroa")
    .max(14, "Maksimipituus 14 numeroa")
    .required("Puhelinnumero edellytetään"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  address: Yup.string().max(40, "Maksimipituus 40 merkkiä"),
  zipcode: Yup.string().max(7, "Maksimipituus 7 merkkiä"),
  city: Yup.string().max(30, "Maksimipituus 30 merkkiä"),
  business_id: Yup.string().max(14, "Maksimipituus 14 numeroa"),
  homepage: Yup.string().matches(re, "Täytyy olla URL-osoite"),
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
    const doStuff = async () => {
      const changedUser = { ...user, ...values }
      changedUser.business_id =
        changedUser.business_id === undefined ? null : changedUser.business_id
      changedUser.name = changedUser.name === undefined ? null : changedUser.name
      changedUser.firstname =
        changedUser.firstname === undefined ? null : changedUser.firstname
      changedUser.lastname =
        changedUser.lastname === undefined ? null : changedUser.lastname
      changedUser.phonenumber =
        changedUser.phonenumber === undefined ? null : changedUser.phonenumber
      changedUser.email = changedUser.email === undefined ? null : changedUser.email
      changedUser.address = changedUser.address === undefined ? null : changedUser.address
      changedUser.zipcode = changedUser.zipcode === undefined ? null : changedUser.zipcode
      changedUser.city = changedUser.city === undefined ? null : changedUser.city
      changedUser.homepage =
        changedUser.homepage === undefined ? null : changedUser.homepage
      changedUser.description =
        changedUser.description === undefined ? null : changedUser.description
      changedUser.reko_areas =
        changedUser.reko_areas === undefined ? null : changedUser.reko_areas
      changedUser.salesreport_check =
        changedUser.salesreport_check === undefined ? null : changedUser.salesreport_check
      console.log("USER", user)
      console.log("CHANGEDUSER", changedUser)
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

const FormSeller = ({ user, handleUserUpdate, handleError }) => {
  return (
    <Col
      xs={12}
      sm={{ span: 10, offset: 1 }}
      md={{ span: 8, offset: 2 }}
      lg={{ span: 6, offset: 3 }}
    >
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
          const response = await updateAuthedSeller(updatedUser)

          // if successful, update store, else show error
          response !== "error" ? handleUserUpdate() : handleError()
        }}
      >
        {({ values }) => (
          <Form>
            <Row>
              <FormSellerDetails />
              <FormSellerAreas values={values} />
              <Col className="text-center mb-3">
                <p>
                  Puuttuko ryhmä listalta?
                  <Button
                    as={Link}
                    to="/contact"
                    variant="link"
                    size="lg"
                    className="px-1 pt-1"
                  >
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
