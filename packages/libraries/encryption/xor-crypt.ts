/**
 * Encrypt or decrypt a string with the given XOR key.
 *
 * @name xorCrypt
 * @param {string} value - The string to encrypt.
 * @param {int} [key=6] - The XOR key to use when encrypting.
 *
 * @return The resulting XOR'ed string.
 */
export function xorCrypt(value: string, key = 6): string {
  return value.split("").reduce((output, char) => {
    output += String.fromCharCode(key ^ char.charCodeAt(0));
    return output;
  }, "");
}
