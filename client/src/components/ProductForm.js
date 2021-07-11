import ChooseCategory from "./ChooseCategory"
import ChooseProductType from "./ChooseProductType"
import Events from "./Events"
import UnitPrices from "./UnitPrices"
import { Formik } from "formik"
import * as yup from "yup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"

const ProductSchema = yup.object().shape({
  category: yup
    .string()
    .notOneOf(["Valitse kategoria"], "Kategoria edellytetään")
    .required("Kategoria edellytetään"),
  title: yup.string().required("Otsikko edellytetään"),
  description: yup.string().required("Tuotekuvaus edellytetään"),
  productType: yup.string().notOneOf([""], "Valitse yksikkö"),
  price: yup.string().notOneOf(["00,00€", "", "€"], "Hinta edellytetään"),
  sizes: yup.array().ensure().of(yup.number().positive("Koko ei voi olla negatiivinen")),
  quantities: yup
    .array()
    .ensure()
    .of(yup.number().moreThan(1, "Määrä ei voi olla negatiivinen")),
})

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
  eventChoices,
  eventChoiceError,
  setEventChoiceError,
}) => {
  return (
    <Row className="h-100 mb-5 bg-light-yellow flex-column">
      <Col xs={12} className="mt-5 mb-4 py-2 text-center">
        <h2>{FormTitle}</h2>
      </Col>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
      >
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
          validationSchema={ProductSchema}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
            <Form onSubmit={handleSubmit} className="mx-3">
              <ChooseCategory category={values.category} setFieldValue={setFieldValue} />
              {touched.category && errors.category ? <div>{errors.category}</div> : null}
              <Form.Group className="mb-3">
                <Form.File
                  id="exampleFormControlFile1"
                  label="Lisää kuva"
                  onChange={(event) => handleImage(event.currentTarget.files[0])}
                />
                {imageID ? (
                  <div className="py-2">
                    <Image
                      src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${imageID}`}
                      alt="Tuotekuva"
                      fluid
                    />
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Otsikko*"
                  size="lg"
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group>
                {touched.title && errors.title ? <div>{errors.title}</div> : null}
                <Form.Control
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  type="text"
                  placeholder="Tuotekuvaus*"
                  size="lg"
                  className="mb-2"
                />
                {touched.description && errors.description ? (
                  <div>{errors.description}</div>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label="Tuote on luomua"
                  onChange={() => setOrganic(!organic)}
                  checked={organic}
                  className="mb-2"
                />
              </Form.Group>
              <Form.Group>
                <Form.Row className="flex-column">
                  <Col xs={{ span: 8, offset: 2 }}>
                    <ChooseProductType
                      productType={values.productType}
                      setFieldValue={setFieldValue}
                    />
                    {touched.productType && errors.productType ? (
                      <div>{errors.productType}</div>
                    ) : null}
                  </Col>
                  <UnitPrices
                    setFieldValue={setFieldValue}
                    sizes={values.sizes}
                    quantities={values.quantities}
                    errors={errors}
                    touched={touched}
                    productType={productType}
                  />
                  <Col className="text-center">
                    <h4>Aseta sulkeutumisajankohta</h4>
                    <input
                      type="range"
                      value={deleteBeforeEvent}
                      className="w-100"
                      onChange={(event) => setDeleteBeforeEvent(event.target.value)}
                    />
                    <p className="mb-3 pb-0 text-muted">
                      Tilaus sulkeutuu {deleteBeforeEvent} tuntia ennen tilaisuuden alkua
                    </p>
                    {events.length > 0 ? (
                      <Events
                        events={events}
                        isChoice={true}
                        setEventChoiceError={setEventChoiceError}
                      />
                    ) : (
                      <>
                        <p className="mb-3">
                          Et ole lisännyt itseäsi tuottajana yhteenkään Reko-ryhmään.
                          Päivitä tietoja <Link to="/profile/seller">profiili-sivun</Link>{" "}
                          lopussa. Valitettavasti joudut tämän jälkeen aloittamaan
                          ilmoituksen luonnin alusta.
                        </p>
                      </>
                    )}
                  </Col>
                </Form.Row>
              </Form.Group>
              <Form.Row>
                <Col className="mb-3 text-center">
                  {eventChoiceError && (
                    <p className="mb-3" style={{ color: "red" }}>
                      Valitse myyntipiste(et) ensin.
                    </p>
                  )}
                  <Button variant="success" size="lg" className="w-100" type="submit">
                    {submitButtonText}
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  )
}

export default ProductForm
