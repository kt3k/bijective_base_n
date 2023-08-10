// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT License.

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// TODO(kt3k): Support bigints
/** Encode the given number into bijective base-n notation with the given alphabet. */
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

/** Decode the given bijective base-n string to a bigint with the given alphabet. */
export function decode(s: string, alphabet = ALPHABET): bigint {
  if (typeof s !== "string") {
    throw new Error(`Not a string: ${s} (${typeof s})`);
  }
  if (s === "") {
    return 0n;
  }

  const base = BigInt(alphabet.length);

  let n = 0n;

  for (const c of s) {
    const digit = alphabet.indexOf(c);
    if (digit === -1) {
      throw new Error(`Not a valid string: ${s} (alphabet: ${alphabet})`);
    }
    n = n * base + BigInt(digit);
  }

  for (let i = 1; i < s.length; i++) {
    n += base ** BigInt(i);
  }

  return n + 1n;
}
