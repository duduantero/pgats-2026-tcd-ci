// @ts-nocheck

describe("Password Generator E2E Tests", () => {
  beforeEach(() => {
    // 🛠️ Alinhado com a raiz do http-server configurado na esteira
    cy.visit("/src/index.html");
  });

  it("deve alternar a visibilidade do painel de opções ao clicar no link de ajuda", () => {
    cy.get("#generate-options").should("have.class", "hide");

    // Abre o painel
    cy.get("#open-generate-password").click();
    cy.get("#generate-options").should("not.have.class", "hide");

    // Fecha o painel
    cy.get("#open-generate-password").click();
    cy.get("#generate-options").should("have.class", "hide");
  });

  it("deve gerar uma senha visível na tela ao preencher o formulário dentro dos limites", () => {
    cy.get("#open-generate-password").click();

    // Digita um tamanho válido (12)
    cy.get("#length").clear().type("12");
    cy.get("#generate-password").click();

    cy.get("#generated-password").should("be.visible");
    cy.get("#generated-password h4").invoke("text").should("have.length", 12);
  });

  it("deve alterar o texto do botão de cópia ao clicar nele", () => {
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

  it("Deve exibir mensagem de erro visual quando o usuário digitar 0", () => {
    cy.get("#open-generate-password").click();

    // Digita 0 (Invalido pela Model)
    cy.get("#length").clear().type("0");
    cy.get("#generate-password").click();

    // Valida o feedback visual de erro na tela
    cy.get("#error-message")
      .should("not.have.class", "hide")
      .and("contain", "O tamanho da senha deve estar entre 7 e 16 caracteres.");
  });

  it("Deve se recuperar automaticamente assumindo tamanho 7 se deixado em branco", () => {
    cy.get("#open-generate-password").click();

    // Deixa o campo totalmente vazio
    cy.get("#length").clear();
    cy.get("#generate-password").click();

    // A interface deve se recuperar, gerar a senha com tamanho 7 e ocultar erros antigos
    cy.get("#error-message").should("have.class", "hide");
    cy.get("#generated-password").should("be.visible");
    cy.get("#generated-password h4").invoke("text").should("have.length", 7);
  });
});
