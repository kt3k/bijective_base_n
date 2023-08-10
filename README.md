# bijective_base_n v0.1.1

[![ci](https://github.com/kt3k/bijective_base_n/actions/workflows/ci.yml/badge.svg)](https://github.com/kt3k/bijective_base_n/actions/workflows/ci.yml)

Convert numbers to
[bijective base-n](https://en.wikipedia.org/wiki/Bijective_numeration) notation.

```
0 -> (empty string)
1 -> a
2 -> b
...
25 -> y
26 -> z
27 -> aa
28 -> ab
...
52 -> az
53 -> ba
...
701 -> zy
702 -> zz
703 -> aaa
```

This system is used, for example, for labeling columns in Excel.

# Usage

```js
import { encode, decode } from "https://deno.land/x/bijective_base_n@v0.1.1/mod.ts";

encode(0) // => ""
encode(1) // => a
encode(2) // => b
encode(26) // => z
encode(27) // => aa
encode(28) // => ab
encode(701) // => zy
encode(702) // => zz
encode(703) // => aaa
encode(704) // => aab

decode("") // => 0n
decode("a") // => 1n
decode("b") // => 2n
decode("z") // => 26n
decode("aa") // => 27n
decode("ab") // => 28n
decode("zy") // => 701n
decode("zz") // => 702n
decode("aaa") // => 703n
decode("aab") // => 704n
```

# LICENSE

MIT
