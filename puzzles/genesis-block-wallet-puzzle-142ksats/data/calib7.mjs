// calib7.mjs — battery #4: WIDE pp universe vs 8-value joint oracle (fixed ppX in author's runs 2/3).
// Oracle (all with the SAME fixed ppX, cosigner 0852014c):
//   F("0") = e4caa034                  [3vec#1 = 7vec#1 = 7vec#3]
//   F("1") = 9fb54bad                  [3vec#2 = 7vec#2]
//   F("000000000019d6689c08") = 3bc42789 [3vec#3]
//   F("0100") = e79c9765               [7vec#4]
//   F(L) = 8b9b2fea                    [7vec#5, L = full 570 lowercase hex line]
//   F(L[262:400]) = 68ab4226           [7vec#6]
//   F(L[0:66]) = 9290f941              [7vec#7]
//   F(L[1:67]) = c85bcea3              [cut -b 2-67 answer #971736; text model = same line]
// Control gate: F("000000000019d6689c08","Test Example") = b7f4182b mandatory.
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

// ---- control gate ----
{
  const c = F('000000000019d6689c08', 'Test Example');
  if (c !== 'b7f4182b') throw new Error('CONTROL FAIL: ' + c);
  console.log('control OK (Test Example -> b7f4182b)');
}

const CHECKS = [
  ['0', 'e4caa034'],
  ['1', '9fb54bad'],
  ['000000000019d6689c08', '3bc42789'],
  ['0100', 'e79c9765'],
  [L, '8b9b2fea'],
  [L.substring(262, 400), '68ab4226'],
  [L.substring(0, 66), '9290f941'],
  [L.substring(1, 67), 'c85bcea3'],
];

const cands = new Map(); // pp -> tag
function add(pp, tag) {
  if (!pp || typeof pp !== 'string') return;
  if (!cands.has(pp)) cands.set(pp, tag);
}

// ---- tier 0: every line of already generated pp files (raw, keep edge spaces) ----
for (const fn of ['custom_pass.txt', 'custom_pass_spacevar_used.txt', 'custom_pass_hal.txt', 'custom_pass_spacefull.txt']) {
  try {
    const txt = fs.readFileSync(path.join(HERE, fn), 'utf8');
    for (let line of txt.split('\n')) {
      line = line.replace(/\r$/, '');
      if (line && !line.startsWith('#')) add(line, 'file:' + fn);
    }
  } catch (e) { console.log('skip', fn, e.message); }
}
console.log('tier0 (files):', cands.size);

// ---- tier 1: "Test Example" transforms (re-check against full oracle) ----
{
  const base = 'Test Example';
  const w1 = ['Test', 'test', 'TEST'];
  const w2 = ['Example', 'example', 'EXAMPLE'];
  const A = new Set();
  for (const a of w1) for (const b of w2) {
    A.add(a + ' ' + b); A.add(a + '  ' + b); A.add(a + '-' + b); A.add(a + '_' + b);
    A.add(a + '.' + b); A.add(a + ',' + b); A.add(a + b); A.add(a + '\t' + b);
    A.add(' ' + a + ' ' + b); A.add(a + ' ' + b + ' ');
    A.add('"' + a + ' ' + b + '"'); A.add("'" + a + ' ' + b + "'");
  }
  A.add(base.toLowerCase()); A.add(base.toUpperCase()); A.add('testexample'); A.add('TestExample');
  A.add(''); A.add(' '); A.add('  ');
  for (const pp of A) add(pp, 'TEX');
}
console.log('after tier1 (TEX):', cands.size);

// ---- tier 2: matrix over Finney-family + variants + Satoshi ----
{
  const TOK = [...new Set([
    'Hal', 'Harold', 'Thomas', 'Finney', 'Harry', 'Tommy', 'Thom', 'Finn', 'Tom', 'Fin',
    'Hall', 'Harald', 'Henry', 'Finny', 'Fenney', 'Phinney', 'Satoshi', 'Nakamoto',
  ])];
  const caseF = w => [w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase(), w.toUpperCase()];
  for (const a of TOK) for (const b of TOK) {
    if (a === b) continue;
    for (const x of caseF(a)) for (const y of caseF(b)) {
      add(x + ' ' + y, 'matrix');
      add(x + '  ' + y, 'matrix2');
      add(x + '-' + y, 'matrixdash');
    }
  }
}
console.log('after tier2 (matrix):', cands.size);

// ---- tier 3: names_oracle3 + names_extra pairs, both orders, 9 case forms ----
{
  const pairs = [];
  for (const fn of ['names_oracle3.txt', 'names_extra.txt']) {
    try {
      for (let line of fs.readFileSync(path.join(HERE, fn), 'utf8').split('\n')) {
        line = line.trim();
        if (!line || line.startsWith('#')) continue;
        const [a, b] = line.split('|');
        if (a && b) { pairs.push([a.trim(), b.trim()]); if (a.trim() !== b.trim()) pairs.push([b.trim(), a.trim()]); }
      }
    } catch (e) { console.log('skip', fn, e.message); }
  }
  const cf = (w) => [w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase(), w.toUpperCase()];
  for (const [a, b] of pairs) for (const x of cf(a)) for (const y of cf(b)) add(x + ' ' + y, 'names');
}
console.log('after tier3 (names):', cands.size);

// ---- scan: primary constraint F("0") == e4caa034, with pp suffix variants ----
const SUFFIXES = ['', '\n', ' '];
let n = 0, hits = 0;
const t0 = Date.now();
for (const [pp, tag] of cands) {
  for (const suf of SUFFIXES) {
    n++;
    const c = pp + suf;
    if (F('0', c) === 'e4caa034') {
      hits++;
      console.log('\n*** PRIMARY HIT *** pp=' + JSON.stringify(c) + ' tag=' + tag);
      // extra text variants on the winner
      console.log('   F("0\\n") =', F('0\n', c), ' F("0\\r\\n") =', F('0\r\n', c));
      let ok = 0;
      for (const [t, want] of CHECKS) {
        const got = F(t, c);
        if (got === want) ok++;
        console.log('   ', JSON.stringify(t.slice(0, 26)), got, got === want ? 'OK' : 'vs ' + want);
      }
      console.log('    matched', ok, '/', CHECKS.length);
      fs.appendFileSync(path.join(HERE, 'hits_oracle8.log'),
        JSON.stringify({ pp: c, tag, ok, at: new Date().toISOString() }) + '\n');
    }
  }
  if (n % 10000 === 0) console.log(n, 'evals', ((Date.now() - t0) / 1000).toFixed(0) + 's');
}
console.log('SCAN DONE:', n, 'evals in', ((Date.now() - t0) / 1000).toFixed(1) + 's; distinct pp =', cands.size, '; hits =', hits);
