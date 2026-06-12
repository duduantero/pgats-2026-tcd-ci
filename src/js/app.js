import { PasswordModel } from "./models/PasswordModel.js";
import { PasswordView } from "./views/PasswordView.js";
import { PasswordController } from "./controllers/PasswordController.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new PasswordModel();
  const view = new PasswordView();
  new PasswordController(model, view);
});
