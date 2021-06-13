# Client Server Communication

## Terminology

client: front-end
server: backend
user: buyer or seller 


## Registration and Login


### [1. User registration (Tarkista ja täytä tiedot)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/7c30dc8b-35f9-46e5-ae73-7205288861dd/)

- user authorises registration with Facebook

  a. option: client sends user's Facebook id to the server (GET, /api/register, "id")

    - server fetches data from Facebook API (name, surname, email) and sends it to the client

  b. option: client fetches data from Facebook API (name, surname, email) with user's Facebook id

- user is asked to complete the registration form (phone, terms) before submitting

- user submits the registration form 

- client posts new user object to the server (POST, api/users, {user})


### [2. User login (Facebook kirjautuminen)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/ecb85224-1594-44ef-934a-4223c2b76e9b/)

- user authorises login with Facebook

- client sends user's Facebook id to the server (GET, /api/login, "id")

- server returns user object to the client

- client stores user object in a reducer (AuthedUser)

- user gets directed to Home Page 


### 3. User has already logged in and navigates to the web app on their browser

- client fetches user object from a reducer (AuthedUser)

  a. option: user gets directed to [Home Page (Etusivu)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/)

  b. option: user gets directed to a page based on their status (seller / buyer)

    - if user is a seller, they get directed to [Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/)

    - if user is a buyer, they get directed to [Map Page (Kartta)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/67a0fe65-7bc9-481c-aa51-929bec912d69/)

    - if user is a buyer and a seller, they get directed to [Home Page (Etusivu)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/)


### [4. Home Page (Etusivu)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/)

- **new feature suggestion**: if user taps on "Ostan lähiruokaa" on their first visit, they get directed to Buyer's Welcome Page -akin to [Producer's Welcome Page (Täällä taas!)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9921b2e1-10fe-4eb9-8ff8-a62bb0112259/)

  - for this, login counter needs to be added to user object

- if user taps on "Ostan lähiruokaa", they get directed to [Map Page (Kartta)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/67a0fe65-7bc9-481c-aa51-929bec912d69/)

- if user taps on "Myyn lähiruokaa", but has no markets assigned, they get directed to [Producer's Welcome Page (Täällä taas!)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9921b2e1-10fe-4eb9-8ff8-a62bb0112259/)

- if user taps on "Myyn lähiruokaa" and has markets assigned, they get directed to [Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/)

- if user selects "Ota Yhteyttä", they get Directed to Contact Page (Ota Yhteyttä)


### 5. Contact Page (Ota Yhteyttä)

- user fills the contact form (email, message) and submits

- message is sent to site admin email

  - if successful, user is notified or receives confirmation email

  - if delivery fails, user is notified 

a. option: user can navigate back to the previous page by tapping on a back arrow  

b. option: user gets directed to the previous page after message has been sent


## Seller App

### [0. Producer's Welcome Page (Täällä taas!)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9921b2e1-10fe-4eb9-8ff8-a62bb0112259/)

- **suggestion**: this page is only shown to those users, who have no markets assigned (new seller)

- includes a short welcoming message

- prompts user to start selling by choosing the markets they want to sell in

  - there is a link to [Producer's Profile Page (Tuottajan profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/b362c90a-cce0-4cf2-aa09-f3a270cdec31/)


### [1. Producer's Profile Page (Tuottajan profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/b362c90a-cce0-4cf2-aa09-f3a270cdec31/)

- user can add a photo and update their info

  - **question:** should we offer an option to add a photo from Facebook?

- when user selects their first market to sell in, we ask for additional info (company name, address, ZIP code, municipality, business ID, web site url and about section)

- client stores updated user object in a reducer (AuthedUser)

  - when that happens is still being looked at:

    a. option: after value of form input changes

    b. option: when user navigates away from the Profile Page

    c. option: some time after a change has been made

- client sends updated user object to the server (PUT, /api/users/:id, {user})

- **new feature suggestion**: user has an option to preview their own [Producer's Public Profile Page (Tuottajan Julkinen Profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/63bbb74d-157d-462c-beb2-576f55a27e21/)


### [2. Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/)

a. option: client gets user's **current orders** from the server (GET, /api/orders/seller/:id) 

  - if no orders are returned form the server, user is prompted to add products

  - if server returns orders, client stores them in a reducer (sellerOrders)

b. option: as above, but all user's orders (past and present, cancelled and deleted) are returned and stored in a reducer (sellerOrders)

- if orders exist, they are sorted by **current events** (ascending order)

- user can tap on an event to view current orders for that event

  - user gets directed to Orders Page 2 (Tilaukset 2)

- user can tap on Order History (Tilaushistoria-nappi) to view past orders

  - user gets directed to [Order History Page 1 (Tilaushistoria 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2e0dfd8d-b56f-44c7-83cb-3c8125be317a/)

- user can tap on Cancelled and Deleted Orders (Peruutetut tilaukset & tilauksista poistetut tuotteet -linkki)
    - user gets directed to [Cancelled and Deleted Orders Page (Peruutetut ja poistetut tilaukset)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/093b754d-c6f4-47c3-84ef-f6875242dc0d/)


### 3. Orders Page 2 (Tilaukset 2)

a. option: client fetches user's **current orders** from a reducer (sellerOrders)

  - if no orders are returned, client gets user's **current orders** from the server (GET, api/orders/seller/:id) and stores them in a reducer (sellerOrders)

b. option: user's **current orders** are passed as props from [Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/) or [Producer's Public Profile Page (Tuottajan Julkinen Profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/63bbb74d-157d-462c-beb2-576f55a27e21/)

c. option: client gets user's **current orders** from the server (GET, /api/orders/seller/:id) and stores them in a reducer (sellerOrders)

1. [Products Tab (Tuotteet-välilehti)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/b6cc7f55-a9ec-40a0-87c0-60e8e50e8deb/)

  - user is shown, which products have been ordered for the upcoming event and at what quantity

  - user can tap on one of the listed products

    - a list of buyers for that product will be shown (amount purchased, total price, name and order number)

    - **question:** should there be a down arrow icon indicating that product info can be extended?

  - user can tap on the right arrow icon on the right side of the buyer info

    -view changes to [Buyers Tab (Tilaajat-välilehti)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/d34bd634-9d77-48f0-a28c-fee7fc72233f/)

    - the order details of the chosen buyer are shown extended

2. [Buyers Tab (Tilaajat-välilehti)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/993b2557-2360-4d33-be2b-13402b4c4520/)

  - user is shown a list of buyers who have ordered products for the upcoming event 
    
  - user can tap on the down arrow icon on the right side of the buyer info

    - the buyer's order will be shown extended

    - icon changes to up arrow

  - user has a option to delete the buyer's order

  - user can return to [Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/) by tapping on the back arrow icon (top left)


### [4. Order History Page 1 (Tilaushistoria 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2e0dfd8d-b56f-44c7-83cb-3c8125be317a/)

a. option: client fetches user's **past orders** from a reducer (sellerOrders)

  - if no orders are returned, client gets user's **past orders** from the server (GET, /api/orders/seller/:id)

    - if orders are returned, client stores them in a reducer (sellerOrders)

b. option: user's **past orders** are passed as props from [Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/) or [Producer's Public Profile Page (Tuottajan Julkinen Profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/63bbb74d-157d-462c-beb2-576f55a27e21/)

c. option: client gets seller's **past orders** from the server (GET, /api/orders/seller/:id) and stores them in a reducer (sellerOrders)

- if user has had orders in the past, they are shown a list of past events sorted by date (descending order)

  - user can tap on an event to view past orders for that event

    - user gets directed to Order History Page 2 (Tilaushistoria 2)

- if there are no past orders, user is notified


### 5. Order History Page 2 (Tilaushistoria 2) - akin to [Cancelled Orders Page (Peruutut tilaukset)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9c05081e-d089-4991-8a26-ff65c5a29150/)

- user's **past orders** are passed as props from [Order History Page 1 (Tilaushistoria 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2e0dfd8d-b56f-44c7-83cb-3c8125be317a/)

- user can tap on the down arrow icon on the right side of the buyer info
 
 - the buyer's old order will be shown extended

 - icon changes to up arrow

- user can return to [Order History Page 1 (Tilaushistoria 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2e0dfd8d-b56f-44c7-83cb-3c8125be317a/) by tapping on the back arrow icon (top left)


### [6. Cancelled and Deleted Orders Page (Peruutetut ja poistetut tilaukset](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/093b754d-c6f4-47c3-84ef-f6875242dc0d/)

a. option: client fetches user's **cancelled and deleted orders** from a reducer (sellerOrders)

  - if no orders are returned, client gets user's **cancelled and deleted orders** from the server (GET, /api/orders/seller/:id)

    - if orders are returned, client stores them in a reducer (sellerOrders)

b. option: user's **cancelled and deleted orders** are passed as props from [Orders Page 1 (Tilaukset 1)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/81977181-6f57-4761-a834-4c1fab0bf2a3/)

c. option: client gets seller's **cancelled and deleted orders** from the server (GET, /api/orders/seller/:id) and stores them in a reducer (sellerOrders)

- if cancelled or deleted orders exist, they are shown a list of past events sorted by date (descending order)

  - user can tap on an event to view cancelled or deleted orders for that event

    - user gets directed to [Cancelled Orders Page (Peruutut Tilaukset)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9c05081e-d089-4991-8a26-ff65c5a29150/)

- if there are no cancelled or deleted orders, user is notified


### [7. Cancelled Orders Page (Peruutut Tilaukset)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9c05081e-d089-4991-8a26-ff65c5a29150/)

a. option: those buyers that have **cancelled orders or deleted products** posted by the user are passed as props from [Cancelled and Deleted Orders Page (Peruutetut ja poistetut tilaukset)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/093b754d-c6f4-47c3-84ef-f6875242dc0d/)

b. option 2: client gets those buyers that have **cancelled orders or deleted products** posted by the user from the server (GET, api/orders/seller/:id) and stores them in a reducer (sellerOrders)

- user can tap on the down arrow icon next to the buyer's name 

  - the [buyer's cancellations](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9e8c62f3-846c-4698-b136-63d7e239f417/) will be shown extended

  - icon changes to up arrow

- user can return to [Cancelled and Deleted Orders Page (Peruutetut ja poistetut tilaukset)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/093b754d-c6f4-47c3-84ef-f6875242dc0d/) by tapping on the back arrow icon (top left)


### [8. New Product Post Page (Uusi ilmoitus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/243cde26-d28f-46b7-b481-f667efdf38c5/)

- user fills the form for new product listing (category, image, title, description, is it organic, how product is priced, tax, price, unit measure, quantity, time limit for orders and at which events product is listed)

- user can tap on Preview (Esikatselu-nappi) to preview the new product listing

  - user gets directed to [Preview Page (Esikatselu)]((https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/ef8c1313-3068-44f2-9e77-0b9386ae5429/))

    - the Preview Page has more than one version depending on the product category


### [9. Preview Page (Esikatselu)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/ef8c1313-3068-44f2-9e77-0b9386ae5429/)

- user is shown a preview of their new product listing
 
    - the preview may look different depending on the product category

- user can tap on the back arrow icon

  - user gets directed back to [New Product Post Page (Uusi ilmoitus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/243cde26-d28f-46b7-b481-f667efdf38c5/) and make changes to the listing

- user can tap on Publish (Julkaise-nappi) to publish the new product listing without changes 
 
  - user is [notified of success](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/ba5ce4d0-b28c-4172-9808-754a7cd4396c/) and prompted to add another product listing

  - if users opts for New Product Listing (Luo uusi ilmoitus)

    a. option: client stores the new product in a local state (products: [{product a}])

    b. option: client posts the new product object to the server (POST, /api/products/seller:id, {product}) and stores it in a reducer (sellerProducts)

     - user gets directed back to [New Product Post Page (Uusi ilmoitus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/243cde26-d28f-46b7-b481-f667efdf38c5/)

  - if user doesn't want to add more products

    a. option: client stores the local product list in a reducer (sellerProducts)

    b. the product has already been posted and stored

- **feature change suggestion**: user has an immediate option to publish the new product and add another

  - user taps on Publish and Add Another Listing (Julkaise ja luo uusi ilmoitus -nappi)

    - client stores the new product in a local state (products: [{product a}])

    - user is notified of success and gets directed back to [New Product Post Page (Uusi ilmoitus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/243cde26-d28f-46b7-b481-f667efdf38c5/)

  - user taps on Publish (Julkaise-nappi)

    - client posts the new product listing/s to the server (POST, /api/products/seller/:id, [{product a, product, b}]) and updates reducer's state (sellerProducts)

    - user is notified of success and gets directed to [Products Page (Tuotteet)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2a299c6e-f26e-42a0-97d5-a71e1069e0e8/)


### [10. Products Page (Tuotteet)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2a299c6e-f26e-42a0-97d5-a71e1069e0e8/)

- client gets seller's **currently listed products** from the server (GET, /api/products/seller/:id)

  a. option: information about **product sales** must be up to date

    - **question:** can server push data to the client as soon as sales numbers change? (Web Socket integration)   
 
      - **question:** can the changed data be stored automatically in a reducer? (sellerProducts)

        - if yes, client can listen to updates with useEffect hook
    
  b. option: client sends a request to get **currently listed products** from the server (GET, /api/products/seller/:id) ie. every 3 minutes while user stays on the page    
    
    - if order numbers have changed, client updates the reducer's state (sellerProducts)
    
  c. option: **new feature suggestion**: user can tap on Update Order Numbers (esim. Päivitä tilausmäärät -nappi) to refresh the view 

    - client gets seller's **currently listed products** from the server 

       - if order numbers have changed, client updates the reducer's state (sellerProducts)

         - user is notified about new sales

       - if numbers haven't changed, user is notified

- user can tap on a product to get more details 
 
  a. option: product listing expands to show the product listing details - akin to [Product Description Page (Kuvaus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/f59a2723-6350-4871-8c9c-a130ccd92c72/)

  b. option: user gets directed to [Product Description Page (Kuvaus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/f59a2723-6350-4871-8c9c-a130ccd92c72/)


### [11. Product Description Page (Kuvaus) or expanded product listing info](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/f59a2723-6350-4871-8c9c-a130ccd92c72/)

- user can view the listing and may wish to edit or delete it

- user can tap on Edit Listing (Muokkaa ilmoitusta) to edit product description

    - user gets directed to [Edit Product Post Page (Muokkaa ilmoitusta)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/8d89aaa5-ab95-4d7e-a7b5-fc72d42ac6e2/)

- user can tap on Delete Product (Poista tuote -nappi) to delete the listing
 
  - pop-up prompt appears asking to confirm or cancel

    - user can tap on Delete (Jatka / Poista)

      - client deletes the product from the server (DELETE, /api/products/seller/:id, "productID")

      - client updates reducer's state (sellerProducts)

      - user gets directed back to [Products Page (Tuotteet)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2a299c6e-f26e-42a0-97d5-a71e1069e0e8/)

    - user can tap on Cancel (Peruuta)

      a. option: user stays at [Products Page (Tuotteet)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2a299c6e-f26e-42a0-97d5-a71e1069e0e8/) and the product they were viewing is extended

      b. option: user stays at [Product Description Page (Kuvaus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/f59a2723-6350-4871-8c9c-a130ccd92c72/) of the product they decided not to delete

      c. option: user gets directed to [Products Page (Tuotteet)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2a299c6e-f26e-42a0-97d5-a71e1069e0e8/)

- user can switch events at which the product is listed

  - if changes are detected, client uses local state for updating the product object

      - client sends updated product object to the server (PUT, /api/products/seller/:id, {product}) and updates reducer's state (sellerProducts)

        a. option: when user navigates away from the page

        b. option: some time after a change has been made


### [12. Edit Product Post Page (Muokkaa ilmoitusta)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/8d89aaa5-ab95-4d7e-a7b5-fc72d42ac6e2/)

- user can edit an existing product listing form (image, title, description, tax, price, unit measure and quantity)

- user can tap on Save Changes (Tallenna muutokset -nappi)

  - client sends updated product object to the server (PUT, /api/products/seller/:id, {product}) and updates reducer's state (sellerProducts)

a. option: user gets directed to [Products Page (Tuotteet)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2a299c6e-f26e-42a0-97d5-a71e1069e0e8/) and the product they were viewing is extended

b. option: user gets directed back to [Product Description Page (Kuvaus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/f59a2723-6350-4871-8c9c-a130ccd92c72/) to view changes they have made


### [13. Upcoming Pickups Page (Tulevat noudot)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/71165a78-35c8-4629-9c02-19b43f118147/)

- client gets user's **current orders** from the server (GET, /api/orders/seller/:id)

  a. option: information about **current orders** must be up to date

    - **question:** can server push data to the client as soon as orders have changed? (Web Socket integration)   
 
      - **question:** can the changed data be stored automatically in a reducer? (sellerOrders)

        - if yes, client can listen to updates with useEffect hook
    
  b. option: client sends a request to get **current orders** from the server (GET, /api/orders/seller/:id) ie. every 3 minutes while user stays on the page    
    
    - if orders have changed, client updates reducer's state (sellerOrders)
    
  c. option: **new feature suggestion**: user can tap on Update Orders (esim. Päivitä tilaukset -nappi) to refresh the view 

    - client gets seller's **current orders** from the server 

       - if order numbers have changed, client updates reducer's state (sellerOrders)

         - user is notified about new sales

       - if numbers haven't changed, user is notified
 

### [14. Producer's Public Profile Page (Tuottajan julkinen profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/63bbb74d-157d-462c-beb2-576f55a27e21/)

- producer can preview their own public profile

- client fetches user object from a reducer (AuthedUser)

- contains profile photo, company name, address, ZIP code, phone, email, company name, address, ZIP code, business ID, web page and about section

a. option: client gets user's **current orders** from the server (GET, /api/orders/seller/:id) 

  - if no orders are returned form the server, user is prompted to add REKO events and products

  - if server returns orders, client stores them in a reducer (sellerOrders)

b. option: as above, but all user's orders (past and present, cancelled and deleted) are returned and stored in a reducer (sellerOrders)

- if orders exist, they are sorted by **current events** (ascending order)

- user can tap on an event to view current orders for that event

  - user gets directed to Orders Page 2 (Tilaukset 2)


## Buyer App

### 0. [Welcome Page (Täällä taas!)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/9921b2e1-10fe-4eb9-8ff8-a62bb0112259/)

- this page is only shown to user on their first visit

- includes a short welcoming message

- prompts user to upload a profile photo or explore markets events in their area

    - there is a link to Buyer's Profile Page (Ostajan profiili)

    - there is a link to Map Page (Kartta)

### 1. [Buyer's Profile Page (Ostajan profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/655988c7-ddf3-45ff-adb7-4d436e7ebee8/)

- user can add a photo to their profile

    - should we offer an option to add a photo form Facebook?

- user can update their info

- **new feature suggestion**: user can set their preferred muinicipality for pick ups

- client stores updated user object in a reducer (AuthedUser)

    - when that happens is still beeing looked at

        - option 1: after value of form input changes

        - option 2: when user navigates away from the Profile Page

        - option 3: some time after a change has been made

- client sends updated user object to the server (PUT, /api/users/:id)

    - when that happens is still beeing looked at

        - option 1: when user navigates away from the Profile Page

        - option 2: some time after a change has been made

### 2. [Map Page (Kartta)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/67a0fe65-7bc9-481c-aa51-929bec912d69/)

- option 1: user is prompted to allow Location Services

    - if user authorises Location Services, the initial map is centered on user's location 

    - if user does not authorise, the initial map is centered on Etelä-Savo municipality

    - alternatively, user's location is set by the location of their Facebook profile 

- option 2: user is prompted to select their preferred muinicipality for pick ups

    a) user selects a province from a list

    b) user selects a municipality from a list based on their choice of province

- option 3: the initial map is centered on Etelä-Savo municipality for now

- client gets **markets** from the server based on user's chosen municipality (GET, api/markets, "muinicipality")

    - this could return a markets object

        - markets object has an eventMarkets key (value is an object with event id keys) 

            - value of each event id key is an object (location, event name, image, address, date, time)

        - markets object has a sellerMarkets key (value is an object with seller id keys)

            - value of each selelr id key is an object (location, seller's company name, image, address, url)

- client gets **products** from the server based on eventMarkets object (GET, api/products, [event id keys])

    - this could return a rekoEvents object with event ids as keys

        - value of each event id key is an object with product ids as keys

            - value of each product id key is an object (seller's company name, time posted, quantity sold, product title, unit price, unit measure) )

- client matches markets object's eventMarkets keys with rekoEvents object keys and stores the value (an object with product ids as keys) in a rekoEvents object as products

- client stores buyer's markets in a reducer (buyerMarkets)

- user can view pick up locations on the map

    - locations for REKO events are shown on the map with R marker

        - only one upcoming REKO event (nearest date) at any one location is shown

    - locations for seller's pick ups are shown on the map with T marker

- user can tap on R map marker for ReKo events
    - map centers on the marker

    - pop-up window appears (event name, image, address, date, time)

    - if user taps on View Event (Siirry tilaisuuteen -nappi), they get directed to [Pick Up Event Page (Noutotilaisuus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2973a829-f3a8-41e6-b533-c15b4245f233/)

- user can tap on T map marker for seller's pick ups

    - map centers on the marker

    - pop-up window appears (seller's company name, image, address, url)

    - if user taps on View Profile (Tuottajan sivulle -nappi), they get directed to [Seller's Public Profile Page (Myyjän julkinen profiili)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/63bbb74d-157d-462c-beb2-576f55a27e21/)

- user can view a list of events in the area by selecting View List (Näytä lista)

    - list of upcoming REKO events will be shown (descending order)

    - each event listing will have four products sorted by popularity / newness

    - number of all products beeing sold is shown for each event

    - if user taps on View Event (Siirry tilaisuuteen -nappi), they get directed to [Pick Up Event Page (Noutotilaisuus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2973a829-f3a8-41e6-b533-c15b4245f233/)


### 3. [Pick Up Event Page (Noutotilaisuus)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/2973a829-f3a8-41e6-b533-c15b4245f233/)

- event details and products are passed on as props form Map Page (Kartta)

- products are sorted by seller's company name

    - each product section has a title (seller's company name)

    - products from the seller are listed under the title

    - sold out products should not be shown 

- user can filter products by seller's company name

- user can tap on a product to get more details 

    - product listing expands to show the product listing description

    - user can add desired quantity of the product to their shopping cart

        - option 1: when first product is added to the shopping cart:

            - client creates an eventCart object at a higher order component (event name, date, time, address, cart: added product object)

            - the higher order component is accessible from the Shoppin Cart Page (Ostoskori)

            - client stores the eventCart object in a reducer (buyerCart)

            - each time new product is added, client updates the store

        - option 2: client stores each selected product in a local state at a higher order component

            - the higher order component is accessible from the Shoppin Cart Page (Ostoskori)

            - when user navigates to another page, eventCart object is created and stored in a reducer (buyerCart)
        
- there is a possibility that user's shopping cart will include products that have been sold out

- **new feature suggestion**: shopping cart icon button at the top-right corner or a floating icon button (bottom-right)

- user can return to the Map Page (Kartta) by tapping on the back arrow


### 4. [Shopping Cart Page (Ostoskori)](https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/df5b3c18-a0ce-43e4-a2ed-4455c542f8aa/)

- client fetches event carts from a reducer (buyerCart)

- if shopping cart is empty, user is prompted to check upcoming events

- if user has added products to their shopping cart, the shopping is sorted by events (descending order)

    - each section has a header (event name, date, time, address)

        - the products are sorted by seller's company name 

- user can edit the list of products by reducing the quantity or adding more

    - option 1: when product quantity has changed, the shopping cart is updated:

            - client updates the eventCart object at a higher order component (see Pick Up Event Page (Noutotilaisuus))

            - client updates the reducer (buyerCart)

            - each time new product is added, client updates the store

        - option 2: client stores each selected product in a local state at a location where it is accessible from the Shopping Cart Page (Ostoskori)

            - when user navigates to another page, eventCart object is created and stored in a reducer (buyerCart)
    
- there is a possibility that user's shopping cart will include products that have been sold out


### Tulevat noudot (https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/d764196b-32ee-41a2-9b10-5059f75afb52/)

### Menneet tilaukset (https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/1e5e6cb2-e618-4769-8be8-5bb82689062b/)

### Ostajan julkinen profiili (https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/63bbb74d-157d-462c-beb2-576f55a27e21/)

### Nouto Tuottajilta (https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/0bc31f68-6fb3-4b42-b99f-0f8c9b0b1372/)

### Peruutus pop-upit (25 - 30)

### Linkki myyj'n kotisivulle (34)

### Kiitos rekisteröitymisestä -viesti (https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/df5b3c18-a0ce-43e4-a2ed-4455c542f8aa/)

### Tilauksen vahvistusviesti (https://xd.adobe.com/view/266f9915-de6e-42aa-52b2-7ec583316367-505e/screen/7459226b-962e-4912-8e48-d16e290207eb/)

### Admin -paneeli

### Erilaiset tuotesivut (52, 53, 55, 56)


## Future features

- Share on Facebook option on some screens

- Web Sockets