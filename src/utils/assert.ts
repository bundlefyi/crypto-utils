/**
 * condition must be true for the remainder of the containing scope.
 *
 * assert(true, "True is true"); // passes
 * assert(false, "False is false"); // throws
 */
export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
