describe("Password Generator E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/index.html"); // Carrega a página principal
  });

  it("deve alternar a visibilidade do painel de opções ao clicar no link de ajuda", () => {
    // Inicialmente deve estar oculto (classe hide)
    cy.get("#generate-options").should("have.class", "hide");

    // Clica para abrir
    cy.get("#open-generate-password").click();
    cy.get("#generate-options").should("not.have.class", "hide");

    // Clica para fechar novamente
    cy.get("#open-generate-password").click();
    cy.get("#generate-options").should("have.class", "hide");
  });

  it("deve gerar uma senha visível na tela ao preencher o formulário", () => {
    cy.get("#open-generate-password").click();

    // Altera a quantidade de caracteres para 12
    cy.get("#length").clear().type("12");

    // Clica para criar a senha
    cy.get("#generate-password").click();

    // Valida se o contêiner de resultado aparece e se o h4 possui texto com 12 caracteres
    cy.get("#generated-password").should("be.visible");
    cy.get("#generated-password h4").invoke("text").should("have.length", 12);
  });

  it("deve alterar o texto do botão de cópia ao clicar nele", () => {
    cy.get("#open-generate-password").click();
    cy.get("#generate-password").click();

    // Clica no botão de copiar
    cy.get("#copy-password").click();

    // Verifica feedback visual imediato
    cy.get("#copy-password").should(
      "contain.text",
      "Senha copiada com sucesso!",
    );
  });
});
