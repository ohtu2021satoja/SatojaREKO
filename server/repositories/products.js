const db = require("../db");
const format = require("pg-format");

const getAllProducts = async () => {
  const products = await db.query(
    "SELECT products.id, products.name, products.organic, products.sellers_id, products.type, SUM(sizes.batch_quantity) AS batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'batch_quantity', sizes.batch_quantity)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id GROUP BY products.id"
  );
  return products;
};

const getProductById = async (id) => {
  const product = await db.query(
    "SELECT products.id, products.vat, products.name, products.organic, products.sellers_id, products.type, SUM(sizes.batch_quantity) AS batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, array_agg(DISTINCT products_events.id_event) AS events, jsonb_agg(DISTINCT jsonb_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'batch_quantity', sizes.batch_quantity, 'id', sizes.id)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN products_events ON products_events.id_product=products.id  WHERE products.id= $1 GROUP BY products.id",
    [id]
  );
  console.log(product);
  return product[0];
};

const getEventProduct = async (event_id, product_id) => {
  const product = await db.query(
    "SELECT products.id, products.vat, products.name, products.organic, products.sellers_id, products.type, SUM(sizes.batch_quantity) AS batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, array_agg(DISTINCT products_events.id_event) AS events, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'batch_quantity', sizes.batch_quantity, 'id', sizes.id)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN products_events ON products_events.id_product=products.id  WHERE products.id= $1 AND products_events.id_event=$2 GROUP BY products.id",
    [product_id, event_id]
  );
  console.log("kfsdfsdk");
  return product[0];
};

const getSellersProducts = async (id) => {
  const products = await db.query(
    "SELECT products.id, products.name, products.organic, products.sellers_id, products.type, products.removed, SUM(sizes.batch_quantity) AS batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price, 'size_id', sizes.id)) AS sizes FROM products INNER JOIN sizes ON sizes.product_id = products.id WHERE sellers_id=$1 GROUP BY products.id",
    [id]
  );
  return products;
};

const addProduct = async (product) => {
  const current_date = new Date();
  const dbParams = [
    product.name,
    product.unit_price,
    product.organic,
    product.sellers_id,
    product.category,
    product.type,
    product.description,
    product.deleteBeforeEvent,
    product.vat,
    product.imageURL,
    current_date,
  ];
  const result = await db.query(
    "INSERT INTO products VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $11, $7, $8, $9, $10) RETURNING id",
    dbParams
  );
  return result[0].id;
};

const addProductSizes = async (product_id, sizes) => {
  const values = sizes.map((size) => [
    product_id,
    size.quantity,
    size.unit,
    size.quantity,
  ]);
  const query = format(
    "INSERT INTO sizes (product_id, quantity, unit, batch_quantity) VALUES %L",
    values
  );
  await db.query(query, []);
};

const getEventProducts = async (event_id) => {
  const products = await db.query(
    "SELECT sellers.name AS seller_name, users.firstname AS seller_firstname, users.lastname AS seller_lastname, sellers.image_url AS seller_image_url, products.id, products.name, products.organic, products.sellers_id, products.type, SUM(sizes.batch_quantity) AS batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, events.start AS event_start, SUM(sizes.quantity) AS quantity_left, json_agg( json_build_object( 'quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit * products.unit_price, 'size_id', sizes.id ) ) AS sizes FROM products_events INNER JOIN products ON products_events.id_product = products.id INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN sellers ON sellers.id = products.sellers_id INNER JOIN users ON users.id = sellers.id INNER JOIN events ON products_events.id_event = events.id WHERE products_events.id_event = 109 AND products.removed = false AND (products.close_before_event * 3600 + (3 * 3600)) < ( SELECT EXTRACT( EPOCH FROM (events.start - NOW()) ) FROM events WHERE events.id = 109 ) GROUP BY ( products.id, sellers.name, sellers.image_url, users.firstname, users.lastname, events.start)",
    [event_id]
  );
  return products;
};

const getSellersEventProducts = async (event_id, sellers_id) => {
  const products = await db.query(
    "SELECT sellers.name AS seller_name, products.id, products.name, products.organic, products.sellers_id, products.type, SUM(sizes.batch_quantity) AS batch_quantity, products.created_at, products.description, products.close_before_event, products.unit_price, products.image_url, products.category, SUM(sizes.quantity) AS quantity_left, json_agg(json_build_object('quantity', sizes.quantity, 'unit', sizes.unit, 'price', sizes.unit*products.unit_price)) AS sizes FROM products_events INNER JOIN products ON products_events.id_product = products.id INNER JOIN sizes ON sizes.product_id = products.id INNER JOIN sellers ON sellers.id = products.sellers_id WHERE products_events.id_event=$1 AND products.sellers_id=$2 AND products.removed=false GROUP BY (products.id, sellers.name)",
    [event_id, sellers_id]
  );
  return products;
};

const removeQuantitiesFromSizes = async (order_id) => {
  await db.query(
    "UPDATE sizes SET quantity=sizes.quantity-batches.quantity FROM batches WHERE sizes.id = batches.sizes_id AND batches.order_id=$1",
    [order_id]
  );
};

const removeProduct = async (products_id) => {
  await db.query("UPDATE products SET removed=true WHERE id=$1", [products_id]);
};

const removeProductBatches = async (products_id) => {
  await db.query(
    "UPDATE batches SET removed=true WHERE sizes_id IN (SELECT sizes.id from sizes WHERE sizes.product_id = $1);",
    [products_id]
  );
};

const addQuantitiesToSizes = async (order_id, sellers_id) => {
  await db.query(
    "UPDATE sizes set quantity=sizes.quantity+batches.quantity from batches, products WHERE batches.order_id=$1 AND batches.sizes_id=sizes.id AND sizes.product_id = products.id AND products.sellers_id=$2;",
    [order_id, sellers_id]
  );
};

const addQuantityToSize = async (order_id, size_id) => {
  await db.query(
    "UPDATE sizes set quantity=sizes.quantity+batches.quantity from batches WHERE batches.order_id=$1 AND batches.sizes_id=$2",
    [order_id, size_id]
  );
};

const addQuantityToProduct = async (order_id, product_id) => {
  await db.query(
    "UPDATE sizes set quantity=sizes.quantity+batches.quantity from batches WHERE batches.order_id=$1 AND batches.sizes_id = sizes.id AND sizes.product_id = $2",
    [order_id, product_id]
  );
};
const addUsersOrdersQuantitiesToSizes = async (id) => {
  await db.query(
    "UDPATE sizes SET quantity=sizes.quantity+batches.quantity FROM batches,orders WHERE batches.sizes_id=sizes.id AND AND batches.order_id = orders.id AND orders.buyers_id=$1",
    [id]
  );
};

const updateOldPricedProduct = async (product_id) => {
  db.query(
    "UPDATE sizes SET quantity=0, batch_quantity=sizes.quantity WHERE sizes.product_id=$1",
    [product_id]
  );
};

const updateProduct = async (product_id, new_product) => {
  db.query(
    "UPDATE products SET name=$1, category=$2, type=$3, description=$4, close_before_event=$5, vat=$6, image_url=$7 WHERE id=$8",
    [
      new_product.name,
      new_product.category,
      new_product.type,
      new_product.description,
      new_product.close_before_event,
      new_product.vat,
      new_product.image_url,
      product_id,
    ]
  );
};

const updateOldProductSizes = async (new_sizes) => {
  new_sizes.forEach((size) => {
    db.query(
      "UPDATE sizes SET unit=$1, quantity=$2, batch_quantity=$3 WHERE id=$4",
      [size.unit, size.quantity, size.batch_quantity, size.id]
    );
  });
};

const removeSizes = async (product_id, removed_sizes) => {
  const IDs = removed_sizes.map((size) => size.id);
  db.query(
    "UPDATE batches SET removed=false WHERE batches.sizes_id=ANY($1::int[])",
    [IDs]
  );
  db.query("DELETE from sizes WHERE id=ANY($1::int[])", [IDs]);
};

module.exports = {
  getAllProducts,
  getSellersProducts,
  addProduct,
  addProductSizes,
  getEventProducts,
  removeQuantitiesFromSizes,
  getSellersEventProducts,
  removeProduct,
  removeProductBatches,
  addQuantitiesToSizes,
  getProductById,
  updateOldPricedProduct,
  updateProduct,
  updateOldProductSizes,
  removeSizes,
  getEventProduct,
  addUsersOrdersQuantitiesToSizes,
  addQuantityToSize,
  addQuantityToProduct,
};
