# Client Server Communication


## Registration and Login


1. User registration

- user authorises registration with Facebook

- client sends users Facebook id to the server (/api/register)

- server fetches Facebook info (name, surname, email) and creates a new user


2. User login

- user authorises login with Facebook

- client sends users Facebook id to the server (/api/login)

- server returns user info to the client 

- client stores user info in a reducer (AuthedUser)


## Sellers


1. New seller (user chooses to sell, but has no markets assigned)

- user selects "Myyn lähiruokaa" and gets sent to Sellers Profile Page (Tuottajan profiili)

- user is asked to update profile info (phone, markets, company name, address, web page, about section)

- client sends users updated info to the server (/api/users/:id)

- client stores users updated info in a reducer (AuthedUser)

- user gets sent to New Product Post Page (Uusi ilmoitus)


2. Existing seller (user already has markets assigned)


- user selects "Myyn lähiruokaa" and gets sent to Upcoming Pickups Page (Tulevat noudot)

- option 1: client gets 

- option 2: this info has already been fetched from the server with user info 