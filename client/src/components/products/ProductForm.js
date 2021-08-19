import { Formik, Form } from "formik"
import * as Yup from "yup"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import ProductFormFields from "./ProductFormFields"

// Yup
const AddProductsSchema = Yup.object().shape({
  category: Yup.string().required("Kategoria edellytetään"),
  imageID: Yup.object(),
  title: Yup.string().required("Otsikko edellytetään"),
  description: Yup.string().required("Tuotekuvaus edellytetään"),
  organic: Yup.boolean(),
  unit: Yup.string(),
  alv: Yup.string(),
  price: Yup.number().required("Hinta edellytetään"),
  unitSize: Yup.number(),
  unitAmount: Yup.number(),
  timeRange: Yup.number(),
})

const ProductForm = () => {
  return (
    <Formik
      initialValues={{
        category: "",
        imageID: undefined,
        title: "",
        description: "",
        organic: false,
        unit: "Kpl",
        alv: "14%",
        price: 0,
        unitSize: 0,
        unitAmount: 1,
        timeRange: 24,
      }}
      enableReinitialize={true}
      validationSchema={AddProductsSchema}
      onSubmit={(values) => {
        // add submit
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Row>
            <ProductFormFields values={values} setFieldValue={setFieldValue} />
            <Col xs={12}>
              <Button type="submit" variant="success" className="w-100">
                Esikatselu
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default ProductForm
