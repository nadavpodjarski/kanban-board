/// <reference types="cypress" />

describe("Column", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("Add column element text", () => {
    cy.get("[data-cy=add-column-text]").should("have.text", "Add Column");
  });

  it("Open Add column modal", () => {
    cy.get("[data-cy=add-column-container]").click();
  });

  it("Add column action", () => {
    cy.get("[data-cy=add-column-input]").type("cy-column-test");
    cy.get("[data-cy=add-column-form]").submit();
  });

  it("Verify column title", () => {
    cy.get("[data-cy=column-title]").then((titles) => {
      expect(titles[titles.length - 1]).to.have.text("cy-column-test");
    });
  });

  // it("Drag and drop column", () => {
  //   cy.get("[data-cy=column-title]")
  //     .first()
  //     .trigger("mousedown")
  //     .wait(1500)
  //     .trigger("mousemove", 400, 0, { force: true })
  //     .trigger("mouseup", { force: true });
  // });
});
