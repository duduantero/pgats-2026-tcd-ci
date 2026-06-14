// @ts-nocheck

describe("Teste E2E Geração de Senha", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Deve alternar a visibilidade do painel de opções ao clicar no link de ajuda", () => {
    cy.get("#generate-options").should("have.class", "hide");
    cy.get("#open-generate-password").click();
    cy.get("#generate-options").should("not.have.class", "hide");
    cy.get("#open-generate-password").click();
    cy.get("#generate-options").should("have.class", "hide");
  });

  it("Deve gerar uma senha visível na tela ao preencher o formulário dentro dos limites", () => {
    cy.get("#open-generate-password").click();
    cy.get("#length").clear().type("12");
    cy.get("#generate-password").click();
    cy.get("#generated-password").should("be.visible");
    cy.get("#generated-password h4").invoke("text").should("have.length", 12);
  });

  it("Deve alterar o texto do botão de cópia ao clicar nele", () => {
    cy.get("#open-generate-password").click();
    cy.get("#generate-password").click();
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText").resolves();
    });
    cy.get("#copy-password").click();
    cy.get("#copy-password").should(
      "contain.text",
      "Senha copiada com sucesso!",
    );
  });

  it("Deve exibir mensagem de erro quando o usuário digitar 0", () => {
    cy.get("#open-generate-password").click();
    cy.get("#length").clear().type("0");
    cy.get("#generate-password").click();
    cy.get("#error-message")
      .should("not.have.class", "hide")
      .and("contain", "O tamanho da senha deve estar entre 7 e 16 caracteres.");
  });

  it("Deve exibir mensagem de erro quando o usuário digitar 6", () => {
    cy.get("#open-generate-password").click();
    cy.get("#length").clear().type("6");
    cy.get("#generate-password").click();
    cy.get("#error-message")
      .should("not.have.class", "hide")
      .and("contain", "O tamanho da senha deve estar entre 7 e 16 caracteres.");
  });

  it("Deve exibir mensagem de erro quando o usuário digitar 17", () => {
    cy.get("#open-generate-password").click();
    cy.get("#length").clear().type("17");
    cy.get("#generate-password").click();
    cy.get("#error-message")
      .should("not.have.class", "hide")
      .and("contain", "O tamanho da senha deve estar entre 7 e 16 caracteres.");
  });
});
