// calib8.mjs — battery #5: same wide pp universe, but extended TEXT variants (his own procedure may add \n / space).
// Primary: F(tvar, pp+suf) == e4caa034 for tvar in ["0","0\n","0\r\n","0 "," 0"] and suf in ["","\n"," ","\r\n"].
// On hit: verify F("1"+tail) == 9fb54bad and F("000000000019d6689c08"+tail) == 3bc42789 with the SAME tail.
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

{
  const c = F('000000000019d6689c08', 'Test Example');
  if (c !== 'b7f4182b') throw new Error('CONTROL FAIL: ' + c);
  console.log('control OK');
}

// ---- candidate universe (same builder as calib7) ----
const cands = new Map();
function add(pp, tag) { if (!pp || typeof pp !== 'string') return; if (!cands.has(pp)) cands.set(pp, tag); }

for (const fn of ['custom_pass.txt', 'custom_pass_spacevar_used.txt', 'custom_pass_hal.txt', 'custom_pass_spacefull.txt']) {
  try {
    for (let line of fs.readFileSync(path.join(HERE, fn), 'utf8').split('\n')) {
      line = line.replace(/\r$/, '');
      if (line && !line.startsWith('#')) add(line, 'file:' + fn);
    }
  } catch (e) {}
}
{
  const w1 = ['Test', 'test', 'TEST'], w2 = ['Example', 'example', 'EXAMPLE'];
  for (const a of w1) for (const b of w2) {
    add(a + ' ' + b, 'TEX'); add(a + '  ' + b, 'TEX'); add(a + '-' + b, 'TEX'); add(a + '_' + b, 'TEX');
    add(a + b, 'TEX'); add(' ' + a + ' ' + b, 'TEX'); add(a + ' ' + b + ' ', 'TEX');
  }
  add('', 'TEX');
}
{
  const TOK = [...new Set([
    'Hal', 'Harold', 'Thomas', 'Finney', 'Harry', 'Tommy', 'Thom', 'Finn', 'Tom', 'Fin',
    'Hall', 'Harald', 'Henry', 'Finny', 'Fenney', 'Phinney', 'Satoshi', 'Nakamoto',
  ])];
  const caseF = w => [w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase(), w.toUpperCase()];
  for (const a of TOK) for (const b of TOK) {
    if (a === b) continue;
    for (const x of caseF(a)) for (const y of caseF(b)) { add(x + ' ' + y, 'matrix'); add(x + '  ' + y, 'matrix2'); }
  }
}
{
  const pairs = [];
  for (const fn of ['names_oracle3.txt', 'names_extra.txt']) {
    try {
      for (let line of fs.readFileSync(path.join(HERE, fn), 'utf8').split('\n')) {
        line = line.trim(); if (!line || line.startsWith('#')) continue;
        const [a, b] = line.split('|');
        if (a && b) { pairs.push([a.trim(), b.trim()]); if (a.trim() !== b.trim()) pairs.push([b.trim(), a.trim()]); }
      }
    } catch (e) {}
  }
  const cf = w => [w.toLowerCase(), w[0].toUpperCase() + w.slice(1).toLowerCase(), w.toUpperCase()];
  for (const [a, b] of pairs) for (const x of cf(a)) for (const y of cf(b)) add(x + ' ' + y, 'names');
}
console.log('distinct pp =', cands.size);

// ---- extended scan ----
const TVARS = ['0', '0\n', '0\r\n', '0 ', ' 0'];
const SUFS = ['', '\n', ' ', '\r\n'];
let n = 0, hits = 0;
const t0 = Date.now();
for (const [pp, tag] of cands) {
  for (const suf of SUFS) {
    const c = pp + suf;
    for (const tv of TVARS) {
      n++;
      if (F(tv, c) === 'e4caa034') {
        hits++;
        const tail = tv.slice(1); // the part after "0"
        const f1 = F('1' + tail, c), f3 = F('000000000019d6689c08' + tail, c);
        console.log('\n*** HIT *** pp=' + JSON.stringify(c) + ' text=' + JSON.stringify(tv) + ' tag=' + tag);
        console.log('   F("1"+tail) =', f1, f1 === '9fb54bad' ? 'OK' : 'vs 9fb54bad');
        console.log('   F("0000...08"+tail) =', f3, f3 === '3bc42789' ? 'OK' : 'vs 3bc42789');
        fs.appendFileSync(path.join(HERE, 'hits_oracle8b.log'),
          JSON.stringify({ pp: c, text: tv, f1, f3, tag, at: new Date().toISOString() }) + '\n');
      }
    }
  }
  if (n % 20000 === 0) console.log(n, 'evals', ((Date.now() - t0) / 1000).toFixed(0) + 's');
}
console.log('SCAN DONE:', n, 'evals in', ((Date.now() - t0) / 1000).toFixed(1) + 's; hits =', hits);
