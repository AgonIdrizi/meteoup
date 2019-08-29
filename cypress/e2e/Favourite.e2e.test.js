import "@testing-library/cypress/add-commands";


describe("Logged in user can save favourites", () => {
  it("should save a favourite location", () => {
    
    cy.visit("/");

    cy.get('.ant-menu-rk > li').last().click()
    
    
    const form = cy.getByTitle('login-form')

    cy.getByPlaceholderText('Your Email').type('agon@agon.com')
    cy.getByPlaceholderText('Your password').type('123456')

    //cy.form.last().click()

    cy.visit("/meteoup/search");


    cy.get(".ant-input").type("Istanbul");

    cy.get(".ant-input-suffix").click();

    cy.getByText("Istanbul").parentNode.nextSibling.firstElementChild
      

    
  });
});