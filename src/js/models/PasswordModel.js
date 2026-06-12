export class PasswordModel {
  getLetterLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  getLetterUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  getNumber() {
    return Math.floor(Math.random() * 10).toString();
  }

  getSymbol() {
    const symbols = "(){}[]=<>/,.!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  /**
   * @param {number | undefined} length
   * @param {{ letters: any; numbers: any; symbols: any; }} options
   */
  generatePassword(length, options) {
    /**
     * @type {any[]}
     */
    const generators = [];

    if (options.letters) {
      generators.push(
        this.getLetterLowerCase.bind(this),
        this.getLetterUpperCase.bind(this),
      );
    }
    if (options.numbers) {
      generators.push(this.getNumber.bind(this));
    }
    if (options.symbols) {
      generators.push(this.getSymbol.bind(this));
    }

    if (generators.length === 0) return "";

    let password = "";
    for (let i = 0; i < length; i += generators.length) {
      generators.forEach(() => {
        const randomGenerator =
          generators[Math.floor(Math.random() * generators.length)];
        password += randomGenerator();
      });
    }

    return password.slice(0, length);
  }
}
