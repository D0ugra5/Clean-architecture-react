export class UnexpectedError extends Error {
  constructor() {
    super("Algo de errrado acounteceu. Tente novamente em breve.");
    this.name = "UnexpectedError";
  }
}
