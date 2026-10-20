import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
const pairs = JSON.parse(readFileSync('data/src_map.json','utf8'));
let ok=0, bad=[];
for (const [rel, chunk] of pairs) {
  try {
    const mod = await import(pathToFileURL(path.resolve('data/src_chunks', chunk)).href);
    let clean = rel.replace(/^(\.\.\/)+/, '');
    clean = clean.replace(/^\.\.\//,'');
    const out = path.join('data/src_raw', clean);
    mkdirSync(path.dirname(out), {recursive:true});
    writeFileSync(out, mod.default);
    ok++;
  } catch(e) { bad.push([chunk, String(e).slice(0,120)]); }
}
console.log('ok', ok, 'bad', bad.length, bad.slice(0,5));
