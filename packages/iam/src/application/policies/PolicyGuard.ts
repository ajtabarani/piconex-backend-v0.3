export class PolicyGuard {
  ensure(condition: boolean, message = "Not authorized"): void {
    if (!condition) throw new Error(message);
  }
}
