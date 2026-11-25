// Childhood memory entry — writes one nostalgic sentence to /output/entry.txt.
// The sentence is held in SENTENCE below; the runner only validates and writes it.
// Measured: the sentence is 184 chars, one line, inside the 1–280 gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Every December my grandmother fried banana fritters in a dented wok while the rain drummed the tin roof, and she always saved the crispiest one for me, still warm, in her cupped hands.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function fail(message: string): never {
  console.error(`entry rejected: ${message}`);
  process.exit(1);
}

const trimmed = SENTENCE.trim();
if (trimmed.length < 1) fail("empty entry");
if (trimmed.length > 280) fail(`entry is ${trimmed.length} chars, over the 280 cap`);
if (trimmed.split(/\s+/).length < 2) fail("entry is not a sentence");
if (!/[.!?]$/.test(trimmed)) fail("entry does not end a sentence");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), trimmed, "utf8");
console.log(`wrote entry.txt (${trimmed.length} chars)`);
