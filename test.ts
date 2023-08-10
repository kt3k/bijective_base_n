// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT License.

import { decode, encode } from "./mod.ts";
import { assertEquals, assertThrows } from "std/assert/mod.ts";

Deno.test("encode", () => {
  assertEquals(encode(0), "");
  assertEquals(encode(1), "a");
  assertEquals(encode(2), "b");
  assertEquals(encode(26), "z");
  assertEquals(encode(27), "aa");
  assertEquals(encode(28), "ab");
  assertEquals(encode(701), "zy");
  assertEquals(encode(702), "zz");
  assertEquals(encode(703), "aaa");
  assertEquals(encode(704), "aab");
});

Deno.test("encode - invalid input", () => {
  assertThrows(
    () => encode(null as unknown as number),
    Error,
    "Not a number: null (object)",
  );

  assertThrows(
    () => encode(0.5),
    Error,
    "Not an integer: 0.5",
  );

  assertThrows(
    () => encode(-1),
    Error,
    "Not a positive number: -1",
  );
});

Deno.test("encode - alt alphabet", () => {
  assertEquals(encode(0, "a"), "");
  assertEquals(encode(1, "a"), "a");
  assertEquals(encode(2, "a"), "aa");
  assertEquals(encode(3, "a"), "aaa");
  assertEquals(encode(4, "a"), "aaaa");
});

Deno.test("decode", () => {
  assertEquals(decode(""), 0n);
  assertEquals(decode("a"), 1n);
  assertEquals(decode("b"), 2n);
  assertEquals(decode("y"), 25n);
  assertEquals(decode("z"), 26n);
  assertEquals(decode("aa"), 27n);
  assertEquals(decode("ab"), 28n);
  assertEquals(decode("zy"), 701n);
  assertEquals(decode("zz"), 702n);
  assertEquals(decode("aaa"), 703n);
  assertEquals(decode("aab"), 704n);
});

Deno.test("decode - invalid input", () => {
  assertThrows(() => {
    decode(null as unknown as string);
  });

  assertThrows(
    () => {
      decode("a0");
    },
    Error,
    "Not a valid string: a0 (alphabet: abcdefghijklmnopqrstuvwxyz)",
  );
});
