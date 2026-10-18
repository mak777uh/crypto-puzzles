// calib4.mjs — THEORY B test: author's 7 fingerprints were computed with HIS REAL
// passphrase (not substituted). F_pp("0") should equal e4caa034 for pp=real.
// Battery: all local passphrase lists x text "0" (suffix "", "\n", "\r\n").
// Also THEORY A: single printable chars under pp="Test Example" vs e4caa034/9fb54bad.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const L = fs.readFileSync(path.join(HERE, 'genesis570.hex'), 'utf8').trim();
const WORDLIST = fs.readFileSync(path.join(HERE, 'bip39_english.txt'), 'utf8')
  .split('\n').map(w => w.trim()).filter(Boolean);

function entropyToMnemonic(entropy) {
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
  const w = entropyToMnemonic(e);
  const seed = crypto.pbkdf2Sync(w.join(' '), 'mnemonic' + pp, 2048, 64, 'sha512');
  const I = crypto.createHmac('sha512', Buffer.from('Bitcoin seed', 'ascii')).update(seed).digest();
  const k = crypto.createECDH('secp256k1');
  k.setPrivateKey(I.subarray(0, 32));
  const pub = k.getPublicKey(null, 'compressed');
  return { fp: crypto.createHash('ripemd160').update(crypto.createHash('sha256').update(pub).digest()).digest().subarray(0, 4).toString('hex'), w0: w[0] };
}

// sanity control (pp="Test Example", 20-char vector)
{
  const c = F('000000000019d6689c08', 'Test Example');
  if (c.fp !== 'b7f4182b') throw new Error('CONTROL FAIL');
  console.log('control OK');
}

// ---------- THEORY A: single char under pp="Test Example" ----------
console.log('\n== Theory A: single chars vs e4caa034 (pp="Test Example") ==');
const chars = [];
for (let c = 32; c < 127; c++) chars.push(String.fromCharCode(c));
for (const c of chars) {
  const r = F(c, 'Test Example');
  if (r.fp === 'e4caa034' || r.fp === '9fb54bad') console.log('MATCH A: char', JSON.stringify(c), r.fp, r.w0);
}
// suffix variants of "0"
for (const t of ['0', ' 0', '0 ', '0\n', '0\r\n', '\n0', '0\t', '00', '0x0', '"0"', "'0'", 'O', 'o', '0;', '0x00', '0x']) {
  const r = F(t, 'Test Example');
  if (r.fp === 'e4caa034' || r.fp === '9fb54bad') console.log('MATCH A2:', JSON.stringify(t), r.fp);
}
console.log('theory A done');

// ---------- THEORY B: passphrase battery ----------
console.log('\n== Theory B: passphrase battery vs e4caa034 (text "0") ==');
const ppSet = new Set();
function loadList(f, stripComment = true) {
  if (!fs.existsSync(path.join(HERE, f))) return;
  for (let line of fs.readFileSync(path.join(HERE, f), 'utf8').split('\n')) {
    line = line.replace(/\r$/, '');
    if (stripComment && (line.startsWith('#') || line.length === 0)) continue;
    if (line.length > 0 && line.length < 64) ppSet.add(line);
  }
}
for (const f of ['custom_pass.txt', 'custom_pass_spacevar_used.txt', 'custom_pass_hal.txt',
  'custom_pass_spacefull.txt', 'custom_pass_extra.txt', 'names_extra.txt']) loadList(f);
// inline basics (all case forms of the obvious)
const INLINE = ['Hal Finney', 'Satoshi Nakamoto', 'Finney Hal', 'Nakamoto Satoshi', ''];
for (const base of INLINE) {
  if (base === '') { ppSet.add(''); continue; }
  for (const f of [x => x.toLowerCase(), x => x, x => x.toUpperCase(), x => x.replace(/\b\w/, m => m.toUpperCase()), x => x.replace(/\b\w/g, m => m.toUpperCase())]) ppSet.add(f(base));
}
// pairs from CORE4+NEW6 title combos (the relaxed families, both orders, all case forms)
const NAMES = ['Hal', 'Harold', 'Thomas', 'Finney', 'Harry', 'Tommy', 'Thom', 'Finn', 'Tom', 'Fin', 'Satoshi', 'Nakamoto'];
for (const a of NAMES) for (const b of NAMES) {
  for (const x of [a.toLowerCase(), a, a.toUpperCase()]) for (const y of [b.toLowerCase(), b, b.toUpperCase()]) ppSet.add(x + ' ' + y);
}
// space variants for "Hal Finney" style
for (const a of ['hal', 'Hal', 'HAL']) for (const b of ['finney', 'Finney', 'FINNEY']) {
  ppSet.add(a + ' ' + b); ppSet.add(a + '  ' + b); ppSet.add(a + '\t' + b); ppSet.add(a + ' ' + b + ' ');
}
const ppList = [...ppSet];
console.log('pp candidates:', ppList.length);

let found = [];
const t0 = Date.now();
for (let i = 0; i < ppList.length; i++) {
  const pp = ppList[i];
  for (const suf of ['', '\n', '\r\n']) {
    const r = F('0' + suf, pp);
    if (r.fp === 'e4caa034') {
      // verify against other vectors immediately
      const v2 = F('1' + suf, pp).fp;
      const v4 = F('0100' + suf, pp).fp;
      const v5 = F(L + suf, pp).fp;
      const v6 = F(L.substring(262, 400) + suf, pp).fp;
      const v7 = F(L.substring(0, 66) + suf, pp).fp;
      const v267 = F(L.substring(1, 67) + suf, pp).fp;
      console.log('\n*** PP CANDIDATE HIT ***', JSON.stringify(pp), 'suffix=' + JSON.stringify(suf));
      console.log('  "0"     ->', 'e4caa034', r.fp === 'e4caa034' ? 'OK' : '??');
      console.log('  "1"     ->', v2, v2 === '9fb54bad' ? 'OK' : 'MISMATCH');
      console.log('  "0100"  ->', v4, v4 === 'e79c9765' ? 'OK' : 'MISMATCH');
      console.log('  whole   ->', v5, v5 === '8b9b2fea' ? 'OK' : 'MISMATCH');
      console.log('  263-400 ->', v6, v6 === '68ab4226' ? 'OK' : 'MISMATCH');
      console.log('  1-66    ->', v7, v7 === '9290f941' ? 'OK' : 'MISMATCH');
      console.log('  2-67    ->', v267, v267 === 'c85bcea3' ? 'OK' : 'MISMATCH');
      found.push([pp, suf, [v2 === '9fb54bad', v4 === 'e79c9765', v5 === '8b9b2fea', v6 === '68ab4226', v7 === '9290f941', v267 === 'c85bcea3']]);
    }
  }
  if ((i + 1) % 500 === 0) console.log(`  ...${i + 1}/${ppList.length}  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
console.log('\npp battery done. hits:', found.length);
for (const [pp, suf, flags] of found) console.log('HIT', JSON.stringify(pp), JSON.stringify(suf), 'verif flags:', flags.join(','));
