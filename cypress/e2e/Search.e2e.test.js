import "@testing-library/cypress/add-commands";

describe("Search for a location", () => {
  it("should display data for that city", () => {
    
    cy.visit("/meteoup/search");

    cy.get(".ant-input").type("London");
    cy.get(".ant-input-suffix").click();

    cy.getAllByText("London")
      .first()
      .click();

    cy.get("header").contains("Weather in London");
  });
});
