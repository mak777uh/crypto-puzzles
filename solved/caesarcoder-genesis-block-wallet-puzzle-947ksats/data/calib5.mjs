// calib5.mjs — battery #2: proper pair expansion (waveExtra 24 + extended names) x
// 7 case forms x 2 suffixes vs e4caa034 ("0"), with full 8-vector verification.
// Plus: "0x-line" text hypotheses under pp="Test Example".
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
  if (c !== 'b7f4182b') throw new Error('CONTROL FAIL');
}

// ---- 0x-line texts under pp="Test Example" (instant) ----
console.log('== text battery under Test Example ==');
const targets = { e4caa034: '1-1', '9fb54bad': '2-2', e79c9765: '1-4', '9290f941': '1-66', '68ab4226': '263-400', '8b9b2fea': 'whole' };
for (const t of ['0', 'x', '0x', '0x0', '0x01', 'x0', '01', '1\t', '1 ', ' 1', '00x', '0\n0']) {
  const fp = F(t, 'Test Example');
  if (targets[fp]) console.log('MATCH(TestExample): text=' + JSON.stringify(t), '->', fp, '==', targets[fp]);
}
console.log('(done)');

// ---- pair battery ----
const pairs = [];
// waveExtra 24 (names_extra.txt, a|b lines)
for (let line of fs.readFileSync(path.join(HERE, 'names_extra.txt'), 'utf8').split('\n')) {
  line = line.trim();
  if (!line || line.startsWith('#')) continue;
  const [a, b] = line.split('|');
  if (a && b) pairs.push([a.trim(), b.trim()]);
}
// extended (some shape-illegal; test anyway as sanity)
for (const p of [
  ['harry', 'finney'], ['harold', 'finney'], ['thomas', 'finney'], ['finn', 'finney'],
  ['thom', 'finney'], ['tommy', 'finney'], ['henry', 'finney'], ['hal', 'finney'],
  ['harold', 'thomas'], ['thomas', 'harold'], ['satoshi', 'finney'], ['finney', 'finney'],
  ['martti', 'malmi'], ['ira', 'kleiman'], ['jed', 'mccaleb'], ['peter', 'todd'],
  ['luke', 'dashjr'], ['wladimir', 'laan'], ['pieter', 'wuille'], ['joerg', 'allmendinger'],
  ['stefan', 'thomas'], ['james', 'howells'], ['charlie', 'shrem'], ['erik', 'voorhees'],
  ['roger', 'ver'], ['tim', 'draper'], ['john', 'mcafee'], ['elena', '???']
]) { if (p[1] !== '???') pairs.push(p); }
// also two-surname / reversed combos of famous
for (const [a, b] of [['finney', 'harold'], ['nahumoto', 'x']]) { void a; void b; }

const caseForms = [
  ([a, b]) => a.toLowerCase() + ' ' + b.toLowerCase(),
  ([a, b]) => a[0].toUpperCase() + a.slice(1).toLowerCase() + ' ' + b[0].toUpperCase() + b.slice(1).toLowerCase(),
  ([a, b]) => a.toUpperCase() + ' ' + b.toUpperCase(),
  ([a, b]) => a.toLowerCase() + ' ' + b[0].toUpperCase() + b.slice(1).toLowerCase(),
  ([a, b]) => a[0].toUpperCase() + a.slice(1).toLowerCase() + ' ' + b.toLowerCase(),
  ([a, b]) => a.toUpperCase() + ' ' + b.toLowerCase(),
  ([a, b]) => a.toLowerCase() + ' ' + b.toUpperCase(),
];

const V = {
  '1-1': [t => t + '', 'e4caa034'], '2-2': [t => t, '9fb54bad'], '1-4': [t => t, 'e79c9765'],
};
let n = 0, hits = 0;
const t0 = Date.now();
for (const pr of pairs) {
  for (const cf of caseForms) {
    const pp = cf(pr);
    for (const suf of ['', '\n']) {
      n++;
      if (F('0' + suf, pp) === 'e4caa034') {
        hits++;
        console.log('\n*** HIT ***', JSON.stringify(pp), 'suffix', JSON.stringify(suf));
        const checks = [
          ['1-1 "0"', F('0' + suf, pp), 'e4caa034'],
          ['2-2 "1"', F('1' + suf, pp), '9fb54bad'],
          ['3-3 "0"', F('0' + suf, pp), 'e4caa034'],
          ['1-4 "0100"', F('0100' + suf, pp), 'e79c9765'],
          ['1-2000 whole', F(L + suf, pp), '8b9b2fea'],
          ['263-400', F(L.substring(262, 400) + suf, pp), '68ab4226'],
          ['1-66', F(L.substring(0, 66) + suf, pp), '9290f941'],
          ['2-67', F(L.substring(1, 67) + suf, pp), 'c85bcea3'],
        ];
        for (const [nm, got, want] of checks) console.log('   ', nm.padEnd(14), got, got === want ? 'OK' : 'MISMATCH vs ' + want);
      }
    }
  }
}
console.log('battery2 done:', n, 'candidates,', hits, 'hits,', ((Date.now() - t0) / 1000).toFixed(0) + 's');
