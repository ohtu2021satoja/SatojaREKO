import axios from "axios"

const apiUrl = "/api/users"

export const getAuthedUser = async () => {
  try {
    const response = await axios.get(`${apiUrl}/current/user`)
    return response.data
  } catch (err) {
    console.log(err.message)
  }
}

export const createNewFacebookUser = async (newUser) => {
  try {
    const response = await axios.post(`${apiUrl}`, newUser)
    console.log(response.data)
  } catch (err) {
    console.log(err.message)
  }
}

export const updateAuthedSeller = async (seller) => {
  try {
    const object = {
      seller_info: {
        reko_areas: seller.reko_areas,
        address: seller.address,
        business_id: seller.business_id,
        city: seller.city,
        description: seller.description,
        salesreport_check: seller.salesreport_check,
        homepage: seller.homepage,
        name: seller.name,
        zipcode: seller.zipcode,
      },
      user_info: {
        lastname: seller.lastname,
        firstname: seller.firstname,
        email: seller.email,
        phonenumber: seller.phonenumber,
      },
    }
    console.log("USEER", object)
    const response = await axios.put(`${apiUrl}/${seller.id}`, object)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}

export const updateAuthedBuyer = async (buyer) => {
  try {
    const object = {
      buyer_info: {
        cancel_notification_check: buyer.cancel_notification_check,
        newsletter_check: buyer.newsletter_check,
      },
      user_info: {
        lastname: buyer.lastname,
        firstname: buyer.firstname,
        email: buyer.email,
        phonenumber: buyer.phonenumber,
      },
    }
    console.log("USEER", object)
    const response = await axios.put(`${apiUrl}/${buyer.id}`, object)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}

export const updateSellerImage = async (id, image_id) => {
  try {
    const object = { image_id }
    const response = await axios.put(`/api/sellers/${id}/image`, object)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}

export const updateBuyerImage = async (id, image_id) => {
  try {
    const object = { image_id }
    const response = await axios.put(`/api/buyers/${id}/image`, object)
    console.log(response.data)
    return "success"
  } catch (err) {
    console.log(err.message)
    return "error"
  }
}
