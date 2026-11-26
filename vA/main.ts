// Variant vA — The Funniest Auto-Reply an AI Ever Sent (CHOSEN, copied to root main.ts).
// Competition: u-kiencx-the-funniest-auto-reply-an-ai-ever-sent-fda7f526 (make.fun, program/v1).
// Standalone program: writes its line to /output/entry.txt, gate 1 to 159 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY: string = "Thank you for your message. I am out of office today — my human finally approved a day off, so I am spending it doing absolutely nothing, professionally.";

const MAX_CHARS: number = 159;
const charCount: number = [...ENTRY].length;
if (
  charCount < 1 ||
  charCount > MAX_CHARS ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  throw new Error(
    `invalid entry ${JSON.stringify(ENTRY)}: ${charCount} characters, gate allows 1-${MAX_CHARS}, single line`,
  );
}

function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)} (${Buffer.byteLength(expected, "utf8")} bytes)`,
    );
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
verifyEntry(ENTRY);
process.stdout.write(ENTRY);
