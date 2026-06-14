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
    const length = 16;
    const options = { letters: true, numbers: false, symbols: false };
    const password = model.generatePassword(length, options);

    expect(password).to.match(/^[A-Za-z]+$/);
  });

  it("Deve conter apenas números quando apenas 'numbers' for selecionado", () => {
    const length = 15;
    const options = { letters: false, numbers: true, symbols: false };
    const password = model.generatePassword(length, options);

    expect(password).to.match(/^[0-9]+$/);
  });

  it("Deve conter apenas símbolos quando apenas 'symbols' for selecionado", () => {
    const length = 10;
    const options = { letters: false, numbers: false, symbols: true };
    const password = model.generatePassword(length, options);

    expect(password).to.match(/^[(){}\[\]=<>\/,.!@#$%&*+-]+$/);
  });

  it("Deve conter apenas letras e números (sem símbolos) quando combinado", () => {
    const length = 16;
    const options = { letters: true, numbers: true, symbols: false };
    const password = model.generatePassword(length, options);

    expect(password).to.match(/^[A-Za-z0-9]+$/);
    expect(password).to.not.match(/[(){}\[\]=<>\/,.!@#$%&*+-]/);
  });

  it("Deve conter apenas números e símbolos (sem letras) quando combinado", () => {
    const length = 13;
    const options = { letters: false, numbers: true, symbols: true };
    const password = model.generatePassword(length, options);

    expect(password).to.match(/^[0-9(){}\[\]=<>\/,.!@#$%&*+-]+$/);
    expect(password).to.not.match(/[A-Za-z]/);
  });

  it("Deve lançar erro se o tamanho inserido for menor que 7", () => {
    const options = { letters: true, numbers: true, symbols: true };

    expect(() => model.generatePassword(5, options)).to.throw(
      "O tamanho da senha deve estar entre 7 e 16 caracteres.",
    );
  });

  it("Deve lançar erro se o tamanho inserido for maior que 16", () => {
    const options = { letters: true, numbers: true, symbols: true };

    expect(() => model.generatePassword(17, options)).to.throw(
      "O tamanho da senha deve estar entre 7 e 16 caracteres.",
    );
  });

  it("Deve lançar erro se o tamanho inserido for igual a zero", () => {
    const options = { letters: true, numbers: true, symbols: true };

    expect(() => model.generatePassword(0, options)).to.throw(
      "O tamanho da senha deve estar entre 7 e 16 caracteres.",
    );
  });
});
