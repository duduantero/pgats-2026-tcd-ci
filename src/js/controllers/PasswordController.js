export class PasswordController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Inicializa os listeners ligando a View ao comportamento do Controller
    this.view.bindToggleOptions(this.handleToggleOptions.bind(this));
    this.view.bindGeneratePassword(this.handleGeneratePassword.bind(this));
    this.view.bindCopyPassword(this.handleCopyPassword.bind(this));
  }

  handleToggleOptions() {
    this.view.toggleGeneratorOptions();
  }

  handleGeneratePassword() {
    const { length, options } = this.view.getFormOptions();
    const newPassword = this.model.generatePassword(length, options);
    this.view.displayPassword(newPassword);
  }

  handleCopyPassword() {
    const password = this.view.getPasswordText();
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
      this.view.updateCopyButtonText("Senha copiada com sucesso!");
      setTimeout(() => {
        this.view.updateCopyButtonText("Copiar");
      }, 3000);
    });
  }
}
