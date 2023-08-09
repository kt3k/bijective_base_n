// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT License.

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export function encode(n: number, alphabet = ALPHABET) {
  if (typeof n !== "number") {
    throw new Error(`Not a number: ${n} (${typeof n})`);
  }
  if (!Number.isInteger(n)) {
    throw new Error(`Not an integer: ${n}`);
  }
  if (n < 0) {
    throw new Error(`Not a positive number: ${n}`);
  }
  if (n === 0) {
    return "";
  }

  const base = alphabet.length;

  let len = 1;
  let m = base;
  while (n > m) {
    len++;
    n -= m;
    m *= base;
  }

  n--;

  const digits = [];

  for (let i = 0; i < len; i++) {
    const digit = n % base;
    n = (n - digit) / base;
    digits.unshift(digit);
  }

  return digits.map((c) => alphabet[c]).join("");
}
