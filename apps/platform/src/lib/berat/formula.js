// Pengevaluasi rumus Excel (himpunan bagian) untuk kalkulator berat: angka, referensi sel (A1), operator + - * / ^,
// minus unar, perbandingan (= <> < > <= >=), teks "", dan fungsi IF, ROUND, MIN, MAX, SQRT, PI, AND.
// Tanpa eval. Mengembalikan angka, teks, atau NaN (setara galat #VALUE! Excel).

export function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) { const m = src.slice(i).match(/^(\d+\.?\d*|\.\d+)(E[+-]?\d+)?/i); out.push({ t: 'num', v: parseFloat(m[0]) }); i += m[0].length; continue; }
    if (c === '"') { let j = i + 1, s = ''; while (j < src.length && src[j] !== '"') s += src[j++]; out.push({ t: 'str', v: s }); i = j + 1; continue; }
    if (/[A-Za-z$]/.test(c)) {
      const m = src.slice(i).match(/^\$?[A-Za-z]+\$?\d+/);
      if (m) { out.push({ t: 'ref', v: m[0].replace(/\$/g, '').toUpperCase() }); i += m[0].length; continue; }
      const f = src.slice(i).match(/^[A-Za-z_][A-Za-z0-9_.]*/);
      out.push({ t: 'fn', v: f[0].toUpperCase() }); i += f[0].length; continue;
    }
    const two = src.slice(i, i + 2);
    if (['<>', '<=', '>='].includes(two)) { out.push({ t: 'op', v: two }); i += 2; continue; }
    if ('+-*/^(),=<>&:'.includes(c)) { out.push({ t: 'op', v: c }); i++; continue; }
    throw new Error('Karakter tidak dikenal dalam rumus: ' + c + ' (' + src + ')');
  }
  return out;
}

// Parser rekursif turun -> pohon
export function parse(src) {
  const tk = tokenize(src.replace(/^=/, ''));
  let p = 0;
  const peek = () => tk[p];
  const eat = (v) => { const t = tk[p]; if (!t || (v && t.v !== v)) throw new Error('Rumus tidak valid dekat ' + (t ? t.v : 'akhir') + ' (' + src + ')'); p++; return t; };
  const cmp = () => {
    let l = add();
    while (peek() && peek().t === 'op' && ['=', '<>', '<', '>', '<=', '>='].includes(peek().v)) { const op = eat().v; l = { k: 'cmp', op, l, r: add() }; }
    return l;
  };
  const add = () => {
    let l = mul();
    while (peek() && peek().t === 'op' && ['+', '-', '&'].includes(peek().v)) { const op = eat().v; l = { k: 'bin', op, l, r: mul() }; }
    return l;
  };
  const mul = () => {
    let l = pow();
    while (peek() && peek().t === 'op' && ['*', '/'].includes(peek().v)) { const op = eat().v; l = { k: 'bin', op, l, r: pow() }; }
    return l;
  };
  const pow = () => {
    let l = unary();
    while (peek() && peek().t === 'op' && peek().v === '^') { eat(); l = { k: 'bin', op: '^', l, r: unary() }; }
    return l;
  };
  const unary = () => {
    if (peek() && peek().t === 'op' && (peek().v === '-' || peek().v === '+')) { const op = eat().v; const e = unary(); return op === '-' ? { k: 'neg', e } : e; }
    return atom();
  };
  const atom = () => {
    const t = peek();
    if (!t) throw new Error('Rumus berakhir tiba-tiba: ' + src);
    if (t.t === 'num') { p++; return { k: 'num', v: t.v }; }
    if (t.t === 'str') { p++; return { k: 'str', v: t.v }; }
    if (t.t === 'ref') {
      p++;
      if (peek() && peek().t === 'op' && peek().v === ':' && tk[p + 1] && tk[p + 1].t === 'ref') { p++; const b = tk[p++]; return { k: 'range', a: t.v, b: b.v }; }
      return { k: 'ref', v: t.v };
    }
    if (t.t === 'fn') {
      p++; const args = [];
      if (peek() && peek().v === '(') {
        eat('(');
        if (!(peek() && peek().v === ')')) { args.push(cmp()); while (peek() && peek().v === ',') { eat(','); args.push(cmp()); } }
        eat(')');
      }
      return { k: 'fn', name: t.v, args };
    }
    if (t.v === '(') { eat('('); const e = cmp(); eat(')'); return e; }
    throw new Error('Token tak terduga: ' + t.v + ' (' + src + ')');
  };
  const tree = cmp();
  if (p !== tk.length) throw new Error('Sisa rumus tidak terbaca: ' + src);
  return tree;
}

// ROUND Excel: setengah dibulatkan menjauhi nol
export const xround = (x, n = 0) => { const f = 10 ** n; const s = x < 0 ? -1 : 1; return s * Math.round(Math.abs(x) * f + 1e-9) / f; };

const toNum = (v) => (typeof v === 'number' ? v : v === '' || v === undefined || v === null ? 0 : typeof v === 'string' ? NaN : Number(v));

// ev(pohon, ambilSel) -> nilai. ambilSel('C7') mengembalikan angka, teks, atau undefined (sel kosong).
export function evaluate(node, cell) {
  const ev = (n) => evaluate(n, cell);
  switch (node.k) {
    case 'num': case 'str': return node.v;
    case 'ref': { const v = cell(node.v); return v === undefined ? 0 : v; }
    case 'range': {
      const col = (s) => s.match(/^([A-Z]+)/)[1], row = (s) => +s.match(/([0-9]+)$/)[1];
      const num = (c) => c.split('').reduce((x, ch) => x * 26 + ch.charCodeAt(0) - 64, 0);
      const str = (n) => { let s = ''; while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26); } return s; };
      const out = [];
      for (let r = Math.min(row(node.a), row(node.b)); r <= Math.max(row(node.a), row(node.b)); r++) for (let c = Math.min(num(col(node.a)), num(col(node.b))); c <= Math.max(num(col(node.a)), num(col(node.b))); c++) { const v = cell(str(c) + r); out.push(v === undefined ? 0 : v); }
      return out;
    }
    case 'neg': return -toNum(ev(node.e));
    case 'bin': {
      if (node.op === '&') return String(ev(node.l)) + String(ev(node.r));
      const a = toNum(ev(node.l)), b = toNum(ev(node.r));
      if (Number.isNaN(a) || Number.isNaN(b)) return NaN;
      return node.op === '+' ? a + b : node.op === '-' ? a - b : node.op === '*' ? a * b : node.op === '/' ? (b === 0 ? NaN : a / b) : a ** b;
    }
    case 'cmp': {
      const a = ev(node.l), b = ev(node.r);
      const x = typeof a === 'string' || typeof b === 'string' ? [String(a), String(b)] : [toNum(a), toNum(b)];
      return node.op === '=' ? x[0] === x[1] : node.op === '<>' ? x[0] !== x[1] : node.op === '<' ? x[0] < x[1] : node.op === '>' ? x[0] > x[1] : node.op === '<=' ? x[0] <= x[1] : x[0] >= x[1];
    }
    case 'fn': {
      const a = node.args;
      switch (node.name) {
        case 'PI': return Math.PI;
        case 'IF': { const c = ev(a[0]); return c ? ev(a[1]) : (a[2] ? ev(a[2]) : false); }
        case 'AND': return a.every((x) => !!ev(x));
        case 'SQRT': { const v = toNum(ev(a[0])); return v < 0 ? NaN : Math.sqrt(v); }
        case 'ROUND': return xround(toNum(ev(a[0])), a[1] ? toNum(ev(a[1])) : 0);
        case 'MIN': case 'MAX': { const v = a.flatMap((x) => { const r = ev(x); return Array.isArray(r) ? r.map(toNum) : [toNum(r)]; }); if (v.some(Number.isNaN)) return NaN; return node.name === 'MIN' ? Math.min(...v) : Math.max(...v); }
        default: throw new Error('Fungsi belum didukung: ' + node.name);
      }
    }
    default: throw new Error('Simpul tidak dikenal');
  }
}
