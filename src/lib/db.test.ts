import { test } from "node:test";
import assert from "node:assert/strict";
import { stripNul } from "./db";

test("NUL bytes are removed from every string in query arguments, and nothing else changes", () => {
  const when = new Date();
  const buf = Buffer.from([0, 1, 2]);
  const out = stripNul({ where: { id: "ab\u0000c", OR: [{ email: { contains: "\u0000x" } }, { name: "plain" }] }, data: { n: 5, ok: true, none: null, when, buf, tags: ["a\u0000", "b"] } }) as { where: { id: string; OR: { email?: { contains: string }; name?: string }[] }; data: { tags: string[]; n: number; ok: boolean; none: null; when: Date; buf: Buffer } };
  assert.equal(out.where.id, "abc");
  assert.equal(out.where.OR[0].email?.contains, "x");
  assert.equal(out.where.OR[1].name, "plain");
  assert.deepEqual(out.data.tags, ["a", "b"]);
  assert.equal(out.data.n, 5);
  assert.equal(out.data.ok, true);
  assert.equal(out.data.none, null);
  assert.equal(out.data.when, when, "Dates keep their identity");
  assert.equal(out.data.buf, buf, "Buffers are untouched");
  assert.equal(stripNul("\u0000\u0000"), "");
  assert.equal(stripNul("no nul"), "no nul");
});
