import * as Yup from "yup"
import { Formik, Form } from "formik"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "./react-bootstrap/Button"
import FormSellerDetails from "./FormSellerDetails"
import FormSellerGroups from "./FormSellerGroups"
import FormSellerSettings from "./FormSellerSettings"

// Yup
const SellerSchema = Yup.object().shape({
  seller_name: Yup.string(),
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
  reko_areas: Yup.array(),
  salesreport_check: Yup.boolean(),
})

const FormSeller = ({ user }) => {
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          seller_name: "",
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          phonenumber: user.phonenumber || "",
          email: user.email || "",
          address: "",
          zipcode: "",
          city: "",
          business_id: "",
          homepage: "",
          description: "",
          reko_areas: [],
          salesreport_check: false,
        }}
        enableReinitialize={true}
        validationSchema={SellerSchema}
        onSubmit={console.log}
      >
        {() => (
          <Form>
            <Row>
              <FormSellerDetails />
              <FormSellerGroups areas={user.reko_areas} />
              <Col className="text-center mb-5">
                <p>
                  Puuttuko ryhmä listalta?
                  <Button as={Link} to="/contact" variant="link" className="px-0 py-1">
                    Ota yhteyttä
                  </Button>
                </p>
              </Col>
              <FormSellerSettings />
            </Row>
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
