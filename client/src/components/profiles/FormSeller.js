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
  name: Yup.string(),
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  phonenumber: Yup.string().required(),
  email: Yup.string().email("invalid email address").required(),
  address: Yup.string(),
  zipcode: Yup.string(),
  city: Yup.string(),
  business_id: Yup.string(),
  homepage: Yup.string().url(),
  description: Yup.string(),
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

const FormSeller = ({ user, handleUserUpdate }) => {
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

          if (response === "success") {
            handleUserUpdate()
          }
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

/*
const user = {
      id: "75",
      firstname: "Satoja",
      lastname: "Reko",
      created_at: "2021-06-21T11:57:16.859Z",
      phonenumber: "9++043024",
      email: "satojareko@gmail.com",
      password: null,
      is_buyer: false,
      is_seller: false,
      facebook_id: "108265444800905",
      newsletter_check: false,
      cancel_notification_check: false,
      image_url: "profile-blank_or75kg",
      name: null,
      homepage: null,
      address: null,
      zipcode: null,
      city: null,
      salesreport_check: false,
      description: null,
      location: null,
      sellers_image_url: "profile-blank_or75kg",
      buyers_image_url: "profile-blank_or75kg",
      reko_areas: [
        {
          id: 1,
          name: "Ristiina",
          belongs: false,
        },
        {
          id: 2,
          name: "Mikkeli",
          belongs: false,
        },
        {
          id: 3,
          name: "Mäntyharju",
          belongs: false,
        },
        {
          id: 4,
          name: "Puumala",
          belongs: false,
        },
        {
          id: 5,
          name: "Pertunmaa",
          belongs: false,
        },
        {
          id: 6,
          name: "Pieksämäki",
          belongs: false,
        },
        {
          id: 7,
          name: "Juva",
          belongs: false,
        },
        {
          id: 8,
          name: "testi",
          belongs: false,
        },
      ],
    }
*/
