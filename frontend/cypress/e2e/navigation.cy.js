describe("Testing Navigation", () => {
  it("Should navigate to localhost and login in the app ", () => {
    cy.visit("/");
    cy.get("button").click();
    cy.get("#emaiLogin").type("ebert.jena@example.org");
    cy.wait(200);
    cy.get("#passwordLogin").type("123456");
    cy.get("button").click();
    cy.get(".text-xl").should("exist");
  });
});
