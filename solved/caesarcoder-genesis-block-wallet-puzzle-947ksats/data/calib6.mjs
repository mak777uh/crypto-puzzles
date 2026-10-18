// calib6.mjs — battery #3 (Теория B: e4caa034 = F_ppreal("0")).
// Part A: pp-transform battery on "Test Example" (не «сломался» ли его скрипт на пассфразе).
// Part B: names_oracle3 пары (люди «первой транзакции» + ранние фигуры) x оба порядка x 9 форм x 2 суффикса.
// Любой хит проверяется против ВСЕХ 8 значений автора.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const L = fs.readFileSync(path.join(HERE, 'genesis570.hex'), 'utf8').trim();
const WORDLIST = fs.readFileSync(path.join(HERE, 'bip39_english.txt'), 'utf8')
  .split('\n').map(w => w.trim()).filter(Boolean);

function m12(entropy) {
  const bits = new Array(132);
  for (let i = 0; i < 16; i++) { const x = entropy[i]; for (let j = 0; j < 8; j++) bits[i * 8 + j] = (x >> (7 - j)) & 1; }
  const h = crypto.createHash('sha256').update(entropy).digest();
  for (let i = 0; i < 4; i++) bits[128 + i] = (h[0] >> (7 - i)) & 1;
  const words = [];
  for (let i = 0; i < 12; i++) { let idx = 0; for (let j = 0; j < 11; j++) idx = (idx << 1) | bits[i * 11 + j]; words.push(WORDLIST[idx]); }
  return words;
}
function F(text, pp) {
  const e = crypto.createHash('sha256').update(text, 'ascii').digest().subarray(0, 16);
  const w = m12(e);
  const seed = crypto.pbkdf2Sync(w.join(' '), 'mnemonic' + pp, 2048, 64, 'sha512');
  const I = crypto.createHmac('sha512', Buffer.from('Bitcoin seed', 'ascii')).update(seed).digest();
  const k = crypto.createECDH('secp256k1');
  k.setPrivateKey(I.subarray(0, 32));
  const pub = k.getPublicKey(null, 'compressed');
  return crypto.createHash('ripemd160').update(crypto.createHash('sha256').update(pub).digest()).digest().subarray(0, 4).toString('hex');
}

// control gate
{
  const c = F('000000000019d6689c08', 'Test Example');
  if (c !== 'b7f4182b') throw new Error('CONTROL FAIL ' + c);
}
console.log('control OK; F("0","Test Example") =', F('0', 'Test Example'), '(expect 2e915cad)');

const ORACLE1 = 'e4caa034'; // = F_ppreal("0") per Theory B
const CHECKS = [
  ['1-1 "0"', '0', 'e4caa034'],
  ['2-2 "1"', '1', '9fb54bad'],
  ['3-3 "0"', '0', 'e4caa034'],
  ['1-4 "0100"', '0100', 'e79c9765'],
  ['1-2000 whole', L, '8b9b2fea'],
  ['263-400', L.substring(262, 400), '68ab4226'],
  ['1-66', L.substring(0, 66), '9290f941'],
  ['2-67', L.substring(1, 67), 'c85bcea3'],
];
function reportHit(pp, suf, tag) {
  console.log('\n*** HIT *** [' + tag + '] pp=' + JSON.stringify(pp) + ' suffix=' + JSON.stringify(suf));
  let ok = 0;
  for (const [nm, t, want] of CHECKS) {
    const got = F(t + suf, pp);
    if (got === want) ok++;
    console.log('   ', nm.padEnd(14), got, got === want ? 'OK' : 'vs ' + want);
  }
  console.log('    matched', ok, '/ 8');
  fs.appendFileSync(path.join(HERE, 'hits_oracle3.log'), JSON.stringify({ pp, suf, tag, ok, at: new Date().toISOString() }) + '\n');
}

// ---- Part A: pp transform battery on "Test Example" ----
const A = new Set();
{
  const base = 'Test Example';
  const words = ['Test', 'Example'];
  const forms = w => [w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase(), w.toUpperCase()];
  for (const a of forms(words[0])) for (const b of forms(words[1])) {
    A.add(a + ' ' + b);
    A.add(a + '  ' + b);
    A.add(a + '-' + b);
    A.add(a + '_' + b);
    A.add(a + '.' + b);
    A.add(a + ',' + b);
    A.add(a + b);
    A.add(a + '\t' + b);
    A.add(' ' + a + ' ' + b);
    A.add(a + ' ' + b + ' ');
    A.add('"' + a + ' ' + b + '"');
    A.add("'" + a + ' ' + b + "'");
  }
  A.add(base + '\n'); A.add(' ' + base); A.add(base + ' '); A.add(base.toLowerCase()); A.add(base.toUpperCase());
}
console.log('Part A: pp-transform battery,', A.size, 'variants');
let n = 0, hits = 0;
for (const pp of A) {
  for (const t of ['0', '0\n', '0\r\n', '1']) { n++; if (F(t, pp) === ORACLE1) { hits++; reportHit(pp, t === '0' ? '' : t.slice(1), 'A/text=' + JSON.stringify(t)); } }
}
console.log('Part A done:', n, 'tests,', hits, 'hits');

// ---- Part B: names_oracle3 pairs ----
const pairs = [];
for (let line of fs.readFileSync(path.join(HERE, 'names_oracle3.txt'), 'utf8').split('\n')) {
  line = line.trim();
  if (!line || line.startsWith('#')) continue;
  const [a, b] = line.split('|');
  if (a && b) { pairs.push([a.trim(), b.trim()]); if (a.trim() !== b.trim()) pairs.push([b.trim(), a.trim()]); }
}
const cf = (w) => [w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase(), w.toUpperCase()];
console.log('Part B:', pairs.length, 'ordered pairs');
let m = 0;
for (const [a, b] of pairs) {
  for (const x of cf(a)) for (const y of cf(b)) {
    const pp = x + ' ' + y;
    for (const suf of ['', '\n']) { m++; if (F('0' + suf, pp) === ORACLE1) { hits++; reportHit(pp, suf, 'B'); } }
  }
}
console.log('Part B done:', m, 'tests, total hits', hits);
console.log('ALL DONE. hits=' + hits);
