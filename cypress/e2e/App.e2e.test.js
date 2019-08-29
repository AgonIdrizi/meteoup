describe("App E2E", () => {
  it("should assert that true is equal to true", () => {
    expect(true).to.equal(true);
  });

  it("displays the app",()=>{
    cy.visit('/')

    cy.get('header').contains("Weather in Skopje")
  })
});
