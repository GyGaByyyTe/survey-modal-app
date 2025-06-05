/**
 * A utility function that constructs a className string based on given arguments.
 * Handles strings and objects that conditionally include class names based on their values.
 *
 * @param {...(string | Record<string, boolean | string | null | undefined>)} args -
 * A list of arguments where each argument can be a string or an object.
 * Strings are included as-is, and objects include keys where the value is truthy.
 *
 * @return {string} A string containing a space-separated list of class names.
 * Invalid or false values are filtered out.
 */
export default function clsx(
  ...args: (string | Record<string, boolean | string | null | undefined>)[]
): string {
  return args
    .map((arg) => {
      if (typeof arg === "string") {
        return arg;
      } else if (typeof arg === "object" && arg !== null) {
        return Object.entries(arg)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
