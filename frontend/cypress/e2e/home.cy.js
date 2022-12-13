describe("page testing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be span teg with text", () => {
    cy.get("span").contains(`Up to 10 input domain names one per line`);
  });

  it("should be textarea teg with empty value", () => {
    cy.get("#textarea").should("have.value", "");
  });

  it("should be button teg with text", () => {
    cy.get("button").contains("Highlight top ranking");
  });

  it("should be h3 teg with text", () => {
    cy.get("h3").contains("Results");
  });

  it("should be p teg with text", () => {
    cy.get("p").contains("please type any domain name");
  });

  it("should be p teg with text", () => {
    cy.get("p").contains("please type any domain name");
  });

  it("should show up warning massage", () => {
    cy.get("#textarea").type("hello");
    cy.get("button").click();
    cy.get(".Toastify__toast-container").contains(
      "Line 1 has incorrect domaine name"
    );
  });

  it("should remove space from textarea", () => {
    cy.get("#textarea").type("google.com ").should("have.value", "google.com");
  });

  it("should show up result with highlight", () => {
    cy.get("#textarea").type("google.com");
    cy.get("button").click();
    cy.get(".result_item.yellow").contains("google.com");
  });

  it("should show up result without highlight", () => {
    cy.get("#textarea").type("lego.com");
    cy.get("button").click();
    cy.get(".result_item").should("contain", "lego.com");
  });
});
