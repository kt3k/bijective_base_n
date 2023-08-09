// Copyright 2023 Yoshiya Hinosawa. All rights reserved. MIT License.

import { encode } from "./mod.ts";
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
    () => encode(null as any),
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
