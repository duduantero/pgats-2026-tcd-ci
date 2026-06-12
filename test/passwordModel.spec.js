import { expect } from "chai";
import { PasswordModel } from "../src/js/models/PasswordModel.js";

describe("PasswordModel Unit Tests", () => {
  /**
   * @type {PasswordModel}
   */
  let model;

  beforeEach(() => {
    model = new PasswordModel();
  });

  it("Deve gerar uma senha com o tamanho correto solicitado", () => {
    const length = 12;
    const options = { letters: true, numbers: true, symbols: true };
    const password = model.generatePassword(length, options);

    expect(password).to.have.lengthOf(length);
  });

  it("Deve conter apenas letras (maiúsculas e minúsculas) quando apenas 'letters' for selecionado", () => {
    const length = 20;
    const options = { letters: true, numbers: false, symbols: false };
    const password = model.generatePassword(length, options);

    // Regex que valida se existem APENAS letras de A-Z e a-z
    expect(password).to.match(/^[A-Za-z]+$/);
  });

  it("Deve conter apenas números quando apenas 'numbers' for selecionado", () => {
    const length = 15;
    const options = { letters: false, numbers: true, symbols: false };
    const password = model.generatePassword(length, options);

    // Regex que valida se existem APENAS números de 0-9
    expect(password).to.match(/^[0-9]+$/);
  });

  it("Deve conter apenas símbolos quando apenas 'symbols' for selecionado", () => {
    const length = 10;
    const options = { letters: false, numbers: false, symbols: true };
    const password = model.generatePassword(length, options);

    // Escapa os caracteres especiais para validar contra a sua string de símbolos
    // Símbolos suportados na model: ( ) { } [ ] = < > / , . ! @ # $ % & * + -
    expect(password).to.match(/^[(){}\[\]=<>\/,.!@#$%&*+-]+$/);
  });

  it("Deve conter apenas letras e números (sem símbolos) quando combinado", () => {
    const length = 30;
    const options = { letters: true, numbers: true, symbols: false };
    const password = model.generatePassword(length, options);

    // Permite letras e números, mas proíbe terminantemente símbolos
    expect(password).to.match(/^[A-Za-z0-9]+$/);
    expect(password).to.not.match(/[(){}\[\]=<>\/,.!@#$%&*+-]/);
  });

  it("Deve conter apenas números e símbolos (sem letras) quando combinado", () => {
    const length = 25;
    const options = { letters: false, numbers: true, symbols: true };
    const password = model.generatePassword(length, options);

    // Permite números e símbolos, mas proíbe letras
    expect(password).to.match(/^[0-9(){}\[\]=<>\/,.!@#$%&*+-]+$/);
    expect(password).to.not.match(/[A-Za-z]/);
  });

  it.skip("Deve lançar erro se nenhuma opção de tipo de caractere for marcada", () => {
    const length = 10;
    const options = { letters: false, numbers: false, symbols: false };

    expect(() => model.generatePassword(length, options)).to.throw(
      "Selecione pelo menos um tipo de caractere para gerar a senha.",
    );
  });

  it.skip("Deve lançar erro se o tamanho inserido for igual ou menor que zero", () => {
    const options = { letters: true, numbers: true, symbols: true };

    expect(() => model.generatePassword(0, options)).to.throw(
      "A quantidade de caracteres deve ser maior que 0.",
    );

    expect(() => model.generatePassword(-5, options)).to.throw(
      "A quantidade de caracteres deve ser maior que 0.",
    );
  });

  it.skip("Deve lançar erro se o tamanho for nulo, indefinido ou string vazia", () => {
    const options = { letters: true, numbers: true, symbols: true };

    expect(() => model.generatePassword(undefined, options)).to.throw(
      "Por favor, insira a quantidade de caracteres para a senha.",
    );

    expect(() => model.generatePassword("", options)).to.throw(
      "Por favor, insira a quantidade de caracteres para a senha.",
    );
  });
});
