export class PasswordView {
  constructor() {
    // Seletores fixos do DOM
    this.openCloseGeneratorButton = document.querySelector(
      "#open-generate-password",
    );
    this.generatePasswordContainer =
      document.querySelector("#generate-options");
    this.generatePasswordButton = document.querySelector("#generate-password");
    this.generatedPasswordElement = document.querySelector(
      "#generated-password",
    );
    this.passwordHeading = this.generatedPasswordElement.querySelector("h4");
    this.copyPasswordButton = document.querySelector("#copy-password");

    // Inputs de configuração
    this.lengthInput = document.querySelector("#length");
    this.lettersInput = document.querySelector("#letters");
    this.numbersInput = document.querySelector("#numbers");
    this.symbolsInput = document.querySelector("#symbols");
  }

  getFormOptions() {
    return {
      length: parseInt(this.lengthInput.value, 10) || 0,
      options: {
        letters: this.lettersInput.checked,
        numbers: this.numbersInput.checked,
        symbols: this.symbolsInput.checked,
      },
    };
  }

  toggleGeneratorOptions() {
    this.generatePasswordContainer.classList.toggle("hide");
  }

  displayPassword(password) {
    if (!password) return;
    this.generatedPasswordElement.style.display = "block";
    this.passwordHeading.innerText = password;
  }

  updateCopyButtonText(text) {
    this.copyPasswordButton.innerText = text;
  }

  getPasswordText() {
    return this.passwordHeading.innerText;
  }

  // Bindings para passar eventos para o Controller
  bindToggleOptions(handler) {
    this.openCloseGeneratorButton.addEventListener("click", handler);
  }

  bindGeneratePassword(handler) {
    this.generatePasswordButton.addEventListener("click", handler);
  }

  bindCopyPassword(handler) {
    this.copyPasswordButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }
}
