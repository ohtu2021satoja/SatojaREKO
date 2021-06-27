import ChooseCategory from "./ChooseCategory"
import ChooseProductType from "./ChooseProductType"
import Events from "./Events"
import UnitPrices from "./UnitPrices"
import { Formik } from "formik"
import * as yup from "yup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import { Image } from "cloudinary-react"

const ProductForm = ({
  organic,
  imageID,
  deleteBeforeEvent,
  setDeleteBeforeEvent,
  events,
  handleImage,
  onSubmit,
  setOrganic,
  title,
  category,
  productType,
  price,
  description,
  productSizes,
  FormTitle,
  submitButtonText,
}) => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Vaadittu"),

    description: yup.string().required("Vaadittu"),

    productType: yup.string().notOneOf(["Valitse yksikkö"], "Valitse yksikkö"),

    price: yup.string().notOneOf(["00,00€"], "Aseta hinta"),

    sizes: yup
      .array()
      .required()
      .of(yup.number().min(0.000001, "Pakettikoko ei voi olla nolla")),

    quantities: yup
      .array()
      .required()
      .of(yup.number().min(1, "Pakettimäärä ei voi olla nolla")),

    category: yup.string().notOneOf(["Valitse kategoria"], "Valitse kategoria"),
  })

  return (
    <div style={{ marginBottom: 100 }}>
      <Form.Label as="h3" className="my-4 text-center">
        {FormTitle}
      </Form.Label>
      <Formik
        initialValues={{
          category: category,
          title: title,
          description: description,
          productType: productType,
          price: price,
          sizes: productSizes.map((size) => parseFloat(size.size.replace(",", "."))),
          quantities: productSizes.map((size) => size.quantity),
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          isValid,
          validationSchema,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <ChooseCategory category={values.category} setFieldValue={setFieldValue} />
            {touched.category && errors.category ? <div>{errors.category}</div> : null}
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Lisää kuva"
                onChange={(event) => handleImage(event.currentTarget.files[0])}
              />
              {imageID ? <Image cloudName="dpk81nwou" publicId={imageID} /> : null}
              <Form.Control
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                type="text"
                placeholder="Otsikko"
              />
              {touched.title && errors.title ? <div>{errors.title}</div> : null}
              <Form.Control
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                type="text"
                placeholder="Tuotekuvaus"
              />
              {touched.description && errors.description ? (
                <div>{errors.description}</div>
              ) : null}
              <Form.Check
                type="checkbox"
                label="Tuote on luomua"
                onChange={() => setOrganic(!organic)}
                checked={organic}
              />
              Valitse yksikkö
              <ChooseProductType
                productType={values.productType}
                setFieldValue={setFieldValue}
              />
              {touched.productType && errors.productType ? (
                <div>{errors.productType}</div>
              ) : null}
              <UnitPrices
                setFieldValue={setFieldValue}
                sizes={values.sizes}
                quantities={values.quantities}
                errors={errors}
                touched={touched}
                productType={productType}
              />
              <input
                type="range"
                value={deleteBeforeEvent}
                onChange={(event) => setDeleteBeforeEvent(event.target.value)}
              />
              <p>Tilaus sulkeutuu {deleteBeforeEvent} ennen noutotilaisuuden alkua</p>
              {events ? <Events events={events} isChoice={true} /> : null}
            </Form.Group>
            <Form.Row className="mb-3">
              <Col>
                <Button
                  style={{ width: "100%" }}
                  variant="success"
                  size="lg"
                  type="submit"
                >
                  {submitButtonText}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ProductForm
