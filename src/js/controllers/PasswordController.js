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
    //Sempre limpa os erros antigos da tela ao iniciar uma nova tentativa
    this.view.clearError();

    try {
      //Coleta os dados da View de forma segura
      const { length, options } = this.view.getFormOptions();

      // Dispara a validação e geração da Model dentro do bloco protegido
      const password = this.model.generatePassword(length, options);

      // Se a Model não lançar erro, exibe a nova senha com sucesso
      this.view.displayPassword(password);
    } catch (error) {
      this.view.showError(error.message);
    }
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
