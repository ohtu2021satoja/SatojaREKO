describe("Login", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3003")
    cy.contains("Tunne tuottaja!")
  })
  it("can login and logout", async function () {
    await cy.request("POST", "http://localhost:3003/api/users", {
      firstname: "TestiEtunimi",
      lastname: "TestiSukunimi",
      email: "testi@email.com",
      phonenumber: "4923i4923",
      password: "12345678",
    })
    cy.visit("http://localhost:3003")
    cy.get("#user-email").type("testi@email.com")
    cy.get("#user-password").type("12345678")
    cy.get("#login-button").click()
    cy.contains("Kirjaudu ulos")
    cy.get("#logout-button").click()
    cy.contains("Tunne tuottaja!")
  })
})
