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
    this.errorContainer = document.querySelector("#error-message");
    this.passwordHeading = this.generatedPasswordElement.querySelector("h4");
    this.copyPasswordButton = document.querySelector("#copy-password");

    // Inputs de configuração
    this.lengthInput = document.querySelector("#length");
    this.lettersInput = document.querySelector("#letters");
    this.numbersInput = document.querySelector("#numbers");
    this.symbolsInput = document.querySelector("#symbols");
  }

  getFormOptions() {
    const rawValue = this.lengthInput.value.trim();

    let finalLength;

    if (rawValue === "") {
      finalLength = 7;
    } else {
      finalLength = parseInt(rawValue, 10);
      if (isNaN(finalLength)) {
        finalLength = 0;
      }
    }

    return {
      length: finalLength,
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

  showError(message) {
    this.errorContainer.textContent = message;
    this.errorContainer.classList.remove("hide");
  }

  clearError() {
    this.errorContainer.textContent = "";
    this.errorContainer.classList.add("hide");
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
