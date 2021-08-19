import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormErrorMessage from "../FormErrorMessage"
import FormFieldSelect from "../FormFieldSelect"
import FormFieldImageFile from "../FormFieldImageFile"
import FormFieldText from "../FormFieldText"
import FormFieldTextArea from "../FormFieldTextArea"
import FormFieldCheckbox from "../FormFieldCheckbox"
import FormFieldPrice from "../FormFieldPrice"
import FormFieldNumber from "../FormFieldNumber"
import FormFieldRange from "../FormFieldRange"

const productCategories = [
  "Vihannekset",
  "Liha & kala",
  "Munat",
  "Hedelmät & marjat",
  "Maitotuotteet",
  "Leivät & leivonta",
  "Yrtit & mausteet",
  "Ruokaa",
  "Juomat",
  "Muut",
]

const productUnits = ["Kpl", "Kg", "Litra", "Gramma", "Motti", "Kuutio"]

const productAlv = ["14%", "24%", "Ei alv."]

const ProductFormFields = ({ values, setFieldValue }) => {
  const choosePriceLabel = (unit) => {
    switch (unit) {
      case "Kpl":
        return "Aseta kappalehinta (sis alv)*"
      case "Kg":
        return "Aseta kilohinta (sis alv)*"
      default:
        return `Aseta ${unit.toLowerCase()}hinta (sis alv)*`
    }
  }

  const chooseSizeLabel = (unit) => {
    switch (unit) {
      case "Kg":
        return "Paino"
      case "Gramma":
        return "Paino"
      default:
        return "Koko"
    }
  }

  const calculateUnitPrice = (price, size) => {
    return price * size
  }

  return (
    <Col xs={12}>
      <Field
        name="category"
        id="product-category"
        label="Valitse tuotekategoria*"
        items={productCategories}
        setFieldValue={setFieldValue}
        component={FormFieldSelect}
      />
      <ErrorMessage name="category" component={FormErrorMessage} />
      <Field
        name="imageID"
        id="product-image"
        label="Lisää kuva"
        setFieldValue={setFieldValue}
        component={FormFieldImageFile}
      />
      <ErrorMessage name="imageID" component={FormErrorMessage} />
      <Field
        name="title"
        id="product-title"
        label="Tuotteen nimi*"
        component={FormFieldText}
      />
      <ErrorMessage name="title" component={FormErrorMessage} />
      <Field
        name="description"
        id="product-description"
        label="Tuotekuvaus*"
        rows="2"
        component={FormFieldTextArea}
      />
      <ErrorMessage name="description" component={FormErrorMessage} />
      <Field
        name="organic"
        id="product-organic"
        label="Tuote on luomua"
        component={FormFieldCheckbox}
      />
      <Row className="mb-3">
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 8, offset: 2 }}
        >
          <Field
            name="unit"
            id="product-unit"
            items={productUnits}
            label="Valitse yksikkö*"
            setFieldValue={setFieldValue}
            component={FormFieldSelect}
          />
        </Col>
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 8, offset: 2 }}
        >
          <Field
            name="alv"
            id="product-alv"
            items={productAlv}
            label="Valitse alv %*"
            setFieldValue={setFieldValue}
            component={FormFieldSelect}
          />
        </Col>
        <Col
          xs={{ span: 10, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 8, offset: 2 }}
        >
          <Field
            name="price"
            id="product-price"
            label={choosePriceLabel(values.unit)}
            placeholder="0.00"
            component={FormFieldPrice}
          />
          <ErrorMessage name="price" component={FormErrorMessage} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={3} className="pr-0">
          <Field
            name="unitSize"
            id="product-unit-size"
            label={chooseSizeLabel(values.unit)}
            component={FormFieldNumber}
          />
          <ErrorMessage name="unitSize" component={FormErrorMessage} />
        </Col>
        <Col xs={6}>
          <Field
            name="unitPrice"
            id="product-unit-price"
            label="Hinta"
            placeholder={calculateUnitPrice(values.price, values.unitSize)}
            disabled={true}
            component={FormFieldPrice}
          />
        </Col>
        <Col xs={3} className="pl-0">
          <Field
            name="unitAmount"
            id="product-unit-amount"
            label="Määrä"
            component={FormFieldNumber}
          />
          <ErrorMessage name="unitAmount" component={FormErrorMessage} />
        </Col>
        <Col xs={6} className="py-2 pr-1">
          <Button variant="danger" className="w-100">
            Poista tuoterivi
          </Button>
        </Col>
        <Col xs={6} className="pt-2 pl-1">
          <Button variant="primary" className="w-100">
            Lisää tuoterivi
          </Button>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col>
          <Field
            name="timeRange"
            id="product-time-range"
            label="Aseta sulkeutumisajankohta"
            helperText={`Tilaus sulkeutuu ${values.timeRange} tuntia ennen tilaisuuden alkua`}
            component={FormFieldRange}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default ProductFormFields
