/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NF=new Intl.NumberFormat('id-ID',{maximumFractionDigits:2});
const n=v=>NF.format(+v||0);
const pad=x=>String(x).padStart(2,'0');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const nowTime=()=>{const d=new Date();return pad(d.getHours())+':'+pad(d.getMinutes())};
const BLN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const fd=s=>{if(!s)return '–';const p=String(s).slice(0,10).split('-');return p.length<3?esc(s):`${p[2]}&nbsp;${BLN[+p[1]-1]}&nbsp;${p[0].slice(2)}`};
const days=(a,b)=>Math.round((Date.parse(b)-Date.parse(a))/864e5);
const pct=(a,b)=>b>0?Math.max(0,Math.min(1,a/b)):0;
const ago=iso=>{if(!iso)return '';const m=(Date.now()-Date.parse(iso))/6e4;if(m<1)return 'baru saja';if(m<60)return Math.round(m)+' mnt lalu';if(m<1440)return Math.round(m/60)+' jam lalu';return fd(iso)};
const I={
 dash:'<path d="M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 9h8V3h-8z"/>',
 rm:'<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>',
 fg:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 dock:'<path d="M3 21V8l9-5 9 5v13"/><path d="M7 21v-8h10v8M7 17h10"/>',
 vendor:'<path d="M12 3v4M5 7h14l-1 5H6z"/><path d="M8 12v4a4 4 0 008 0v-4"/><path d="M12 20v1"/>',
 truck:'<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>',
 spk:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
 plus:'<path d="M12 5v14M5 12h14"/>', dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
 inb:'<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>', outb:'<path d="M12 20V8M7 13l5-5 5 5"/><path d="M4 4h16"/>',
 chk:'<path d="M5 12l5 5 9-10"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 db:'<ellipse cx="12" cy="5.5" rx="8" ry="2.5"/><path d="M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5"/>',
 edit2:'<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>',
 merge:'<path d="M18 9l-3-3-3 3M18 15l-3 3-3-3"/><path d="M15 6v12M6 9.5A3 3 0 009 12a3 3 0 013 3v.5"/>',
 phone:'<path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.06 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.92z"/>',
 mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
 pin:'<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
 'alert-triangle':'<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"/>',
 'alert-circle':'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
 cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61l1.6-8.39H6"/>',
 tool:'<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
 clipboard:'<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
 layers:'<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
 box:'<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>',
 file:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>',
 tag:'<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
 users:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
 chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/>',
 send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
 prod:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l3 3 2-2 3 3 2-2"/>',
 zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
};
const ic=(k,s=16)=>`<svg viewBox="0 0 24 24" width="${s}" height="${s}" style="flex:none;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle">${I[k]||''}</svg>`;

/* ---------- state ---------- */
const COLS=['rm','fg','mutasi','spk','vendor','kirim','bongkar','master','mvendor','mcustomer','msupplier','marmada','rmhist','pr','opname','muser','ureq','log','uinv','mwc'];
const S={};COLS.forEach(c=>S[c]=[]);
const loaded=new Set();
let DB=null,USER=null,DLS=null,ME=null,CAN=true,LIVE='wait',LAST=null,C=null;
const F={ /* per-view filters, kept for the session */
 'barang-jadi':{q:'',kat:'',fin:'',tab:'stok'},
 'bongkar-muat':{range:'7',jenis:''},
 'vendor':{st:'aktif',vendor:'',q:''},
 'pengiriman':{st:'',q:''},
 'spk':{st:'aktif',q:''},
 'produksi':{wc:'',p:'aktif'}
};
const ROLE_ON=false; /* login & peran per user: ditunda, aktifkan nanti */
const VIEWS=[
 {id:'dashboard',t:'Dashboard',ic:'dash',sec:'Pantauan'},
 {id:'bahan-baku',t:'Gudang Bahan Baku',ic:'rm',sec:'Gudang'},
 {id:'barang-jadi',t:'Gudang Barang Jadi',ic:'fg'},
 {id:'bongkar-muat',t:'Bongkar Muat',ic:'dock',sec:'Logistik'},
 {id:'vendor',t:'Kirim ke Vendor',ic:'vendor'},
 {id:'pengiriman',t:'Kirim ke Customer',ic:'truck'},
 {id:'spk',t:'Monitoring SPK',ic:'spk',sec:'Produksi'},
 {id:'produksi',t:'Dashboard Produksi',ic:'prod'},
 {id:'cek-data',t:'Cek Data',ic:'shield',sec:'Data'},
 {id:'master-data',t:'Master Data',ic:'db'},
 {id:'kinerja',t:'Kinerja Tim',ic:'chart',sec:'Tim'},
 {id:'pengguna',t:'Pengguna & Akses',ic:'users'}
];
/* modul yang menjadi dasar hak tiap tampilan; dashboard terbuka untuk semua pengguna terdaftar, tampilan tim khusus admin */
const VIEW_MOD={'bahan-baku':'bahan-baku','barang-jadi':'barang-jadi','bongkar-muat':'bongkar-muat','vendor':'vendor','pengiriman':'pengiriman','spk':'spk','produksi':'spk'};
const ADMIN_VIEWS=['cek-data','kinerja','pengguna'];
function viewOk(v){const id=v.id||v;
 if(!ME_P)return !['kinerja','pengguna'].includes(id);
 const adm=myRole()==='admin';
 if(ADMIN_VIEWS.includes(id))return adm;
 if(id==='master-data')return adm||myAnyEdit();
 const m=VIEW_MOD[id];return !m||!!myLevel(m)}
let VIEW='dashboard';
const issues=()=>{const c=calc();return c._iss||(c._iss=dataIssues())};

/* ---------- labels ---------- */
const rmLabel=r=>r?`${r.item} ${r.ukuran}`:'(item terhapus)';
const fgLabel=f=>f?`${f.kategori}${f.type?' '+f.type:''} ${f.ukuran} L${f.panjang} · ${f.finishing} ${f.tebal}`:'(item terhapus)';
const grade=r=>{const s=(r.item||'').toUpperCase();if(s.includes('SPHC'))return 'SPHC';if(s.includes('SPCC'))return 'SPCC';if(s.includes('304'))return 'SS304';if(s.includes('316'))return 'SS316';if(s.includes('ALU')||s.includes('ALM'))return 'Aluminium';return 'Lainnya'};
/* window.__idAlias (opsional, diisi adapter Supabase) memetakan id buatan app ("spk-1003") ke id database (UUID). */
const byId=(c,id)=>{const k=(window.__idAlias&&window.__idAlias[id])||id;return S[c].find(x=>x._id===k)||(c==='muser'&&typeof id==='string'&&id.includes('@')?S.muser.find(x=>String(x.email||'').toLowerCase()===id.toLowerCase()):undefined)};
const spkName=id=>{const s=byId('spk',id);return s?`SPK ${s.no}`:(id||'–')};

/* ---------- derived numbers (recomputed after each change) ---------- */
function calc(){
 if(C)return C;
 const t=today();
 const stock={rm:{},fg:{}};const lastMv={};
 for(const g of['rm','fg'])for(const it of S[g])stock[g][it._id]=+it.stokAwal||0;
 for(const m of S.mutasi){if(stock[m.gudang]&&m.item in stock[m.gudang]){stock[m.gudang][m.item]+= +m.delta||0;const k=m.gudang+m.item;if(!lastMv[k]||(m.at||'')>(lastMv[k].at||''))lastMv[k]=m}}
 const vIdx={},kIdx={};
 for(const v of S.vendor){if(v.status==='Batal')continue;for(const it of v.items||[]){const k=v.spk+'|'+it.d;const o=vIdx[k]||(vIdx[k]={out:0,back:0,rej:0});o.out+= +it.q||0;o.back+= +it.kembali||0;o.rej+= +it.reject||0}}
 for(const k of S.kirim){if(k.status==='Batal')continue;for(const it of k.items||[]){const key=k.spk+'|'+it.d;kIdx[key]=(kIdx[key]||0)+(+it.q||0)}}
 const spk={};
 for(const s of S.spk){
  let q=0,prod=0,kir=0,vo=0,vb=0;
  const lines=(s.items||[]).map(it=>{const v=vIdx[s._id+'|'+it.d]||{out:0,back:0};const k=kIdx[s._id+'|'+it.d]||0;const iq=+it.q||0;const pe=Math.max(Math.min(+it.prod||0,iq),Math.min(v.out,iq));q+=iq;prod+=pe;kir+=Math.min(k,iq);vo+=v.out;vb+=v.back;return {...it,prodEff:pe,vOut:v.out,vBack:v.back,kirim:k}});
  const pK=pct(kir,q),pP=pct(prod,q);
  let st='Proses',late=0;
  if((s.status||'Terbit')==='Draft')st='Draft';else if(pK>=1)st='Selesai';else if(s.due&&s.due<t){st='Terlambat';late=days(s.due,t)}
  else if(s.due&&days(t,s.due)<=1)st='Jatuh Tempo';
  spk[s._id]={lines,q,prod,kir,vo,vb,pK,pP,st,late};
 }
 const vend=S.vendor.map(v=>{const out=(v.items||[]).reduce((a,i)=>a+(+i.q||0),0),back=(v.items||[]).reduce((a,i)=>a+(+i.kembali||0),0),rej=(v.items||[]).reduce((a,i)=>a+(+i.reject||0),0);return {v,out,back,rej,sisa:Math.max(0,out-back-rej),age:days(v.tgl,t),st:v.status==='Batal'?'Batal':back+rej>=out&&out>0?'Selesai':back+rej>0?'Kembali Sebagian':'Di Vendor'}});
 C={t,stock,lastMv,spk,vend};return C;
}

/* ---------- db ---------- */
async function boot(){
 renderNav();route();
 const cl=window.claude;
 if(!cl||!cl.use){LIVE='off';renderLive();return}
 try{DB=await cl.use('db')}catch(e){DB=null}
 if(!DB){LIVE='off';renderLive();render();return}
 cl.use('user').then(async u=>{USER=u;if(!u){renderMe();renderAccess();return}
   const me=await u.me();ME=me.id;ME_P=me;IS_OWNER=!!me.isOwner;IS_EDITOR=!!me.canEdit;const cw=await u.can('data.write');
   if(cw===false)CAN=false;
   route()}).catch(()=>{}); /* route(): tautan langsung seperti #pengguna baru valid setelah hak pengguna diketahui */
 cl.use('downloads').then(d=>{DLS=d}).catch(()=>{});
 for(const c of COLS){
  DB.collection(c).onSnapshot(snap=>{
    S[c]=snap.docs.map(d=>({...d.data(),_id:d.id}));loaded.add(c);C=null;LAST=new Date();LIVE='on';schedule();
  },err=>{LIVE='off';renderLive();toast('Koneksi data terputus ('+err.code+'). Muat ulang halaman.')});
 }
}
let rq=0,bodyPending=false;const typingInBody=()=>{const a=document.activeElement;return a&&$('#body').contains(a)&&a.matches('input,select,textarea')};
document.addEventListener('focusout',()=>setTimeout(()=>{if(bodyPending&&!typingInBody()){bodyPending=false;renderBody()}},0));
function schedule(){if(rq)return;rq=requestAnimationFrame(()=>{rq=0;renderNav();renderLive();renderMe();renderAccess();if(!$('#tools').contains(document.activeElement))renderTools();if(typingInBody())bodyPending=true;else renderBody();if(DRAWER)DRAWER();if(SHEET)renderSheet()})}
const ready=()=>COLS.every(c=>loaded.has(c));
const need=(c,data,id,op)=>{if(!DB)throw new Error('Fitur simpan belum tersedia di pratinjau lokal karena backend belum terhubung.');if(!CAN)throw new Error('Akses Anda lihat saja.');guard(c,data,id,op||'upd')};
async function addDoc(c,data){need(c,data,null,'add');data.at=new Date().toISOString();data.by=ME||null;const r=await DB.collection(c).add(data);logAct(c,r&&r.id,'add',data);return r}
async function updDoc(c,id,data){need(c,data,id,'upd');data.updAt=new Date().toISOString();data.updBy=ME||null;const r=await DB.doc(c+'/'+id).update(data);logAct(c,id,'upd',data);return r}
async function delDoc(c,id){need(c,null,id,'del');logAct(c,id,'del',{});return DB.doc(c+'/'+id).delete()}

/* ---------- shell ---------- */
function renderNav(){
 const c=ready()?calc():null;
 const cnt={};
 if(c){cnt['bahan-baku']=[S.rm.filter(r=>['Habis','Kritis','Perlu order'].includes(RMI(r._id).st)).length,S.rm.some(r=>['Habis','Kritis'].includes(RMI(r._id).st))];
  cnt['vendor']=[c.vend.filter(x=>x.st==='Di Vendor'||x.st==='Kembali Sebagian').length,false];
  {const I=issues();cnt['cek-data']=[I.filter(i=>i.sev>=2).length,I.some(i=>i.sev>=3)]}
  cnt['pengiriman']=[S.kirim.filter(k=>k.status==='Dalam Perjalanan').length,false];
  cnt['bongkar-muat']=[S.bongkar.filter(b=>b.status!=='Selesai').length,false];
  cnt['spk']=[Object.values(c.spk).filter(x=>x.st==='Terlambat').length,true];}
 let h='';
 let secShown='';for(const v of VIEWS){if(!viewOk(v))continue;if(v.sec&&v.sec!==secShown){h+=`<div class="sec">${v.sec}</div>`;secShown=v.sec}const k=cnt[v.id];
  h+=`<a href="#${v.id}" class="${VIEW===v.id?'on':''}" title="${v.t}${k&&k[0]?' · '+k[0]:''}" aria-label="${v.t}">${ic(v.ic)}<span>${v.t}</span>${k&&k[0]?`<span class="cnt ${k[1]?'hot':''}">${k[0]}</span>`:''}</a>`}
 $('#nav').innerHTML=h;
 const on=$('#nav a.on');if(on&&on.scrollIntoView)on.scrollIntoView({block:'nearest'});
}
function renderLive(){
 const el=$('#live');el.className='live '+(LIVE==='on'?'on':LIVE==='off'?'off':'');
 const fn=document.querySelector('.foot .muted');if(fn)fn.textContent=LIVE==='on'?'Terhubung ke database. Data tersimpan dan disinkronkan.':'Backend belum terhubung. Data tidak disimpan atau disinkronkan.';
 el.querySelector('span').textContent=LIVE==='on'?`Realtime · tersinkron ${LAST.toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit'})}`:LIVE==='off'?'Pratinjau lokal · backend belum terhubung':'Menyiapkan pratinjau lokal…';
}
function route(){
 const h=(location.hash||'').slice(1);VIEW=VIEWS.some(v=>v.id===h&&viewOk(v))?h:'dashboard';
 const v=VIEWS.find(x=>x.id===VIEW);$('#ttl').textContent=v.t;
 $('#sub').textContent={dashboard:'Ringkasan realtime gudang, logistik, dan SPK',
  'bahan-baku':'Stok plat & material — penerimaan, pemakaian, stock opname',
  'barang-jadi':'Stok cable tray, ladder, cover & aksesoris siap kirim',
  'bongkar-muat':'Antrian kendaraan loading & unloading di dock',
  'vendor':'Barang setengah jadi yang dikirim ke vendor finishing (HDG, ELG, powder coating)',
  'pengiriman':'Surat jalan barang jadi ke customer',
  'spk':'Progres produksi, finishing, dan pengiriman per SPK',
  'cek-data':'Temuan data yang belum lengkap, tidak konsisten, atau statusnya tertinggal',
  'master-data':'Daftar resmi vendor, customer, supplier, dan armada yang dipakai semua form',
  'kinerja':'Siapa mencatat apa, seberapa aktif, dan seberapa tepat waktu input data tiap anggota tim',
  'pengguna':'Akun tim, peran, dan hak akses per modul'}[VIEW];
 renderNav();renderTools();renderBody();window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);

const loading=()=>`<div class="panel"><div class="empty">${LIVE==='off'?'<b>Mode pratinjau lokal</b><span>Backend belum dikonfigurasi. Data Operasional tidak dimuat, disimpan, atau disinkronkan.</span>':'<b>Menyiapkan pratinjau…</b><span>Menunggu koneksi backend yang dikonfigurasi.</span>'}</div></div>`;
function renderBody(){const el=$('#body');if(!ready()){el.innerHTML=loading();return}el.innerHTML=(B[VIEW]||B.dashboard)();resolveNames()}
function renderTools(){$('#tools').innerHTML=(T[VIEW]||(()=>''))();$('#tools').hidden=!$('#tools').innerHTML;renderAccess();renderMe()}

async function resolveNames(){
 fillAvatars();
 if(!USER)return;const els=[...document.querySelectorAll('span[data-uid]')];const ids=[...new Set(els.map(e=>e.dataset.uid).filter(Boolean))];if(!ids.length)return;
 const ps=await USER.profiles(ids);els.forEach(e=>{const id=e.dataset.uid;if(uname(id))return;const p=ps[id];e.textContent=(p&&p.name)||'Pengguna'});
}
const who=id=>id?uName(id):'Import Excel';

/* ---------- small UI pieces ---------- */
const chip=(t,c='')=>`<span class="chip ${c}">${esc(t)}</span>`;
const prog=(p,cls='')=>`<div class="prog"><div class="bar ${cls}"><i style="width:${(p*100).toFixed(1)}%"></i></div><span>${Math.round(p*100)}%</span></div>`;
const stChip=s=>chip(s,{Batal:'plain',Masuk:'ok',Keluar:'info',Opname:'warn',Koreksi:'crit',Draft:'warn',Terbit:'ok',Selesai:'ok',Diterima:'ok',Terlambat:'crit','Jatuh Tempo':'warn',Proses:'info','Di Vendor':'warn','Kembali Sebagian':'info','Dalam Perjalanan':'info',Disiapkan:'plain',Antri:'warn',Batal:'plain'}[s]||'');
const empty=(t,s,btn)=>`<div class="empty"><b>${t}</b><span>${s}</span>${btn||''}</div>`;
const segBtns=(view,key,opts)=>`<div class="seg">${opts.map(([v,l])=>`<button data-act="filt" data-view="${view}" data-key="${key}" data-val="${v}" class="${F[view][key]===v?'on':''}">${l}</button>`).join('')}</div>`;
function stockState(r,s){if(s<=0)return['Habis','crit'];if(r.buffer>0&&s<r.buffer)return['Di bawah buffer','warn'];return['Aman','ok']}

/* ---------- DASHBOARD ---------- */
const B={},T={};
B.dashboard=()=>{
 const c=calc(),t=c.t;
 // === Base data ===
 const rmLow=S.rm.filter(r=>['Habis','Kritis','Perlu order'].includes(RMI(r._id).st));
 const fgTot=S.fg.reduce((a,f)=>a+Math.max(0,c.stock.fg[f._id]||0),0);const fgZero=S.fg.filter(f=>(c.stock.fg[f._id]||0)<=0).length;
 const sp=Object.values(c.spk);const spAct=sp.filter(x=>x.st!=='Selesai'&&x.st!=='Draft').length;const spLate=sp.filter(x=>x.st==='Terlambat').length;
 const vOpen=c.vend.filter(x=>x.st==='Di Vendor'||x.st==='Kembali Sebagian');const DI=issues();const vQty=vOpen.reduce((a,x)=>a+x.sisa,0);const vOld=vOpen.reduce((a,x)=>Math.max(a,x.age),0);
 /* tonnage di vendor: sum (qty × berat/pcs) semua item pada SJ vendor yg masih aktif */
 const vTonKg=vOpen.reduce((a,x)=>{const vd=byId('vendor',x.v._id);return a+(vd?.items||[]).reduce((b,it)=>b+(+it.q||0)*(+it.w||0),0)},0);
 /* tonnage terkirim ke customer bulan ini */
 const kTonKgMonth=S.kirim.filter(k=>(k.tgl||'').slice(0,7)===t.slice(0,7)&&k.status!=='Batal').reduce((a,k)=>a+(k.items||[]).reduce((b,it)=>b+(+it.q||0)*(+it.w||0),0),0);
 const kTrip=S.kirim.filter(k=>k.status==='Dalam Perjalanan').length;const kMonth=S.kirim.filter(k=>(k.tgl||'').slice(0,7)===t.slice(0,7)).length;
 const bToday=S.bongkar.filter(b=>b.tgl===t);const bProc=S.bongkar.filter(b=>b.status==='Proses').length;

 // === Analytics: SPK pipeline (90 hari) ===
 const K90=spkKpi('90');
 const K30=spkKpi('30');
 // Stage counts
 const stageCnt={Draft:0,Produksi:0,'Di vendor':0,'Siap kirim':0,'Kirim sebagian':0,Terkirim:0};
 S.spk.filter(s=>(s.status||'Terbit')!=='Draft'&&s.tgl>=K90.a).forEach(s=>{const f=flow(s._id);if(f)stageCnt[f.stage]=(stageCnt[f.stage]||0)+1});
 // OTD: on-time delivery rate (% SPK terkirim tepat waktu)
 const otdRate=K90.kir.length?K90.otd.length/K90.kir.length:null;
 // Throughput per minggu (jumlah SPK Terkirim per minggu dalam 90 hari)
 const weekBuckets={};K90.kir.forEach(f=>{if(!f.Kfull)return;const d=new Date(f.Kfull);const wk=`${d.getFullYear()}-W${String(Math.ceil((d.getDate()+new Date(d.getFullYear(),d.getMonth(),1).getDay())/7)).padStart(2,'0')}`;weekBuckets[wk]=(weekBuckets[wk]||0)+1});
 // Customer volume (90 hari)
 const custVol={};S.spk.filter(s=>s.tgl>=K90.a&&(s.status||'Terbit')!=='Draft').forEach(s=>{const c2=c.spk[s._id];if(c2&&c2.pK>0)custVol[s.customer]=(custVol[s.customer]||0)+c2.kir});
 const topCust=Object.entries(custVol).sort((a,b)=>b[1]-a[1]).slice(0,6);
 const custMx=Math.max(1,...topCust.map(x=>x[1]));
 // Throughput 30 hari vs 90 hari untuk delta
 const done30=K30.kir.length,done90=K90.kir.length;
 const avgPerMonth30=done30;const avgPerMonth90=done90/3;
 // Monthly SPK completion (6 bulan terakhir)
 const moBuckets={};K90.kir.forEach(f=>{if(!f.Kfull)return;const m=f.Kfull.slice(0,7);moBuckets[m]=(moBuckets[m]||0)+1});
 const moKeys=Object.keys(moBuckets).sort();
 // Vendor TAT top 5
 const topV=K90.byV.slice(0,5);
 const SPKT_v=SPKT();

 // === Hak lihat: tile dan panel hanya untuk modul yang boleh dilihat pengguna ===
 const vis=m=>!ME_P||!!myLevel(m);
 const isAdm=!ME_P||myRole()==='admin';

 // === KPI tiles ===
 const kpi=(href,cls,lb,v,unit,s)=>`<a class="kpi ${cls}" href="#${href}"><span class="lb">${lb}</span><span class="v">${v}${unit?`<small>${unit}</small>`:''}</span><span class="s">${s}</span></a>`;
 const kpiD=(cls,lb,v,unit,s)=>`<div class="kpi ${cls}" style="cursor:default"><span class="lb">${lb}</span><span class="v">${v}${unit?`<small>${unit}</small>`:''}</span><span class="s">${s}</span></div>`;
 const otdPct=otdRate==null?'–':Math.round(otdRate*100)+'%';
 const otdCls=otdRate==null?'':otdRate>=0.9?'ok':otdRate>=0.75?'warn':'crit';
 const rmTon=ton(Object.values(rmCalc().info).reduce((a,x)=>a+x.kg,0));
 const crit=DI.filter(i=>i.sev>=3).length;
 const need=[];
 if(vis('spk')&&spLate)need.push(`${spLate} SPK terlambat`);
 if(vis('bahan-baku')&&rmLow.length)need.push(`${rmLow.length} bahan baku kritis`);
 if(vis('vendor')&&vOld>14)need.push('barang di vendor lebih dari 14 hari');
 if(isAdm&&crit)need.push(`${crit} temuan data kritis`);
 if(isAdm&&ME_P&&USER&&USER.exportAll){const bk=byId('master','backup');const bd=bk&&bk.ts?Math.floor((Date.now()-new Date(bk.ts).getTime())/864e5):null;if(bd==null)need.push('belum ada cadangan data');else if(bd>7)need.push(`cadangan terakhir ${bd} hari lalu`)}
 const bcls=!need.length?'ok':(spLate||crit)?'crit':'warn';
 const qaBk=(isAdm&&ME_P&&USER&&USER.exportAll)?'<button type="button" class="btn sm" data-act="backup">Unduh cadangan</button>':'';
 const qa0=[['spk','spk','SPK baru'],['bahan-baku','bahan-baku','Terima material'],['pengiriman','pengiriman','Surat jalan'],['bongkar-muat','bongkar-muat','Catat kendaraan']].filter(([m])=>ME_P?myLevel(m)==='ubah':CAN).map(([m,h,l])=>`<a class="btn sm" href="#${h}">${l}</a>`).join('');
 const qa=qa0+qaBk;
 let h=`<section class="brief ${bcls}"><span class="dot"></span><div class="bt"><b>${need.length?need.length+' hal perlu perhatian':'Semua terkendali'}</b><span>${need.length?need.join(' · '):'Stok aman, SPK sesuai jadwal, barang di vendor dalam batas.'}</span></div><div class="qa">${qa}</div><time>${fd(t)}</time></section>
 <div class="sect-t">Operasional hari ini</div>
 <section class="kpis">
  ${vis('bahan-baku')?kpi('bahan-baku',rmLow.length?'crit':'ok','Bahan baku kritis',rmLow.length,'item',S.rm.length?`habis / di bawah buffer · ${rmTon} ton di gudang`:'belum ada item bahan baku'):''}
  ${vis('spk')?kpi('spk',spLate?'crit':'ok','SPK berjalan',spAct,'',spLate?`<b style="color:var(--crit)">${spLate} terlambat</b> dari due date`:spAct?'semua sesuai jadwal':'belum ada SPK aktif'):''}
  ${vis('vendor')?kpi('vendor',vOld>14?'crit':vOld>7?'warn':'ok','Di vendor finishing',n(vQty),'btg/pcs',vOpen.length?`${vOpen.length} SJ aktif · <b>${ton(vTonKg)} ton</b> · tertua ${vOld} hari`:'tidak ada barang di vendor'):''}
  ${vis('pengiriman')?kpi('pengiriman','info','Terkirim bulan ini',kMonth,'SJ',kMonth||kTrip?`<b>${ton(kTonKgMonth)} ton</b> · ${kTrip} dalam perjalanan`:'belum ada pengiriman bulan ini'):''}
 </section>
 ${vis('spk')||isAdm?`<div class="sect-t">Kinerja 90 hari terakhir</div>
 <section class="kpis sm">
  ${vis('spk')?kpiD(otdCls,'Ketepatan kirim (OTD)',otdPct,'',K90.kir.length?`${K90.otd.length} dari ${K90.kir.length} SPK terkirim tepat waktu`:'muncul setelah ada SPK terkirim'):''}
  ${vis('spk')?kpiD(K90.avgCycle!=null?(K90.avgCycle<=SPKT_v.prod+SPKT_v.kirim?'ok':'warn'):'','Rata-rata siklus SPK',r1(K90.avgCycle),'hk',K90.avgCycle!=null?`produksi ${r1(K90.avgProd)} · vendor ${r1(K90.avgTurn)} · kirim ${r1(K90.avgKirim)} hk`:'muncul setelah ada SPK terkirim'):''}
  ${isAdm?kpi('cek-data',crit?'crit':DI.length?'warn':'ok','Temuan cek data',DI.filter(i=>i.sev>=2).length,'perlu aksi',`${crit} kritis · ${DI.filter(i=>i.sev===1).length} info`):''}
 </section>`:''}`;

 // === Pipeline SPK per stage ===
 const pipeStages=[{k:'Produksi',cls:'info'},{k:'Di vendor',cls:'warn'},{k:'Siap kirim',cls:'info'},{k:'Kirim sebagian',cls:'info'},{k:'Terkirim',cls:'ok'}];
 const pipeTotal=pipeStages.reduce((a,s)=>a+(stageCnt[s.k]||0),0)||1;
 const pipeReal=pipeStages.reduce((a,s)=>a+(stageCnt[s.k]||0),0);
 const pipeH=pipeReal?`<div class="funnel"><div class="fbar">${pipeStages.filter(s=>stageCnt[s.k]).map(s=>`<i class="${s.cls}" style="flex:${stageCnt[s.k]}" title="${s.k}: ${stageCnt[s.k]} SPK"></i>`).join('')}</div><div class="fleg">${pipeStages.map(s=>`<div class="${stageCnt[s.k]?'':'zero'}"><b>${stageCnt[s.k]||0}</b><span>${s.k}</span></div>`).join('')}</div></div>`:empty('Belum ada SPK dalam 90 hari','SPK yang diterbitkan akan tampil per tahap: produksi, vendor, siap kirim, terkirim.');

 // === Throughput chart: SPK selesai per bulan (bar chart) ===
 const thrBars=moKeys.length>=2?barChart({title:'SPK terkirim per bulan (90 hari)',bars:moKeys.map(m=>({label:BLN3(m+'-01'),v:moBuckets[m],tip:`<b>${BLN3(m+'-01')}</b><div>${moBuckets[m]} SPK terkirim</div>`})),fmt:v=>n(Math.round(v))}):null;

 // === Vendor TAT bars ===
 const vTATmx=Math.max(1,...topV.map(z=>{const av=avgOf(z.turns);return av||0}),SPKT_v.hdg||14,SPKT_v.elg||14,SPKT_v.pc||14);
 const vTATbars=topV.length?`<div class="hbars">${topV.map(z=>{const av=avgOf(z.turns);const tgt=SPKT_v[Object.keys(SPKT_v).find(k=>z.proses.has(k))]||SPKT_v.hdg||14;const low=av!=null&&av>tgt;return `<div class="hb"><span class="nm">${esc(z.k)} <span class="muted">${[...z.proses].join('/')}</span></span><span class="track"><i class="${low?'low':''}" style="width:${av!=null?pct(av,vTATmx)*100:0}%"></i><b style="left:calc(${pct(tgt,vTATmx)*100}% - 1px)"></b></span><span class="vv" style="${low?'color:var(--crit)':''}">${av!=null?r1(av)+' hk':'–'}</span></div>`}).join('')}
<div class="legend" style="margin-top:8px"><span><i></i>Avg TAT selesai</span><span><i class="low"></i>Melewati target</span><span><i class="tick"></i>Target hari kerja</span></div></div>`:empty('Belum ada data TAT vendor','Data TAT vendor akan tersedia setelah ada kiriman yang sudah kembali.');

 // === Top customer volume bars ===
 const custBars=topCust.length?`<div class="hbars">${topCust.map(([k,v])=>`<div class="hb"><span class="nm">${esc(k)||'(tanpa nama)'}</span><span class="track"><i style="width:${pct(v,custMx)*100}%"></i></span><span class="vv">${n(v)} btg/pcs</span></div>`).join('')}</div>`:empty('Belum ada pengiriman','Pengiriman ke customer akan muncul setelah data kirim diisi.');

 // === Alerts ===
 const al=[];
 rmLow.sort((a,b)=>c.stock.rm[a._id]-c.stock.rm[b._id]).forEach(r=>{const x=RMI(r._id);const s=x.stok;al.push({sev:s<=0?3:x.st==='Kritis'?2.6:2,cls:s<=0||x.st==='Kritis'?'crit':'',href:'bahan-baku',t:`<b>${esc(rmLabel(r))}</b> ${x.st.toLowerCase()}`,m:`Stok ${n(s)} lbr${x.sug?` → usulan order ${n(x.sug)} lbr (${ton(x.sug*x.kg1)} t)`:''}`})});
 const lateSeen=new Set();
 S.spk.map(s=>[s,c.spk[s._id]]).filter(([s,x])=>x.st==='Terlambat').sort((a,b)=>b[1].late-a[1].late).slice(0,8).forEach(([s,x])=>lateSeen.add(s._id)||al.push({sev:2.5,cls:'crit',href:'spk',open:'spk:'+s._id,t:`<b>SPK ${s.no}</b> ${esc(s.customer)} telat ${x.late} hari`,m:`Due ${fd(s.due)} · produksi ${Math.round(x.pP*100)}% · terkirim ${Math.round(x.pK*100)}%`}));
 vOpen.filter(x=>x.age>7).sort((a,b)=>b.age-a.age).slice(0,6).forEach(x=>al.push({sev:x.age>14?2.4:1.5,cls:x.age>14?'crit':'',href:'vendor',open:'vendor:'+x.v._id,t:`<b>${n(x.sisa)} ${esc(x.v.items?.[0]?.u||'')}</b> masih di ${esc(x.v.vendor)} ${x.age} hari`,m:`${esc(spkName(x.v.spk))} · ${esc(x.v.proses||'')} · dikirim ${fd(x.v.tgl)}`}));
 // Late open SPK (past due, belum selesai)
 K90.lateOpen.filter(f=>!lateSeen.has(f.s._id)).slice(0,4).forEach(f=>al.push({sev:2.3,cls:'crit',href:'spk',open:'spk:'+f.s._id,t:`<b>SPK ${f.s.no}</b> ${esc(f.s.customer)} lewat due date, belum terkirim`,m:`Due ${fd(f.s.due)} · stage: ${flow(f.s._id)?.stage||'–'} · produksi ${Math.round(f.x.pP*100)}%`}));
 al.sort((a,b)=>b.sev-a.sev);
 const alH=al.length?`<div class="alerts">${al.slice(0,12).map(a=>`<div class="alert ${a.cls}" data-act="go" data-href="${a.href}" ${a.open?`data-open="${a.open}"`:''}><span class="st"></span><div><div>${a.t}</div><div class="meta">${a.m}</div></div><span class="muted">›</span></div>`).join('')}</div>${al.length>12?`<div class="pbody note">+${al.length-12} peringatan lain</div>`:''}`:empty('Tidak ada yang perlu ditindak','Stok aman, SPK sesuai jadwal, barang di vendor masih dalam batas.');

 // === Activity feed ===
 const fe=[];
 S.mutasi.forEach(m=>{const it=byId(m.gudang,m.item);const lbl=m.gudang==='rm'?rmLabel(it):fgLabel(it);fe.push({at:m.at,ic:m.jenis==='masuk'?'inb':m.jenis==='keluar'?'outb':'chk',cls:m.jenis==='masuk'?'ok':m.jenis==='keluar'?'':'warn',t:`${MVL[m.jenis]||m.jenis} ${m.delta>0?'+':''}${n(m.delta)} · ${esc(lbl)}`,m:`${m.gudang==='rm'?'Gudang bahan baku':'Gudang barang jadi'}${m.ref?' · '+esc(m.ref):''} · ${who(m.by)}`})});
 S.vendor.forEach(v=>fe.push({at:v.updAt||v.at,ic:'vendor',cls:'warn',t:`${v.updAt?'Terima kembali dari':'Kirim ke'} ${esc(v.vendor)} · ${esc(spkName(v.spk))}`,m:`${esc(v.noSJ||'')} · ${esc(v.proses||'')} · ${who(v.updAt?v.updBy:v.by)}`,tgl:v.tgl}));
 S.kirim.forEach(k=>fe.push({at:k.updAt||k.at,ic:'truck',cls:k.status==='Diterima'?'ok':'',t:`${esc(k.status)} · ${esc(k.customer)}`,m:`${esc(k.noSJ||'')} · ${esc(spkName(k.spk))} · ${who(k.updAt?k.updBy:k.by)}`,tgl:k.tgl}));
 S.spk.forEach(s=>{const ev=s.updAt&&s.rev?{at:s.updAt,t:`SPK ${s.no} direvisi (Rev.${s.rev}) · ${esc(s.customer)}`,by:s.updBy}:s.terbitAt?{at:s.terbitAt,t:`SPK ${s.no} terbit · ${esc(s.customer)}`,by:s.terbitBy}:(s.status==='Draft'&&s.at)?{at:s.at,t:`Draft SPK ${s.no} · ${esc(s.customer)}`,by:s.by}:null;if(ev)fe.push({at:ev.at,ic:'spk',cls:'',t:ev.t,m:`${esc(s.lead||'')}${s.due?' · estimasi kirim '+fd(s.due):''} · ${who(ev.by)}`})});
 S.bongkar.forEach(b=>fe.push({at:b.updAt||b.at,ic:'dock',cls:b.status==='Selesai'?'ok':'warn',t:`${esc(b.jenis)} ${esc(b.muatan)} · ${esc(b.nopol||'')} (${esc(b.status)})`,m:`${esc(b.pihak||'')} · ${who(b.updAt?b.updBy:b.by)}`}));
 fe.sort((a,b)=>((b.at||'')+(b.tgl||'')).localeCompare((a.at||'')+(a.tgl||'')));
 const feH=fe.length?`<div class="feed">${fe.slice(0,14).map(f=>`<div class="fi"><span class="ic ${f.cls}">${ic(f.ic)}</span><div><div class="t">${f.t}</div><div class="m">${f.m}</div></div><time>${f.at&&!f.at.startsWith('2026-10-30T08:00')?ago(f.at):fd(f.tgl||f.at)}</time></div>`).join('')}</div>`:empty('Belum ada aktivitas','Transaksi gudang dan logistik akan muncul di sini begitu dicatat.');

 // === RM stok bars ===
 const rmShow=S.rm.filter(r=>r.buffer>0||c.stock.rm[r._id]>0).sort((a,b)=>(a.item+a.ukuran).localeCompare(b.item+b.ukuran));
 const mx=Math.max(1,...rmShow.map(r=>Math.max(c.stock.rm[r._id],r.buffer)));
 const rmBars=`<div class="hbars">${rmShow.map(r=>{const s=c.stock.rm[r._id];const low=r.buffer>0&&s<r.buffer;return `<div class="hb" title="${esc(rmLabel(r))}: stok ${s}, buffer ${r.buffer}"><span class="nm">${esc(r.item.replace('Plat ',''))} <span class="muted">${esc(r.ukuran)}</span></span><span class="track"><i class="${low?'low':''}" style="width:${pct(Math.max(0,s),mx)*100}%"></i>${r.buffer>0?`<b style="left:calc(${pct(r.buffer,mx)*100}% - 1px)"></b>`:''}</span><span class="vv" style="${low?'color:var(--crit)':''}">${n(s)}</span></div>`}).join('')}</div>`;

 // === Pipeline section HTML ===
 const pipePanel=`<section class="panel"><header><h2>Pipeline SPK</h2><span class="hint">90 hari terakhir · ${K90.Fl.length} SPK</span></header><div class="pbody">
  <div class="pipe-stats">
   <div class="ps"><span>OTD</span><b class="${otdCls}">${otdPct}</b></div>
   <div class="ps"><span>Avg siklus</span><b>${r1(K90.avgCycle)||'–'} hk</b></div>
   <div class="ps"><span>Avg produksi</span><b>${r1(K90.avgProd)||'–'} hk</b></div>
   <div class="ps"><span>Avg vendor TAT</span><b>${r1(K90.avgTurn)||'–'} hk</b></div>
   <div class="ps"><span>Bulan ini selesai</span><b>${done30}</b></div>
   <div class="ps"><span>Avg/bln (90h)</span><b>${r1(avgPerMonth90)}</b></div>
  </div>
  ${pipeH}
  ${thrBars?`<div style="margin-top:12px">${thrBars}</div>`:K90.kir.length<2?`<div class="note" style="padding:12px 0">Grafik tersedia setelah ada 2+ bulan data pengiriman.</div>`:''}
 </div></section>`;

 const stokPanel=`<section class="panel"><header><h2>Stok bahan baku vs buffer</h2><span class="hint">lembar</span></header><div class="pbody">${rmShow.length?rmBars+'<div class="legend" style="margin-top:12px"><span><i></i>Stok aman</span><span><i class="low"></i>Di bawah buffer</span><span><i class="tick"></i>Buffer stok</span></div>':empty('Belum ada stok bahan baku','Tambahkan item di Gudang Bahan Baku agar stok dan buffer tampil di sini.')}</div></section>`;
 const vendPanel=`<section class="panel"><header><h2>Performa vendor finishing</h2><span class="hint">rata-rata TAT vs target · 90 hari</span></header><div class="pbody">${vTATbars}</div></section>`;
 const custPanel=`<section class="panel"><header><h2>Top customer · qty terkirim</h2><span class="hint">90 hari terakhir</span></header><div class="pbody">${custBars}</div></section>`;
 h+=`<div class="dash-cols">
 <div class="stack">
  ${vis('spk')?pipePanel:''}
  ${vis('bahan-baku')?stokPanel:''}
  <div class="dash-pair">${vis('vendor')?vendPanel:''}${vis('pengiriman')?custPanel:''}</div>
 </div>
 <div class="stack">
  <section class="panel"><header><h2>Perlu tindakan</h2><span class="hint">${al.length} peringatan</span></header>${alH}</section>
  <section class="panel"><header><h2>Aktivitas terbaru</h2><span class="hint">semua pengguna</span></header>${feH}</section>
 </div></div>`;
 return h;
};

/* ---------- WAREHOUSE (shared by RM & FG) ---------- */
function whTools(view,g){
 const f=F[view];
 const filt=g==='rm'?`<select class="sel" data-act="filtsel" data-view="${view}" data-key="grade" id="f-grade"><option value="">Semua material</option>${['SPHC','SPCC','SS304','SS316','Aluminium'].map(x=>`<option ${f.grade===x?'selected':''}>${x}</option>`).join('')}</select>`
  :`<select class="sel" data-act="filtsel" data-view="${view}" data-key="kat" id="f-kat"><option value="">Semua kategori</option>${[...new Set(S.fg.map(x=>x.kategori))].sort().map(x=>`<option ${f.kat===x?'selected':''}>${esc(x)}</option>`).join('')}</select><select class="sel" data-act="filtsel" data-view="${view}" data-key="fin" id="f-fin"><option value="">Semua finishing</option>${[...new Set(S.fg.map(x=>x.finishing))].sort().map(x=>`<option ${f.fin===x?'selected':''}>${esc(x)}</option>`).join('')}</select>`;
 return `<input class="inp search" id="q-${view}" placeholder="${g==='rm'?'Cari material / ukuran…':'Cari ukuran, type, finishing…'}" value="${esc(f.q)}" data-act="q" data-view="${view}">${filt}
 <span class="grow"></span>
 <button class="btn primary" data-act="mv" data-g="${g}" data-j="masuk">${ic('inb')}${g==='rm'?'Terima material':'Barang masuk'}</button>
 <button class="btn" data-act="mv" data-g="${g}" data-j="keluar">${ic('outb')}${g==='rm'?'Pakai produksi':'Barang keluar'}</button>
 <button class="btn" data-act="mv" data-g="${g}" data-j="opname">${ic('chk')}Stock opname</button>
 <button class="btn ghost" data-act="newitem" data-g="${g}">${ic('plus')}Item baru</button>
 <button class="btn ghost" data-act="csv" data-what="${g}">${ic('dl')}CSV</button>`;
}
T['barang-jadi']=()=>whTools('barang-jadi','fg');
function whRows(g){
 const view=g==='rm'?'bahan-baku':'barang-jadi',f=F[view],c=calc();const q=f.q.toLowerCase();
 return S[g].filter(r=>{const lbl=(g==='rm'?rmLabel(r):fgLabel(r)).toLowerCase();if(q&&!lbl.includes(q))return false;
  if(g==='rm'){if(f.grade&&grade(r)!==f.grade)return false;if(f.low&&!(r.buffer>0&&c.stock.rm[r._id]<r.buffer)&&c.stock.rm[r._id]>0)return false}
  else{if(f.kat&&r.kategori!==f.kat)return false;if(f.fin&&r.finishing!==f.fin)return false}return true})
 .sort((a,b)=>a._id.localeCompare(b._id));
}
function whBody(g){
 const view=g==='rm'?'bahan-baku':'barang-jadi',f=F[view],c=calc();
 const tabs=`<div class="tabs"><button data-act="filt" data-view="${view}" data-key="tab" data-val="stok" class="${f.tab==='stok'?'on':''}">Posisi stok</button><button data-act="filt" data-view="${view}" data-key="tab" data-val="mutasi" class="${f.tab==='mutasi'?'on':''}">Riwayat mutasi</button></div>`;
 if(f.tab==='mutasi'){
  const mv=S.mutasi.filter(m=>m.gudang===g).sort((a,b)=>(b.tgl+b.at).localeCompare(a.tgl+a.at));
  const rows=mv.map(m=>{const it=byId(g,m.item);return `<tr class="${m.dikoreksi?'void':''}"><td>${fd(m.tgl)}</td><td>${stChip(MVL[m.jenis]||m.jenis)}</td><td>${esc(g==='rm'?rmLabel(it):fgLabel(it))}</td><td class="num big" style="color:${m.delta<0?'var(--crit)':'var(--ok)'}">${m.delta>0?'+':''}${n(m.delta)}</td><td>${m.noDok?`<span class="mono">${esc(m.noDok)}</span><div class="note">${esc(m.ref||'')}</div>`:esc(m.ref||'–')}</td><td>${esc(m.pihak||'')}</td><td class="muted">${esc(m.ket||'')}</td><td class="muted">${who(m.by)}</td></tr>`}).join('');
  return `<section class="panel">${tabs}${mv.length?`<div class="tbl-wrap"><table><thead><tr><th>Tanggal</th><th>Jenis</th><th>Item</th><th class="num">Qty</th><th>Dokumen</th><th>${g==='rm'?'Supplier / Tujuan':'Asal / Customer'}</th><th>Keterangan</th><th>Dicatat</th></tr></thead><tbody>${rows}</tbody></table></div>`:empty('Belum ada mutasi','Stok saat ini masih sama dengan stok awal dari file Excel. Catat penerimaan, pemakaian, atau stock opname dengan tombol di atas.')}</section>`;
 }
 const rows=whRows(g);
 const all=S[g];const low=all.filter(r=>r.buffer>0&&c.stock[g][r._id]<r.buffer).length;const zero=all.filter(r=>c.stock[g][r._id]<=0).length;const tot=all.reduce((a,r)=>a+Math.max(0,c.stock[g][r._id]),0);
 const summ=`<div class="summ">${chip(`${all.length} item`,'plain')}${chip(`Total ${n(tot)} ${g==='rm'?'lembar':'btg/pcs'}`,'info')}${g==='rm'?`<button class="chip ${f.low?'crit':'warn'}" style="cursor:pointer" data-act="filt" data-view="${view}" data-key="low" data-val="${!f.low}">${low} di bawah buffer${f.low?' · tampilkan semua':''}</button>`:''}${chip(`${zero} kosong`,zero?'crit':'ok')}</div>`;
 const tr=rows.map(r=>{const s=c.stock[g][r._id];const[st,cl]=stockState(r,s);const lm=c.lastMv[g+r._id];
  return g==='rm'?`<tr class="click" data-act="kartu" data-g="rm" data-id="${r._id}"><td><b>${esc(r.item)}</b></td><td class="mono">${esc(r.ukuran)}</td><td class="num">${r.buffer?n(r.buffer):'–'}</td><td class="num big">${n(s)}</td><td>${esc(r.satuan)}</td><td>${chip(st,cl)}</td><td class="muted">${lm?fd(lm.tgl):'Stok awal '+fd(r.tglStokAwal)}</td></tr>`
  :`<tr class="click" data-act="kartu" data-g="fg" data-id="${r._id}"><td><b>${esc(r.kategori)}</b> ${esc(r.type)}</td><td class="mono">${esc(r.ukuran)}</td><td class="num mono">${esc(r.panjang)}</td><td>${esc(r.finishing)}</td><td class="num mono">${esc(r.tebal)}</td><td class="num big">${n(s)}</td><td>${esc(r.satuan)}</td><td>${s<=0?chip('Kosong','crit'):chip('Ada','ok')}${r.ket?' <span class="muted">'+esc(r.ket)+'</span>':''}</td></tr>`}).join('');
 const head=g==='rm'?'<th>Material</th><th>Ukuran (t×l×p mm)</th><th class="num">Buffer</th><th class="num">Stok</th><th>Satuan</th><th>Status</th><th>Mutasi terakhir</th>':'<th>Produk</th><th>Ukuran (W×H)</th><th class="num">Panjang</th><th>Finishing</th><th class="num">Tebal</th><th class="num">Stok</th><th>Satuan</th><th>Status</th>';
 return `<section class="panel">${tabs}<div class="pbody">${summ}</div>${rows.length?`<div class="tbl-wrap"><table><thead><tr>${head}</tr></thead><tbody>${tr}</tbody></table></div>`:empty('Tidak ada item yang cocok','Ubah kata kunci atau filter.')}</section>`;
}
B['barang-jadi']=()=>whBody('fg');

/* ---------- BONGKAR MUAT ---------- */
T['bongkar-muat']=()=>`${segBtns('bongkar-muat','range',[['0','Hari ini'],['7','7 hari'],['all','Semua']])}${segBtns('bongkar-muat','jenis',[['','Semua'],['Loading','Loading'],['Unloading','Unloading']])}<span class="grow"></span><button class="btn primary" data-act="newbm">${ic('plus')}Kendaraan masuk</button><button class="btn ghost" data-act="csv" data-what="bongkar">${ic('dl')}CSV</button>`;
const dur=(a,b)=>{if(!a||!b)return '';const[x,y]=a.split(':').map(Number),[p,q]=b.split(':').map(Number);let m=p*60+q-(x*60+y);if(m<0)m+=1440;return m>=60?`${Math.floor(m/60)} j ${m%60} m`:`${m} mnt`};
/* ---------- VENDOR ---------- */
T['vendor']=()=>`${segBtns('vendor','st',[['aktif','Masih di vendor'],['selesai','Selesai'],['','Semua']])}<select class="sel" id="f-vendor" data-act="filtsel" data-view="vendor" data-key="vendor"><option value="">Semua vendor</option>${[...new Set(S.vendor.map(v=>v.vendor))].sort().map(v=>`<option ${F.vendor.vendor===v?'selected':''}>${esc(v)}</option>`).join('')}</select><input class="inp search" id="q-vendor" placeholder="Cari SPK, SJ, customer…" value="${esc(F.vendor.q)}" data-act="q" data-view="vendor"><span class="grow"></span><button class="btn primary" data-act="newvendor">${ic('outb')}Kirim ke vendor</button><button class="btn ghost" data-act="csv" data-what="vendor">${ic('dl')}CSV</button>`;
/* ---------- PENGIRIMAN ---------- */
T['pengiriman']=()=>`${segBtns('pengiriman','st',[['','Semua'],['Disiapkan','Disiapkan'],['Dalam Perjalanan','Dalam perjalanan'],['Diterima','Diterima']])}<input class="inp search" id="q-kirim" placeholder="Cari SJ, SPK, customer…" value="${esc(F.pengiriman.q)}" data-act="q" data-view="pengiriman"><span class="grow"></span><button class="btn primary" data-act="newkirim">${ic('truck')}Buat surat jalan</button><button class="btn ghost" data-act="csv" data-what="kirim">${ic('dl')}CSV</button>`;
B['pengiriman']=()=>{
 const f=F.pengiriman,q=f.q.toLowerCase(),t=today();
 const xs=S.kirim.filter(k=>{if(f.st&&k.status!==f.st)return false;if(q){const s=byId('spk',k.spk);if(!`${k.noSJ} ${s?.no} ${k.customer} ${k.nopol||''}`.toLowerCase().includes(q))return false}return true}).sort((a,b)=>(b.tgl+(b.at||'')).localeCompare(a.tgl+(a.at||'')));
 const tonBulanIni=S.kirim.filter(k=>(k.tgl||'').slice(0,7)===t.slice(0,7)&&k.status!=='Batal').reduce((a,k)=>a+(k.items||[]).reduce((b,it)=>b+(+it.q||0)*(+it.w||0),0),0);
 const summ=`<div class="summ">${chip(`${S.kirim.filter(k=>k.status==='Disiapkan').length} disiapkan`,'plain')}${chip(`${S.kirim.filter(k=>k.status==='Dalam Perjalanan').length} dalam perjalanan`,'info')}${chip(`${S.kirim.filter(k=>(k.tgl||'').slice(0,7)===t.slice(0,7)).length} SJ bulan ini`,'ok')}${tonBulanIni>0?chip(`${ton(tonBulanIni)} ton terkirim bulan ini`,'ok'):''}</div>`;
 const next={Disiapkan:'Dalam Perjalanan','Dalam Perjalanan':'Diterima'};
 const rows=xs.map(k=>{const s=byId('spk',k.spk);const q=(k.items||[]).reduce((a,i)=>a+(+i.q||0),0);const wkg=(k.items||[]).reduce((a,i)=>a+(+i.q||0)*(+i.w||0),0);return `<tr class="click ${k.status==='Batal'?'void':''}" data-act="openkirim" data-id="${k._id}"><td class="mono">${esc(k.noSJ||'–')}</td><td>${fd(k.tgl)}</td><td>${s?'SPK '+s.no:'–'}</td><td><b>${esc(k.customer)}</b></td><td class="num">${(k.items||[]).length} item · <b>${n(q)}</b>${wkg?`<div class="note">${ton(wkg)} ton</div>`:''}</td><td>${k.nopol?`<span class="mono">${esc(k.nopol)}</span>`:''}${k.driver?`<div class="note">${esc(k.driver)}</div>`:''}</td><td>${stChip(k.status)}</td><td>${next[k.status]?`<button class="btn sm ${k.status==='Dalam Perjalanan'?'primary':''}" data-act="kstep" data-id="${k._id}" data-to="${next[k.status]}">${k.status==='Disiapkan'?'Berangkat':'Diterima customer'}</button>`:''}</td></tr>`}).join('');
 return `<section class="panel"><div class="pbody">${summ}</div>${xs.length?`<div class="tbl-wrap"><table><thead><tr><th>No SJ</th><th>Tanggal</th><th>SPK</th><th>Customer</th><th class="num">Muatan</th><th>Kendaraan</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`:empty('Belum ada pengiriman','Buat surat jalan dari SPK; status berangkat dan diterima ter-update realtime.')}</section>`;
};

/* ---------- SPK ---------- */
T['spk']=()=>F.spk.tab==='kpi'?`${segBtns('spk','tab',[['list','Daftar SPK'],['kpi','KPI & Analisa']])}${segBtns('spk','p',[['30','30 hari'],['90','90 hari'],['bln','Bulan ini'],['all','Semua']])}<span class="grow"></span><button class="btn ghost" data-act="spktarget">Atur target</button><button class="btn ghost" data-act="doc" data-kind="kpi" data-ref="-" data-fmt="xlsx">${ic('dl')}Excel</button><button class="btn ghost" data-act="doc" data-kind="kpi" data-ref="-" data-fmt="pdf">${ic('file')}PDF</button>`:`${segBtns('spk','tab',[['list','Daftar SPK'],['kpi','KPI & Analisa']])}${segBtns('spk','st',[['aktif','Aktif'],['Terlambat','Terlambat'],['Selesai','Selesai'],['','Semua']])}<input class="inp search" id="q-spk" placeholder="Cari no SPK, customer, PO…" value="${esc(F.spk.q)}" data-act="q" data-view="spk"><span class="grow"></span><button class="btn primary" data-act="newspk">${ic('plus')}SPK baru</button><button class="btn ghost" data-act="csv" data-what="spk">${ic('dl')}CSV</button>`;
B['spk']=()=>{
 if(F.spk.tab==='kpi')return spkKpiBody();
 const c=calc(),f=F.spk,q=f.q.toLowerCase();
 const xs=S.spk.filter(s=>{const x=c.spk[s._id];if(f.stage&&flow(s._id).stage!==f.stage)return false;if(f.st==='aktif'&&x.st==='Selesai')return false;if(f.st&&f.st!=='aktif'&&x.st!==f.st)return false;if(q&&!`${s.no} ${s.customer} ${s.po} ${s.sales}`.toLowerCase().includes(q))return false;return true}).sort((a,b)=>b.no-a.no);
 const all=Object.values(c.spk);
 const summ=`<div class="summ">${chip(`${all.filter(x=>x.st!=='Selesai').length} aktif`,'info')}${chip(`${all.filter(x=>x.st==='Terlambat').length} terlambat`,'crit')}${chip(`${all.filter(x=>x.st==='Jatuh Tempo').length} jatuh tempo ≤1 hari`,'warn')}${chip(`${all.filter(x=>x.st==='Selesai').length} selesai terkirim`,'ok')}${all.some(x=>x.st==='Draft')?chip(`${all.filter(x=>x.st==='Draft').length} draft`,'plain'):''}</div>`;
 const rows=xs.map(s=>{const x=c.spk[s._id];return `<tr class="click" data-act="openspk" data-id="${s._id}"><td class="mono"><b>${s.no}</b>${s.rev?`<div class="note">Rev.${s.rev}</div>`:''}</td><td>${fd(s.tgl)}</td><td><b>${esc(s.customer)}</b><div class="note">${esc(s.po||'')}${s.sales?' · '+esc(s.sales):''}</div></td><td>${esc(s.material||'')}${s.tebal?` <span class="muted">${esc(s.tebal)}</span>`:''}<div class="note">${esc(s.type||'')}</div></td><td>${fd(s.due)}${x.late?`<div class="note" style="color:var(--crit)">+${x.late} hari</div>`:''}</td><td>${prog(x.pP)}</td><td class="num">${x.vo?`${n(x.vb)}/${n(x.vo)}`:'–'}</td><td>${prog(x.pK,x.pK>=1?'ok':x.st==='Terlambat'?'crit':'')}</td><td>${(fl=>chip(fl.stage,STAGE_CLS[fl.stage]))(flow(s._id))}</td><td>${stChip(x.st)}</td></tr>`}).join('');
 return `<section class="panel"><div class="pbody">${summ}${f.stage?` <span class="chip info sel">Posisi: ${esc(f.stage)} <button class="linkbtn" data-act="spkstage" data-st="">hapus filter</button></span>`:''}</div>${xs.length?`<div class="tbl-wrap"><table><thead><tr><th>SPK</th><th>Tanggal</th><th>Customer / PO</th><th>Material</th><th>Due date</th><th>Produksi</th><th class="num">Vendor kembali</th><th>Terkirim</th><th>Posisi</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>`:empty('Tidak ada SPK yang cocok','Ubah filter atau buat SPK baru.')}</section>`;
};

/* ---------- Dashboard Produksi ---------- */
T['produksi']=()=>{
 const f=F['produksi']||(F['produksi']={wc:'',p:'aktif'});
 const wcOpts=[['','Semua WC'],...S.mwc.filter(x=>x.aktif!==false).sort((a,b)=>a.urutan-b.urutan).map(w=>[w.kode,w.nama])];
 return `<div class="tb-group"><div class="tb-lbl">Work Center</div>
  <select class="sel" data-act="filtsel" data-view="produksi" data-key="wc" id="f-wc">${wcOpts.map(([v,l])=>`<option value="${esc(v)}" ${(f.wc||'')===v?'selected':''}>${esc(l)}</option>`).join('')}</select>
 </div>
 <div class="tb-group"><div class="tb-lbl">SPK</div>
  ${segBtns('produksi','p',[['aktif','Aktif'],['all','Semua']])}
 </div>
 <span class="grow"></span>
 <button class="btn ghost" data-act="csv" data-what="prodlog">${ic('dl')} CSV Log</button>`;
};
B['produksi']=()=>{
 const c=calc(),f=F['produksi']||(F['produksi']={wc:'',p:'aktif'});
 const wcs=S.mwc.filter(x=>x.aktif!==false).sort((a,b)=>a.urutan-b.urutan);
 const spkAktif=S.spk.filter(s=>{const x=c.spk[s._id];return x.st!=='Selesai'&&x.st!=='Batal'&&x.st!=='Draft'});
 const spkAll=f.p==='all'?S.spk.filter(s=>c.spk[s._id].st!=='Draft'):spkAktif;
 // Gather all prodLog entries across selected SPKs for analytics
 let totalEntries=0,totalItems=0,terlambat=0,selesai=0;
 spkAktif.forEach(s=>{totalEntries+=(s.prodLog||[]).length;s.items.forEach(i=>{totalItems+=+i.q||0});const x=c.spk[s._id];if(x.st==='Terlambat')terlambat++;if(x.st==='Selesai')selesai++});
 // build nama→kode map
 const wcByNama={};wcs.forEach(w=>{wcByNama[w.nama]=w.kode});
 // WC load: per-item per-WC berdasarkan prodLog[].items[].wc (schema baru)
 // Setiap item bisa ada di WC berbeda secara bersamaan
 const wcLoad={};
 wcs.forEach(w=>{wcLoad[w.kode]={wc:w,spks:new Set(),items:[],itemDone:0,itemTotal:0}});
 spkAll.forEach(s=>{
  const c2=calc();
  // Kumpulkan qty per-item per-WC dari seluruh prodLog (bukan cuma last)
  const wcItemQty={}; // wcNama -> {itemDesc -> qtyTerbaru}
  (s.prodLog||[]).forEach(log=>{
   (log.items||[]).forEach(li=>{
    const wn=li.wc||(log.wc||'');// support schema lama (wc di level log)
    if(!wn)return;
    if(!wcItemQty[wn])wcItemQty[wn]={};
    // Ambil nilai terbaru (prodLog diurutkan asc by tgl)
    wcItemQty[wn][li.d]=(wcItemQty[wn][li.d]||0)+(+li.q||0);
   });
  });
  // Jika pakai schema lama (wc di level log, bukan per item), fallback ke lastLog.wc
  if(Object.keys(wcItemQty).length===0){
   const lastLog=(s.prodLog||[]).slice(-1)[0];
   const wcNama=lastLog?.wc||'';
   if(wcNama){
    if(!wcItemQty[wcNama])wcItemQty[wcNama]={};
    (lastLog.items||[]).forEach(li=>{wcItemQty[wcNama][li.d]=(wcItemQty[wcNama][li.d]||0)+(+li.q||0)});
   }
  }
  Object.entries(wcItemQty).forEach(([wcNama,itemMap])=>{
   const wcKode=wcByNama[wcNama];
   if(!wcKode||!wcLoad[wcKode])return;
   wcLoad[wcKode].spks.add(s._id);
   Object.entries(itemMap).forEach(([desc,qty])=>{
    if(qty>0){
     const ordItem=s.items.find(i=>i.d===desc);
     const ordQ=+(ordItem?.q||0);
     const done=qty>=ordQ&&ordQ>0;
     wcLoad[wcKode].items.push({spkNo:s.no,spkId:s._id,desc,qty,ordQ,done});
     wcLoad[wcKode].itemTotal++;
     if(done)wcLoad[wcKode].itemDone++;
    }
   });
  });
 });
 // Convert Set to array for count
 wcs.forEach(w=>{if(wcLoad[w.kode])wcLoad[w.kode].spkCount=(wcLoad[w.kode].spks?.size||0)});
 const filterWc=f.wc;
 const mkpi=(cls,lb,v,unit,s)=>`<div class="kpi ${cls}"><span class="lb">${lb}</span><span class="v">${v}${unit?`<small>${unit}</small>`:''}</span><span class="s">${s}</span></div>`;
 const kpis=`<div class="kpi-row">
  ${mkpi('info','SPK aktif',spkAktif.length,'','dari total '+S.spk.length+' SPK')}
  ${mkpi(terlambat?'crit':'ok','Terlambat',terlambat,'SPK',terlambat?'segera tindak lanjuti':'semua on-track')}
  ${mkpi('info','Update produksi',S.spk.reduce((a,s)=>a+(s.prodLog||[]).length,0),'log','total entri progres tercatat')}
  ${mkpi(wcs.length?'info':'warn','Work Center aktif',wcs.length,'WC',wcs.filter(w=>w.tipe==='Subcont').length+' subcont')}
 </div>`;
 // Per-WC table — tampilkan per item, bukan cuma SPK chip
 const wcRows=wcs.filter(w=>!filterWc||w.kode===filterWc).map(w=>{
  const load=wcLoad[w.kode]||{spkCount:0,items:[],itemTotal:0,itemDone:0};
  const busy=load.spkCount||0;
  const itms=load.items||[];
  const itemTotal=load.itemTotal||0;
  const itemDone=load.itemDone||0;
  // Group items by SPK no
  const bySPK={};itms.forEach(it=>{(bySPK[it.spkNo]=bySPK[it.spkNo]||[]).push(it)});
  const spkNos=Object.keys(bySPK).slice(0,3);
  const itemCells=spkNos.length===0
   ?`<span class="muted" style="font-size:12px">Belum ada material masuk</span>`
   :spkNos.map(no=>{
    const items=bySPK[no];
    const spkId=items[0].spkId;
    const itemTags=items.slice(0,3).map(it=>`<span title="${esc(it.desc)}" style="display:inline-block;background:var(--${it.done?'ok-soft':'surface-2'});color:var(--${it.done?'ok':'fg'});border:1px solid var(--${it.done?'ok':'line'});border-radius:4px;padding:1px 6px;font-size:11px;margin-right:2px">${esc(it.desc.length>18?it.desc.substring(0,18)+'…':it.desc)} <b>${n(it.qty)}</b></span>`).join('')+(items.length>3?`<span class="muted" style="font-size:11px">+${items.length-3}</span>`:'');
    return `<div style="margin-bottom:4px"><span class="chip plain" style="cursor:pointer;font-size:11px" data-act="prod" data-id="${esc(spkId)}">SPK ${no}</span> ${itemTags}</div>`;
   }).join('')+(Object.keys(bySPK).length>3?`<div class="muted" style="font-size:11px">+${Object.keys(bySPK).length-3} SPK lainnya</div>`:'');
  const statusHtml=busy===0
   ?'<span style="color:var(--ok)">Kosong</span>'
   :itemDone===itemTotal&&itemTotal>0
    ?`<span style="color:var(--ok);font-weight:600">✓ ${itemDone} item selesai</span>`
    :`<span style="color:var(--warn);font-weight:600">${itemTotal-itemDone} item berjalan</span>`;
  return `<tr>
   <td><b>${esc(w.nama)}</b><div class="note">${esc(w.tipe==='Subcont'?'Subcont / Vendor luar':'Internal')}</div></td>
   <td><span class="chip ${busy>=3?'crit':busy>=1?'warn':'plain'}">${busy} SPK</span><div class="note">${itemTotal} item</div></td>
   <td>${itemCells}</td>
   <td>${statusHtml}</td>
  </tr>`;
 }).join('');
 // Per-SPK produksi table — with due-date urgency + detail qty
 const todayStr=today();
 const hkDiff=(a,b)=>{// rough biz-day diff
  let d=0,cur=new Date(a<b?a:b),end=new Date(a<b?b:a);
  while(cur<end){const wd=cur.getDay();if(wd!==0&&wd!==6)d++;cur.setDate(cur.getDate()+1)}
  return a<=b?d:-d;
 };
 // Filter SPK berdasarkan wcLoad (per-item WC data yang sudah dibangun)
 const spkRows=(filterWc
  ?spkAll.filter(s=>{
   const load=wcLoad[filterWc];
   if(!load)return false;
   return load.spks.has(s._id);
  })
  :spkAll
 ).sort((a,b)=>{const xa=c.spk[a._id],xb=c.spk[b._id];if(xa.st==='Terlambat'&&xb.st!=='Terlambat')return -1;if(xb.st==='Terlambat'&&xa.st!=='Terlambat')return 1;return b.no-a.no}).map(s=>{
  const x=c.spk[s._id];
  const fl=flow(s._id);
  const lastLog=(s.prodLog||[]).slice(-1)[0];
  const lastUpdDate=lastLog?fd(lastLog.tgl):null;
  const lastUpdBy=lastLog?(lastLog.by||''):null;
  const lastUpdHtml=lastUpdDate?`<span>${lastUpdDate}</span><div class="note">${esc(lastUpdBy||'–')}</div>`:'<span class="muted">–</span>';
  // Due date urgency
  const due=s.due||s.deadline||'';
  const sisa=due?hkDiff(todayStr,due):null;
  const dueCls=!due?'':(sisa<0?'color:var(--crit);font-weight:700':sisa<=3?'color:var(--warn);font-weight:700':'color:var(--ok)');
  const dueHtml=due?`<div style="${dueCls}">${fd(due)}</div><div class="note">${sisa<0?`${-sisa} hk lewat`:`${sisa} hk lagi`}</div>`:'<span class="muted">–</span>';
  // Qty detail
  const prodTot=s.items.reduce((a,i)=>a+(+i.prod||0),0);
  const ordTot=s.items.reduce((a,i)=>a+(+i.q||0),0);
  const qtyHtml=`<div style="display:flex;align-items:center;gap:6px">${prog(x.pP)}<span class="note" style="white-space:nowrap">${n(prodTot)}/${n(ordTot)}</span></div>`;
  return `<tr class="click" data-act="openspk" data-id="${s._id}">
   <td class="mono"><b>${s.no}</b></td>
   <td><b>${esc(s.customer)}</b><div class="note">${esc(s.po||'')}</div></td>
   <td>${chip(fl.stage,STAGE_CLS[fl.stage]||'plain')}</td>
   <td style="min-width:160px">${qtyHtml}</td>
   <td>${lastUpdHtml}</td>
   <td>${dueHtml}</td>
   <td>${stChip(x.st)}</td>
   <td><button class="btn sm primary" data-act="prod" data-id="${s._id}">${ic('tool',13)} Input</button></td>
  </tr>`;
 }).join('');
 // KPI: % SPK sudah ada update
 const spkDgnUpdate=spkAktif.filter(s=>(s.prodLog||[]).length>0).length;
 const pctUpdate=spkAktif.length?Math.round(spkDgnUpdate/spkAktif.length*100):0;
 const siapKirim=spkAktif.filter(s=>flow(s._id)?.stage==='Siap kirim').length;
 const kpisEnhanced=`<div class="kpi-row">
  ${mkpi('info','SPK aktif',spkAktif.length,'','dari total '+S.spk.length+' SPK')}
  ${mkpi(terlambat?'crit':'ok','Terlambat',terlambat,'SPK',terlambat?'segera tindak lanjuti':'semua on-track')}
  ${mkpi(siapKirim?'ok':'info','Siap kirim',siapKirim,'SPK','produksi 100% belum terkirim')}
  ${mkpi(pctUpdate<50&&spkAktif.length>0?'warn':'info','Update tercatat',pctUpdate,'%',`${spkDgnUpdate} dari ${spkAktif.length} SPK ada log`)}
 </div>`;
 return `<section class="panel">
  ${kpisEnhanced}
  ${!filterWc?`<div class="pbody" style="padding:0 0 8px 0"><div class="dw-section-title" style="margin:0 0 6px 0">Beban per Work Center</div>
   <div class="tbl-wrap"><table><thead><tr><th>Work Center</th><th>Antrian</th><th>SPK sedang berjalan</th><th>Status</th></tr></thead>
    <tbody>${wcRows||`<tr><td colspan="4" class="muted" style="text-align:center;padding:20px">Belum ada WC. <a class="linkbtn" data-act="nav" data-id="master-data">Atur di Master Data</a></td></tr>`}</tbody></table></div>
  </div>`:''}
  <div class="pbody" style="padding:0">
   <div class="dw-section-title" style="margin:8px 0 6px 0">${filterWc?`SPK di ${esc(wcs.find(w=>w.kode===filterWc)?.nama||filterWc)}`:'Semua SPK – Progres Produksi'}</div>
   ${spkRows?`<div class="tbl-wrap"><table><thead><tr><th>SPK</th><th>Customer / PO</th><th>Posisi</th><th>Produksi</th><th>Update terakhir</th><th>Due date</th><th>Status</th><th></th></tr></thead><tbody>${spkRows}</tbody></table></div>`:empty('Tidak ada SPK aktif','Buat SPK baru di Monitoring SPK.')}
  </div>
  <div class="note" style="padding:8px 16px 12px;color:var(--muted);font-size:11.5px">Klik baris SPK untuk detail · Due date merah = sudah lewat, kuning = ≤3 hari kerja · Beban WC dari posisi SPK aktif saat ini</div>
 </section>`;
};

/* ---------- drawers ---------- */
let DRAWER=null;
function openDrawer(fn){DRAWER=()=>{const r=fn();if(!r){closeDrawer();return}$('#drawer').innerHTML=`<div class="scrim" data-act="closedrawer"></div><div class="drawer"><aside class="drawer-panel" role="dialog" aria-modal="true"><header><div><h3>${r.t}</h3><p>${r.s||''}</p></div><button class="x" data-act="closedrawer" aria-label="Tutup">×</button></header><div class="dbody${r.cls?' '+r.cls:''}">${r.b}</div></aside></div>`;resolveNames()};$('#drawer').hidden=false;DRAWER()}
function closeDrawer(){DRAWER=null;$('#drawer').hidden=true;$('#drawer').innerHTML=''}
/* ---------- modal forms ---------- */
function openModal(title,body,onSubmit,opts={}){
 const M=$('#modal');M.className='modal-wrap';
 const subCls=opts.danger?'btn danger':'btn primary';
 M.innerHTML=`<div class="scrim" data-act="closemodal"></div><form class="modal" id="mform" novalidate><header><h3>${title}</h3><button type="button" class="x" data-act="closemodal" aria-label="Tutup">×</button></header><div class="mbody">${body}</div><footer><span class="err" id="merr"></span><button type="button" class="btn ghost" data-act="closemodal">Batal</button><button class="${subCls}" type="submit" id="msub">${opts.submit||'Simpan'}</button></footer></form>`;
 M.hidden=false;const form=$('#mform');
 form.onsubmit=async e=>{e.preventDefault();const b=$('#msub');b.disabled=true;$('#merr').textContent='';
  try{await onSubmit(Object.fromEntries(new FormData(form)),form);closeModal();if(opts.done!==' ')toast(opts.done||'Tersimpan · semua pengguna langsung melihat perubahan ini')}
  catch(err){$('#merr').textContent=err.message||('Gagal menyimpan ('+(err.code||'error')+')');b.disabled=false}};
 opts.mount&&opts.mount(form);const first=form.querySelector('input:not([type=hidden]),select');first&&first.focus();
}
function closeModal(){$('#modal').hidden=true;$('#modal').innerHTML=''}
const fld=(label,inner,full)=>`<div class="fld ${full?'full':''}"><label>${label}</label>${inner}</div>`;
const inp=(name,val='',type='text',extra='')=>`<input class="inp" id="m-${name}" name="${name}" type="${type}" value="${esc(val)}" ${extra}>`;
const num0=v=>{const x=parseFloat(String(v).replace(',','.'));return isNaN(x)?0:x};
function itemSelect(g,sel){
 if(g==='rm'){const groups={};S.rm.forEach(r=>(groups[grade(r)]=groups[grade(r)]||[]).push(r));return `<select class="sel" id="m-item" name="item" required><option value="">Pilih material…</option>${Object.entries(groups).map(([k,xs])=>`<optgroup label="${k}">${xs.map(r=>`<option value="${r._id}" ${sel===r._id?'selected':''}>${esc(rmLabel(r))} — stok ${n(calc().stock.rm[r._id])}</option>`).join('')}</optgroup>`).join('')}</select>`}
 const groups={};S.fg.forEach(r=>{const k=r.kategori+(r.type?' '+r.type:'')+' · '+r.finishing;(groups[k]=groups[k]||[]).push(r)});
 return `<select class="sel" id="m-item" name="item" required><option value="">Pilih produk…</option>${Object.entries(groups).sort().map(([k,xs])=>`<optgroup label="${esc(k)}">${xs.map(r=>`<option value="${r._id}" ${sel===r._id?'selected':''}>${esc(r.ukuran)} L${esc(r.panjang)} t${esc(r.tebal)} — stok ${n(calc().stock.fg[r._id])}</option>`).join('')}</optgroup>`).join('')}</select>`;
}
function spkSelect(sel,activeOnly=true,req=false){const c=calc();return `<select class="sel" id="m-spk" name="spk" ${req?'required':''}><option value="">${req?'Pilih SPK…':'— tanpa SPK —'}</option>${S.spk.filter(s=>!activeOnly||c.spk[s._id].st!=='Selesai'||s._id===sel).sort((a,b)=>b.no-a.no).map(s=>`<option value="${s._id}" ${sel===s._id?'selected':''}>SPK ${s.no} · ${esc(s.customer)}</option>`).join('')}</select>`}
function prodForm(id){
 const s=byId('spk',id);
 const c=calc();const x=c.spk[id]||{};
 const due=s.due||s.deadline||'';
 const todayS=today();
 const dueDays=due?(()=>{let d=0,cur=new Date(todayS<due?todayS:due),end=new Date(todayS<due?due:todayS);while(cur<end){const wd=cur.getDay();if(wd!==0&&wd!==6)d++;cur.setDate(cur.getDate()+1)}return todayS<=due?d:-d})():null;
 const dueCls=!due?'':(dueDays<0?'crit':dueDays<=3?'warn':'ok');
 const dueTxt=!due?'–':(dueDays<0?`⚠ ${-dueDays} hk lewat`:(dueDays===0?'Due hari ini':`${dueDays} hk lagi`));
 const pPct=Math.round((x.pP||0)*100);
 const lastLog=(s.prodLog||[]).slice(-1)[0];
 // WC list from master
 const wcList=S.mwc.filter(w=>w.aktif!==false).sort((a,b)=>a.urutan-b.urutan).map(w=>w.nama);
 // Last WC per item: ambil dari log terbaru yang punya entry untuk item tsb
 const lastWcPerItem={};
 (s.prodLog||[]).forEach(log=>{
  (log.items||[]).forEach(li=>{
   // Support schema baru (li.wc) dan lama (log.wc)
   const wn=li.wc||(log.wc||'');
   if(wn)lastWcPerItem[li.d]=wn;
  });
 });
 // Item status summary
 const doneItems=s.items.filter(i=>(+i.prod||0)>= +i.q).length;
 const totalItems=s.items.length;
 const summaryBar=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:6px;margin-bottom:14px">
  <div style="background:var(--surface-2);border-radius:8px;padding:8px 10px;text-align:center">
   <div style="font-size:11px;color:var(--muted);margin-bottom:2px">Due date</div>
   <div style="font-size:13px;font-weight:700;color:var(--${dueCls||'fg'})">${dueTxt}</div>
   ${due?`<div style="font-size:10px;color:var(--muted)">${fd(due)}</div>`:''}
  </div>
  <div style="background:var(--surface-2);border-radius:8px;padding:8px 10px;text-align:center">
   <div style="font-size:11px;color:var(--muted);margin-bottom:2px">Produksi</div>
   <div style="font-size:13px;font-weight:700;color:var(--${pPct>=100?'ok':pPct>0?'warn':'muted'})">${pPct}%</div>
   <div style="font-size:10px;color:var(--muted)">${doneItems}/${totalItems} item selesai</div>
  </div>
  <div style="background:var(--surface-2);border-radius:8px;padding:8px 10px;text-align:center">
   <div style="font-size:11px;color:var(--muted);margin-bottom:2px">Terkirim</div>
   <div style="font-size:13px;font-weight:700">${Math.round((x.pK||0)*100)}%</div>
  </div>
  <div style="background:var(--surface-2);border-radius:8px;padding:8px 10px;text-align:center">
   <div style="font-size:11px;color:var(--muted);margin-bottom:2px">Terakhir update</div>
   <div style="font-size:11px;font-weight:600">${lastLog?fd(lastLog.tgl):'–'}</div>
   <div style="font-size:10px;color:var(--muted)">${lastLog?esc(lastLog.by||'–'):''}</div>
  </div>
 </div>`;
 // Per-item cards — TIAP ITEM punya WC selector sendiri
 const wcOpts=(lastWc='')=>wcList.map(w=>`<option value="${esc(w)}" ${lastWc===w?'selected':''}>${esc(w)}</option>`).join('');
 const itemRows=s.items.map((i,k)=>{
  const prod=+i.prod||0;const sisa=Math.max(0,+i.q-prod);const done=sisa===0;
  const pct=+i.q>0?Math.round(prod/+i.q*100):0;
  const itemLastWc=lastWcPerItem[i.d]||'';
  const progColor=done?'ok':pct>0?'accent':'line-2';
  return `<div style="border:1px solid var(--${done?'ok':'line'});border-radius:10px;padding:12px;margin-bottom:10px;background:var(--surface);position:relative">
   ${done?`<div style="position:absolute;top:10px;right:10px;background:var(--ok-soft);color:var(--ok);border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700">✓ Selesai</div>`:''}
   <div style="font-weight:700;font-size:13px;margin-bottom:6px;padding-right:${done?'70px':'0'}">${esc(i.d)}</div>
   <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
    <div style="flex:1;height:7px;background:var(--line);border-radius:4px;overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--${progColor});border-radius:4px;transition:width .3s"></div></div>
    <span style="font-size:12px;color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums">${n(prod)} / ${n(i.q)} ${esc(i.u||'')} · ${pct}%</span>
   </div>
   <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:end">
    <div>
     <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">Total diproduksi s/d sekarang</label>
     <input class="inp" type="number" min="0" max="${+i.q}" step="any" name="p_${k}" id="m-p_${k}" value="${prod}" style="width:100%;font-size:18px;font-weight:700;text-align:center;padding:8px 6px">
    </div>
    <div>
     <label style="font-size:11px;color:var(--muted);display:block;margin-bottom:3px">Work Center saat ini</label>
     <select class="sel" name="wc_${k}" style="width:100%;font-size:13px">
      <option value="">– Pilih WC –</option>
      ${wcOpts(itemLastWc)}
     </select>
    </div>
   </div>
   ${!done&&sisa>0?`<div style="font-size:11px;color:var(--muted);margin-top:6px">Sisa: <b>${n(sisa)} ${esc(i.u||'')}</b></div>`:''}
  </div>`;
 }).join('');
 openModal(`Update produksi · SPK ${s.no}`,
  summaryBar+
  `<div class="full" style="display:flex;gap:8px;margin-bottom:10px">
   <button type="button" class="btn sm" data-act="prodall" style="flex:1">✓ Set semua item selesai</button>
  </div>`+
  `<div class="full" style="margin-bottom:6px;font-weight:600;font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px">Progress & Work Center per item</div>`+
  `<div class="full">${itemRows}</div>`+
  `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`+
  fld('Tanggal produksi',inp('tgl',todayS,'date','required'))+
  fld('Catatan / kendala',`<input class="inp" name="alasan" value="${esc(s.alasan||'')}" placeholder="Opsional: kendala, estimasi…">`)+
  `</div>`+
  `<div class="note full" style="margin-top:4px">Tiap item bisa berada di Work Center berbeda · tersinkron realtime</div>`,
  async d=>{
   const items=s.items.map((i,k)=>({...i,prod:Math.min(+i.q,num0(d['p_'+k]))}));
   const tgl=d.tgl||todayS;
   if(tgl>todayS)throw new Error('Tanggal produksi tidak boleh di masa depan.');
   if(tgl<s.tgl)throw new Error('Tanggal produksi sebelum tanggal SPK.');
   // Schema baru: setiap item punya field wc masing-masing
   const logItems=items.map((i,k)=>({d:i.d,q:+i.prod||0,wc:d['wc_'+k]||''}));
   const prodLog=[...(s.prodLog||[]),{tgl,at:new Date().toISOString(),by:ME||null,ket:d.alasan||'',items:logItems}];
   await updDoc('spk',id,{items,alasan:d.alasan||'',prodLog});
  },{submit:'Simpan progres'});
}
/* Form khusus input kendala / alasan keterlambatan — tanpa update qty produksi */
function kendalForm(id){
 const s=byId('spk',id);if(!s)return;
 const c=calc();const x=c.spk[id]||{};
 const infoHtml=`<div class="dw-meta-grid" style="margin-bottom:12px">
  <div class="dw-meta-card"><span>SPK</span><b>${s.no}</b></div>
  <div class="dw-meta-card"><span>Customer</span><b>${esc(s.customer)}</b></div>
  <div class="dw-meta-card"><span>Terlambat</span><b class="crit">${x.late||0} hari</b></div>
  <div class="dw-meta-card"><span>Terkirim</span><b>${Math.round((x.pK||0)*100)}%</b></div>
 </div>`;
 openModal(`Catatan kendala · SPK ${s.no}`,
  infoHtml+
  fld('Kendala / alasan keterlambatan',`<textarea class="inp" name="alasan" rows="3" placeholder="Jelaskan penyebab: misal mesin rusak, material telat datang, revisi order customer…" style="width:100%;resize:vertical">${esc(s.alasan||'')}</textarea>`,true)+
  fld('Tindakan / rencana penyelesaian',`<textarea class="inp" name="tindakan" rows="2" placeholder="Langkah yang sedang/akan diambil…" style="width:100%;resize:vertical">${esc(s.tindakan||'')}</textarea>`,true)+
  `<p class="note full">Catatan ini terlihat di Dashboard, Cek Data, dan Laporan. Untuk update qty produksi gunakan tombol "Update produksi" di drawer SPK.</p>`,
  async d=>{
   const alasan=String(d.alasan||'').trim();
   if(!alasan)throw new Error('Isi alasan / kendala dulu.');
   await updDoc('spk',id,{alasan,tindakan:String(d.tindakan||'').trim()});
   toast('Catatan kendala disimpan');
  },{submit:'Simpan catatan'});
}
function bufForm(id){const r=byId('rm',id);openModal(`Buffer stok · ${esc(rmLabel(r))}`,fld('Buffer stok minimum',inp('buffer',r.buffer,'number','min="0"'),true)+`<div class="note full">Item tampil merah dan masuk daftar "Perlu tindakan" bila stok di bawah angka ini.</div>`,async d=>{await updDoc('rm',id,{buffer:num0(d.buffer)})})}

/* ---------- data hygiene: master data, numbering, dock links ---------- */
const MK={vendor:'mvendor',customer:'mcustomer',supplier:'msupplier',armada:'marmada'};
const MLBL={vendor:'vendor',customer:'customer',supplier:'supplier',armada:'armada'};
const UNKNOWN_V=v=>!v||v==='Vendor Finishing';
const normName=x=>String(x||'').toUpperCase().replace(/^(PT|CV|UD|PERSEROAN KOMANDITER|BAPAK|BPK|IBU)\.?\s+/,'').replace(/[^A-Z0-9]/g,'');
const cleanName=x=>String(x||'').trim().replace(/\s+/g,' ').replace(/\s*-\s*$/,'');
const mList=k=>S[MK[k]].filter(x=>x.aktif!==false);
const mNames=k=>mList(k).map(x=>k==='armada'?x.nopol:x.nama).sort();
const inMaster=(k,name)=>mList(k).some(x=>(k==='armada'?x.nopol:x.nama)===name);
const similarTo=(k,name)=>{const nn=normName(name);return nn?mList(k).find(x=>x.nama!==name&&normName(x.nama)===nn):null};
const dl=(id,arr)=>`<datalist id="${id}">${[...new Set(arr.filter(Boolean))].map(x=>`<option value="${esc(x)}">`).join('')}</datalist>`;
/* Checks a typed name against the master list. Unknown names need a second Save click to be registered;
   a near-duplicate is swapped for the registered spelling so the same company is never stored twice. */
async function ensureMaster(k,raw,form,field,extra={}){
 const name=cleanName(raw);if(!name)throw new Error(`Isi nama ${MLBL[k]}.`);
 if(inMaster(k,name))return name;
 const sim=similarTo(k,name);
 if(sim){const el=form&&form.querySelector(`[name="${field}"]`);if(el)el.value=sim.nama;throw new Error(`Diganti ke "${sim.nama}" (nama terdaftar yang sama). Klik simpan lagi.`)}
 const key=k+':'+name;
 if(form&&form.dataset.okNew!==key){form.dataset.okNew=key;throw new Error(`"${name}" belum ada di Master ${MLBL[k]}. Klik simpan sekali lagi untuk mendaftarkannya.`)}
 await addDoc(MK[k],{nama:name,aktif:true,...extra});return name;
}
async function rememberArmada(nopol,kendaraan,driver){const p=String(nopol||'').toUpperCase().trim();if(!p||inMaster('armada',p))return;try{await addDoc('marmada',{nopol:p,jenis:kendaraan||'',driver:driver||'',milik:'',aktif:true})}catch(_){}}
const DOCFMT={SJV:'SJ-V',SJ:'SJ',RCV:'RCV',PK:'PK',BJM:'BJ-M',BJK:'BJ-K',PR:'PR',OPN:'OPN'};
async function nextDocNo(kind,tgl){
 need();const ym=String(tgl||today()).slice(0,7);const ref=DB.doc(`counter/${kind}-${ym.replace('-','')}`);
 let got=false;for(let i=0;i<6&&!got;i++){try{const r=await ref.acquire({holder:(ME||'u')+HOLDER,ttlMs:6000});got=!r||r.acquired!==false}catch(_){got=true}if(!got)await new Promise(r=>setTimeout(r,300+Math.random()*700))}
 if(!got)throw new Error('Penomoran sedang dipakai pengguna lain. Klik simpan lagi.');
 const g=await ref.get();const nn=(g.exists?(+((g.data()||{}).n)||0):0)+1;await ref.set({n:nn});
 return `${DOCFMT[kind]}/${ym.slice(0,4)}/${ym.slice(5,7)}/${String(nn).padStart(3,'0')}`;
}
const sjTaken=no=>S.vendor.some(v=>v.noSJ===no&&v.status!=='Batal')||S.kirim.some(k=>k.noSJ===no&&k.status!=='Batal');
async function queueDock(o){try{await addDoc('bongkar',{jenis:o.jenis,muatan:o.muatan,pihak:o.pihak||'',ref:o.ref||'',kendaraan:o.kendaraan||'',nopol:(o.nopol||'').toUpperCase(),driver:o.driver||'',tgl:o.tgl||today(),jamMasuk:'',jamMulai:'',jamSelesai:'',status:'Antri',ket:o.ket||'',link:o.link||null,auto:true})}catch(_){}}
const dockCk=(lbl,on=true)=>`<label class="ck full"><input type="checkbox" name="dock" id="m-dock" ${on?'checked':''}> ${lbl}</label>`;
const armadaFields=()=>{
 const arms=mList('armada').filter(a=>a.aktif!==false).sort((a,b)=>String(a.nopol).localeCompare(String(b.nopol)));
 const nopolOpts=`<option value=""></option>${arms.map(a=>`<option value="${esc(a.nopol)}">${esc(a.nopol)}${a.jenis?' · '+esc(a.jenis):''}${a.driver?' · '+esc(a.driver):''}</option>`).join('')}<option value="__manual__">⊕ Input manual…</option>`;
 return `<input type="hidden" name="nopol" id="m-nopol-hid"><div class="frow"><div class="fld full"><label>Armada / Kendaraan</label><select class="sel" id="m-armsel">${nopolOpts}</select></div></div><div id="m-arm-manual" style="display:none"><div class="frow">${fld('No polisi (manual)',inp('nopol_m','','text','placeholder="B 1234 XYZ"'))}${fld('Kendaraan',inp('kendaraan','','text','list="dl-kend"'))}</div>${fld('Driver',inp('driver','','text'),true)}</div>${dl('dl-kend',['Pick-up','Engkel','CDD','CDE','Fuso','Wingbox','Trailer','Ekspedisi',...arms.map(a=>a.jenis).filter(Boolean)])}`;
};
function bindArmada(f){
 const sel=f.querySelector('#m-armsel');if(!sel)return;
 const manDiv=f.querySelector('#m-arm-manual');
 const fillFromArmada=nopol=>{
  const a=mList('armada').find(x=>x.nopol===nopol);
  if(a){
   if(f.kendaraan)f.kendaraan.value=a.jenis||'';
   if(f.driver)f.driver.value=a.driver||'';
  }
 };
 sel.addEventListener('change',()=>{
  if(sel.value==='__manual__'){
   if(manDiv)manDiv.style.display='';
   sel.value='';
  } else {
   if(manDiv)manDiv.style.display='none';
   fillFromArmada(sel.value);
   /* sync hidden nopol field */
   const hid=f.querySelector('[name=nopol]');if(hid)hid.value=sel.value;
  }
 });
}
/* helper: baca nopol dari form data hasil armadaFields() */
const getNopol=d=>String(d.nopol_m||d.nopol||'').toUpperCase().trim();

/* ---------- BONGKAR MUAT board ---------- */
B['bongkar-muat']=()=>{
 const f=F['bongkar-muat'],t=today();
 const list=S.bongkar.filter(b=>{if(b.status==='Batal')return false;if(f.jenis&&b.jenis!==f.jenis)return false;if(f.range==='0')return b.tgl===t||b.status!=='Selesai';if(f.range==='7')return days(b.tgl,t)<=7||b.status!=='Selesai';return true}).sort((a,b)=>(b.tgl+(b.jamMasuk||'')).localeCompare(a.tgl+(a.jamMasuk||'')));
 if(!S.bongkar.filter(b=>b.status!=='Batal').length)return `<section class="panel">${empty('Belum ada catatan bongkar muat','Surat jalan ke vendor, ke customer, dan penerimaan material otomatis masuk antrian di sini. Truk lain bisa dicatat manual. Status Antri → Proses → Selesai terlihat realtime oleh semua orang.',`<button class="btn primary" data-act="newbm">${ic('plus')}Catat kendaraan</button>`)}</section>`;
 const col=(st)=>{const xs=list.filter(b=>b.status===st);return `<div class="col"><h3>${st}${chip(String(xs.length),st==='Antri'?'warn':st==='Proses'?'info':'ok')}</h3>${xs.length?xs.map(b=>`<div class="card click" data-act="openbm" data-id="${b._id}"><div class="row"><span class="dir ${b.jenis==='Unloading'?'in':'out'}">${b.jenis==='Unloading'?'↓ UNLOADING':'↑ LOADING'}</span><span class="plate">${esc(b.nopol||'—')}</span>${b.auto?'<span class="chip plain" title="Dibuat otomatis dari dokumen">auto</span>':''}<span class="muted" style="margin-left:auto">${fd(b.tgl)}</span></div>
  <div><b>${esc(b.muatan)}</b> · ${esc(b.pihak||'')}</div>
  <div class="note">${esc(b.kendaraan||'')}${b.driver?' · '+esc(b.driver):''}${b.ref?' · Ref '+esc(b.ref):''}</div>
  <div class="note">${b.jamMasuk?'Masuk '+esc(b.jamMasuk):'Belum tiba'}${b.jamMulai?' · mulai '+esc(b.jamMulai):''}${b.jamSelesai?' · selesai '+esc(b.jamSelesai)+' ('+dur(b.jamMulai||b.jamMasuk,b.jamSelesai)+')':''}</div>
  ${b.ket?`<div class="note">${esc(b.ket)}</div>`:''}
  ${st!=='Selesai'?`<div class="acts">${st==='Antri'?`<button class="btn sm primary" data-act="bmstep" data-id="${b._id}" data-to="Proses">Mulai ${b.jenis.toLowerCase()}</button>`:`<button class="btn sm primary" data-act="bmstep" data-id="${b._id}" data-to="Selesai">${ic('chk')}Selesai</button>`}<button class="btn sm ghost" data-act="void" data-c="bongkar" data-id="${b._id}">Batalkan</button></div>`:''}
 </div>`).join(''):`<div class="note" style="padding:6px 4px">Kosong</div>`}</div>`};
 return `<div class="kanban">${col('Antri')}${col('Proses')}${col('Selesai')}</div>`;
};

/* ---------- VENDOR list ---------- */
B['vendor']=()=>{
 const c=calc(),f=F.vendor,q=f.q.toLowerCase();
 const xs=c.vend.filter(x=>{if(f.st==='aktif'&&(x.st==='Selesai'||x.st==='Batal'))return false;if(f.st==='selesai'&&x.st!=='Selesai')return false;if(f.vendor&&x.v.vendor!==f.vendor)return false;
  if(q){const s=byId('spk',x.v.spk);if(!`${x.v.noSJ} ${s?.no} ${s?.customer} ${x.v.vendor}`.toLowerCase().includes(q))return false}return true}).sort((a,b)=>f.st==='aktif'?b.age-a.age:b.v.tgl.localeCompare(a.v.tgl));
 const open=c.vend.filter(x=>x.st==='Di Vendor'||x.st==='Kembali Sebagian');const rej=c.vend.reduce((a,x)=>a+(x.st==='Batal'?0:x.rej),0);
 const vTonKgOpen=open.reduce((a,x)=>{const vd=byId('vendor',x.v._id);return a+(vd?.items||[]).reduce((b,it)=>b+(+it.q||0)*(+it.w||0),0)},0);
 const summ=`<div class="summ">${chip(`${open.length} SJ masih di vendor`,'warn')}${chip(`${n(open.reduce((a,x)=>a+x.sisa,0))} btg/pcs belum kembali`,'info')}${vTonKgOpen>0?chip(`${ton(vTonKgOpen)} ton di vendor`,'warn'):''}${chip(`${open.filter(x=>x.age>14).length} lewat 14 hari`,open.some(x=>x.age>14)?'crit':'ok')}${rej?chip(`${n(rej)} reject dari vendor`,'crit'):''}${open.some(x=>UNKNOWN_V(x.v.vendor))?`<a class="chip warn" href="#cek-data">${open.filter(x=>UNKNOWN_V(x.v.vendor)).length} SJ tanpa nama vendor</a>`:''}</div>`;
 const rows=xs.map(x=>{const s=byId('spk',x.v.spk);const act=x.st==='Di Vendor'||x.st==='Kembali Sebagian';const vd=byId('vendor',x.v._id);const wkg=(vd?.items||[]).reduce((b,it)=>b+(+it.q||0)*(+it.w||0),0);return `<tr class="click ${x.st==='Batal'?'void':''}" data-act="openvendor" data-id="${x.v._id}"><td class="mono">${esc(x.v.noSJ||'–')}</td><td>${fd(x.v.tgl)}</td><td>${UNKNOWN_V(x.v.vendor)?'<span class="chip warn">belum diisi</span>':`<b>${esc(x.v.vendor)}</b>`}</td><td>${esc(x.v.proses||'')}</td><td>${s?`SPK ${s.no}<div class="note">${esc(s.customer)}</div>`:'–'}</td><td class="num">${n(x.out)}</td><td class="num">${n(x.back)}${x.rej?`<div class="note" style="color:var(--crit)">${n(x.rej)} reject</div>`:''}</td><td class="num big">${n(x.sisa)}${wkg?`<div class="note">${ton(wkg)} ton</div>`:''}</td><td class="num" style="${act&&x.age>14?'color:var(--crit);font-weight:600':act&&x.age>7?'color:var(--warn);font-weight:600':''}">${act?x.age+' hr':'–'}</td><td>${stChip(x.st)}</td><td>${act?`<button class="btn sm" data-act="terima" data-id="${x.v._id}">Terima kembali</button>`:''}</td></tr>`}).join('');
 return `<section class="panel"><div class="pbody">${summ}</div>${xs.length?`<div class="tbl-wrap"><table><thead><tr><th>No SJ</th><th>Tgl kirim</th><th>Vendor</th><th>Proses</th><th>SPK / Customer</th><th class="num">Kirim</th><th class="num">Kembali</th><th class="num">Sisa</th><th class="num">Umur</th><th>Status</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>`:empty(f.st==='aktif'?'Tidak ada barang di vendor':'Tidak ada data yang cocok','Kiriman barang setengah jadi ke vendor finishing akan tampil di sini dengan umur harinya.')}</section>`;
};

/* ---------- drawers ---------- */
const MVL={masuk:'Masuk',keluar:'Keluar',opname:'Opname',koreksi:'Koreksi'};
function kartu(g,id){openDrawer(()=>{const it=byId(g,id);if(!it)return null;const c=calc();const s=c.stock[g][id];const mv=S.mutasi.filter(m=>m.gudang===g&&m.item===id).sort((a,b)=>(a.tgl+a.at).localeCompare(b.tgl+b.at));
 let run=+it.stokAwal||0;const rows=[`<tr><td>${fd(it.tglStokAwal)}</td><td>${chip('Stok awal','plain')}</td><td class="num">${n(run)}</td><td class="num">${n(run)}</td><td class="muted">Import Excel</td><td></td></tr>`].concat(mv.map(m=>{run+= +m.delta||0;return `<tr class="${m.dikoreksi?'void':''}"><td>${fd(m.tgl)}</td><td>${stChip(MVL[m.jenis]||m.jenis)}</td><td class="num" style="color:${m.delta<0?'var(--crit)':'var(--ok)'}">${m.delta>0?'+':''}${n(m.delta)}</td><td class="num"><b>${n(run)}</b></td><td>${m.noDok?`<span class="mono">${esc(m.noDok)}</span> · `:''}${esc(m.ref||'')}${m.pihak?' · '+esc(m.pihak):''}<div class="note">${esc(m.ket||'')} · ${who(m.by)}</div></td><td>${!m.dikoreksi&&m.jenis!=='koreksi'&&CAN?`<button class="btn sm ghost" data-act="koreksi" data-id="${m._id}">Koreksi</button>`:''}</td></tr>`}));
 const[st,cl]=stockState(it,s);
 return {t:esc(g==='rm'?rmLabel(it):fgLabel(it)),s:`Kartu stok · ${g==='rm'?'Gudang bahan baku':'Gudang barang jadi'}`,b:`<div class="kv"><div><span>Stok sekarang</span><b class="big">${n(s)} ${esc(it.satuan)}</b></div>${g==='rm'?`<div><span>Buffer</span><b>${n(it.buffer)}</b></div>`:''}<div><span>Status</span><b>${chip(st,cl)}</b></div><div><span>Jumlah mutasi</span><b>${mv.length}</b></div></div>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary sm" data-act="mv" data-g="${g}" data-j="masuk" data-item="${id}">${ic('inb')}Masuk</button><button class="btn sm" data-act="mv" data-g="${g}" data-j="keluar" data-item="${id}">${ic('outb')}Keluar</button><button class="btn sm" data-act="mv" data-g="${g}" data-j="opname" data-item="${id}">${ic('chk')}Opname</button>${g==='rm'?`<button class="btn sm ghost" data-act="editbuf" data-id="${id}">Ubah buffer</button>`:''}</div>
 <div class="tbl-wrap"><table><thead><tr><th>Tanggal</th><th>Jenis</th><th class="num">Qty</th><th class="num">Saldo</th><th>Dokumen / referensi</th><th></th></tr></thead><tbody>${rows.reverse().join('')}</tbody></table></div>
 <p class="note">Transaksi tidak bisa dihapus. Salah input diperbaiki dengan <b>Koreksi</b>: sistem membuat transaksi pembalik, riwayat aslinya tetap tercatat.</p>`}})}
function vendorDrawer(id){openDrawer(()=>{const v=byId('vendor',id);if(!v)return null;const x=calc().vend.find(y=>y.v._id===id);const s=byId('spk',v.spk);const act=x.st==='Di Vendor'||x.st==='Kembali Sebagian';
 return {t:`${esc(v.noSJ||'Surat jalan')} → ${UNKNOWN_V(v.vendor)?'(vendor belum diisi)':esc(v.vendor)}`,s:`${esc(v.proses||'')} · ${s?'SPK '+s.no+' · '+esc(s.customer):''}`,b:`<div class="kv"><div><span>Tgl kirim</span><b>${fd(v.tgl)}</b></div><div><span>Target kembali</span><b>${fd(v.target)}</b></div><div><span>Umur</span><b>${act?x.age+' hari':'–'}</b></div><div><span>Status</span><b>${stChip(x.st)}</b></div><div><span>Kendaraan</span><b>${esc(v.nopol||'–')}</b></div></div>
 ${v.batal?`<div class="ro">Dibatalkan ${fd(v.batal.at)} oleh ${who(v.batal.by)}: ${esc(v.batal.alasan)}</div>`:''}
 <div class="tbl-wrap"><table><thead><tr><th>Item</th><th class="num">Kirim</th><th class="num">Kembali OK</th><th class="num">Reject</th><th class="num">Sisa di vendor</th></tr></thead><tbody>${(v.items||[]).map(i=>`<tr><td>${esc(i.d)}</td><td class="num">${n(i.q)} ${esc(i.u)}</td><td class="num">${n(i.kembali)}</td><td class="num" style="${i.reject?'color:var(--crit);font-weight:600':''}">${n(i.reject||0)}</td><td class="num big">${n(Math.max(0,i.q-(+i.kembali||0)-(+i.reject||0)))}</td></tr>`).join('')}</tbody></table></div>
 ${(v.riwayat||[]).length?`<div class="note">${v.riwayat.map(r=>`Diterima ${fd(r.tgl)}: ${n(r.qty)} OK${r.rej?`, ${n(r.rej)} reject`:''} · ${who(r.by)}${r.ket?' · '+esc(r.ket):''}`).join('<br>')}</div>`:''}${v.ket?`<div class="note">${esc(v.ket)}</div>`:''}
 <div class="sec-lbl">Preview Dokumen</div>
 ${sjvPreview(v,s)}
 <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:4px"><span class="docn">Surat Jalan Vendor</span><button class="btn sm ghost" data-act="doc" data-kind="sjv" data-ref="${id}" data-fmt="xlsx">${ic('dl')}Excel</button><button class="btn sm ghost" data-act="doc" data-kind="sjv" data-ref="${id}" data-fmt="pdf">${ic('file')}PDF</button>${vReturns(v).map(r=>`<span class="docn">BTB ${r.tgl?fd(r.tgl):'(lama)'}</span><button class="btn sm ghost" data-act="doc" data-kind="btb" data-ref="${id}|${r.k}" data-fmt="xlsx">${ic('dl')}Excel</button><button class="btn sm ghost" data-act="doc" data-kind="btb" data-ref="${id}|${r.k}" data-fmt="pdf">${ic('file')}PDF</button>`).join('')}</div>
 <div style="display:flex;gap:8px;flex-wrap:wrap">${act?`<button class="btn primary sm" data-act="terima" data-id="${id}">Terima kembali</button>`:''}${UNKNOWN_V(v.vendor)&&v.status!=='Batal'?`<button class="btn sm" data-act="setvendor" data-id="${id}">Isi nama vendor</button>`:''}${v.status!=='Batal'&&x.back+x.rej===0?`<button class="btn sm danger" data-act="void" data-c="vendor" data-id="${id}">Batalkan SJ</button>`:''}</div>`}})}
function sjvPreview(v,s){
 const mv=mList('vendor').find(x=>x.nama===v.vendor)||{};
 const items=v.items||[];
 const totalQty=sumBy(items,i=>+i.q||0);
 const metaRows=[
  ['Kepada',v.vendor||'-'],
  ['Alamat',mv.alamat||'-'],
  ['Tanggal',tglLong(v.tgl)],
  ['Target kembali',v.target?tglLong(v.target):'-'],
  ['Proses',v.proses||'-'],
  ['Ref SPK',s?('SPK '+s.no+(s.customer?' · '+s.customer:'')):'-'],
  ['Kendaraan',[v.kendaraan,v.nopol].filter(Boolean).join(' · ')||'-'],
  ['Driver',v.driver||'-'],
 ];
 return `<div class="sj-prev">
  <div class="sj-prev-head">
   <div class="sj-prev-co"><div class="sj-prev-logo">PT MNI</div><div class="sj-prev-coname">PT Mitra Nusa Internasional</div></div>
   <div class="sj-prev-title"><div class="sj-prev-doctitle">SURAT JALAN VENDOR</div><div class="sj-prev-docno">No: ${esc(v.noSJ||'-')}</div></div>
  </div>
  <table class="sj-prev-meta">
   ${metaRows.map(([l,val])=>`<tr><td>${esc(l)}</td><td>:</td><td>${esc(val)}</td></tr>`).join('')}
  </table>
  <table class="sj-prev-tbl">
   <thead><tr><th style="width:6%">No</th><th>Nama Barang</th><th style="width:12%">Qty</th><th style="width:10%">Satuan</th><th style="width:18%">Keterangan</th></tr></thead>
   <tbody>
    ${items.map((i,idx)=>`<tr><td style="text-align:center">${idx+1}</td><td>${esc(i.d)}</td><td style="text-align:right">${n(i.q)}</td><td style="text-align:center">${esc(i.u||'')}</td><td></td></tr>`).join('')}
    <tr class="sj-prev-foot"><td colspan="2" style="text-align:right;font-weight:600">TOTAL</td><td style="text-align:right;font-weight:600">${n(totalQty)}</td><td colspan="2"></td></tr>
   </tbody>
  </table>
  ${v.ket?`<div class="sj-prev-note">Catatan: ${esc(v.ket)}</div>`:''}
  ${v.batal?`<div class="sj-prev-note" style="color:var(--crit)">DIBATALKAN: ${esc(v.batal.alasan)}</div>`:''}
  <div class="sj-prev-signs">
   <div class="sj-prev-sign"><div class="sj-prev-signlbl">Hormat kami,</div><div class="sj-prev-signco">PT Mitra Nusa Internasional</div><div class="sj-prev-signline"></div><div class="sj-prev-signname">( _________________ )</div></div>
   <div class="sj-prev-sign"><div class="sj-prev-signlbl">Pengemudi</div><div class="sj-prev-signco">&nbsp;</div><div class="sj-prev-signline"></div><div class="sj-prev-signname">( ${esc(v.driver||'_________________')} )</div></div>
   <div class="sj-prev-sign"><div class="sj-prev-signlbl">Diterima oleh,</div><div class="sj-prev-signco">${esc(v.vendor||'Vendor')}</div><div class="sj-prev-signline"></div><div class="sj-prev-signname">( _________________ )</div></div>
  </div>
 </div>`;
}
function sjPreview(k,s){
 const cu=mList('customer').find(x=>x.nama===k.customer)||{};
 const items=k.items||[];
 const totalQty=sumBy(items,i=>+i.q||0);
 const metaRows=[
  ['Kepada',k.customer||'-'],
  ['Alamat',cu.alamat||'-'],
  ['Tanggal',tglLong(k.tgl)],
  ['No PO',s&&s.po||'-'],
  ['Ref SPK',s?(s.nomor||(s.no?String(s.no):'-')):'-'],
  ['Kendaraan',[k.kendaraan,k.nopol].filter(Boolean).join(' · ')||'-'],
  ['Driver',k.driver||'-'],
 ];
 return `<div class="sj-prev">
  <div class="sj-prev-head">
   <div class="sj-prev-co"><div class="sj-prev-logo">PT MNI</div><div class="sj-prev-coname">PT Mitra Nusa Internasional</div></div>
   <div class="sj-prev-title"><div class="sj-prev-doctitle">SURAT JALAN</div><div class="sj-prev-docno">No: ${esc(k.noSJ||'-')}</div></div>
  </div>
  <table class="sj-prev-meta">
   ${metaRows.map(([l,v])=>`<tr><td>${esc(l)}</td><td>:</td><td>${esc(v)}</td></tr>`).join('')}
  </table>
  <table class="sj-prev-tbl">
   <thead><tr><th style="width:6%">No</th><th>Nama Barang</th><th style="width:12%">Qty</th><th style="width:10%">Satuan</th><th style="width:18%">Keterangan</th></tr></thead>
   <tbody>
    ${items.map((i,idx)=>`<tr><td style="text-align:center">${idx+1}</td><td>${esc(i.d)}</td><td style="text-align:right">${n(i.q)}</td><td style="text-align:center">${esc(i.u||'')}</td><td></td></tr>`).join('')}
    <tr class="sj-prev-foot"><td colspan="2" style="text-align:right;font-weight:600">TOTAL</td><td style="text-align:right;font-weight:600">${n(totalQty)}</td><td colspan="2"></td></tr>
   </tbody>
  </table>
  ${k.ket?`<div class="sj-prev-note">Catatan: ${esc(k.ket)}</div>`:''}
  ${k.batal?`<div class="sj-prev-note" style="color:var(--red)">DIBATALKAN: ${esc(k.batal.alasan)}</div>`:''}
  <div class="sj-prev-signs">
   <div class="sj-prev-sign"><div class="sj-prev-signlbl">Hormat kami,</div><div class="sj-prev-signco">PT Mitra Nusa Internasional</div><div class="sj-prev-signline"></div><div class="sj-prev-signname">( _________________ )</div></div>
   <div class="sj-prev-sign"><div class="sj-prev-signlbl">Pengemudi</div><div class="sj-prev-signco">&nbsp;</div><div class="sj-prev-signline"></div><div class="sj-prev-signname">( ${esc(k.driver||'_________________')} )</div></div>
   <div class="sj-prev-sign"><div class="sj-prev-signlbl">Diterima oleh,</div><div class="sj-prev-signco">${esc(k.customer||'Customer')}</div><div class="sj-prev-signline"></div><div class="sj-prev-signname">( _________________ )</div></div>
  </div>
 </div>`;
}
function kirimDrawer(id){openDrawer(()=>{const k=byId('kirim',id);if(!k)return null;const s=byId('spk',k.spk);
 return {t:`${esc(k.noSJ||'Surat jalan')} · ${esc(k.customer)}`,s:s?`SPK ${s.no} · PO ${esc(s.po||'–')}`:'',b:`
 <div class="kv"><div><span>Tanggal</span><b>${fd(k.tgl)}</b></div><div><span>Status</span><b>${stChip(k.status)}</b></div><div><span>Kendaraan</span><b>${esc(k.kendaraan||'–')} ${esc(k.nopol||'')}</b></div><div><span>Driver</span><b>${esc(k.driver||'–')}</b></div>${k.tglTerima?`<div><span>Diterima</span><b>${fd(k.tglTerima)}</b></div>`:''}</div>
 ${k.batal?`<div class="ro">Dibatalkan ${fd(k.batal.at)} oleh ${who(k.batal.by)}: ${esc(k.batal.alasan)}</div>`:''}
 <div class="sec-lbl">Preview Dokumen</div>
 ${sjPreview(k,s)}
 <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:4px"><span class="docn">Surat Jalan</span><button class="btn sm ghost" data-act="doc" data-kind="sjc" data-ref="${id}" data-fmt="xlsx">${ic('dl')}Excel</button><button class="btn sm ghost" data-act="doc" data-kind="sjc" data-ref="${id}" data-fmt="pdf">${ic('file')}PDF</button></div>
 ${k.status!=='Batal'?`<div style="display:flex;gap:8px"><button class="btn sm danger" data-act="void" data-c="kirim" data-id="${id}">Batalkan surat jalan</button></div>`:''}`}})}

function spkDrawer(id){openDrawer(()=>{const s=byId('spk',id);if(!s)return null;const x=calc().spk[id];
 /* --- tab Info --- */
 const pPct=Math.round(x.pP*100);const kPct=Math.round(x.pK*100);
 const tabInfo=`
  <div class="dw-meta-grid">
   <div class="dw-meta-card"><span>Tanggal SPK</span><b>${fd(s.tgl)}</b></div>
   <div class="dw-meta-card"><span>Due date</span><b>${fd(s.due)}${x.late?` <span style="color:var(--crit);font-size:12px">+${x.late}hk telat</span>`:''}</b></div>
   <div class="dw-meta-card"><span>Lead time</span><b>${esc(s.lead||'–')}</b></div>
   <div class="dw-meta-card"><span>Material / tebal</span><b>${esc(s.material||'–')}${s.tebal?' · '+esc(s.tebal):''}</b></div>
   <div class="dw-meta-card"><span>No order / PO</span><b>${esc(s.nomor||'–')}</b></div>
   <div class="dw-meta-card"><span>Sales</span><b>${esc(s.sales||'–')}</b></div>
  </div>
  <div class="dw-prog-row">
   <div class="dw-prog-card"><label>Progres Produksi</label><div class="dw-prog-bar"><i style="width:${pPct}%"></i></div><div class="dw-prog-pct">${pPct}%</div><div class="dw-prog-sub">${n(x.prod)} dari ${n(x.q)} item diproduksi</div></div>
   <div class="dw-prog-card"><label>Terkirim ke Customer</label><div class="dw-prog-bar${x.pK>=1?' ok':''}"><i style="width:${kPct}%"></i></div><div class="dw-prog-pct">${kPct}%</div><div class="dw-prog-sub">${n(x.kirim)} dari ${n(x.q)} item dikirim</div></div>
  </div>
  ${s.alasan?`<div class="dw-note">${ic('info')} <b>Catatan:</b> ${esc(s.alasan)}</div>`:''}
  <div>
   <div class="dw-section-title">Aksi SPK</div>
   <div class="dw-btns">
    <button class="btn sm primary" data-act="spksheet" data-id="${id}">${ic('spk')}Lihat format SPK</button>
    <button class="btn sm" data-act="spkedit" data-id="${id}">Edit SPK</button>
    <button class="btn sm" data-act="spkdup" data-id="${id}">Duplikat</button>
    <button class="btn sm" data-act="spkxlsx" data-id="${id}">${ic('dl')}Excel</button>
    <button class="btn sm" data-act="doc" data-kind="spk" data-ref="${id}" data-fmt="pdf">${ic('file')}PDF</button>
    <div class="sep"></div>
    <button class="btn sm" data-act="prod" data-id="${id}">Update produksi</button>
    <button class="btn sm warn" data-act="newvendor" data-spk="${id}">${ic('outb')}Kirim ke vendor</button>
    <button class="btn sm ok" data-act="newkirim" data-spk="${id}">${ic('truck')}Kirim ke customer</button>
   </div>
  </div>`;
 /* --- tab Items --- */
 const rows=x.lines.map((l)=>{const sisa=Math.max(0,l.q-l.kirim);return `<tr>
  <td><div class="item-name">${esc(l.d)}</div>${l.g?`<div class="item-note">${esc(l.g)}</div>`:''}</td>
  <td class="num"><b>${n(l.q)}</b><div style="font-size:10.5px;color:var(--muted)">${esc(l.u)}</div></td>
  <td class="num">${n(l.prodEff)}</td>
  <td class="num">${n(l.vOut)}</td>
  <td class="num">${n(l.vBack)}</td>
  <td class="num">${n(l.kirim)}</td>
  <td class="num ${sisa>0?'sisa-kur':'sisa-ok'}">${n(sisa)}</td>
 </tr>`}).join('');
 const tabItems=`<div class="tbl-wrap"><table class="dw-tbl"><thead><tr>
  <th>Item</th><th class="num">Order</th><th class="num">Produksi</th><th class="num">Ke vendor</th><th class="num">Kembali</th><th class="num">Terkirim</th><th class="num">Sisa</th>
 </tr></thead><tbody>${rows}</tbody></table></div>`;
 /* --- tab Alur --- */
 const tabAlur=`<div><div class="dw-section-title">Alur proses &amp; dokumen</div>${spkFlowHtml(id)}</div>`;
 /* header badge */
 const badge=`<span class="dw-badge">${stChip(x.st)}</span>`;
 return {
  t:`SPK ${s.no} · ${esc(s.customer)}`,
  s:`${badge}${esc(s.nomor||'')} · PO ${esc(s.po||'–')} · Sales ${esc(s.sales||'–')}`,
  cls:'dw-tabbed',
  b:`<div class="dw-tabs">
   <button class="dw-tab on" data-act="dwtab" data-tab="info">Info</button>
   <button class="dw-tab" data-act="dwtab" data-tab="items">Items <span style="font-size:11px;background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:1px 7px;margin-left:3px">${x.lines.length}</span></button>
   <button class="dw-tab" data-act="dwtab" data-tab="alur">Alur &amp; Dokumen</button>
  </div>
  <div class="dw-pane on" id="dw-pane-info">${tabInfo}</div>
  <div class="dw-pane" id="dw-pane-items">${tabItems}</div>
  <div class="dw-pane" id="dw-pane-alur">${tabAlur}</div>`
 }
})}
function newItemForm(g){
 if(g==='rm')openModal('Item bahan baku baru',fld('Material',inp('item','Plat SPHC','text','list="dl-mat" required'))+fld('Ukuran (t × l × p mm)',inp('ukuran','','text','placeholder="1.2×1200×2400" required'))+fld('Satuan',inp('satuan','Lembar'))+fld('Buffer stok',inp('buffer','0','number','min="0"'))+fld('Stok awal',inp('stokAwal','0','number','min="0"'))+`<datalist id="dl-mat">${[...new Set(S.rm.map(r=>r.item))].map(x=>`<option value="${esc(x)}">`).join('')}</datalist>`,
  async d=>{if(!d.item||!d.ukuran)throw new Error('Material dan ukuran wajib diisi.');const itm=d.item.trim(),ukr=d.ukuran.trim();const dup=S.rm.find(r=>r.item.trim().toLowerCase()===itm.toLowerCase()&&r.ukuran.trim().toLowerCase()===ukr.toLowerCase());if(dup)throw new Error(`Item sudah ada: "${itm} – ${ukr}". Gunakan item yang sudah ada atau ubah spesifikasi.`);await addDoc('rm',{item:itm,ukuran:ukr,satuan:d.satuan||'Lembar',buffer:num0(d.buffer),stokAwal:num0(d.stokAwal),tglStokAwal:today()})});
 else openModal('Produk barang jadi baru',fld('Kategori',inp('kategori','Cable Tray','text','list="dl-kat" required'))+fld('Type',inp('type','STU','text','placeholder="STU / STC / SLU / SLHD"'))+fld('Ukuran (W×H)',inp('ukuran','','text','placeholder="200x100" required'))+fld('Panjang (mm)',inp('panjang','3000','number'))+fld('Finishing',inp('finishing','HDG','text','list="dl-fin"'))+fld('Tebal (mm)',inp('tebal','1.8'))+fld('Satuan',inp('satuan','Btg'))+fld('Stok awal',inp('stokAwal','0','number','min="0"'))+`<datalist id="dl-kat">${[...new Set(S.fg.map(r=>r.kategori))].map(x=>`<option value="${esc(x)}">`).join('')}</datalist><datalist id="dl-fin">${[...new Set(S.fg.map(r=>r.finishing))].map(x=>`<option value="${esc(x)}">`).join('')}</datalist>`,
  async d=>{if(!d.ukuran)throw new Error('Ukuran wajib diisi.');await addDoc('fg',{kategori:d.kategori,type:d.type,ukuran:d.ukuran,panjang:num0(d.panjang)||d.panjang,finishing:d.finishing,tebal:d.tebal,satuan:d.satuan||'Btg',stokAwal:num0(d.stokAwal),tglStokAwal:today(),ket:''})});
}
function render(){renderNav();renderTools();renderBody()}
/* ---------- forms ---------- */
function mvLine(g,i,sel,q){return `<tr data-ln="${i}"><td>${itemSelect(g,sel).replace('id="m-item" name="item"',`id="m-item-${i}" name="item_${i}"`)}</td><td class="num"><input class="inp" type="number" min="0" step="any" name="qty_${i}" id="m-qty-${i}" inputmode="decimal" value="${q??''}"></td><td class="note" data-stk></td><td><button type="button" class="ibtn" data-act="mvdel" aria-label="Hapus baris">×</button></td></tr>`}
function mvForm(g,j,item,prId){
 const PRD=prId?byId('pr',prId):null;
 const jl={masuk:g==='rm'?'Terima material':'Barang masuk',keluar:g==='rm'?'Pakai untuk produksi':'Barang keluar',opname:'Stock opname'}[j];
 const kind=g==='rm'?(j==='masuk'?'RCV':'PK'):(j==='masuk'?'BJM':'BJK');
 if(j==='opname'){openModal(`Stock opname · ${g==='rm'?'Bahan baku':'Barang jadi'}`,fld('Item',itemSelect(g,item),true)+fld('Tanggal',inp('tgl',today(),'date','required'))+fld('Stok fisik hasil hitung',inp('fisik','','number','min="0" step="any" required inputmode="decimal"'))+fld('Alasan selisih',inp('ket','','text','required placeholder="mis. opname akhir bulan, plat penyok dipisah"'),true)+'<div class="note full" id="m-info"></div>',
  async d=>{if(!d.item)throw new Error('Pilih item dulu.');if(d.fisik==='')throw new Error('Isi stok fisik.');if(!String(d.ket).trim())throw new Error('Isi alasan selisih agar opname bisa diaudit.');const cur=calc().stock[g][d.item];const delta=num0(d.fisik)-cur;if(delta===0)throw new Error('Stok fisik sama dengan sistem, tidak ada penyesuaian.');
   await addDoc('mutasi',{gudang:g,item:d.item,jenis:'opname',delta,tgl:d.tgl||today(),ref:'',spk:'',pihak:'',ket:d.ket,noDok:'',stokSistem:cur,stokFisik:num0(d.fisik)})},
  {submit:'Simpan opname',mount:f=>{const upd=()=>{const id=f.item.value;$('#m-info').textContent=id?`Stok sistem saat ini: ${n(calc().stock[g][id])}`:''};f.item.addEventListener('change',upd);upd()}});return}
 const needSpk=g==='rm'&&j==='keluar';
 const pihakFld=g==='rm'&&j==='masuk'?fld('Supplier',inp('pihak','','text','list="dl-sup" required autocomplete="off"'))+dl('dl-sup',mNames('supplier'))
  :g==='fg'&&j==='keluar'?fld('Customer / tujuan',inp('pihak','','text','list="dl-custm" autocomplete="off"'))+dl('dl-custm',mNames('customer'))
  :g==='rm'
   ?fld('Diserahkan ke (bagian / mesin)',inp('pihak','','text','list="dl-pihak" autocomplete="off"'))+dl('dl-pihak',[...new Set([...S.mutasi.filter(m=>m.gudang==='rm'&&m.jenis==='keluar').map(m=>m.pihak).filter(Boolean),'Produksi','Shearing','Bending','Punching','BJP','Rolling','Galvindo','CNC Laser','Welding'])])
   :fld('Asal (proses / vendor finishing)',inp('pihak','','text','list="dl-pihak" autocomplete="off"'))+dl('dl-pihak',[...new Set([...S.mutasi.filter(m=>m.gudang==='fg'&&m.jenis==='masuk').map(m=>m.pihak).filter(Boolean),'Produksi',...mNames('vendor')])]);
 openModal(`${jl} · ${g==='rm'?'Bahan baku':'Barang jadi'}`,
  fld('Tanggal',inp('tgl',today(),'date','required'))+fld('No dokumen',`<input class="inp" id="m-nodok" value="Otomatis: ${DOCFMT[kind]}/${today().slice(0,4)}/${today().slice(5,7)}/…" disabled>`)+
  fld(needSpk?'SPK (wajib)':'SPK terkait',spkSelect('',true).replace('— tanpa SPK —',needSpk?'— Non-SPK (wajib isi keterangan) —':'— tanpa SPK —'))+
  fld(j==='masuk'&&g==='rm'?'No PO / SJ supplier':'Referensi (SJ / PO)',inp('ref'))+pihakFld+
  `<div class="full tbl-wrap"><table class="lines mvl"><thead><tr><th>Item</th><th class="num">Qty</th><th>Stok sistem</th><th></th></tr></thead><tbody id="m-mvl">${PRD?PRD.items.filter(i=>(+i.q||0)>(+i.qTerima||0)).map((i,k)=>mvLine(g,k,i.item,(+i.q||0)-(+i.qTerima||0))).join(''):mvLine(g,0,item)}</tbody></table><button type="button" class="btn sm ghost" data-act="mvadd" data-g="${g}" style="margin-top:6px">${ic('plus')}Item lain di dokumen yang sama</button></div>`+
  fld('Keterangan',inp('ket'),true)+(g==='rm'&&j==='masuk'?dockCk('Masukkan ke antrian Unloading di Bongkar Muat')+armadaFields():''),
  async (d,form)=>{
   const lines=[...form.querySelectorAll('#m-mvl tr')].map(tr=>{const i=tr.dataset.ln;return {item:d['item_'+i],q:num0(d['qty_'+i])}}).filter(l=>l.item||l.q);
   if(!lines.length)throw new Error('Tambahkan minimal satu item.');
   if(lines.some(l=>!l.item))throw new Error('Ada baris tanpa item.');if(lines.some(l=>l.q<=0))throw new Error('Setiap item butuh jumlah lebih dari 0.');
   if(needSpk&&!d.spk&&!String(d.ket).trim())throw new Error('Pemakaian tanpa SPK wajib diberi keterangan (mis. sample, perbaikan).');
   if(j==='keluar'){const tot={};lines.forEach(l=>tot[l.item]=(tot[l.item]||0)+l.q);for(const [it,q] of Object.entries(tot)){const cur=calc().stock[g][it];if(q>cur)throw new Error(`Stok ${g==='rm'?rmLabel(byId('rm',it)):fgLabel(byId('fg',it))} tidak cukup: tersedia ${n(cur)}, diminta ${n(q)}.`)}}
   let pihak=d.pihak||'';
   if(g==='rm'&&j==='masuk')pihak=await ensureMaster('supplier',pihak,form,'pihak');
   if(g==='fg'&&j==='keluar'&&pihak)pihak=await ensureMaster('customer',pihak,form,'pihak');
   const t=d.tgl||today();const noDok=await nextDocNo(kind,t);const s=d.spk?byId('spk',d.spk):null;
   for(const l of lines)await addDoc('mutasi',{gudang:g,item:l.item,jenis:j,delta:j==='masuk'?l.q:-l.q,tgl:t,noDok,ref:[s?'SPK '+s.no:'',d.ref||''].filter(Boolean).join(' · '),spk:d.spk||'',pihak,ket:d.ket||'',pr:PRD?prId:''});
   if(PRD){const got={};lines.forEach(l=>got[l.item]=(got[l.item]||0)+l.q);const items=PRD.items.map(i=>({...i,qTerima:(+i.qTerima||0)+(got[i.item]||0)}));const done=items.every(i=>i.qTerima>=i.q);await updDoc('pr',prId,{items,status:done?'Selesai':PRD.status==='Diajukan'?'Dipesan':PRD.status,supplier:PRD.supplier||pihak})}
   if(d.dock){const nopolM=getNopol(d);await queueDock({jenis:'Unloading',muatan:'Bahan Baku',pihak,ref:[noDok,d.ref].filter(Boolean).join(' · '),nopol:nopolM,kendaraan:d.kendaraan,driver:d.driver,tgl:t,link:{c:'mutasi',noDok}});rememberArmada(nopolM,d.kendaraan,d.driver)}
   toast(`${noDok} tersimpan · ${lines.length} item`);
  },{submit:PRD?`Terima ${PRD.noPR}`:jl,done:' ',mount:f=>{if(PRD){if(f.pihak&&PRD.supplier)f.pihak.value=PRD.supplier;if(f.ref)f.ref.value=PRD.noPR}const upd=()=>f.querySelectorAll('#m-mvl tr').forEach(tr=>{const v=tr.querySelector('select').value;tr.querySelector('[data-stk]').textContent=v?n(calc().stock[g][v]):''});f.addEventListener('change',e=>{if(e.target.matches('#m-mvl select'))upd()});upd();bindArmada(f)}});
}
function linesTable(spkId,mode){
 if(!spkId)return '<div class="note">Pilih SPK untuk menampilkan item.</div>';
 const x=calc().spk[spkId];if(!x)return '';
 return `<div class="tbl-wrap"><table class="lines"><thead><tr><th>Item</th><th class="num">Order</th><th class="num">${mode==='vendor'?'Sudah ke vendor':'Sudah terkirim'}</th><th class="num">Sisa</th><th class="num">Qty ${mode==='vendor'?'kirim ke vendor':'kirim sekarang'}</th></tr></thead><tbody>${x.lines.map((l,i)=>{const done=mode==='vendor'?l.vOut:l.kirim;const sisa=Math.max(0,l.q-done);return `<tr><td>${esc(l.d)}</td><td class="num">${n(l.q)} ${esc(l.u)}</td><td class="num">${n(done)}</td><td class="num"><b>${n(sisa)}</b></td><td class="num"><input class="inp" type="number" min="0" step="any" name="ln_${i}" id="m-ln_${i}" value="${sisa||''}" data-max="${sisa}"></td></tr>`}).join('')}</tbody></table></div><div class="note">Kosongkan item yang tidak ikut. Qty tidak boleh melebihi sisa, kecuali dicentang di bawah.</div>`;
}
const pickLines=(spkId,d)=>calc().spk[spkId].lines.map((l,i)=>({d:l.d,u:l.u,q:num0(d['ln_'+i])})).filter(l=>l.q>0);
function checkCap(spkId,d,mode){if(d.over)return;const x=calc().spk[spkId];x.lines.forEach((l,i)=>{const q=num0(d['ln_'+i]);const sisa=Math.max(0,l.q-(mode==='vendor'?l.vOut:l.kirim));if(q>sisa)throw new Error(`"${l.d}": ${n(q)} melebihi sisa ${n(sisa)}. Centang ${mode==='vendor'?'kirim ulang / rework':'kirim lebih'} bila memang disengaja.`)})}
function vendorForm(spk){
 openModal('Kirim barang setengah jadi ke vendor',
  fld('Vendor finishing',inp('vendor','','text','list="dl-ven" required autocomplete="off" placeholder="Pilih dari master vendor"'))+fld('Proses',inp('proses','','text','list="dl-pro" placeholder="HDG / ELG / Powder Coating"'))+
  fld('Tanggal kirim',inp('tgl',today(),'date'))+fld('Target kembali',inp('target','','date'))+
  fld('No surat jalan',inp('noSJ','','text','placeholder="Kosongkan = otomatis SJ-V/'+today().slice(0,4)+'/'+today().slice(5,7)+'/…"'))+
  fld('SPK',spkSelect(spk||'',true,true),true)+`<div class="full" id="m-lines">${linesTable(spk,'vendor')}</div>`+
  `<label class="ck full"><input type="checkbox" name="over" id="m-over"> Kirim ulang / rework (boleh melebihi sisa) — wajib isi keterangan</label>`+fld('Keterangan',inp('ket'),true)+
  dockCk('Masukkan ke antrian Loading di Bongkar Muat')+armadaFields()+
  dl('dl-ven',mNames('vendor'))+dl('dl-pro',['HDG','ELG','Powder Coating','PDC White','PDC Orange','PDC Blue','Non Finishing']),
  async (d,form)=>{if(!d.spk)throw new Error('Pilih SPK.');checkCap(d.spk,d,'vendor');if(d.over&&!String(d.ket).trim())throw new Error('Isi keterangan untuk kirim ulang / rework.');
   const items=pickLines(d.spk,d).map(l=>({...l,kembali:0,reject:0}));if(!items.length)throw new Error('Isi qty minimal satu item.');
   const vendor=await ensureMaster('vendor',d.vendor,form,'vendor',{proses:d.proses||''});
   const t=d.tgl||today();let noSJ=String(d.noSJ||'').trim();if(noSJ&&sjTaken(noSJ))throw new Error(`No SJ ${noSJ} sudah dipakai.`);if(!noSJ)noSJ=await nextDocNo('SJV',t);
   const s=byId('spk',d.spk);
   const nopolV=getNopol(d);
   await addDoc('vendor',{vendor,proses:d.proses||'',tgl:t,target:d.target||'',noSJ,nopol:nopolV,kendaraan:d.kendaraan||'',driver:d.driver||'',spk:d.spk,items,status:'Di Vendor',ket:d.ket||'',rework:!!d.over,riwayat:[]});
   if(d.dock){await queueDock({jenis:'Loading',muatan:'Barang Setengah Jadi',pihak:vendor,ref:`${noSJ} · SPK ${s.no}`,nopol:nopolV,kendaraan:d.kendaraan,driver:d.driver,tgl:t,link:{c:'vendor',noSJ}})}
   rememberArmada(nopolV,d.kendaraan,d.driver);toast(`${noSJ} tersimpan`)},
  {submit:'Kirim ke vendor',done:' ',mount:f=>{f.spk.addEventListener('change',()=>{$('#m-lines').innerHTML=linesTable(f.spk.value,'vendor')});f.vendor.addEventListener('change',()=>{const v=mList('vendor').find(x=>x.nama===f.vendor.value);if(v&&v.proses&&!f.proses.value)f.proses.value=String(v.proses).split(',')[0].trim()});bindArmada(f)}});
}
function terimaForm(id){
 const v=byId('vendor',id);
 openModal(`Terima kembali dari ${UNKNOWN_V(v.vendor)?'vendor':esc(v.vendor)}`,fld('Tanggal terima',inp('tgl',today(),'date'))+fld('No SJ',`<div class="mono" style="padding:8px 0">${esc(v.noSJ||'')}</div>`)+
  (UNKNOWN_V(v.vendor)?fld('Nama vendor (belum diisi)',inp('vendor','','text','list="dl-ven" required autocomplete="off"'),true)+dl('dl-ven',mNames('vendor')):'')+
  `<div class="full tbl-wrap"><table class="lines"><thead><tr><th>Item</th><th class="num">Dikirim</th><th class="num">Sudah kembali</th><th class="num">OK diterima</th><th class="num">Reject</th></tr></thead><tbody>${v.items.map((i,k)=>{const sisa=Math.max(0,i.q-(+i.kembali||0)-(+i.reject||0));return `<tr><td>${esc(i.d)}</td><td class="num">${n(i.q)}</td><td class="num">${n((+i.kembali||0)+(+i.reject||0))}</td><td class="num"><input class="inp" type="number" min="0" step="any" name="r_${k}" id="m-r_${k}" value="${sisa||''}"></td><td class="num"><input class="inp" type="number" min="0" step="any" name="x_${k}" id="m-x_${k}"></td></tr>`}).join('')}</tbody></table></div>`+
  fld('Catatan (wajib bila ada reject)',inp('ket','','text','placeholder="mis. lapisan HDG belang 4 pcs, kembalikan ke vendor"'),true)+dockCk('Masukkan ke antrian Unloading di Bongkar Muat')+armadaFields(),
  async (d,form)=>{let qty=0,rej=0;const items=v.items.map((i,k)=>{const ok=num0(d['r_'+k]),x=num0(d['x_'+k]);const sisa=Math.max(0,i.q-(+i.kembali||0)-(+i.reject||0));if(ok+x>sisa)throw new Error(`"${i.d}": OK + reject (${n(ok+x)}) melebihi sisa di vendor (${n(sisa)}).`);qty+=ok;rej+=x;return {...i,kembali:(+i.kembali||0)+ok,reject:(+i.reject||0)+x}});
   if(qty+rej<=0)throw new Error('Isi qty yang diterima.');if(rej>0&&!String(d.ket).trim())throw new Error('Tulis catatan untuk barang reject.');
   const rItems=v.items.map((i,k)=>({d:i.d,ok:num0(d['r_'+k]),rej:num0(d['x_'+k])})).filter(x=>x.ok||x.rej);if((d.tgl||today())<v.tgl)throw new Error('Tanggal terima sebelum tanggal kirim ke vendor.');
   const up={items,riwayat:[...(v.riwayat||[]),{tgl:d.tgl||today(),qty,rej,ket:d.ket||'',by:ME||null,at:new Date().toISOString(),items:rItems}]};
   const out=items.reduce((a,i)=>a+(+i.q),0),back=items.reduce((a,i)=>a+(+i.kembali)+(+i.reject||0),0);up.status=back>=out?'Selesai':'Kembali Sebagian';
   let vendor=v.vendor;if(UNKNOWN_V(v.vendor)){vendor=await ensureMaster('vendor',d.vendor,form,'vendor');up.vendor=vendor}
   await updDoc('vendor',id,up);
   const nopolT=getNopol(d);
   if(d.dock){await queueDock({jenis:'Unloading',muatan:'Barang Setengah Jadi',pihak:vendor,ref:`${v.noSJ||''} · ${spkName(v.spk)}`,nopol:nopolT,kendaraan:d.kendaraan,driver:d.driver,tgl:d.tgl||today(),link:{c:'vendor',id}});rememberArmada(nopolT,d.kendaraan,d.driver)}},
  {submit:'Simpan penerimaan',mount:bindArmada});
}
function setVendorForm(id){const v=byId('vendor',id);openModal(`Isi nama vendor · ${esc(v.noSJ||'')}`,fld('Vendor finishing',inp('vendor','','text','list="dl-ven" required autocomplete="off"'),true)+fld('Proses',inp('proses',v.proses||'','text','list="dl-pro"'))+dl('dl-ven',mNames('vendor'))+dl('dl-pro',['HDG','ELG','Powder Coating','Non Finishing']),
 async (d,form)=>{const vendor=await ensureMaster('vendor',d.vendor,form,'vendor',{proses:d.proses||''});await updDoc('vendor',id,{vendor,proses:d.proses||v.proses||''})})}
function kirimForm(spk){
 openModal('Buat surat jalan ke customer',fld('SPK',spkSelect(spk||'',true,true),true)+`<div class="full" id="m-lines">${linesTable(spk,'kirim')}</div>`+
  `<label class="ck full"><input type="checkbox" name="over" id="m-over"> Kirim lebih dari sisa order (ganti reject / bonus) — wajib isi keterangan</label>`+
  fld('Tanggal',inp('tgl',today(),'date'))+fld('No surat jalan',inp('noSJ','','text','placeholder="Kosongkan = otomatis SJ/'+today().slice(0,4)+'/'+today().slice(5,7)+'/…"'))+
  armadaFields()+fld('Status',`<select class="sel" name="status" id="m-status"><option>Disiapkan</option><option>Dalam Perjalanan</option><option>Diterima</option></select>`)+fld('Keterangan',inp('ket'),true)+
  dockCk('Masukkan ke antrian Loading di Bongkar Muat'),
  async (d,form)=>{if(!d.spk)throw new Error('Pilih SPK.');checkCap(d.spk,d,'kirim');if(d.over&&!String(d.ket).trim())throw new Error('Isi keterangan untuk kirim lebih.');
   const items=pickLines(d.spk,d);if(!items.length)throw new Error('Isi qty minimal satu item.');
   const nopolK=getNopol(d);
   if(!nopolK&&d.status!=='Disiapkan')throw new Error('Pilih armada atau isi no polisi kendaraan.');
   const s=byId('spk',d.spk);const t=d.tgl||today();let noSJ=String(d.noSJ||'').trim();if(noSJ&&sjTaken(noSJ))throw new Error(`No SJ ${noSJ} sudah dipakai.`);if(!noSJ)noSJ=await nextDocNo('SJ',t);
   await addDoc('kirim',{spk:d.spk,customer:s.customer,tgl:t,noSJ,kendaraan:d.kendaraan||'',nopol:nopolK,driver:d.driver||'',status:d.status||'Disiapkan',tglTerima:d.status==='Diterima'?t:'',items,ket:d.ket||'',lebih:!!d.over});
   if(d.dock)await queueDock({jenis:'Loading',muatan:'Barang Jadi',pihak:s.customer,ref:`${noSJ} · SPK ${s.no}`,nopol:nopolK,kendaraan:d.kendaraan,driver:d.driver,tgl:t,link:{c:'kirim',noSJ}});
   rememberArmada(nopolK,d.kendaraan,d.driver);toast(`${noSJ} tersimpan`)},
  {submit:'Buat surat jalan',done:' ',mount:f=>{f.spk.addEventListener('change',()=>{$('#m-lines').innerHTML=linesTable(f.spk.value,'kirim')});bindArmada(f)}});
}
function printBmChecklist(id){
 const b=byId('bongkar',id);if(!b)return;
 /* ambil items dari dokumen sumber */
 let items=[],docLabel='',docRef='';
 if(b.link){
  const lc=b.link.c;
  if(lc==='mutasi'){const mut=S.mutasi.find(x=>x.noDok===b.link.noDok);items=mut?(mut.items||[]):[];docLabel='Penerimaan Bahan Baku';docRef=b.link.noDok||'';}
  else if(lc==='vendor'){const vd=b.link.id?byId('vendor',b.link.id):S.vendor.find(x=>x.noSJ===b.link.noSJ);items=vd?(vd.items||[]):[];docLabel='SJ Vendor';docRef=b.link.noSJ||'';}
  else if(lc==='kirim'){const kd=S.kirim.find(x=>x.noSJ===b.link.noSJ);items=kd?(kd.items||[]):[];docLabel='SJ Customer';docRef=b.link.noSJ||'';}
 }
 const totalQty=sumBy(items,i=>+i.q||0);
 const rows=items.map((i,idx)=>`<tr><td class="pck-no">${idx+1}</td><td>${(i.d||i.item||'').replace(/</g,'&lt;')}</td><td class="pck-num">${+i.q||0}</td><td class="pck-u">${(i.u||'').replace(/</g,'&lt;')}</td><td class="pck-ck">☐</td></tr>`).join('');
 const win=window.open('','_blank','width=794,height=1123');
 if(!win)return toast('Aktifkan popup untuk print checklist');
 win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Checklist ${b.jenis} · ${b.nopol||''}</title><style>
  *{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial,sans-serif;font-size:12px;color:#111;padding:28px 32px}
  .ph{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #111;padding-bottom:10px;margin-bottom:14px}
  .ph-co{font-size:9px;color:#555;margin-top:2px}.ph-logo{font-size:20px;font-weight:800;color:#1a3a6b;letter-spacing:-.5px}
  .ph-doc{text-align:right}.ph-title{font-size:17px;font-weight:700;letter-spacing:.04em}.ph-sub{font-size:10px;color:#555;margin-top:2px}
  .meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;margin-bottom:14px;font-size:11px}
  .meta-row{display:flex;gap:4px}.meta-row .lbl{color:#555;width:90px;flex-shrink:0}.meta-row .val{font-weight:600}
  table{width:100%;border-collapse:collapse;margin-bottom:10px;font-size:11.5px}
  th{background:#f0f4fa;padding:5px 7px;text-align:left;font-weight:700;border:1px solid #ccc}
  td{padding:5px 7px;border:1px solid #ddd;vertical-align:top}
  .pck-no{text-align:center;width:32px;color:#777}.pck-num{text-align:right;width:60px;font-weight:600}
  .pck-u{text-align:center;width:55px;color:#555}.pck-ck{text-align:center;width:36px;font-size:16px}
  .foot-row td{background:#f5f5f5;font-weight:700}
  .signs{display:flex;margin-top:20px;border-top:1px solid #ddd;padding-top:14px}
  .sign{flex:1;text-align:center;padding:0 8px;font-size:10px;color:#555}
  .sign+.sign{border-left:1px solid #ddd}
  .sign-line{height:44px}.sign-lbl{font-weight:600;font-size:10px;color:#333}
  .note{font-size:10px;color:#777;margin-top:6px;font-style:italic}
  @media print{body{padding:12px 16px}@page{size:A4;margin:12mm 14mm}}
 </style></head><body>
 <div class="ph">
  <div><div class="ph-logo">PT MNI</div><div class="ph-co">PT Mitra Nusa Internasional</div></div>
  <div class="ph-doc"><div class="ph-title">CHECKLIST ${b.jenis.toUpperCase()}</div><div class="ph-sub">${docLabel?docLabel+' · ':''}${docRef}</div></div>
 </div>
 <div class="meta">
  <div class="meta-row"><span class="lbl">Tanggal</span><span class="val">${tglLong(b.tgl)}</span></div>
  <div class="meta-row"><span class="lbl">No Polisi</span><span class="val">${(b.nopol||'-').replace(/</g,'&lt;')}</span></div>
  <div class="meta-row"><span class="lbl">Pihak</span><span class="val">${(b.pihak||'-').replace(/</g,'&lt;')}</span></div>
  <div class="meta-row"><span class="lbl">Kendaraan</span><span class="val">${(b.kendaraan||'-').replace(/</g,'&lt;')}</span></div>
  <div class="meta-row"><span class="lbl">Muatan</span><span class="val">${(b.muatan||'-').replace(/</g,'&lt;')}</span></div>
  <div class="meta-row"><span class="lbl">Driver</span><span class="val">${(b.driver||'-').replace(/</g,'&lt;')}</span></div>
  ${b.ref?`<div class="meta-row"><span class="lbl">Referensi</span><span class="val">${b.ref.replace(/</g,'&lt;')}</span></div>`:''}
 </div>
 <table>
  <thead><tr><th>No</th><th>Nama Barang / Item</th><th>Qty</th><th>Satuan</th><th>✓</th></tr></thead>
  <tbody>${rows}<tr class="foot-row"><td colspan="2" style="text-align:right">TOTAL</td><td class="pck-num">${totalQty}</td><td colspan="2"></td></tr></tbody>
 </table>
 ${b.ket?`<div class="note">Catatan: ${b.ket.replace(/</g,'&lt;')}</div>`:''}
 <div class="signs">
  <div class="sign"><div class="sign-lbl">${b.jenis==='Unloading'?'Pengirim / Vendor':'Pengirim'}</div><div class="sign-line"></div><div>( _________________ )</div></div>
  <div class="sign"><div class="sign-lbl">Driver</div><div class="sign-line"></div><div>( ${(b.driver||'_________________').replace(/</g,'&lt;')} )</div></div>
  <div class="sign"><div class="sign-lbl">${b.jenis==='Unloading'?'Penerima, Gudang MNI':'Penerima / Customer'}</div><div class="sign-line"></div><div>( _________________ )</div></div>
 </div>
 <script>window.onload=function(){window.print()}<\/script>
 </body></html>`);win.document.close();
}
function bmForm(){
 openModal('Catat kendaraan masuk dock',fld('Jenis',`<select class="sel" name="jenis" id="m-jenis"><option>Unloading</option><option>Loading</option></select>`)+
  fld('Muatan',`<select class="sel" name="muatan" id="m-muatan"><option>Bahan Baku</option><option>Barang Setengah Jadi</option><option>Barang Jadi</option><option>Lainnya</option></select>`)+
  fld('Pihak (supplier / vendor / customer)',inp('pihak','','text','list="dl-pihak2" required autocomplete="off"'))+fld('Referensi (PO / SJ / SPK)',inp('ref'))+
  armadaFields()+fld('Tanggal',inp('tgl',today(),'date'))+fld('Jam masuk',inp('jamMasuk',nowTime(),'time'))+
  fld('Status',`<select class="sel" name="status" id="m-bst"><option>Antri</option><option>Proses</option></select>`)+fld('Nama petugas',inp('petugas','','text','placeholder="Petugas gudang…"'))+fld('Keterangan',inp('ket'),true)+
  dl('dl-pihak2',[...mNames('supplier'),...mNames('vendor'),...mNames('customer')]),
  async d=>{const nopolB=getNopol(d);if(!nopolB)throw new Error('Pilih armada atau isi no polisi.');if(!String(d.pihak||'').trim())throw new Error('Isi pihak.');
   await addDoc('bongkar',{jenis:d.jenis,muatan:d.muatan,pihak:cleanName(d.pihak),ref:d.ref||'',kendaraan:d.kendaraan||'',nopol:nopolB,driver:d.driver||'',tgl:d.tgl||today(),jamMasuk:d.jamMasuk||nowTime(),jamMulai:d.status==='Proses'?(d.jamMasuk||nowTime()):'',jamSelesai:'',petugas:d.petugas||'',status:d.status||'Antri',ket:d.ket||''});rememberArmada(nopolB,d.kendaraan,d.driver)},{submit:'Catat',mount:bindArmada});
}
function bmKoreksiForm(id){
 const b=byId('bongkar',id);if(!b)return;
 const body=`<div class="frow">${fld('Jam masuk',inp('jamMasuk',b.jamMasuk||'','time'))}${fld('Jam mulai '+b.jenis.toLowerCase(),inp('jamMulai',b.jamMulai||'','time'))}</div>`+
  `<div class="frow">${fld('Jam selesai',inp('jamSelesai',b.jamSelesai||'','time'))}${fld('Nama petugas',inp('petugas',b.petugas||'','text','placeholder="Nama petugas gudang…"'))}</div>`+
  `<p class="note" style="margin-top:4px">Koreksi jam dan petugas. Kosongkan field yang tidak perlu diisi. Perubahan dicatat di log aktivitas.</p>`;
 openModal(`Koreksi jam · ${b.jenis} ${esc(b.nopol||b.pihak||'')}`,body,
  async d=>{
   const upd={jamMasuk:d.jamMasuk||b.jamMasuk||'',jamMulai:d.jamMulai||b.jamMulai||'',jamSelesai:d.jamSelesai||b.jamSelesai||'',petugas:String(d.petugas||'').trim()};
   await updDoc('bongkar',id,upd);toast('Jam &amp; petugas diperbarui');closeDrawer();
  },{submit:'Simpan koreksi'});
}
function bmDrawer(id){openDrawer(()=>{const b=byId('bongkar',id);if(!b)return null;
 /* sumber dokumen + items */
 let srcHtml='',srcItems=[],srcDocLabel='',srcDocRef='',srcDocPihak='';
 if(b.link){
  const lc=b.link.c;
  if(lc==='mutasi'){
   const noDok=b.link.noDok||'';
   const mut=S.mutasi.find(x=>x.noDok===noDok);
   srcDocLabel='Penerimaan Bahan Baku'; srcDocRef=noDok; srcDocPihak=b.pihak||'';
   if(mut&&mut.items)srcItems=mut.items;
   srcHtml=`<div class="dw-meta-card"><span>Dokumen sumber</span><b>Penerimaan Bahan Baku${noDok?` · <span class="mono">${esc(noDok)}</span>`:''}</b></div>`;
  } else if(lc==='vendor'){
   const noSJ=b.link.noSJ||'';const vid=b.link.id;const vd=vid?byId('vendor',vid):S.vendor.find(x=>x.noSJ===noSJ);const spk=vd?byId('spk',vd.spk):null;
   srcDocLabel='Surat Jalan Vendor'; srcDocRef=noSJ; srcDocPihak=vd?vd.vendor:'';
   if(vd&&vd.items)srcItems=vd.items;
   srcHtml=`<div class="dw-meta-card"><span>Dokumen sumber</span><b>SJ Vendor${noSJ?` · <span class="mono">${esc(noSJ)}</span>`:''}</b>${spk?`<div style="font-size:11px;color:var(--muted);margin-top:2px">SPK ${esc(spk.no)} · ${esc(spk.customer)}</div>`:''}</div>`;
  } else if(lc==='kirim'){
   const noSJ=b.link.noSJ||'';const kd=S.kirim.find(x=>x.noSJ===noSJ);const spk=kd?byId('spk',kd.spk):null;
   srcDocLabel='Surat Jalan Customer'; srcDocRef=noSJ; srcDocPihak=kd?kd.customer:'';
   if(kd&&kd.items)srcItems=kd.items;
   srcHtml=`<div class="dw-meta-card"><span>Dokumen sumber</span><b>SJ Customer${noSJ?` · <span class="mono">${esc(noSJ)}</span>`:''}</b>${spk?`<div style="font-size:11px;color:var(--muted);margin-top:2px">SPK ${esc(spk.no)} · ${esc(spk.customer)}</div>`:''}</div>`;
  }
 }
 /* timeline */
 const tl=[];
 if(b.jamMasuk)tl.push(`<div class="bm-tl-row"><span class="bm-tl-dot ok"></span><div><b>Tiba di dock</b><div class="bm-tl-time">${esc(b.jamMasuk)}</div></div></div>`);
 else tl.push(`<div class="bm-tl-row"><span class="bm-tl-dot muted"></span><div><b class="muted">Belum tiba</b></div></div>`);
 if(b.jamMulai)tl.push(`<div class="bm-tl-row"><span class="bm-tl-dot info"></span><div><b>${b.jenis==='Unloading'?'Mulai bongkar':'Mulai muat'}</b><div class="bm-tl-time">${esc(b.jamMulai)}${b.jamMasuk?` · tunggu ${dur(b.jamMasuk,b.jamMulai)}`:''}</div></div></div>`);
 else tl.push(`<div class="bm-tl-row"><span class="bm-tl-dot muted"></span><div><b class="muted">${b.jenis==='Unloading'?'Mulai bongkar':'Mulai muat'} – belum dimulai</b></div></div>`);
 if(b.jamSelesai)tl.push(`<div class="bm-tl-row"><span class="bm-tl-dot ok"></span><div><b>Selesai</b><div class="bm-tl-time">${esc(b.jamSelesai)}${b.jamMulai?` · durasi ${dur(b.jamMulai,b.jamSelesai)}`:''}</div></div></div>`);
 else tl.push(`<div class="bm-tl-row"><span class="bm-tl-dot muted"></span><div><b class="muted">Belum selesai</b></div></div>`);
 const st=b.status;
 const stColor=st==='Selesai'?'ok':st==='Proses'?'info':'warn';
 const body=`
  <div class="dw-meta-grid">
   <div class="dw-meta-card"><span>Tanggal</span><b>${fd(b.tgl)}</b></div>
   <div class="dw-meta-card"><span>Muatan</span><b>${esc(b.muatan)}</b></div>
   <div class="dw-meta-card"><span>Pihak</span><b>${esc(b.pihak||'–')}</b></div>
   <div class="dw-meta-card"><span>No Polisi</span><b class="mono">${esc(b.nopol||'–')}</b></div>
   <div class="dw-meta-card"><span>Kendaraan</span><b>${esc(b.kendaraan||'–')}</b></div>
   <div class="dw-meta-card"><span>Driver</span><b>${esc(b.driver||'–')}</b></div>
   ${b.petugas?`<div class="dw-meta-card"><span>Petugas</span><b>${esc(b.petugas)}</b></div>`:''}
   ${b.ref?`<div class="dw-meta-card"><span>Referensi</span><b>${esc(b.ref)}</b></div>`:''}
   ${srcHtml}
  </div>
  <div>
   <div class="dw-section-title">Timeline ${b.jenis}</div>
   <div class="bm-timeline">${tl.join('')}</div>
  </div>
  ${b.ket?`<div class="dw-note">${ic('info')} <b>Catatan:</b> ${esc(b.ket)}</div>`:''}
  ${srcItems.length?`<div>
   <div class="dw-section-title" style="display:flex;justify-content:space-between;align-items:center">
    <span>Detail Barang (${srcItems.length} item)</span>
    <button class="btn sm ghost" data-act="printbm" data-id="${id}" style="font-size:11px">${ic('file')} Print Checklist</button>
   </div>
   <div class="tbl-wrap">
    <table class="bm-checklist-tbl">
     <thead><tr><th style="width:32px"></th><th>Item / Barang</th><th class="num">Qty</th><th style="width:60px;text-align:center">Satuan</th></tr></thead>
     <tbody>${srcItems.map((i,idx)=>`<tr>
      <td style="text-align:center"><input type="checkbox" class="bm-ck" id="bmck-${idx}"></td>
      <td><label for="bmck-${idx}" style="cursor:pointer;display:block">${esc(i.d||i.item||'')}</label></td>
      <td class="num">${n(i.q)}</td>
      <td style="text-align:center">${esc(i.u||'')}</td>
     </tr>`).join('')}
     <tr class="sj-prev-foot"><td></td><td style="font-weight:600;font-size:11.5px">TOTAL</td><td class="num" style="font-weight:600">${n(sumBy(srcItems,i=>+i.q||0))}</td><td></td></tr>
    </tbody></table>
   </div>
   <div class="bm-ck-note" id="bm-ck-status-${id}"></div>
  </div>`:''}
  <div><div class="dw-section-title">Aksi</div><div class="dw-btns">
   ${st!=='Selesai'&&st!=='Batal'?`${st==='Antri'?`<button class="btn sm primary" data-act="bmstep" data-id="${id}" data-to="Proses">Mulai ${b.jenis.toLowerCase()}</button>`:`<button class="btn sm primary" data-act="bmstep" data-id="${id}" data-to="Selesai">${ic('chk')}Selesai</button>`}`:''}
   <button class="btn sm ghost" data-act="bmkoreksi" data-id="${id}">${ic('edit')} Koreksi jam &amp; petugas</button>
   ${st!=='Batal'?`<button class="btn sm ghost" data-act="void" data-c="bongkar" data-id="${id}">Batalkan</button>`:''}
  </div></div>`;
 /* simpan metadata untuk print */
 const _bm_meta={jenis:b.jenis,muatan:b.muatan,pihak:b.pihak||'',nopol:b.nopol||'',kendaraan:b.kendaraan||'',driver:b.driver||'',tgl:b.tgl,ref:b.ref||'',docLabel:srcDocLabel,docRef:srcDocRef,items:srcItems};
 return {
  t:`${b.jenis==='Unloading'?'↓':'↑'} ${esc(b.nopol||'Kendaraan')} · ${esc(b.muatan)}`,
  s:`${stChip(st)} · ${esc(b.pihak||'')} · ${fd(b.tgl)}`,
  b:body,
  _bmmeta:_bm_meta
 };
})}
function voidForm(c,id){
 const lbl={vendor:'surat jalan vendor',kirim:'surat jalan customer',bongkar:'catatan bongkar muat',pr:'permintaan pembelian'}[c];
 openModal(`Batalkan ${lbl}`,fld('Alasan pembatalan',inp('alasan','','text','required placeholder="mis. salah pilih SPK, dibuat ulang"'),true)+`<div class="note full">Dokumen tidak dihapus, hanya ditandai <b>Batal</b> lengkap dengan alasan dan nama pembatal, supaya jejaknya tetap bisa dilacak.</div>`,
  async d=>{if(!String(d.alasan).trim())throw new Error('Isi alasan pembatalan.');const b={alasan:d.alasan.trim(),at:new Date().toISOString(),by:ME||null};
   const doc=byId(c,id);await updDoc(c,id,{status:'Batal',batal:b});
   if((c==='vendor'||c==='kirim')&&doc){const key=doc.noSJ;for(const x of S.bongkar.filter(x=>x.link&&x.status==='Antri'&&(x.link.noSJ===key||x.link.id===id)))await updDoc('bongkar',x._id,{status:'Batal',batal:{...b,alasan:'Dokumen sumber dibatalkan'}})}
   closeDrawer()},{submit:'Batalkan',done:'Dibatalkan · tercatat di riwayat'});
}
function koreksiForm(id){
 const m=byId('mutasi',id);const it=byId(m.gudang,m.item);
 openModal('Koreksi transaksi stok',`<div class="full kv"><div><span>Item</span><b>${esc(m.gudang==='rm'?rmLabel(it):fgLabel(it))}</b></div><div><span>Transaksi</span><b>${esc(MVL[m.jenis]||m.jenis)} ${m.delta>0?'+':''}${n(m.delta)} · ${fd(m.tgl)}</b></div><div><span>Dokumen</span><b>${esc(m.noDok||m.ref||'–')}</b></div></div>`+fld('Alasan koreksi',inp('ket','','text','required placeholder="mis. salah item, seharusnya 1.5 mm"'),true)+`<div class="note full">Sistem membuat transaksi pembalik ${m.delta>0?'−':'+'}${n(Math.abs(m.delta))}. Setelah itu catat ulang transaksi yang benar.</div>`,
  async d=>{if(!String(d.ket).trim())throw new Error('Isi alasan koreksi.');if(-m.delta<0){const cur=calc().stock[m.gudang][m.item];if(cur+(-m.delta)<0)throw new Error(`Koreksi membuat stok minus (stok sekarang ${n(cur)}).`)}
   await addDoc('mutasi',{gudang:m.gudang,item:m.item,jenis:'koreksi',delta:-m.delta,tgl:today(),noDok:m.noDok||'',ref:'Koreksi '+(m.noDok||fd(m.tgl)),spk:m.spk||'',pihak:m.pihak||'',ket:d.ket,koreksiDari:id});
   await updDoc('mutasi',id,{dikoreksi:true})},{submit:'Buat koreksi'});
}

/* ---------- MASTER DATA ---------- */
F['master-data']={tab:'vendor',q:'',showInactive:false,kf:''};
const usage=()=>{const u={vendor:{},customer:{},supplier:{},armada:{}};const inc=(k,x)=>{if(x)u[k][x]=(u[k][x]||0)+1};
 S.vendor.forEach(v=>{if(v.status!=='Batal'&&!UNKNOWN_V(v.vendor))inc('vendor',v.vendor);inc('armada',v.nopol)});
 S.spk.forEach(s=>inc('customer',s.customer));S.kirim.forEach(k=>{if(k.status!=='Batal')inc('customer',k.customer);inc('armada',k.nopol)});
 S.mutasi.forEach(m=>{if(m.gudang==='rm'&&m.jenis==='masuk')inc('supplier',m.pihak)});S.bongkar.forEach(b=>inc('armada',b.nopol));return u};

// KPI summary per tab
const masterKpi=k=>{const u=usage()[k];const col=MK[k];const aktif=S[col].filter(x=>x.aktif!==false).length;const nonaktif=S[col].filter(x=>x.aktif===false).length;const totalUsage=Object.values(u).reduce((a,b)=>a+b,0);const unreg=Object.keys(u).filter(nm=>!S[col].some(x=>(k==='armada'?x.nopol:x.nama)===nm)).length;return {aktif,nonaktif,totalUsage,unreg}};

T['master-data']=()=>{const f=F['master-data'];const k=f.tab;const isKatalog=['item','grup','satuan'].includes(k);const isWc=k==='wc';
 return `${segBtns('master-data','tab',[['vendor','Vendor'],['customer','Customer'],['supplier','Supplier'],['armada','Armada'],['wc','Work Centre'],['item','Item SPK'],['grup','Judul section'],['satuan','Satuan & sales']])}<input class="inp search" id="q-master" placeholder="Cari nama…" value="${esc(f.q)}" data-act="q" data-view="master-data">${!isKatalog&&!isWc?`<label class="ck" style="font-size:13px;white-space:nowrap"><input type="checkbox" data-act="mshowInactive" ${f.showInactive?'checked':''}> Tampilkan nonaktif</label><button class="btn ghost sm" data-act="mcsv" title="Export CSV">${ic('download')} CSV</button>`:'<span class="grow"></span>'}<button class="btn primary" data-act="mnew">${ic('plus')}Tambah</button>`};

B['master-data']=()=>{
 if(F['master-data'].tab==='item')return katItemTab();if(F['master-data'].tab==='grup')return katGrupTab();if(F['master-data'].tab==='satuan')return katListTab();if(F['master-data'].tab==='wc')return wcTab();
 const f=F['master-data'],k=f.tab,q=f.q.toLowerCase(),u=usage()[k],si=f.showInactive;const key=k==='armada'?'nopol':'nama';
 const kpi=masterKpi(k);
 // KPI row
 const kpiRow=`<div class="kpis" style="grid-template-columns:repeat(4,minmax(120px,1fr))">`+
  `<div class="kpi ok"><div class="lb">Aktif</div><div class="v">${kpi.aktif}</div></div>`+
  `<div class="kpi${kpi.nonaktif>0?' warn':''}"><div class="lb">Nonaktif</div><div class="v">${kpi.nonaktif}</div></div>`+
  `<div class="kpi info"><div class="lb">Total transaksi</div><div class="v">${kpi.totalUsage}</div></div>`+
  `<div class="kpi${kpi.unreg>0?' crit':'ok'}"><div class="lb">Belum terdaftar</div><div class="v">${kpi.unreg}</div></div>`+
 `</div>`;
 const allRows=S[MK[k]].filter(x=>!q||JSON.stringify(x).toLowerCase().includes(q));
 const rows=allRows.filter(x=>si||x.aktif!==false).sort((a,b)=>(a.aktif===false)-(b.aktif===false)||String(a[key]).localeCompare(String(b[key])));
 const unreg=Object.entries(u).filter(([nm])=>!S[MK[k]].some(x=>x[key]===nm)).sort((a,b)=>b[1]-a[1]);
 const MDESC={vendor:'Daftar resmi vendor finishing. Form kirim ke vendor hanya menerima nama dari sini, jadi tidak ada lagi "Beton" vs "Beron".',customer:'Daftar resmi customer. SPK baru dicek ke daftar ini agar satu perusahaan tidak tercatat dengan dua ejaan.',supplier:'Supplier plat/material. Penerimaan bahan baku wajib memilih supplier dari daftar ini.',armada:'Truk dan driver. Terisi otomatis dari no polisi yang pernah dicatat; lengkapi jenis dan drivernya di sini.'};
 const unregH=unreg.length&&k!=='armada'?`<section class="panel"><header><h2>Nama di transaksi yang belum terdaftar</h2><span class="hint">${unreg.length} nama</span></header><div class="tbl-wrap"><table><thead><tr><th>Nama tertulis</th><th class="num">Dipakai</th><th>Mirip dengan</th><th></th></tr></thead><tbody>${unreg.map(([nm,c])=>{const sim=similarTo(k,nm);return `<tr><td><b>${esc(nm)}</b></td><td class="num">${c}×</td><td>${sim?esc(sim.nama):'<span class="muted">–</span>'}</td><td class="acts-r"><button class="btn sm" data-act="mmerge" data-k="${k}" data-from="${esc(nm)}" data-to="${sim?esc(sim.nama):''}">Gabungkan ke…</button><button class="btn sm ghost" data-act="mreg" data-k="${k}" data-nm="${esc(nm)}">Daftarkan</button></td></tr>`}).join('')}</tbody></table></div></section>`:'';
 // Card grid for vendor/supplier; table for customer/armada
 let bodyH='';
 if(k==='vendor'||k==='supplier'){
  // Helper to render phone as clickable WA link
  const fmtPhone=p=>{if(!p)return '';const d=p.replace(/\D/g,'');const wa=d.startsWith('0')?'62'+d.slice(1):d;return`<a href="https://wa.me/${wa}" target="_blank" style="color:var(--accent);text-decoration:none">${esc(p)}</a>`};
  // Proses badge coloring
  const procBadge=pr=>{if(!pr)return '';return pr.split(',').map(p=>{const t=p.trim();const cls=t.toUpperCase().includes('ELG')?'vendor-elg':t.toUpperCase().includes('HDG')?'vendor-hdg':t.toUpperCase().includes('POWDER')||t.toUpperCase().includes('PC')?'vendor-pc':'';return`<span class="mcard-badge ${cls}">${esc(t)}</span>`}).join(' ')};
  bodyH=rows.length?`<div class="mcard-grid">${rows.map(x=>{const cnt=u[x[key]]||0;const nona=x.aktif===false;
   const cardRows=k==='vendor'?[
    x.proses?`<div class="mcard-row"><span class="mcard-lbl">Proses</span><span>${procBadge(x.proses)}</span></div>`:'',
    x.pic?`<div class="mcard-row"><span class="mcard-lbl">PIC</span><span>${esc(x.pic)}</span></div>`:'',
    x.telp?`<div class="mcard-row"><span class="mcard-lbl">${ic('phone')} Tel</span><span>${fmtPhone(x.telp)}</span></div>`:'',
    x.email?`<div class="mcard-row"><span class="mcard-lbl">${ic('mail')} Email</span><span><a href="mailto:${esc(x.email)}" style="color:var(--accent)">${esc(x.email)}</a></span></div>`:'',
    x.alamat?`<div class="mcard-row"><span class="mcard-lbl">${ic('pin')} Alamat</span><span>${esc(x.alamat)}</span></div>`:''
   ]:[
    x.material?`<div class="mcard-row"><span class="mcard-lbl">Material</span><span>${esc(x.material)}</span></div>`:'',
    x.pic?`<div class="mcard-row"><span class="mcard-lbl">PIC</span><span>${esc(x.pic)}</span></div>`:'',
    x.telp?`<div class="mcard-row"><span class="mcard-lbl">${ic('phone')} Tel</span><span>${fmtPhone(x.telp)}</span></div>`:'',
    x.email?`<div class="mcard-row"><span class="mcard-lbl">${ic('mail')} Email</span><span><a href="mailto:${esc(x.email)}" style="color:var(--accent)">${esc(x.email)}</a></span></div>`:''
   ];
   return`<div class="mcard${nona?' mcard-off':''}"><div class="mcard-h"><b>${esc(x[key])}</b><span class="mcnt">${cnt}×</span></div>${cardRows.filter(Boolean).join('')}${nona?`<div class="mcard-row"><span class="mcard-lbl">Status</span><span style="color:var(--muted)">Nonaktif${x.mergedTo?` · digabung ke ${esc(x.mergedTo)}`:''}</span></div>`:''}<div class="mcard-acts"><button class="btn sm ghost" data-act="medit" data-k="${k}" data-id="${x._id}">${ic('edit2')} Ubah</button>${x.aktif!==false?`<button class="btn sm ghost" data-act="mmerge" data-k="${k}" data-from="${esc(x[key])}" data-to="">${ic('merge')} Gabung</button>`:''}<button class="btn sm ghost danger" data-act="mdel" data-k="${k}" data-id="${x._id}">${ic('trash')} Hapus</button></div></div>`}).join('')}</div>`:empty(`Belum ada data ${MLBL[k]}`,MDESC[k],`<button class="btn primary" data-act="mnew">${ic('plus')}Tambah</button>`);
 }else{
  const cols={customer:[['pic','PIC'],['telp','Telepon'],['alamat','Alamat']],armada:[['jenis','Jenis'],['driver','Driver'],['milik','Milik']]}[k];
  bodyH=rows.length?`<div class="tbl-wrap"><table><thead><tr><th>${k==='armada'?'No polisi':'Nama'}</th>${cols.map(c=>`<th>${c[1]}</th>`).join('')}<th class="num">Dipakai</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(x=>`<tr class="${x.aktif===false?'void':''}"><td><b class="${k==='armada'?'mono':''}">${esc(x[key])}</b>${x.mergedTo?`<div class="note">digabung ke ${esc(x.mergedTo)}</div>`:''}</td>${cols.map(c=>`<td>${esc(x[c[0]]||'')}</td>`).join('')}<td class="num">${u[x[key]]||0}×</td><td>${x.aktif===false?chip('Nonaktif','plain'):chip('Aktif','ok')}</td><td class="acts-r"><button class="btn sm ghost" data-act="medit" data-k="${k}" data-id="${x._id}">${ic('edit2')} Ubah</button>${k!=='armada'&&x.aktif!==false?`<button class="btn sm ghost" data-act="mmerge" data-k="${k}" data-from="${esc(x[key])}" data-to="">Gabung</button>`:''}<button class="btn sm ghost danger" data-act="mdel" data-k="${k}" data-id="${x._id}">${ic('trash')}</button></td></tr>`).join('')}</tbody></table></div>`:empty(`Belum ada data ${MLBL[k]}`,MDESC[k],`<button class="btn primary" data-act="mnew">${ic('plus')}Tambah</button>`);
 }
 return kpiRow+unregH+`<section class="panel"><div class="pbody note">${MDESC[k]}</div>${bodyH}</section>`;
};
function masterForm(k,id,preset){
 const x=id?byId(MK[k],id):{};const key=k==='armada'?'nopol':'nama';
 // Define fields with [field, label, placeholder, attr, wide, type]
 const FIELDS={
  vendor:[
   ['nama','Nama vendor','PT / CV / UD…','required',false,'text'],
   ['proses','Proses finishing','ELG / HDG / Powder Coating','',false,'select:ELG|Electro Galvanized,HDG|Hot Dip Galvanized,PDC|Powder Coating,Non Finishing,Lainnya'],
   ['pic','PIC / Narahubung','Nama kontak','',false,'text'],
   ['telp','Telepon / WhatsApp','08xx…','',false,'tel'],
   ['email','Email','vendor@email.com','',false,'email'],
   ['alamat','Alamat lengkap','Jalan, Kota…','',true,'textarea']
  ],
  customer:[
   ['nama','Nama customer','PT / CV / Pribadi…','required',false,'text'],
   ['kota','Kota','Jakarta, Surabaya…','',false,'text'],
   ['npwp','NPWP','00.000.000.0-000.000','',false,'text'],
   ['pic','PIC / Narahubung','Nama kontak','',false,'text'],
   ['telp','Telepon','08xx…','',false,'tel'],
   ['email','Email','customer@email.com','',false,'email'],
   ['alamat','Alamat pengiriman','Jalan, Kota…','',true,'textarea']
  ],
  supplier:[
   ['nama','Nama supplier','Distributor / Pabrik…','required',false,'text'],
   ['kota','Kota','Jakarta, Cikarang…','',false,'text'],
   ['npwp','NPWP','00.000.000.0-000.000','',false,'text'],
   ['material','Material yang dipasok','SPHC, GI Sheet, SS304…','',true,'text'],
   ['pic','PIC','Nama kontak','',false,'text'],
   ['telp','Telepon','08xx…','',false,'tel'],
   ['email','Email','supplier@email.com','',false,'email'],
   ['alamat','Alamat lengkap','Jalan, Kota…','',true,'textarea']
  ],
  armada:[
   ['nopol','No polisi','B 1234 XX','required',false,'text'],
   ['jenis','Jenis kendaraan','Truk CDD, Engkel, Pickup…','',false,'text'],
   ['driver','Nama driver','','',false,'text'],
   ['milik','Kepemilikan','MNI / Ekspedisi ABC…','',false,'text']
  ]
 }[k];
 // Build form with 2-col grid where possible
 let formHtml='<div class="frow">';
 const rows=[];let open2=false;
 for(const [f,l,ph,attr,wide,type] of FIELDS){
  if(wide){
   if(open2){formHtml+='</div>';open2=false}
   if(rows.length%2===1){formHtml+='</div><div class="frow">';rows.pop()}
   formHtml+=`</div>${fld(l,type==='textarea'?`<textarea class="inp" name="${f}" placeholder="${ph}" rows="2" style="resize:vertical">${esc(x[f]||'')}</textarea>`:`<input class="inp" type="text" name="${f}" value="${esc(x[f]||'')}" placeholder="${ph}" ${attr}>`,true)}<div class="frow">`;
  }else if(type&&type.startsWith('select:')){
   const opts=type.slice(7).split(',').map(o=>{const[v,lb]=o.split('|');return `<option value="${esc(v)}" ${(x[f]||'')===(lb||v)?'selected':''}>${esc(lb||v)}</option>`}).join('');
   const sel2=`<select class="sel" name="${f}"><option value="">— pilih —</option>${opts}</select>`;
   if(rows.length&&rows.length%2===0){formHtml+='</div><div class="frow">';}
   formHtml+=fld(l,sel2,false);rows.push(f)
  }else{
   const inp2=`<input class="inp" type="${type}" name="${f}" value="${esc(x[f]??(f===key?preset||'':''))}" placeholder="${ph}" ${attr}>`;
   if(rows.length&&rows.length%2===0){formHtml+='</div><div class="frow">';}
   formHtml+=fld(l,inp2,false);rows.push(f)
  }
 }
 formHtml+='</div>';
 formHtml+=(id?`<label class="ck full"><input type="checkbox" name="aktif" ${x.aktif!==false?'checked':''}> Aktif (muncul di pilihan form)</label>`:'');
 openModal(`${id?'Ubah':'Tambah'} ${MLBL[k]}`,formHtml,
  async d=>{
   const val=k==='armada'?String(d[key]||'').toUpperCase().trim():cleanName(d[key]);if(!val)throw new Error('Nama wajib diisi.');
   const dup=S[MK[k]].find(y=>y._id!==id&&(k==='armada'?y.nopol===val:normName(y.nama)===normName(val)));if(dup)throw new Error(`Sudah ada: "${dup[key]}".`);
   const data={};FIELDS.forEach(([f])=>data[f]=String(d[f]||'').trim());data[key]=val;
   if(id){data.aktif=!!d.aktif;const old=x[key];await updDoc(MK[k],id,data);if(old&&old!==val&&k!=='armada'){await renameEverywhere(k,old,val)}}else await addDoc(MK[k],{...data,aktif:true})});
}
async function masterDel(k,id){
 const x=byId(MK[k],id);if(!x)return;const key=k==='armada'?'nopol':'nama';
 const u=usage()[k];const cnt=u[x[key]]||0;
 const canHard=cnt===0&&x.aktif!==false;
 openModal(`Hapus ${MLBL[k]}`,
  `<div class="note full" style="margin-bottom:8px"><b>${esc(x[key])}</b></div>`+
  (cnt>0?`<p class="note">Data ini dipakai di <b>${cnt} transaksi</b>. Tidak bisa dihapus permanen — hanya bisa <b>dinonaktifkan</b> agar tidak muncul di pilihan form.</p>`:
   x.aktif===false?`<p class="note">Data ini sudah nonaktif. Hapus permanen akan menghapus seluruh catatannya.</p>`:
   `<p class="note">Data ini belum pernah dipakai di transaksi. Bisa dihapus permanen atau dinonaktifkan.</p>`)+
  (cnt>0?'':`<label class="ck full"><input type="radio" name="mode" value="hard" ${canHard?'checked':''}> Hapus permanen</label><label class="ck full"><input type="radio" name="mode" value="soft" ${!canHard?'checked':''}> Nonaktifkan saja (bisa diaktifkan kembali)</label>`),
  async d=>{
   const mode=d.mode||'soft';
   if(mode==='hard'&&cnt===0){await delDoc(MK[k],id);toast(`${esc(x[key])} dihapus`)}
   else{await updDoc(MK[k],id,{aktif:false});toast(`${esc(x[key])} dinonaktifkan`)}
  },{submit:cnt>0?'Nonaktifkan':'Hapus',danger:cnt===0&&!canHard?false:cnt===0});
}
function masterCsv(k){
 const key=k==='armada'?'nopol':'nama';const u=usage()[k];
 const HDRS={vendor:['Nama','Proses','PIC','Email','Telepon','Alamat','Dipakai','Status'],customer:['Nama','PIC','Email','Telepon','Alamat','Dipakai','Status'],supplier:['Nama','Material','PIC','Email','Telepon','Dipakai','Status'],armada:['No Polisi','Jenis','Driver','Milik','Dipakai','Status']};
 const FLDS={vendor:['nama','proses','pic','email','telp','alamat'],customer:['nama','pic','email','telp','alamat'],supplier:['nama','material','pic','email','telp'],armada:['nopol','jenis','driver','milik']};
 const rows=S[MK[k]].slice().sort((a,b)=>String(a[key]).localeCompare(String(b[key])));
 const csv=[HDRS[k].join(','),...rows.map(x=>[...FLDS[k].map(f=>`"${(x[f]||'').replace(/"/g,'""')}"`),(u[x[key]]||0),x.aktif===false?'Nonaktif':'Aktif'].join(','))].join('\n');
 const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,﻿'+encodeURIComponent(csv);a.download=`master-${k}-${today()}.csv`;a.click();toast(`CSV ${MLBL[k]} diunduh`)}
function refsOf(k,name){const r=[];
 if(k==='vendor'){S.vendor.filter(v=>v.vendor===name).forEach(v=>r.push(['vendor',v._id,{vendor:'$'}]));S.bongkar.filter(b=>b.pihak===name).forEach(b=>r.push(['bongkar',b._id,{pihak:'$'}]))}
 if(k==='customer'){S.spk.filter(s=>s.customer===name).forEach(s=>r.push(['spk',s._id,{customer:'$'}]));S.kirim.filter(x=>x.customer===name).forEach(x=>r.push(['kirim',x._id,{customer:'$'}]));S.bongkar.filter(b=>b.pihak===name).forEach(b=>r.push(['bongkar',b._id,{pihak:'$'}]));S.mutasi.filter(m=>m.pihak===name).forEach(m=>r.push(['mutasi',m._id,{pihak:'$'}]))}
 if(k==='supplier'){S.mutasi.filter(m=>m.pihak===name).forEach(m=>r.push(['mutasi',m._id,{pihak:'$'}]));S.bongkar.filter(b=>b.pihak===name).forEach(b=>r.push(['bongkar',b._id,{pihak:'$'}]))}
 return r}
async function renameEverywhere(k,from,to){const refs=refsOf(k,from);for(const [c,id,f] of refs){const up={};for(const key in f)up[key]=to;await DB.doc(c+'/'+id).update(up)}return refs.length}
function mergeForm(k,from,to){
 const n0=refsOf(k,from).length;
 openModal(`Gabungkan nama ${MLBL[k]}`,fld('Nama di transaksi',`<div style="padding:8px 0"><b>${esc(from)}</b> · ${n0} data</div>`,true)+fld(`Ganti menjadi (nama di master ${MLBL[k]})`,inp('to',to||'','text',`list="dl-mto" required autocomplete="off"`),true)+dl('dl-mto',mNames(k))+`<div class="note full">Semua ${n0} data yang memakai "${esc(from)}" diubah ke nama master. Gunakan untuk salah ketik seperti "Beron" → "Beton".</div>`,
  async d=>{need();const target=cleanName(d.to);if(!inMaster(k,target))throw new Error('Pilih nama yang sudah ada di master. Tambahkan dulu bila belum ada.');if(target===from)throw new Error('Nama sama.');
   const cnt=await renameEverywhere(k,from,target);const old=S[MK[k]].find(x=>x.nama===from);if(old)await updDoc(MK[k],old._id,{aktif:false,mergedTo:target});toast(`${cnt} data digabung ke ${target}`)},{submit:'Gabungkan',done:' '});
}

/* ---------- MASTER WORK CENTRE ---------- */
const WC_SEED=[
 {kode:'WC-CT-01',nama:'Shearing',tipe:'Internal',urutan:1},
 {kode:'WC-PNC-01',nama:'Punching',tipe:'Internal',urutan:2},
 {kode:'WC-BND-01',nama:'Bending',tipe:'Internal',urutan:3},
 {kode:'WC-CNC-01',nama:'CNC Laser',tipe:'Internal',urutan:4},
 {kode:'WC-ROL-01',nama:'Rolling',tipe:'Internal',urutan:5},
 {kode:'WC-WEL-01',nama:'Welding',tipe:'Internal',urutan:6},
 {kode:'WC-ELG-01',nama:'Electro Galvanized',tipe:'Subcont',urutan:7},
 {kode:'WC-HDG-01',nama:'Hot Dip Galvanized',tipe:'Subcont',urutan:8},
 {kode:'WC-PWC-01',nama:'Powder Coating',tipe:'Subcont',urutan:9},
 {kode:'WC-FNH-01',nama:'Finishing / QC Final',tipe:'Internal',urutan:10}
];

async function seedWc(){
 if(S.mwc.length>0)return;
 for(const w of WC_SEED)await addDoc('mwc',{...w,aktif:true,ket:''});
 toast('10 Work Centre default berhasil ditambahkan');
}

function wcTab(){
 const f=F['master-data'],q=f.q.toLowerCase();
 const rows=S.mwc.filter(x=>!q||(x.kode+x.nama+x.tipe+(x.ket||'')).toLowerCase().includes(q)).sort((a,b)=>a.urutan-b.urutan);

 const kpiInt=S.mwc.filter(x=>x.tipe==='Internal'&&x.aktif!==false).length;
 const kpiSub=S.mwc.filter(x=>x.tipe==='Subcont'&&x.aktif!==false).length;
 const kpiOff=S.mwc.filter(x=>x.aktif===false).length;
 const kpiRow=`<div class="kpis" style="grid-template-columns:repeat(4,minmax(120px,1fr))">
  <div class="kpi ok"><div class="lb">Internal</div><div class="v">${kpiInt}</div></div>
  <div class="kpi info"><div class="lb">Subcont</div><div class="v">${kpiSub}</div></div>
  <div class="kpi${kpiOff>0?' warn':''}"><div class="lb">Nonaktif</div><div class="v">${kpiOff}</div></div>
  <div class="kpi"><div class="lb">Total WC</div><div class="v">${S.mwc.length}</div></div>
 </div>`;

 if(!rows.length&&S.mwc.length===0){
  return kpiRow+`<section class="panel"><div class="pbody note">Belum ada Work Centre. Tambahkan manual atau gunakan data default 10 WC dari MNI.</div>`+
   `<div style="display:flex;gap:8px;margin-top:12px"><button class="btn primary" data-act="mnew">+ Tambah Manual</button><button class="btn ghost" data-act="wcseed">${ic('zap')} Isi 10 WC Default</button></div></section>`;
 }
 if(!rows.length)return kpiRow+`<section class="panel">${empty('Tidak ada WC yang cocok','Coba ubah kata kunci pencarian')}</section>`;

 const tblRows=rows.map(x=>{
  const tipeCls=x.tipe==='Internal'?'ok':'info';
  const aktifCls=x.aktif===false?'void':'';
  const vendorNm=x.vendor?S.mvendor.find(v=>v._id===x.vendor)?.nama||'–':'–';
  return `<tr class="${aktifCls}">
   <td><b class="mono">${esc(x.kode)}</b></td>
   <td><b>${esc(x.nama)}</b>${x.ket?`<div class="note" style="font-size:12px">${esc(x.ket)}</div>`:''}</td>
   <td>${chip(x.tipe,tipeCls)}</td>
   <td>${x.tipe==='Subcont'?esc(vendorNm):'<span class="muted">–</span>'}</td>
   <td class="num muted">${x.urutan}</td>
   <td>${x.aktif===false?chip('Nonaktif','plain'):chip('Aktif','ok')}</td>
   <td class="acts-r">
    <button class="btn sm ghost" data-act="wcedit" data-id="${x._id}">${ic('edit2')} Ubah</button>
    <button class="btn sm ghost danger" data-act="wcdel" data-id="${x._id}">${ic('trash')}</button>
   </td>
  </tr>`;
 }).join('');

 return kpiRow+`<section class="panel">
  <div class="pbody note">Work Centre (WC) adalah mesin atau proses produksi yang digunakan dalam routing item. Subcont = dikerjakan oleh vendor luar.</div>
  <div class="tbl-wrap"><table>
   <thead><tr><th>Kode WC</th><th>Nama / Proses</th><th>Tipe</th><th>Vendor Subcont</th><th class="num">Urutan</th><th>Status</th><th></th></tr></thead>
   <tbody>${tblRows}</tbody>
  </table></div>
  <div style="margin-top:12px;display:flex;gap:8px">
   ${S.mwc.length===0?`<button class="btn ghost" data-act="wcseed">${ic('zap')} Isi 10 WC Default</button>`:''}
  </div>
 </section>`;
}

function wcForm(id){
 const x=id?S.mwc.find(r=>r._id===id):{};
 const vendorOpts=S.mvendor.filter(v=>v.aktif!==false).sort((a,b)=>a.nama.localeCompare(b.nama));
 const vendorSel=`<select class="inp" name="vendor"><option value="">– Tidak ada / pilih nanti –</option>${vendorOpts.map(v=>`<option value="${v._id}" ${x.vendor===v._id?'selected':''}>${esc(v.nama)}</option>`).join('')}</select>`;
 const formHtml=
  `<div class="frow">
   ${fld('Kode WC',`<input class="inp mono" type="text" name="kode" value="${esc(x.kode||'')}" placeholder="WC-XX-01" required>`,false)}
   ${fld('Urutan',`<input class="inp" type="number" name="urutan" value="${x.urutan??S.mwc.length+1}" min="1" max="99">`,false)}
  </div>
  ${fld('Nama Proses / WC',`<input class="inp" type="text" name="nama" value="${esc(x.nama||'')}" placeholder="Shearing, Welding, CNC Laser…" required>`,true)}
  <div class="frow">
   ${fld('Tipe',`<select class="inp" name="tipe"><option value="Internal" ${(x.tipe||'Internal')==='Internal'?'selected':''}>Internal (dikerjakan sendiri)</option><option value="Subcont" ${x.tipe==='Subcont'?'selected':''}>Subcont (dikerjakan vendor)</option></select>`,false)}
  </div>
  ${fld('Vendor Subcont (kosongkan jika Internal)',vendorSel,true)}
  ${fld('Keterangan',`<textarea class="inp" name="ket" rows="2" placeholder="Catatan tambahan…">${esc(x.ket||'')}</textarea>`,true)}
  ${id?`<label class="ck full"><input type="checkbox" name="aktif" ${x.aktif!==false?'checked':''}> Aktif</label>`:''}`;

 openModal(`${id?'Ubah':'Tambah'} Work Centre`,formHtml,async d=>{
  const kode=String(d.kode||'').trim().toUpperCase();
  const nama=String(d.nama||'').trim();
  if(!kode||!nama)throw new Error('Kode dan Nama wajib diisi.');
  const dupKode=S.mwc.find(r=>r._id!==id&&r.kode.toUpperCase()===kode);
  if(dupKode)throw new Error(`Kode "${kode}" sudah dipakai oleh "${dupKode.nama}". Gunakan kode lain.`);
  const data={kode,nama,tipe:d.tipe||'Internal',urutan:parseInt(d.urutan)||S.mwc.length+1,vendor:d.vendor||'',ket:String(d.ket||'').trim()};
  if(id){data.aktif=!!d.aktif;await updDoc('mwc',id,data);toast(`WC ${kode} diperbarui`)}
  else{await addDoc('mwc',{...data,aktif:true});toast(`WC ${kode} ditambahkan`)}
 });
}

async function wcDel(id){
 const x=S.mwc.find(r=>r._id===id);if(!x)return;
 /* cek apakah WC sedang dipakai di SPK aktif via STAGE_WC mapping */
 const stageWcMap={'Shearing':'WC-CT-01','Punching':'WC-PNC-01','Bending':'WC-BND-01','CNC Laser':'WC-CNC-01','Rolling':'WC-ROL-01','Welding':'WC-WEL-01','Electro Galvanized':'WC-ELG-01','Hot Dip Galvanized':'WC-HDG-01','Powder Coating':'WC-PWC-01','Finishing / QC Final':'WC-FNH-01'};
 const wcStages=Object.entries(stageWcMap).filter(([,kode])=>kode===x.kode).map(([st])=>st);
 const aktifSpk=S.spk.filter(s=>(s.status||'Terbit')!=='Draft'&&s.status!=='Selesai');
 const dipakai=aktifSpk.filter(s=>{const fl=flow(s._id);return fl&&wcStages.some(st=>fl.stage&&fl.stage.toLowerCase().includes(st.toLowerCase()))});
 if(dipakai.length>0){
  openModal(`Tidak bisa hapus WC`,
   `<div class="note full" style="margin-bottom:8px"><b>${esc(x.kode)} – ${esc(x.nama)}</b></div>`+
   `<p class="note crit">Work Centre ini sedang dipakai oleh <b>${dipakai.length} SPK aktif</b>:<br>${dipakai.slice(0,5).map(s=>`SPK ${s.no} · ${esc(s.customer)}`).join(', ')}${dipakai.length>5?` dan ${dipakai.length-5} lainnya`:''}</p>`+
   `<p class="note">Selesaikan atau pindahkan SPK tersebut terlebih dahulu sebelum menghapus Work Centre ini.</p>`,
   null,{submit:'Tutup',danger:false});
  return;
 }
 openModal(`Hapus Work Centre`,
  `<div class="note full" style="margin-bottom:8px"><b>${esc(x.kode)} – ${esc(x.nama)}</b></div>`+
  `<p class="note">Work Centre ini tidak sedang dipakai di SPK aktif manapun. Hapus permanen?</p>`,
  async()=>{await delDoc('mwc',id);toast(`${x.kode} dihapus`)},{submit:'Hapus',danger:true});
}

/* ---------- CEK DATA ---------- */
F['cek-data']={cat:'',sev:'',grp:true,vendorF:''};

// Category meta: icon, nav destination for "lihat semua" link
const CAT_META={
 'Vendor':{ic:'truck',nav:'vendor',color:'warn'},
 'Master data':{ic:'db',nav:'master-data',color:'crit'},
 'SPK':{ic:'clipboard',nav:'spk',color:'info'},
 'Pengiriman':{ic:'send',nav:'pengiriman',color:'info'},
 'Bongkar muat':{ic:'layers',nav:'bongkar-muat',color:'warn'},
 'Stok':{ic:'box',nav:'bahan-baku',color:'crit'},
 'Dokumen':{ic:'file',nav:'vendor',color:'crit'},
 'Katalog':{ic:'tag',nav:'spk',color:'info'},
 'PR':{ic:'cart',nav:'bahan-baku',color:'warn'},
 'Produksi':{ic:'tool',nav:'spk',color:'warn'},
 'Stok RM':{ic:'box',nav:'bahan-baku',color:'warn'},
 'Stok FG':{ic:'box',nav:'barang-jadi',color:'warn'},
};

function dataIssues(){
 const c=calc(),t=c.t,I=[];
 const add=(sev,cat,title,meta,act,detail,vendorKey)=>I.push({sev,cat,title,meta,act,detail:detail||'',vendorKey:vendorKey||''});

 /* ── VENDOR ── */
 const unknownV=c.vend.filter(x=>x.st!=='Batal'&&UNKNOWN_V(x.v.vendor));
 unknownV.forEach(x=>add(x.st==='Selesai'?1:2,'Vendor',`SJ ${esc(x.v.noSJ)} belum ada nama vendor`,`${spkName(x.v.spk)} · ${esc(x.v.proses||'')} · ${fd(x.v.tgl)}`,`data-act="setvendor" data-id="${x.v._id}">Isi vendor`,'Barang tidak bisa dilacak asal vendornya',''));

 // Vendor overdue: >7 hari warning, >14 hari kritis
 c.vend.filter(x=>(x.st==='Di Vendor'||x.st==='Kembali Sebagian')&&x.age>7).forEach(x=>{
  const over14=x.age>14;
  const vNm=UNKNOWN_V(x.v.vendor)?'':x.v.vendor;
  add(over14?3:2,'Vendor',`SJ ${esc(x.v.noSJ)} di ${vNm||'vendor'} sudah ${x.age} hari`,`${n(x.sisa)} pcs · ${spkName(x.v.spk)} · ${esc(x.v.proses||'')}`,`data-act="terima" data-id="${x.v._id}">Terima kembali`,over14?'Berpotensi menghambat jadwal produksi':'Segera follow up ke vendor',vNm);
 });

 /* ── MASTER DATA ── */
 const u=usage();
 /* Skip nama yang:
    (a) sudah terdaftar aktif (ditangani oleh inMaster)
    (b) sudah pernah di-merge ke nama lain (ada record dengan mergedTo=nama aktif)
    (c) ada record master dengan nama ini meski tidak aktif (sudah di-proses)
 */
 const isMerged=(k,nm)=>S[MK[k]].some(x=>x.nama===nm&&x.mergedTo&&inMaster(k,x.mergedTo));
 // hasRecord: ada record master dgn nama ini (meski nonaktif/deleted) — berarti sudah pernah diproses
 const hasRecord=(k,nm)=>S[MK[k]].some(x=>x.nama===nm);
 for(const k of['vendor','customer','supplier'])Object.entries(u[k])
  .filter(([nm,cnt])=>!inMaster(k,nm)&&!isMerged(k,nm)&&!hasRecord(k,nm)&&cnt>=2)
  .forEach(([nm,cnt])=>{
   const sim=similarTo(k,nm);
   add(sim?3:2,'Master data',`${MLBL[k][0].toUpperCase()+MLBL[k].slice(1)} "${esc(nm)}" belum terdaftar${sim?` — mirip "${esc(sim.nama)}"`:''}`,`dipakai ${cnt}× di transaksi`,
    sim?`data-act="mmerge" data-k="${k}" data-from="${esc(nm)}" data-to="${esc(sim.nama)}">Gabungkan`:`data-act="mreg" data-k="${k}" data-nm="${esc(nm)}">Daftarkan`,
    sim?`Diduga typo dari "${esc(sim.nama)}" — gabungkan agar laporan akurat`:'Data tidak bisa dikelompokkan sampai terdaftar');
  });

 /* ── SPK ── */
 S.spk.forEach(s=>{const x=c.spk[s._id];
  // SPK terlambat: satu entry per SPK, severity tergantung kondisi
  if(x.st==='Terlambat'){
   const hasAlasan=String(s.alasan||'').trim();
   const hasTindakan=String(s.tindakan||'').trim();
   const kritis=x.late>7;
   if(kritis&&!hasAlasan){
    // Kritis & belum ada catatan sama sekali — harus segera diisi
    add(3,'SPK',`SPK ${s.no} kritis: terlambat ${x.late} hari — belum ada kendala`,
     `${esc(s.customer)} · terkirim ${Math.round(x.pK*100)}%`,
     `data-act="kendal" data-id="${s._id}">Isi kendala`,
     'Risiko kehilangan order / denda — manajemen perlu tahu penyebab');
   } else if(kritis&&hasAlasan&&!hasTindakan){
    // Kritis & ada alasan tapi belum ada rencana tindakan
    add(3,'SPK',`SPK ${s.no} kritis: terlambat ${x.late} hari — tindakan belum diisi`,
     `${esc(s.customer)} · terkirim ${Math.round(x.pK*100)}% · Kendala: ${esc(s.alasan.slice(0,50)+(s.alasan.length>50?'…':''))}`,
     `data-act="kendal" data-id="${s._id}">Isi rencana tindakan`,
     'Kendala dicatat — lengkapi rencana penyelesaiannya');
   } else if(!kritis&&!hasAlasan){
    // Terlambat 1–7 hari, belum ada kendala
    add(2,'SPK',`SPK ${s.no} terlambat ${x.late} hari — belum ada catatan`,
     `${esc(s.customer)} · terkirim ${Math.round(x.pK*100)}% · due ${fd(s.due||'')}`,
     `data-act="kendal" data-id="${s._id}">Isi kendala`,
     'Manajemen perlu tahu penyebab keterlambatan');
   }
   // Jika sudah ada alasan + tindakan (kritis atau tidak) → tidak muncul di Cek Data
   // User bisa lihat dari drawer SPK, issue hilang otomatis setelah diisi lengkap
  }
  // Draft lama
  if(x.st==='Draft'&&s.at&&days(String(s.at).slice(0,10),t)>2)
   add(1,'SPK',`Draft SPK ${s.no} belum diterbitkan (${days(String(s.at).slice(0,10),t)} hari)`,`${esc(s.customer)} · dibuat ${fd(s.at)}`,`data-act="spksheet" data-id="${s._id}">Buka & terbitkan`,'Barang belum bisa diproses sebelum SPK aktif');
  // Item tanpa berat
  if(s.terbitAt&&(s.items||[]).some(i=>!(+i.w))){
   const cnt=(s.items||[]).filter(i=>!(+i.w)).length;
   add(1,'SPK',`SPK ${s.no}: ${cnt} item belum ada berat (kg)`,`${esc(s.customer)} · total kg jadi tidak akurat`,`data-act="spkedit" data-id="${s._id}">Lengkapi berat`,'Berat diperlukan untuk laporan tonase & armada');
  }
  // Terkirim tapi produksi belum 100%
  const stale=x.lines.filter(l=>l.kirim>=l.q&&(+l.prod||0)<l.q&&l.vOut<l.q);
  if(x.st!=='Draft'&&stale.length)
   add(1,'Produksi',`SPK ${s.no}: ${stale.length} item sudah terkirim, produksi belum dicatat 100%`,esc(s.customer),`data-act="prodfix" data-id="${s._id}">Tandai selesai`,'Progress produksi tidak sinkron dengan pengiriman');
  // SPK aktif tapi 0% progress & sudah >3 hari dari terbit
  if((x.st==='Berjalan'||x.st==='Terlambat')&&x.pP===0&&s.terbitAt&&days(String(s.terbitAt).slice(0,10),t)>3)
   add(2,'Produksi',`SPK ${s.no} aktif tapi produksi 0% sudah ${days(String(s.terbitAt).slice(0,10),t)} hari`,`${esc(s.customer)} · deadline ${fd(s.deadline||'')}`,`data-act="openspk" data-id="${s._id}">Lihat SPK & update`,'Belum ada input progres sama sekali');
 });

 /* ── PENGIRIMAN ── */
 S.kirim.filter(k=>k.status==='Dalam Perjalanan'&&days(k.tgl,t)>2).forEach(k=>
  add(2,'Pengiriman',`SJ ${esc(k.noSJ)} masih "Dalam Perjalanan" sejak ${days(k.tgl,t)} hari lalu`,`${esc(k.customer)} · ${fd(k.tgl)}`,`data-act="kstep" data-id="${k._id}" data-to="Diterima">Tandai diterima`,'Konfirmasi penerimaan belum diupdate'));
 S.kirim.filter(k=>k.status==='Disiapkan'&&days(k.tgl,t)>2).forEach(k=>
  add(2,'Pengiriman',`SJ ${esc(k.noSJ)} sudah disiapkan ${days(k.tgl,t)} hari, belum berangkat`,`${esc(k.customer)} · ${fd(k.tgl)}`,`data-act="kstep" data-id="${k._id}" data-to="Dalam Perjalanan">Berangkat`,'Barang menunggu di gudang tanpa kepastian jadwal'));

 /* ── BONGKAR MUAT ── */
 S.bongkar.filter(b=>(b.status==='Antri'||b.status==='Proses')&&b.tgl<t).forEach(b=>
  add(2,'Bongkar muat',`${esc(b.jenis)} ${esc(b.nopol||'')} dari ${fd(b.tgl)} masih "${esc(b.status)}"`,`${esc(b.pihak||'')} · ${esc(b.ref||'')}`,
   b.status==='Antri'?`data-act="void" data-c="bongkar" data-id="${b._id}">Batalkan`:`data-act="bmstep" data-id="${b._id}" data-to="Selesai">Tutup`,'Aktivitas bongkar/muat belum diselesaikan'));

 /* ── STOK ── */
 for(const g of['rm','fg']){
  const gudang=g==='rm'?'Bahan Baku':'Barang Jadi';
  const subcat=g==='rm'?'Stok RM':'Stok FG';
  S[g].forEach(r=>{
   const v=c.stock[g][r._id];
   const lbl=g==='rm'?rmLabel(r):fgLabel(r);
   if(v<0)add(3,subcat,`Stok MINUS: ${esc(lbl)} (${n(v)} ${r.sat||r.satuan||'pcs'})`,`Gudang ${gudang} · lakukan opname`,`data-act="mv" data-g="${g}" data-j="opname" data-item="${r._id}">Opname`,'Stok negatif = data tidak valid, kemungkinan ada transaksi yang belum dicatat');
   else if(v>=0&&v<=(g==='rm'?r.buffer||5:3))add(g==='rm'?2:1,subcat,`Stok ${g==='rm'?'material':'FG'} hampir habis: ${esc(lbl)} (${n(v)} ${r.sat||r.satuan||'pcs'})`,`Gudang ${gudang}`,`data-act="mv" data-g="${g}" data-j="${g==='rm'?'masuk':'terima'}" data-item="${r._id}">${g==='rm'?'Buat PR / tambah stok':'Tandai terima'}`,'Perlu reorder segera');
  });
 }

 /* ── DOKUMEN ── */
 const seen={};[...S.vendor,...S.kirim].filter(d=>d.status!=='Batal'&&d.noSJ).forEach(d=>{(seen[d.noSJ]=seen[d.noSJ]||[]).push(d)});
 Object.entries(seen).filter(([,a])=>a.length>1).forEach(([no,a])=>
  add(3,'Dokumen',`No SJ "${esc(no)}" digunakan ${a.length}× (duplikat)`,`Batalkan yang salah · ${a.map(x=>fd(x.tgl)).join(' vs ')}`,`data-act="go" data-href="${a[0].vendor!==undefined?'vendor':'pengiriman'}">Lihat`,'Nomor SJ ganda menyebabkan kacau di rekap'));

 /* ── PR / PURCHASING ── */
 if(S.pr)S.pr.filter(p=>p.status==='Open'&&p.tgl&&days(p.tgl,t)>7).forEach(p=>
  add(2,'PR',`PR ${esc(p.no||p._id)} sudah ${days(p.tgl,t)} hari belum diproses`,`${esc(p.item||'')} · ${n(p.qty||0)} ${esc(p.sat||'')} · dibuat ${fd(p.tgl)}`,`data-act="go" data-href="bahan-baku">Lihat PR`,'Kebutuhan bahan baku mungkin tertunda'));

 /* ── KATALOG ── */
 {const X=katIndex();
  const sim=X.arr.filter(x=>x.sim.length).length;
  if(sim)add(1,'Katalog',`${sim} item katalog SPK diduga dobel / salah ejaan`,'mis. "Cabe Tray" vs "Cable Tray" — muncul ganda di pilihan Description',`data-act="katgo" data-kf="sim">Rapikan katalog`,'Katalog bersih mempercepat input SPK');
  X.arr.filter(x=>x.flag).forEach(x=>
   add(2,'Katalog',`Berat janggal: ${esc(x.d)}`,Object.entries(x.w).map(([t,v])=>(t==='–'?'':t+' mm: ')+v+' kg').join(', ')+' · akan terisi otomatis di SPK berikutnya',`data-act="katedit" data-d="${esc(x.d)}">Perbaiki berat`,'Berat tidak wajar akan mempengaruhi kalkulasi tonase'));
 }

 return I.sort((a,b)=>b.sev-a.sev||a.cat.localeCompare(b.cat));
}

function cekDataCsv(){
 const I=dataIssues();
 const rows=[['Prioritas','Kategori','Masalah','Detail','Catatan'],...I.map(i=>[i.sev>=3?'Kritis':i.sev===2?'Perhatian':'Info',i.cat,i.title.replace(/"/g,"'"),i.meta.replace(/"/g,"'"),i.detail.replace(/"/g,"'")])];
 const csv=rows.map(r=>r.map(c=>`"${c}"`).join(',')).join('\n');
 const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,﻿'+encodeURIComponent(csv);
 a.download=`CekData_${new Date().toISOString().slice(0,10)}.csv`;a.click();
 toast('CSV diunduh');
}

const SEV_LBL={3:'Kritis',2:'Perhatian',1:'Info'};
const SEV_CLS={3:'crit',2:'warn',1:'info'};
const SEV_IC={3:'alert-triangle',2:'alert-circle',1:'info'};

T['cek-data']=()=>{
 const I=dataIssues();
 const f=F['cek-data'];
 // Group area categories: Stok RM + Stok FG → "Stok", SPK + Produksi → shown separately
 const cats=[...new Set(I.map(i=>i.cat))].sort();
 const crit=I.filter(i=>i.sev>=3).length,warn=I.filter(i=>i.sev===2).length,info=I.filter(i=>i.sev===1).length;
 const sevBtns=[['','Semua'],['3','Kritis ('+crit+')'],['2','Perhatian ('+warn+')'],['1','Info ('+info+')']];
 // Vendor filter — hanya muncul ketika filter ke kategori Vendor
 const vendorNames=f.cat==='Vendor'?[...new Set(S.vendor.filter(v=>v.vendor&&!UNKNOWN_V(v.vendor)).map(v=>v.vendor))].sort():[];
 const vendorSel=vendorNames.length?`<select class="sel" data-act="filtsel" data-view="cek-data" data-key="vendorF"><option value="">Semua vendor</option>${vendorNames.map(v=>`<option ${f.vendorF===v?'selected':''}>${esc(v)}</option>`).join('')}</select>`:'';
 return `<div class="tb-group">
  <div class="tb-lbl">Kategori</div>
  ${segBtns('cek-data','cat',[['','Semua ('+I.length+')'],...cats.map(c=>[c,`${c} (${I.filter(i=>i.cat===c).length})`])])}
 </div>
 <div class="tb-group">
  <div class="tb-lbl">Prioritas</div>
  ${segBtns('cek-data','sev',sevBtns)}
 </div>
 ${vendorSel}
 <button class="btn sm" data-act="cekgrp"><svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 4h12M4 8h8M6 12h4"/></svg> ${f.grp?'List':'Grup'}</button>
 <button class="btn sm" data-act="cekcsv">${ic('dl')} Export CSV</button>`;
};

B['cek-data']=()=>{
 const I=dataIssues(),f=F['cek-data'];
 const xs=I.filter(i=>(!f.cat||i.cat===f.cat)&&(!f.sev||String(i.sev)===f.sev)&&(!f.vendorF||i.vendorKey===f.vendorF));
 const crit=I.filter(i=>i.sev>=3).length,warn=I.filter(i=>i.sev===2).length,info=I.filter(i=>i.sev===1).length;
 const recs=S.spk.length+S.vendor.length+S.kirim.length+S.bongkar.length+S.mutasi.length;
 const score=Math.max(0,Math.round(100*(1-Math.min(1,(crit*1.5+warn*0.5+info*0.1)/Math.max(1,recs)))));
 const scoreCls=score>=90?'ok':score>=70?'warn':'crit';

 // Per-area mini health
 const areas=[
  {k:'SPK',lbl:'SPK & Produksi',nav:'spk'},
  {k:'Produksi',lbl:'Produksi',nav:'spk'},
  {k:'Vendor',lbl:'Surat Jalan Vendor',nav:'vendor'},
  {k:'Pengiriman',lbl:'Pengiriman',nav:'pengiriman'},
  {k:'Stok RM',lbl:'Stok Bahan Baku',nav:'bahan-baku'},
  {k:'Stok FG',lbl:'Stok Barang Jadi',nav:'barang-jadi'},
  {k:'Master data',lbl:'Master Data',nav:'master-data'},
  {k:'Dokumen',lbl:'Dokumen',nav:'vendor'},
 ];
 const areaCells=areas.map(a=>{
  const ac=I.filter(i=>i.cat===a.k&&i.sev>=3).length;
  const aw=I.filter(i=>i.cat===a.k&&i.sev===2).length;
  const ai=I.filter(i=>i.cat===a.k&&i.sev===1).length;
  const tot=ac+aw+ai;
  const cls=ac>0?'crit':aw>0?'warn':ai>0?'info':'ok';
  return `<div class="cd-area ${cls}" data-act="setcat" data-cat="${a.k}">
   <div class="cd-area-lbl">${a.lbl}</div>
   <div class="cd-area-cnt">${tot===0?'✓':tot}</div>
   ${tot>0?`<div class="cd-area-sub">${ac?`<span class="cd-pip crit">${ac}K</span>`:''}${aw?`<span class="cd-pip warn">${aw}P</span>`:''}${ai?`<span class="cd-pip info">${ai}I</span>`:''}</div>`:'<div class="cd-area-sub ok-txt">Bersih</div>'}
  </div>`;
 }).join('');

 const issueRow=i=>{
  const sevCls=SEV_CLS[i.sev]||'';
  return `<div class="alert ${sevCls}">
   <span class="st"></span>
   <div class="alert-body">
    <div class="alert-title">${chip(i.cat,'plain')} ${i.title}</div>
    <div class="meta">${i.meta}</div>
    ${i.detail?`<div class="cd-detail">${i.detail}</div>`:''}
   </div>
   <button class="btn sm" ${i.act}</button>
  </div>`;
 };

 // Issue list — grouped or flat
 let listHtml='';
 if(!xs.length){
  listHtml=empty('Data bersih','Tidak ada temuan untuk filter ini.');
 } else if(f.grp&&!f.cat&&!f.sev){
  // Grouped by severity
  const sevGroups=[3,2,1].filter(sv=>xs.some(i=>i.sev===sv));
  listHtml=sevGroups.map(sv=>{
   const group=xs.filter(i=>i.sev===sv);
   const cls=SEV_CLS[sv];
   return `<div class="cd-group">
    <div class="cd-group-hd ${cls}">
     ${ic(SEV_IC[sv])} ${SEV_LBL[sv]}
     <span class="cd-group-cnt">${group.length}</span>
    </div>
    <div class="alerts">${group.slice(0,60).map(i=>issueRow(i)).join('')}</div>
    ${group.length>60?`<div class="pbody note">+${group.length-60} lainnya — export CSV untuk lihat semua</div>`:''}
   </div>`;
  }).join('');
 } else {
  listHtml=`<div class="alerts">${xs.slice(0,120).map(i=>issueRow(i)).join('')}</div>${xs.length>120?`<div class="pbody note">+${xs.length-120} lainnya — export CSV untuk lihat semua</div>`:''}`;
 }


 return `
 <section class="kpis">
  <div class="kpi ${scoreCls}">
   <span class="lb">Skor Data</span>
   <span class="v">${score}<small>/100</small></span>
   <span class="s">${score>=90?'Data sangat bersih':score>=70?'Ada beberapa yang perlu diperhatikan':'Banyak data perlu diperbaiki'}</span>
  </div>
  <div class="kpi crit" data-act="setcat" data-cat="" style="cursor:pointer">
   <span class="lb">Kritis</span><span class="v">${crit}</span><span class="s">harus segera ditangani</span>
  </div>
  <div class="kpi warn" data-act="setcat" data-cat="" style="cursor:pointer">
   <span class="lb">Perhatian</span><span class="v">${warn}</span><span class="s">perlu dilengkapi / diupdate</span>
  </div>
  <div class="kpi info" data-act="setcat" data-cat="" style="cursor:pointer">
   <span class="lb">Info</span><span class="v">${info}</span><span class="s">kelengkapan dokumen</span>
  </div>
 </section>

 <section class="panel cd-area-panel">
  <header><h2>Area Operasional</h2><span class="hint">klik area untuk filter</span></header>
  <div class="cd-areas">${areaCells}</div>
 </section>

 <section class="panel">
  <header>
   <h2>${f.cat?f.cat+' — ':''} ${f.sev?SEV_LBL[+f.sev]+' — ':''} Daftar Perbaikan <span class="cd-total-badge">${xs.length}</span></h2>
   <span class="hint">klik tombol di kanan untuk perbaiki langsung</span>
  </header>
  ${listHtml}
 </section>`;
};

/* ---------- GUDANG BAHAN BAKU: analytics, purchasing, opname ---------- */
const DENS={SPHC:7.85,SPCC:7.85,SS304:7.93,SS316:7.98,Aluminium:2.71,Lainnya:7.85};
const GRP=g=>g==='SS304'||g==='SS316'?'Stainless':g==='Aluminium'?'Aluminium':'Baja (SPHC/SPCC)';
const GRPS=['Baja (SPHC/SPCC)','Stainless','Aluminium'];
const dims=r=>(String(r.ukuran||'').match(/[\d]+(?:[.,]\d+)?/g)||[]).map(x=>parseFloat(x.replace(',','.')));
const kgLbr=r=>{const d=dims(r);if(d.length<3)return 0;return d[0]*d[1]*d[2]/1e6*(DENS[grade(r)]||7.85)};
const thkR=r=>{const d=dims(r);return d.length?d[0]:0};
const ton=kg=>n(Math.round(kg/100)/10);
const SET=()=>({leadBeli:7,cover:30,...(byId('master','setting')||{})});
const addDays=(s,k)=>{const d=new Date(s+'T00:00:00');d.setDate(d.getDate()+k);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const monthKey=s=>String(s).slice(0,7);
const BLN3=m=>BLN[+m.slice(5,7)-1]+' '+m.slice(2,4);
F['bahan-baku']={q:'',grade:'',st:'',tab:'stok',sort:'grade',mvj:'',mvp:'90',opn:{},beli:{},ksItem:'',ksPer:'all'};

function rmCalc(){
 const c=calc();if(c._rm)return c._rm;
 const t=c.t,st=SET(),hist=[...S.rmhist].sort((a,b)=>a.tgl.localeCompare(b.tgl));
 const prOpen={};S.pr.filter(p=>p.status==='Diajukan'||p.status==='Dipesan').forEach(p=>(p.items||[]).forEach(i=>{prOpen[i.item]=(prOpen[i.item]||0)+Math.max(0,(+i.q||0)-(+i.qTerima||0))}));
 const byMv={};S.mutasi.filter(m=>m.gudang==='rm').forEach(m=>(byMv[m.item]=byMv[m.item]||[]).push(m));
 const info={},monthly={};const from90=addDays(t,-90),from30=addDays(t,-30);
 const nextM=m=>{const [y,mo]=m.split('-').map(Number);return mo===12?`${y+1}-01`:`${y}-${pad(mo+1)}`};
 const addMonth=(a,b,qty,kg,est)=>{ /* spread a decrease evenly over the days (a,b], split by calendar month */
  const tot=Math.max(1,days(a,b));let cur=a;let guard=0;while(cur<b&&guard++<40){const m=monthKey(addDays(cur,1));const mEnd=addDays(nextM(m)+'-01',-1);const seg=mEnd<b?mEnd:b;const o=monthly[m]||(monthly[m]={kg:0,est:false});const v=kg*days(cur,seg)/tot;o.kg+=v;if(est)o.kgE=(o.kgE||0)+v;cur=seg}};
 for(const r of S.rm){
  const id=r._id,kg1=kgLbr(r),stok=c.stock.rm[id];
  const pts=hist.filter(h=>h.stok&&h.stok[id]!==undefined).map(h=>[h.tgl,+h.stok[id]]);
  /* usage rate: detailed snapshot intervals (≤21 days apart, last 180 days) + transactions recorded in the app.
     Long gaps between snapshots only show the net change (usage minus receipts), so they feed the monthly estimate but not the rate. */
  let hUse=0,hDays=0,recv90=0;const from180=addDays(t,-180);
  for(let i=1;i<pts.length;i++){const [a,va]=pts[i-1],[b,vb]=pts[i];const dec=va-vb;const gap=days(a,b);const longGap=gap>21;
   if(dec>0)addMonth(a,b,dec,dec*kg1,longGap);else if(b>from90)recv90+=-dec;
   if(!longGap&&b>from180){hDays+=gap;if(dec>0)hUse+=dec}}
  const mv=(byMv[id]||[]).sort((a,b)=>(a.tgl+a.at).localeCompare(b.tgl+b.at));
  const base=r.tglStokAwal||t;let run=+r.stokAwal||0;const series=pts.filter(p=>p[0]<base);series.push([base,run]);
  let aUse=0,a30=0;
  for(const m of mv){const orig=m.koreksiDari?S.mutasi.find(x=>x._id===m.koreksiDari):null;const isOut=m.jenis==='keluar'||(m.jenis==='koreksi'&&orig&&orig.jenis==='keluar');const isIn=m.jenis==='masuk'||(m.jenis==='koreksi'&&orig&&orig.jenis==='masuk');
   if(isOut){const q=-(+m.delta||0);if(m.tgl>from90)aUse+=q;if(m.tgl>from30)a30+=q;const mk=monthKey(m.tgl);(monthly[mk]=monthly[mk]||{kg:0,est:false}).kg+=q*kg1}
   if(isIn&&m.tgl>from90)recv90+=+m.delta||0;
   if(m.tgl>=base){run+=+m.delta||0;if(series.length&&series[series.length-1][0]===m.tgl)series[series.length-1][1]=run;else series.push([m.tgl,run])}}
  if(series[series.length-1][0]!==t)series.push([t,stok]);else series[series.length-1][1]=stok;
  const appDays=Math.max(0,Math.min(90,days(base,t)));
  const useApp=appDays>=60;const rateDays=useApp?appDays:hDays+appDays;const rateUse=useApp?aUse:hUse+aUse;
  const avgDay=rateDays>0?Math.max(0,rateUse)/rateDays:0;const cover=avgDay>0?stok/avgDay:Infinity;
  const cons90=avgDay*90,cons30=useApp?a30:avgDay*30;const basis=useApp?'transaksi aplikasi 90 hari':hDays?`histori ${hDays} hari (snapshot Excel) + ${appDays} hari transaksi aplikasi`:'transaksi aplikasi';
  const min=+r.min||0,buf=+r.buffer||0,rop=min+avgDay*st.leadBeli,target=Math.max(buf,rop+avgDay*st.cover),onOrder=prOpen[id]||0;
  let sug=0,why='';if((stok<buf||(avgDay>0&&stok<=rop))){sug=Math.ceil(Math.max(0,target-stok-onOrder));why=stok<buf?`stok di bawah buffer ${n(buf)}`:`stok ≤ titik pesan ulang ${n(Math.ceil(rop))}`}
  let s='Aman',cls='ok';
  if(stok<=0&&(buf>0||min>0||avgDay>0)){s='Habis';cls='crit'}else if(stok<=0){s='Kosong';cls='plain'}
  else if(min>0&&stok<min){s='Kritis';cls='crit'}else if(sug>0){s='Perlu order';cls='warn'}else if(avgDay===0&&(hDays>0||appDays>=30)){s='Tidak bergerak';cls='plain'}
  info[id]={r,kg1,stok,kg:Math.max(0,stok)*kg1,cons90:Math.max(0,cons90),cons30:Math.max(0,cons30),recv90,basis,avgDay,perBln:avgDay*30,cover,rop,target,sug,why,onOrder,st:s,cls,series,min,buf};
 }
 // ABC by kg consumed in 90 days
 const ranked=Object.values(info).filter(x=>x.cons90>0).sort((a,b)=>b.cons90*b.kg1-a.cons90*a.kg1);const totC=ranked.reduce((a,x)=>a+x.cons90*x.kg1,0);let cum=0;
 ranked.forEach(x=>{cum+=x.cons90*x.kg1;x.cum=cum/totC;x.abc=x.cum<=0.8||x===ranked[0]?'A':x.cum<=0.95?'B':'C'});
 Object.values(info).forEach(x=>{if(!x.abc)x.abc='–';x.fsn=x.cons90<=0?(x.stok>0?'N':'–'):x.abc==='A'?'F':'S'});
 c._rm={info,monthly,hist,totC};return c._rm;
}
const RMI=id=>rmCalc().info[id];

/* ---------- charts (inline SVG, hover tooltips) ---------- */
const CH={};let chN=0;
function niceMax(v){if(v<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(v)));const f=v/p;return (f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*p}
function lineChart(o){ /* o:{series:[{name,cls,pts:[[date,val]]}],fmt,unit} — step values, shared x axis */
 const id='ch'+(++chN),W=720,H=240,L=48,R=150,T=14,Bm=28;
 const dates=[...new Set(o.series.flatMap(s=>s.pts.map(p=>p[0])))].sort();if(dates.length<2)return '<div class="note">Belum cukup data untuk grafik.</div>';
 const t0=Date.parse(dates[0]),t1=Date.parse(dates[dates.length-1]);const X=d=>L+(Date.parse(d)-t0)/(t1-t0||1)*(W-L-R);
 const vmax=niceMax(Math.max(...o.series.flatMap(s=>s.pts.map(p=>p[1]))));const Y=v=>T+(1-v/vmax)*(H-T-Bm);
 const grid=[0,.25,.5,.75,1].map(f=>`<line x1="${L}" x2="${W-R}" y1="${Y(vmax*f)}" y2="${Y(vmax*f)}" class="g"/><text x="${L-6}" y="${Y(vmax*f)+4}" class="ax" text-anchor="end">${o.fmt(vmax*f)}</text>`).join('');
 const months=[];{let d=new Date(t0);d.setDate(1);d.setMonth(d.getMonth()+1);while(d.getTime()<=t1){months.push(d.getFullYear()+'-'+pad(d.getMonth()+1)+'-01');d.setMonth(d.getMonth()+1)}}
 const xl=months.map(m=>`<line x1="${X(m)}" x2="${X(m)}" y1="${H-Bm}" y2="${H-Bm+4}" class="g"/><text x="${X(m)}" y="${H-8}" class="ax" text-anchor="middle">${BLN3(m)}</text>`).join('');
 const at=(s,d)=>{let v=null;for(const p of s.pts){if(p[0]<=d)v=p[1];else break}return v};
 const ends=[];
 const paths=o.series.map((s,i)=>{const pts=dates.map(d=>[d,at(s,d)]).filter(p=>p[1]!==null);let dd='';pts.forEach((p,k)=>{dd+=(k?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)});const last=pts[pts.length-1];ends.push({y:Y(last[1]),s,last});
  return `<path d="${dd}" class="ln ${s.cls}"/><circle cx="${X(last[0])}" cy="${Y(last[1])}" r="4" class="dot ${s.cls}"/>`}).join('');
 ends.sort((a,b)=>a.y-b.y);for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<14)ends[i].y=ends[i-1].y+14;
 const labels=ends.map(e=>`<text x="${W-R+8}" y="${e.y+4}" class="dl">${esc(e.s.name)} · ${o.fmt(e.last[1])}</text>`).join('');
 CH[id]={o,dates,X,Y,at,W,H,L,R,T,Bm};
 return `<div class="chart" data-ch="${id}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title||'Grafik')}">${grid}${xl}${paths}${labels}<line class="xh" x1="0" x2="0" y1="${T}" y2="${H-Bm}" visibility="hidden"/><rect class="hit" x="${L}" y="${T}" width="${W-L-R}" height="${H-T-Bm}"/></svg><div class="tip" hidden></div></div>`;
}
function barChart(o){ /* o:{bars:[{label,v,est,tip}],fmt} */
 const id='ch'+(++chN),W=720,H=210,L=48,R=12,T=18,Bm=28;if(!o.bars.length)return '<div class="note">Belum ada data.</div>';
 const vmax=niceMax(Math.max(...o.bars.map(b=>b.v)));const Y=v=>T+(1-v/vmax)*(H-T-Bm);const bw=(W-L-R)/o.bars.length;const best=o.bars.reduce((a,b)=>b.v>a.v?b:a,o.bars[0]);
 const grid=[0,.5,1].map(f=>`<line x1="${L}" x2="${W-R}" y1="${Y(vmax*f)}" y2="${Y(vmax*f)}" class="g"/><text x="${L-6}" y="${Y(vmax*f)+4}" class="ax" text-anchor="end">${o.fmt(vmax*f)}</text>`).join('');
 const bars=o.bars.map((b,i)=>{const x=L+i*bw+bw*0.2,w=bw*0.6,y=Y(b.v),h=Math.max(0,H-Bm-y);const r=Math.min(4,w/2,h);
  return `<g class="bar" data-tip="${esc(b.tip)}"><rect x="${L+i*bw}" y="${T}" width="${bw}" height="${H-T-Bm}" class="hitb"/><path d="M${x} ${H-Bm}V${y+r}Q${x} ${y} ${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${H-Bm}Z" class="bf ${b.est?'est':''}"/>${b===best?`<text x="${x+w/2}" y="${y-5}" class="dl" text-anchor="middle">${o.fmt(b.v)}</text>`:''}<text x="${x+w/2}" y="${H-8}" class="ax" text-anchor="middle">${esc(b.label)}</text></g>`}).join('');
 return `<div class="chart" data-bars="${id}"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.title||'Grafik batang')}">${grid}${bars}</svg><div class="tip" hidden></div></div>`;
}
const spark=(series)=>{const pts=series.filter(p=>p[0]>=addDays(today(),-150));if(pts.length<2)return '';const t0=Date.parse(pts[0][0]),t1=Date.parse(pts[pts.length-1][0])||t0+1;const mx=Math.max(1,...pts.map(p=>p[1]));const X=d=>2+(Date.parse(d)-t0)/(t1-t0||1)*76,Y=v=>20-v/mx*17;const d=pts.map((p,k)=>(k?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join('');const l=pts[pts.length-1];return `<svg class="spk" viewBox="0 0 84 24" aria-hidden="true"><path d="${d}"/><circle cx="${X(l[0])}" cy="${Y(l[1])}" r="2.2"/></svg>`};
document.addEventListener('mousemove',e=>{
 const box=e.target.closest&&e.target.closest('.chart[data-ch]');
 document.querySelectorAll('.chart[data-ch] .tip:not([hidden])').forEach(tp=>{if(!box||!box.contains(tp)){tp.hidden=true;tp.parentNode.querySelector('.xh').setAttribute('visibility','hidden')}});
 if(box){const c=CH[box.dataset.ch];if(!c)return;const svg=box.querySelector('svg');const rc=svg.getBoundingClientRect();const x=(e.clientX-rc.left)/rc.width*c.W;
  let best=c.dates[0];for(const d of c.dates)if(Math.abs(c.X(d)-x)<Math.abs(c.X(best)-x))best=d;
  const xh=svg.querySelector('.xh');xh.setAttribute('x1',c.X(best));xh.setAttribute('x2',c.X(best));xh.setAttribute('visibility','visible');
  const tp=box.querySelector('.tip');tp.innerHTML=`<b>${fd(best)}</b>`+c.o.series.map(s=>{const v=c.at(s,best);return v===null?'':`<div><i class="sw ${s.cls}"></i>${esc(s.name)} <b>${c.o.fmt(v)}</b></div>`}).join('');tp.hidden=false;
  const px=c.X(best)/c.W*rc.width;tp.style.left=Math.min(rc.width-tp.offsetWidth-4,Math.max(4,px+12))+'px';tp.style.top='8px'}
 const bar=e.target.closest&&e.target.closest('.chart[data-bars] .bar');
 document.querySelectorAll('.chart[data-bars] .tip:not([hidden])').forEach(tp=>{if(!bar||!tp.parentNode.contains(bar))tp.hidden=true});
 if(bar){const ch=bar.closest('.chart');const tp=ch.querySelector('.tip');tp.innerHTML=bar.dataset.tip;tp.hidden=false;const rc=ch.getBoundingClientRect();tp.style.left=Math.min(rc.width-tp.offsetWidth-4,Math.max(4,e.clientX-rc.left+12))+'px';tp.style.top='8px'}
});

/* ---------- tools + body ---------- */
T['bahan-baku']=()=>{const f=F['bahan-baku'];return `<input class="inp search" id="q-bahan-baku" placeholder="Cari material / ukuran…" value="${esc(f.q)}" data-act="q" data-view="bahan-baku"><select class="sel" data-act="filtsel" data-view="bahan-baku" data-key="grade" id="f-grade"><option value="">Semua material</option>${['SPHC','SPCC','SS304','SS316','Aluminium'].map(x=>`<option ${f.grade===x?'selected':''}>${x}</option>`).join('')}</select>
 <span class="grow"></span>
 <button class="btn primary" data-act="mv" data-g="rm" data-j="masuk">${ic('inb')}Terima material</button>
 <button class="btn" data-act="mv" data-g="rm" data-j="keluar">${ic('outb')}Pakai produksi</button>
 <button class="btn ghost" data-act="newitem" data-g="rm">${ic('plus')}Item baru</button>
 <button class="btn ghost" data-act="rmset" title="Lead time pembelian & target stok">Pengaturan</button>
 <button class="btn ghost" data-act="csv" data-what="rm">${ic('dl')}CSV</button>`};
function rmFilter(){const f=F['bahan-baku'],q=f.q.toLowerCase();return S.rm.filter(r=>{if(q&&!rmLabel(r).toLowerCase().includes(q)&&!String(r.lokasi||'').toLowerCase().includes(q))return false;if(f.grade&&grade(r)!==f.grade)return false;return true})}
B['bahan-baku']=()=>{
 const f=F['bahan-baku'],R=rmCalc(),I=Object.values(R.info);
 const totKg=I.reduce((a,x)=>a+x.kg,0),c30=I.reduce((a,x)=>a+x.cons30*x.kg1,0),c90=I.reduce((a,x)=>a+x.cons90*x.kg1,0);
 const need=I.filter(x=>x.sug>0),crit=I.filter(x=>x.st==='Habis'||x.st==='Kritis'),dead=I.filter(x=>x.st==='Tidak bergerak');
 const val=I.reduce((a,x)=>a+x.kg*(+x.r.harga||0),0);
 // SPK demand summary
 const c2=calc();let spkDemTot=0,spkDemKurang=0;
 S.spk.forEach(s=>{const sx=c2.spk[s._id];if(sx.st==='Selesai'||sx.st==='Batal')return;sx.lines.forEach(l=>{const sisa=Math.max(0,l.q-l.prodEff);if(!sisa||!+l.w)return;spkDemTot+=sisa*+l.w});spkDemKurang+=(sx.st!=='Selesai'&&sx.st!=='Batal'?1:0)});
 const spkAktif=S.spk.filter(s=>{const sx=c2.spk[s._id];return sx.st!=='Selesai'&&sx.st!=='Batal'}).length;
 const kpi=(cls,lb,v,unit,s,tab)=>`<button class="kpi ${cls}" ${tab?`data-act="filt" data-view="bahan-baku" data-key="tab" data-val="${tab}"`:''}><span class="lb">${lb}</span><span class="v">${v}${unit?`<small>${unit}</small>`:''}</span><span class="s">${s}</span></button>`;
 const head=`<section class="kpis">
  ${kpi('info','Total stok',ton(totKg),'ton',`${n(I.reduce((a,x)=>a+Math.max(0,x.stok),0))} lembar${val?` · Rp ${n(Math.round(val/1e6))} jt`:''}`,'stok')}
  ${kpi(crit.length?'crit':'ok','Habis / di bawah minimum',crit.length,'item',crit.slice(0,2).map(x=>esc(x.r.item.replace('Plat ','')+' '+thkR(x.r)+'mm')).join(', ')||'tidak ada','stok')}
  ${kpi(need.length?'warn':'ok','Perlu order',need.length,'item',`usulan ${n(need.reduce((a,x)=>a+x.sug,0))} lbr · ${ton(need.reduce((a,x)=>a+x.sug*x.kg1,0))} ton`,'beli')}
  ${kpi('info','Rata-rata pemakaian',ton(c30),'ton/bln',`± ${ton(c90)} ton per 3 bulan`,'analisa')}
  ${kpi(spkAktif?'info':'ok','SPK aktif butuh material',ton(spkDemTot),'ton',spkAktif?`dari ${spkAktif} SPK yang sedang berjalan`:'tidak ada SPK aktif','analisa')}
  ${kpi(dead.length?'warn':'ok','Stok tidak bergerak',ton(dead.reduce((a,x)=>a+x.kg,0)),'ton',`${dead.length} item tanpa pemakaian 90 hari`,'analisa')}
 </section>`;
 const tabs=[['stok','Posisi stok'],['analisa','Analisa'],['kartu','Kartu Stok'],['beli','Rencana pembelian'+(need.length?` (${need.length})`:'')],['opname','Stock opname'],['mutasi','Riwayat mutasi']];
 const tabH=`<div class="tabs">${tabs.map(([v,l])=>`<button data-act="filt" data-view="bahan-baku" data-key="tab" data-val="${v}" class="${f.tab===v?'on':''}">${l}</button>`).join('')}</div>`;
 const body={stok:rmStok,analisa:rmAnalisa,kartu:rmKartuStok,beli:rmBeli,opname:rmOpname,mutasi:rmMutasi}[f.tab]||rmStok;
 return head+`<section class="panel">${tabH}${body()}</section>`;
};
function rmStok(){
 const f=F['bahan-baku'],R=rmCalc();let rows=rmFilter().map(r=>R.info[r._id]);
 const cnt=s=>rows.filter(x=>x.st===s).length;
 const chips=`<div class="summ">${[['','Semua',rows.length,'plain'],['Habis','Habis',cnt('Habis'),'crit'],['Kritis','Di bawah minimum',cnt('Kritis'),'crit'],['Perlu order','Perlu order',cnt('Perlu order'),'warn'],['Aman','Aman',cnt('Aman'),'ok'],['Tidak bergerak','Tidak bergerak',cnt('Tidak bergerak'),'plain'],['Kosong','Kosong (tidak dipakai)',cnt('Kosong'),'plain']].filter(x=>x[0]===''||x[2]).map(([v,l,c,cl])=>`<button class="chip ${f.st===v?'sel':''} ${cl}" data-act="filt" data-view="bahan-baku" data-key="st" data-val="${v}">${l} · ${c}</button>`).join('')}
  <span class="grow"></span><select class="sel sm" data-act="filtsel" data-view="bahan-baku" data-key="sort" id="f-sort"><option value="grade" ${f.sort==='grade'?'selected':''}>Urut: material & tebal</option><option value="demand" ${f.sort==='demand'?'selected':''}>Urut: dibutuhkan SPK (kg)</option><option value="kg" ${f.sort==='kg'?'selected':''}>Urut: stok terbesar (kg)</option><option value="use" ${f.sort==='use'?'selected':''}>Urut: pemakaian terbesar</option></select></div>`;
 if(f.st)rows=rows.filter(x=>x.st===f.st);
 // demand dari SPK aktif per item RM (group by grade+tebal)
 const spkDemandKg=(x)=>{const g=grade(x.r);const base=g==='SPCC'?'SPHC':g;const th=thkR(x.r);const c2=calc();let kg=0;S.spk.forEach(s=>{const sx=c2.spk[s._id];if(sx.st==='Selesai'||sx.st==='Batal')return;sx.lines.forEach(l=>{const sisa=Math.max(0,l.q-l.prodEff);if(!sisa||!+l.w)return;const d=derive(l.g||'');const lb=d.material.startsWith('SS')?d.material:d.material==='Aluminium'?'Aluminium':'SPHC';const lth=parseFloat(thkOf(l.g)||s.tebal)||0;if(lb===base&&Math.abs(lth-th)<0.01)kg+=sisa*+l.w})});return kg};
 const srt={grade:(a,b)=>GRPS.indexOf(GRP(grade(a.r)))-GRPS.indexOf(GRP(grade(b.r)))||grade(a.r).localeCompare(grade(b.r))||thkR(a.r)-thkR(b.r)||a.r.ukuran.localeCompare(b.r.ukuran),demand:(a,b)=>(spkDemandKg(b)-spkDemandKg(a))||(b.perBln-a.perBln),kg:(a,b)=>b.kg-a.kg,use:(a,b)=>b.perBln*b.kg1-a.perBln*a.kg1}[f.sort]||(()=>0);
 rows.sort(srt);
 const demKgMap=new Map();rows.forEach(x=>demKgMap.set(x.r._id,spkDemandKg(x)));
 const demTxt=x=>{const kg=demKgMap.get(x.r._id)||0;if(!kg)return '<span class="muted">–</span>';const stKg=x.kg;const flag=stKg<=0?'crit':stKg<kg?'warn':'ok';const cls=flag==='crit'?'color:var(--crit);font-weight:700':flag==='warn'?'color:var(--warn);font-weight:700':'color:var(--ok);font-weight:700';return `<b style="${cls}">${n(Math.round(kg))} kg</b><div class="note" style="font-size:10.5px">${flag==='crit'?'Stok habis':flag==='warn'?'Stok kurang':'Stok cukup'}</div>`};
 const row=x=>`<tr class="click" data-act="kartu" data-g="rm" data-id="${x.r._id}"><td><b>${esc(x.r.item)}</b><div class="note mono">${esc(x.r.ukuran)}${x.r.lokasi?' · Rak '+esc(x.r.lokasi):''}</div></td><td class="num">${x.kg1?x.kg1.toFixed(1):'–'}</td><td class="num">${x.min?n(x.min):'–'}</td><td class="num">${x.buf?n(x.buf):'–'}</td><td class="num big">${n(x.stok)}</td><td class="num">${n(Math.round(x.kg))}</td><td class="num">${x.perBln?n(Math.round(x.perBln)):'–'}</td><td class="num">${demTxt(x)}</td><td>${spark(x.series)}</td><td>${chip(x.st,x.cls)}${x.onOrder?`<div class="note">${n(x.onOrder)} lbr dipesan</div>`:''}</td></tr>`;
 let body='';
 if(f.sort==='grade'){for(const g of GRPS){const xs=rows.filter(x=>GRP(grade(x.r))===g);if(!xs.length)continue;body+=`<tr class="grp"><td colspan="10"><b>${g}</b><span>${xs.length} item · ${n(xs.reduce((a,x)=>a+Math.max(0,x.stok),0))} lbr · ${ton(xs.reduce((a,x)=>a+x.kg,0))} ton</span></td></tr>`+xs.map(row).join('')}}else body=rows.map(row).join('');
 return `<div class="pbody">${chips}</div>${rows.length?`<div class="tbl-wrap"><table class="rmt"><thead><tr><th>Material / ukuran (t×l×p mm)</th><th class="num">Kg/lbr</th><th class="num">Min</th><th class="num">Buffer</th><th class="num">Stok (lbr)</th><th class="num">Stok (kg)</th><th class="num">Pakai/bln</th><th class="num">Dibutuhkan SPK</th><th>Tren</th><th>Status</th></tr></thead><tbody>${body}</tbody></table></div>`:empty('Tidak ada item yang cocok','Ubah kata kunci atau filter status.')}
 <div class="pbody note">Kg/lbr dihitung dari ukuran × massa jenis (baja 7,85 · SS 7,93–7,98 · aluminium 2,71). Pakai/bln = laju pemakaian dari histori 90 hari terakhir. "Dibutuhkan SPK" = total berat material sisa produksi dari semua SPK aktif yang belum selesai, dikelompokkan per grade & tebal.</div>`;
}
function rmAnalisa(){
 const R=rmCalc(),I=Object.values(R.info),t=today();
 const dates=[...new Set(I.flatMap(x=>x.series.map(p=>p[0])))].sort();
 const at=(x,d)=>{let v=null;for(const p of x.series){if(p[0]<=d)v=p[1];else break}return v};
 const series=GRPS.map((g,i)=>({name:g,cls:'s'+(i+1),pts:dates.map(d=>[d,I.filter(x=>GRP(grade(x.r))===g).reduce((a,x)=>a+Math.max(0,at(x,d)||0)*x.kg1,0)/1000])})).filter(s=>s.pts.some(p=>p[1]>0));
 const line=lineChart({title:'Tren stok bahan baku (ton)',series,fmt:v=>n(Math.round(v*10)/10)+' t'});
 const months=Object.keys(R.monthly).sort().filter(m=>m>=monthKey(dates[0]||t));
 const bars=barChart({title:'Pemakaian bahan baku per bulan',bars:months.map(m=>({label:BLN3(m),v:R.monthly[m].kg/1000,est:(R.monthly[m].kgE||0)>R.monthly[m].kg*0.5,tip:`<b>${BLN3(m)}</b><div>${n(Math.round(R.monthly[m].kg/100)/10)} ton dipakai</div>${(R.monthly[m].kgE||0)>R.monthly[m].kg*0.5?'<div class="muted">estimasi bersih: selisih stok 29 Jul → 27 Okt dibagi rata per hari</div>':''}`})),fmt:v=>n(Math.round(v*10)/10)+' t'});
 const ranked=I.filter(x=>x.cons90>0).sort((a,b)=>b.cons90*b.kg1-a.cons90*a.kg1);const dead=I.filter(x=>x.fsn==='N').sort((a,b)=>b.kg-a.kg);
 const abc=`<table><thead><tr><th>Material</th><th class="num">Pemakaian / 90 hari</th><th class="num">Kg</th><th class="num">% kumulatif</th><th>Kelas</th><th class="num">Stok (kg)</th></tr></thead><tbody>${ranked.map(x=>`<tr class="click" data-act="kartu" data-g="rm" data-id="${x.r._id}"><td><b>${esc(x.r.item)}</b> <span class="mono note">${esc(x.r.ukuran)}</span></td><td class="num">${n(Math.round(x.cons90))} lbr</td><td class="num">${n(Math.round(x.cons90*x.kg1))}</td><td class="num">${Math.round(x.cum*100)}%</td><td>${chip(x.abc,x.abc==='A'?'info':'plain')}</td><td class="num">${n(Math.round(x.kg))} kg</td></tr>`).join('')}</tbody></table>`;
 const deadH=dead.length?`<table><thead><tr><th>Material</th><th class="num">Stok</th><th class="num">Kg</th><th>Terakhir berubah</th></tr></thead><tbody>${dead.map(x=>{const ch=x.series.slice().reverse().find((p,i,arr)=>arr[i+1]&&arr[i+1][1]!==p[1]);return `<tr class="click" data-act="kartu" data-g="rm" data-id="${x.r._id}"><td><b>${esc(x.r.item)}</b> <span class="mono note">${esc(x.r.ukuran)}</span></td><td class="num">${n(x.stok)} lbr</td><td class="num">${n(Math.round(x.kg))}</td><td>${ch?fd(ch[0]):'sejak Juni'}</td></tr>`}).join('')}</tbody></table>`:empty('Semua stok bergerak','Tidak ada item yang diam 90 hari.');
 // SPK demand by material+thickness
 const c=calc();const dem={};
 S.spk.forEach(s=>{const x=c.spk[s._id];if(x.st==='Selesai')return;x.lines.forEach(l=>{const sisa=Math.max(0,l.q-l.prodEff);if(!sisa)return;const d=derive(l.g||'');const base=d.material.startsWith('SS')?d.material:d.material==='Aluminium'?'Aluminium':'SPHC';const th=parseFloat(thkOf(l.g)||s.tebal)||0;const k=base+'|'+th;const o=dem[k]||(dem[k]={base,th,spk:new Set(),pcs:0,kg:0,lines:0,lw:0,draft:0});o.spk.add(s.no);o.pcs+=sisa;o.lines++;if(+l.w){o.kg+=sisa*l.w;o.lw++}if(x.st==='Draft')o.draft++})});
 const stockBy=(base,th)=>I.filter(x=>{const g=grade(x.r);const b=g==='SPCC'?'SPHC':g;return b===base&&Math.abs(thkR(x.r)-th)<0.01});
 const demRows=Object.values(dem).sort((a,b)=>a.base.localeCompare(b.base)||a.th-b.th).map(o=>{const st=stockBy(o.base,o.th);const kg=st.reduce((a,x)=>a+x.kg,0),lbr=st.reduce((a,x)=>a+Math.max(0,x.stok),0);const cov=o.lw/o.lines;const estKg=cov>0?o.kg/cov:0;
  const flag=!st.length?['Tidak ada item stok','crit']:lbr<=0?['Stok habis','crit']:cov<0.5?['Berat SPK belum lengkap','plain']:estKg>kg?['Kurang','crit']:estKg>kg*0.7?['Tipis','warn']:['Cukup','ok'];const showKg=cov>=0.5;
  return `<tr><td><b>${esc(o.base)} ${o.th||'?'} mm</b></td><td class="num">${o.spk.size}</td><td class="num">${n(Math.round(o.pcs))}</td><td class="num">${showKg?n(Math.round(estKg)):'–'}<div class="note">${Math.round(cov*100)}% item ada berat${!showKg&&o.lw?' · terlalu sedikit untuk estimasi':''}</div></td><td class="num">${n(lbr)} lbr<div class="note">${n(Math.round(kg))} kg</div></td><td>${chip(flag[0],flag[1])}</td></tr>`}).join('');
 return `<div class="ana">
  <section class="ana-c"><h3>Tren stok (ton)</h3><p class="note">Histori dari 12 lembar "Data Raw Material" (18 Jun – 27 Okt) disambung transaksi aplikasi.</p>${line}<div class="legend">${series.map(s=>`<span><i class="sw ${s.cls}"></i>${esc(s.name)}</span>`).join('')}</div></section>
  <section class="ana-c"><h3>Pemakaian per bulan (ton)</h3><p class="note">Penurunan stok antar snapshot, ditambah pemakaian yang dicatat di aplikasi.</p>${bars}<div class="legend"><span><i class="sw s1"></i>Tercatat</span><span><i class="sw s1 est"></i>Estimasi bersih (Agu–Okt tanpa snapshot: pemakaian − penerimaan, dibagi rata)</span></div></section>
  <section class="ana-c wide"><h3>Kebutuhan SPK aktif vs stok plat</h3><p class="note">Item SPK yang belum selesai diproduksi, dikelompokkan per material dan tebal dari judul section SPK. Estimasi kg memakai berat/pcs yang tercatat dan diskalakan ke seluruh item.</p><div class="tbl-wrap">${demRows?`<table><thead><tr><th>Material / tebal</th><th class="num">SPK</th><th class="num">Sisa produksi (pcs)</th><th class="num">Estimasi kebutuhan (kg)</th><th class="num">Stok plat</th><th>Status</th></tr></thead><tbody>${demRows}</tbody></table>`:empty('Tidak ada SPK aktif','')}</div></section>
  <section class="ana-c"><h3>Klasifikasi pemakaian (ABC)</h3><p class="note">A = item yang menyumbang 80% kg pemakaian (fast moving), B = 80–95%, C = sisanya. Jaga stok kelas A paling ketat. Angka per 90 hari dihitung dari laju pemakaian harian.</p><div class="tbl-wrap">${ranked.length?abc:empty('Belum ada pemakaian','')}</div></section>
  <section class="ana-c"><h3>Stok tidak bergerak</h3><p class="note">Ada stok tapi tidak pernah berkurang di periode data: modal tertahan, cek apakah masih dibutuhkan.</p><div class="tbl-wrap">${deadH}</div></section>
 </div>`;
}
function rmBeli(){
 const R=rmCalc(),st=SET(),f=F['bahan-baku'];const sug=Object.values(R.info).filter(x=>x.sug>0).sort((a,b)=>(a.st==='Habis'?0:a.st==='Kritis'?1:2)-(b.st==='Habis'?0:b.st==='Kritis'?1:2)||a.cover-b.cover);
 const val=id=>f.beli[id]!==undefined?f.beli[id]:{on:true,q:R.info[id].sug};
 const tot=sug.reduce((a,x)=>{const v=val(x.r._id);return v.on?{q:a.q+(+v.q||0),kg:a.kg+(+v.q||0)*x.kg1,rp:a.rp+(+v.q||0)*x.kg1*(+x.r.harga||0)}:a},{q:0,kg:0,rp:0});
 const prs=S.pr.slice().sort((a,b)=>(b.tgl+(b.at||'')).localeCompare(a.tgl+(a.at||'')));
 const prRows=prs.map(p=>{const q=(p.items||[]).reduce((a,i)=>a+(+i.q||0),0),qt=(p.items||[]).reduce((a,i)=>a+Math.min(+i.q||0,+i.qTerima||0),0);const kg=(p.items||[]).reduce((a,i)=>a+(+i.q||0)*kgLbr(byId('rm',i.item)||{}),0);const open=p.status==='Diajukan'||p.status==='Dipesan';
  return `<tr class="${p.status==='Batal'?'void':''}"><td class="mono"><b>${esc(p.noPR)}</b></td><td>${fd(p.tgl)}</td><td>${esc(p.supplier||'–')}</td><td class="pri-l">${(p.items||[]).map(i=>`<div><span>${esc(rmLabel(byId('rm',i.item)).replace('Plat ',''))}</span><b>${n(i.q)}</b></div>`).join('')}</td><td class="num">${n(q)} lbr<div class="note">${ton(kg)} ton</div></td><td>${prog(q?qt/q:0,qt>=q?'ok':'')}</td><td>${fd(p.butuh)}</td><td>${stChip(p.status)}</td><td class="acts-r">${p.status==='Diajukan'?`<button class="btn sm" data-act="prstep" data-id="${p._id}">Tandai dipesan</button>`:''}${open?`<button class="btn sm primary" data-act="prterima" data-id="${p._id}">Terima</button><button class="btn sm ghost" data-act="void" data-c="pr" data-id="${p._id}">Batalkan</button>`:''}<button class="btn sm ghost" data-act="prxlsx" data-id="${p._id}">${ic('dl')}Excel</button></td></tr>`}).join('');
 return `<div class="pbody"><p class="note" style="margin:0">Usulan muncul bila stok di bawah <b>buffer</b> atau di bawah <b>titik pesan ulang</b> (minimum + pemakaian historis × lead time ${st.leadBeli} hari). Qty usulan mengisi stok sampai buffer atau target, dikurangi yang sedang dipesan. Sesuaikan dengan SPK aktif di tab Analisa. <button type="button" class="linkbtn" data-act="rmset">Ubah pengaturan</button></p></div>
 ${sug.length?`<div class="tbl-wrap"><table class="beli"><thead><tr><th></th><th>Material</th><th class="num">Stok</th><th class="num">Min / buffer</th><th class="num">Pakai/bln</th><th class="num">Dipesan</th><th>Alasan</th><th class="num">Qty usulan (lbr)</th><th class="num">Kg</th></tr></thead><tbody>${sug.map(x=>{const v=val(x.r._id);return `<tr><td><input type="checkbox" data-beli="on" data-id="${x.r._id}" id="b-on-${x.r._id}" ${v.on?'checked':''} aria-label="Pilih"></td><td><b>${esc(x.r.item)}</b> <span class="mono note">${esc(x.r.ukuran)}</span><div>${chip(x.st,x.cls)}</div></td><td class="num big">${n(x.stok)}</td><td class="num">${n(x.min)} / ${n(x.buf)}</td><td class="num">${x.perBln?n(Math.round(x.perBln)):'–'}</td><td class="num">${x.onOrder?n(x.onOrder):'–'}</td><td class="note">${esc(x.why)}</td><td class="num"><input class="inp" type="number" min="0" step="1" data-beli="q" data-id="${x.r._id}" id="b-q-${x.r._id}" value="${esc(v.q)}"></td><td class="num" data-bkg="${x.r._id}">${n(Math.round((+v.q||0)*x.kg1))}</td></tr>`}).join('')}</tbody></table></div>
  <div class="pbody beli-foot"><span id="beli-tot"><b>${n(tot.q)}</b> lembar · <b>${ton(tot.kg)}</b> ton${tot.rp?` · ± Rp ${n(Math.round(tot.rp))}`:''}</span><span class="grow"></span><button class="btn primary" data-act="prnew">${ic('plus')}Buat permintaan pembelian (PR)</button></div>`
 :empty('Tidak ada yang perlu dibeli','Semua item di atas buffer dan titik pesan ulang.')}
 <div class="pbody"><h3 class="h3">Permintaan pembelian</h3></div>
 ${prs.length?`<div class="tbl-wrap"><table><thead><tr><th>No PR</th><th>Tanggal</th><th>Supplier</th><th>Item</th><th class="num">Qty</th><th>Diterima</th><th>Dibutuhkan</th><th>Status</th><th></th></tr></thead><tbody>${prRows}</tbody></table></div>`:`<div class="pbody note">Belum ada PR. PR yang dibuat dari usulan di atas akan tercatat di sini, dan penerimaannya langsung menambah stok.</div>`}`;
}
function rmOpname(){
 const f=F['bahan-baku'],R=rmCalc(),rows=rmFilter().map(r=>R.info[r._id]).sort((a,b)=>GRPS.indexOf(GRP(grade(a.r)))-GRPS.indexOf(GRP(grade(b.r)))||grade(a.r).localeCompare(grade(b.r))||thkR(a.r)-thkR(b.r));
 let counted=0,diff=0,dkg=0;rows.forEach(x=>{const v=f.opn[x.r._id];if(v!==undefined&&v!==''){counted++;const d=+v-x.stok;if(d){diff++;dkg+=d*x.kg1}}});
 const ses=S.opname.slice().sort((a,b)=>(b.tgl+(b.at||'')).localeCompare(a.tgl+(a.at||'')));
 return `<div class="pbody"><p class="note" style="margin:0">Isi hasil hitung fisik per item. Item yang dikosongkan tidak ikut opname. Selisih langsung disesuaikan ke stok dengan satu nomor dokumen, dan akurasinya tercatat.</p></div>
 <div class="tbl-wrap"><table class="opn"><thead><tr><th>Material / ukuran</th><th>Rak</th><th class="num">Stok sistem</th><th class="num">Hitung fisik</th><th class="num">Selisih</th><th class="num">Selisih kg</th></tr></thead><tbody>${rows.map(x=>{const v=f.opn[x.r._id];const has=v!==undefined&&v!=='';const d=has?(+v-x.stok):0;return `<tr><td><b>${esc(x.r.item)}</b> <span class="mono note">${esc(x.r.ukuran)}</span></td><td>${esc(x.r.lokasi||'–')}</td><td class="num">${n(x.stok)}</td><td class="num"><input class="inp" type="number" min="0" step="1" data-opn="${x.r._id}" id="o-${x.r._id}" value="${has?esc(v):''}"></td><td class="num" data-od="${x.r._id}" style="${d<0?'color:var(--crit)':d>0?'color:var(--ok)':''}">${has?(d>0?'+':'')+n(d):''}</td><td class="num" data-ok="${x.r._id}">${has&&d?n(Math.round(d*x.kg1)):''}</td></tr>`}).join('')}</tbody></table></div>
 <div class="pbody beli-foot"><span id="opn-tot">${counted} item dihitung · ${diff} selisih · ${n(Math.round(dkg))} kg</span><span class="grow"></span><button class="btn ghost" data-act="opnfill">Isi semua = sistem</button><button class="btn ghost" data-act="opnclear">Kosongkan</button><button class="btn primary" data-act="opnsave">${ic('chk')}Simpan hasil opname</button></div>
 <div class="pbody"><h3 class="h3">Riwayat opname</h3></div>
 ${ses.length?`<div class="tbl-wrap"><table><thead><tr><th>No dokumen</th><th>Tanggal</th><th class="num">Item dihitung</th><th class="num">Item selisih</th><th class="num">Selisih kg</th><th class="num">Akurasi</th><th>Petugas</th><th>Catatan</th></tr></thead><tbody>${ses.map(o=>`<tr><td class="mono"><b>${esc(o.noDok)}</b></td><td>${fd(o.tgl)}</td><td class="num">${o.counted}</td><td class="num">${o.selisih}</td><td class="num">${n(Math.round(o.kg||0))}</td><td class="num"><b style="color:${o.akurasi>=0.95?'var(--ok)':o.akurasi>=0.85?'var(--warn)':'var(--crit)'}">${Math.round(o.akurasi*100)}%</b></td><td>${who(o.by)}</td><td class="note">${esc(o.ket||'')}</td></tr>`).join('')}</tbody></table></div>`:`<div class="pbody note">Belum ada sesi opname tercatat.</div>`}`;
}
function rmMutasi(){
 const f=F['bahan-baku'],t=today();const ids=new Set(rmFilter().map(r=>r._id));
 const mv=S.mutasi.filter(m=>m.gudang==='rm'&&ids.has(m.item)&&(!f.mvj||m.jenis===f.mvj)&&(f.mvp==='all'||m.tgl>=addDays(t,-(+f.mvp)))).sort((a,b)=>(b.tgl+b.at).localeCompare(a.tgl+a.at));
 const sum=j=>mv.filter(m=>m.jenis===j).reduce((a,m)=>a+Math.abs(+m.delta||0)*kgLbr(byId('rm',m.item)||{}),0);
 return `<div class="pbody"><div class="summ">${segBtns('bahan-baku','mvj',[['','Semua'],['masuk','Masuk'],['keluar','Keluar'],['opname','Opname'],['koreksi','Koreksi']])}${segBtns('bahan-baku','mvp',[['30','30 hari'],['90','90 hari'],['all','Semua']])}<span class="grow"></span>${chip(`Masuk ${ton(sum('masuk'))} t`,'ok')}${chip(`Keluar ${ton(sum('keluar'))} t`,'info')}</div></div>
 ${mv.length?`<div class="tbl-wrap"><table><thead><tr><th>Tanggal</th><th>Jenis</th><th>Item</th><th class="num">Qty</th><th class="num">Kg</th><th>Dokumen</th><th>Supplier / tujuan</th><th>Keterangan</th><th>Dicatat</th></tr></thead><tbody>${mv.map(m=>{const it=byId('rm',m.item);return `<tr class="${m.dikoreksi?'void':''}"><td>${fd(m.tgl)}</td><td>${stChip(MVL[m.jenis]||m.jenis)}</td><td>${esc(rmLabel(it))}</td><td class="num big" style="color:${m.delta<0?'var(--crit)':'var(--ok)'}">${m.delta>0?'+':''}${n(m.delta)}</td><td class="num">${n(Math.round(Math.abs(m.delta)*kgLbr(it||{})))}</td><td>${m.noDok?`<span class="mono">${esc(m.noDok)}</span>`:''}<div class="note">${esc(m.ref||'')}</div></td><td>${esc(m.pihak||'')}</td><td class="note">${esc(m.ket||'')}</td><td class="note">${who(m.by)}</td></tr>`}).join('')}</tbody></table></div>`:empty('Belum ada mutasi pada periode ini','Penerimaan, pemakaian, opname, dan koreksi bahan baku tercatat di sini dengan nomor dokumennya.')}`;
}

function rmKartuStok(){
 const f=F['bahan-baku'],t=today();
 const allItems=S.rm.slice().sort((a,b)=>{const ga=grade(a),gb=grade(b);return GRPS.indexOf(GRP(ga))-GRPS.indexOf(GRP(gb))||ga.localeCompare(gb)||thkR(a)-thkR(b)||a.ukuran.localeCompare(b.ukuran)});
 const selId=f.ksItem||(allItems[0]&&allItems[0]._id)||'';
 const sel=byId('rm',selId);
 const perOpts=[['30','30 hari'],['90','90 hari'],['180','6 bulan'],['365','1 tahun'],['all','Semua']];
 const filterBar=`<div class="pbody" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
  <label class="note" style="white-space:nowrap">Material:</label>
  <select class="sel" style="flex:1;min-width:200px;max-width:400px" data-act="filtsel" data-view="bahan-baku" data-key="ksItem" id="ks-item">
   ${allItems.map(r=>`<option value="${r._id}" ${r._id===selId?'selected':''}>${esc(rmLabel(r))}</option>`).join('')}
  </select>
  <label class="note" style="white-space:nowrap">Periode:</label>
  <div class="segs">${perOpts.map(([v,l])=>`<button class="seg ${f.ksPer===v?'on':''}" data-act="filt" data-view="bahan-baku" data-key="ksPer" data-val="${v}">${l}</button>`).join('')}</div>
  <span class="grow"></span>
  <button class="btn ghost" data-act="ksxlsx" data-id="${selId}">${ic('dl',14)} Export Excel</button>
  <button class="btn ghost" data-act="ksprint" title="Cetak kartu stok">${ic('printer',14)} Cetak</button>
 </div>`;
 if(!sel)return filterBar+empty('Pilih material','Pilih dari dropdown di atas untuk melihat kartu stok.');
 const x=RMI(selId);if(!x)return filterBar+empty('Data tidak ditemukan','');
 /* build running balance from stok awal + mutasi chronological */
 const base=sel.tglStokAwal||t;
 const fromDate=f.ksPer==='all'?null:addDays(t,-(+f.ksPer));
 const allMv=S.mutasi.filter(m=>m.gudang==='rm'&&m.item===selId).sort((a,b)=>(a.tgl+a.at).localeCompare(b.tgl+b.at));
 /* calc running balance for all mutasi, then filter display */
 let run=+sel.stokAwal||0;const rows=[];
 /* opening balance row */
 rows.push({tgl:base,type:'awal',jenis:'Saldo Awal',noDok:'–',pihak:'Import Excel',ket:'',masuk:null,keluar:null,saldo:run,by:'',muted:false,id:null});
 for(const m of allMv){
  if(m.tgl<base)continue;
  const d=+m.delta||0;
  const isMasuk=m.jenis==='masuk'||(m.jenis==='koreksi'&&d>0);
  const isKeluar=m.jenis==='keluar'||(m.jenis==='koreksi'&&d<0);
  run+=d;
  rows.push({tgl:m.tgl,type:m.jenis,jenis:MVL[m.jenis]||m.jenis,noDok:m.noDok||'',pihak:m.pihak||'',ket:m.ket||m.ref||'',masuk:isMasuk?Math.abs(d):null,keluar:isKeluar?Math.abs(d):null,saldo:run,by:m.by,muted:!!m.dikoreksi,id:m._id,at:m.at})
 }
 /* always show last saldo even if no mutasi in period */
 const display=fromDate?rows.filter((r,i)=>i===0||r.tgl>=fromDate):rows;
 /* summary totals (from filtered display, exclude awal row) */
 const dataRows=display.slice(display.length>1&&display[0].type==='awal'?1:0);
 const totMasuk=dataRows.reduce((a,r)=>a+(r.masuk||0),0);
 const totKeluar=dataRows.reduce((a,r)=>a+(r.keluar||0),0);
 const kgMasuk=totMasuk*x.kg1,kgKeluar=totKeluar*x.kg1;
 const infoBar=`<div class="kv" style="margin:0 0 8px">
  <div><span>Stok saat ini</span><b class="big">${n(x.stok)} lbr</b><div class="note">${n(Math.round(x.kg))} kg</div></div>
  <div><span>Status</span>${chip(x.st,x.cls)}</div>
  <div><span>Total masuk (periode)</span><b style="color:var(--ok)">${n(totMasuk)} lbr</b><div class="note">${n(Math.round(kgMasuk))} kg</div></div>
  <div><span>Total keluar (periode)</span><b style="color:var(--crit)">${n(totKeluar)} lbr</b><div class="note">${n(Math.round(kgKeluar))} kg</div></div>
  <div><span>Kg / lembar</span><b>${x.kg1.toFixed(2)} kg</b></div>
  <div><span>Kelas ABC</span><b>${x.abc!=='–'?x.abc:'–'} / ${x.fsn==='N'?'Non-moving':x.fsn||'–'}</b></div>
 </div>`;
 const typeColor=type=>type==='masuk'?'var(--ok)':type==='keluar'?'var(--crit)':type==='koreksi'?'var(--warn)':'inherit';
 const tblRows=display.map(r=>`<tr class="${r.muted?'void':''}">
  <td>${fd(r.tgl)}</td>
  <td><span class="chip" style="background:${r.type==='awal'?'var(--bg2)':r.type==='masuk'?'rgba(34,197,94,.13)':r.type==='keluar'?'rgba(239,68,68,.13)':r.type==='opname'?'rgba(251,191,36,.13)':'rgba(99,102,241,.13)'};color:${r.type==='awal'?'var(--fg2)':typeColor(r.type)}">${esc(r.jenis)}</span></td>
  <td>${r.noDok?`<span class="mono">${esc(r.noDok)}</span>`:''}</td>
  <td>${esc(r.pihak)}</td>
  <td class="note">${esc(r.ket)}</td>
  <td class="num" style="color:var(--ok);font-weight:600">${r.masuk!=null?n(r.masuk):''}</td>
  <td class="num" style="color:var(--crit);font-weight:600">${r.keluar!=null?n(r.keluar):''}</td>
  <td class="num big"><b>${n(r.saldo)}</b><div class="note">${n(Math.round(r.saldo*x.kg1))} kg</div></td>
  <td class="note">${who(r.by)}</td>
 </tr>`).join('');
 const footer=`<tr style="background:var(--bg2)">
  <td colspan="5"><b>Total periode</b></td>
  <td class="num" style="color:var(--ok);font-weight:700">${n(totMasuk)}</td>
  <td class="num" style="color:var(--crit);font-weight:700">${n(totKeluar)}</td>
  <td class="num big"><b>${n(x.stok)}</b><div class="note">Stok akhir</div></td>
  <td></td>
 </tr>`;
 return filterBar+`<div class="pbody kartu-stok" id="ks-print-area">
  <div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">
   <div>
    <div style="font-size:16px;font-weight:700">${esc(rmLabel(sel))}</div>
    <div class="note">Ukuran: ${esc(sel.ukuran||'–')}${sel.lokasi?' · Rak: '+esc(sel.lokasi):''}${fromDate?' · Periode: '+fd(fromDate)+' – '+fd(t):'· Semua periode'}</div>
   </div>
   <div class="note" style="text-align:right">PT. MITRA NUSA INTERNASIONAL<br>Dicetak: ${fd(t)}</div>
  </div>
  ${infoBar}
  <div class="tbl-wrap">
   <table class="rmt">
    <thead><tr>
     <th style="min-width:88px">Tanggal</th>
     <th>Jenis</th>
     <th>No. Dokumen</th>
     <th>Supplier / Tujuan</th>
     <th>Keterangan</th>
     <th class="num" style="color:var(--ok)">Masuk (lbr)</th>
     <th class="num" style="color:var(--crit)">Keluar (lbr)</th>
     <th class="num">Saldo (lbr)</th>
     <th>Petugas</th>
    </tr></thead>
    <tbody>${tblRows||'<tr><td colspan="9" class="note" style="text-align:center;padding:24px">Belum ada transaksi pada periode ini.</td></tr>'}</tbody>
    <tfoot>${footer}</tfoot>
   </table>
  </div>
  <div class="note" style="margin-top:8px">Saldo berjalan dihitung mulai dari stok awal ${fd(base)} (import Excel). Transaksi diurutkan kronologis dari terlama ke terbaru.</div>
 </div>`;
}

async function exportKartuXlsx(id){
 const r=byId('rm',id);if(!r||!DLS){toast('Unduhan tidak tersedia.');return}
 const x=RMI(id);if(!x){toast('Data item tidak ditemukan.');return}
 const t=today(),f=F['bahan-baku'];
 const fromDate=f.ksPer==='all'?null:addDays(t,-(+f.ksPer));
 const base=r.tglStokAwal||t;
 const allMv=S.mutasi.filter(m=>m.gudang==='rm'&&m.item===id).sort((a,b)=>(a.tgl+a.at).localeCompare(b.tgl+b.at));
 let run=+r.stokAwal||0;const allRows=[{tgl:base,jenis:'Saldo Awal',noDok:'',pihak:'Import Excel',ket:'',masuk:null,keluar:null,saldo:run}];
 for(const m of allMv){if(m.tgl<base)continue;const d=+m.delta||0;const isMasuk=m.jenis==='masuk'||(m.jenis==='koreksi'&&d>0);const isKeluar=m.jenis==='keluar'||(m.jenis==='koreksi'&&d<0);run+=d;allRows.push({tgl:m.tgl,jenis:MVL[m.jenis]||m.jenis,noDok:m.noDok||'',pihak:m.pihak||'',ket:m.ket||m.ref||'',masuk:isMasuk?Math.abs(d):null,keluar:isKeluar?Math.abs(d):null,saldo:run,by:who(m.by),muted:!!m.dikoreksi})}
 const rows=fromDate?allRows.filter((r,i)=>i===0||r.tgl>=fromDate):allRows;
 try{
  const X=await loadExcelJS();const wb=new X.Workbook();
  const shName=rmLabel(r).replace(/[:\\\/\?\*\[\]]/g,'').slice(0,28);
  const ws=wb.addWorksheet(shName,{pageSetup:{paperSize:9,orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0}});
  [10,14,18,22,30,12,12,14,16].forEach((w,i)=>ws.getColumn(i+1).width=w);
  const th={style:'thin',color:{argb:'FF000000'}},box={top:th,left:th,bottom:th,right:th};
  /* header: logo + company */
  try{const img=wb.addImage({base64:LOGO_B64,extension:'png'});ws.addImage(img,{tl:{col:0.1,row:0.1},ext:{width:180,height:48}})}catch(e){}
  ws.mergeCells('C1:I1');Object.assign(ws.getCell('C1'),{value:'PT. MITRA NUSA INTERNASIONAL',font:{name:'Times New Roman',size:14,bold:true},alignment:{horizontal:'right'}});
  ws.mergeCells('C2:I2');Object.assign(ws.getCell('C2'),{value:'Ruko Gravitas B2 No.1, Lavon, Wana Kerta · Kec. Sindang Jaya, Kab. Tangerang',font:{name:'Arial',size:9},alignment:{horizontal:'right'}});
  ws.mergeCells('A4:I4');Object.assign(ws.getCell('A4'),{value:'KARTU STOK BAHAN BAKU',font:{name:'Arial',size:14,bold:true},alignment:{horizontal:'center'},fill:{type:'pattern',pattern:'solid',fgColor:{argb:'FF1F4E79'}},border:box});ws.getCell('A4').font={...ws.getCell('A4').font,color:{argb:'FFFFFFFF'}};
  /* item info block */
  const infoData=[['Material',rmLabel(r)],['Ukuran',r.ukuran||'–'],['Lokasi Rak',r.lokasi||'–'],['Berat / Lembar',x.kg1.toFixed(2)+' kg'],['Periode',fromDate?fd(fromDate)+' s/d '+fd(t):'Semua transaksi'],['Dicetak',tglLong(t)]];
  infoData.forEach(([k,v],i)=>{const row=6+Math.floor(i/2),col=i%2===0?1:5;ws.getCell(row,col).value=k;ws.getCell(row,col).font={name:'Arial',size:10,bold:true};ws.mergeCells(row,col+1,row,col+2);ws.getCell(row,col+1).value=v;ws.getCell(row,col+1).font={name:'Arial',size:10};for(let c=col;c<=col+2;c++){ws.getCell(row,c).border=box}});
  /* table header */
  const hr=9;const hdrs=['Tanggal','Jenis Transaksi','No. Dokumen','Supplier / Tujuan','Keterangan','Masuk (lbr)','Keluar (lbr)','Saldo (lbr)','Petugas'];
  hdrs.forEach((h,i)=>{const c=ws.getCell(hr,i+1);c.value=h;c.font={name:'Arial',size:10,bold:true};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FF2F5496'}};c.font={name:'Arial',size:10,bold:true,color:{argb:'FFFFFFFF'}};c.border=box;c.alignment={horizontal:'center',vertical:'middle',wrapText:true}});
  /* data rows */
  let dr=hr+1,totM=0,totK=0;
  rows.forEach(row=>{const rStyle=row.muted?{argb:'FFAAAAAA'}:null;
   [fd(row.tgl),row.jenis,row.noDok,row.pihak,row.ket,row.masuk,row.keluar,row.saldo,row.by||''].forEach((v,j)=>{
    const c=ws.getCell(dr,j+1);c.value=v||'';c.border=box;c.font={name:'Arial',size:10,...(rStyle?{color:rStyle}:{})};
    c.alignment={horizontal:j>=5?'center':'left',vertical:'middle',wrapText:j<=4};
    if(j===5&&row.masuk){c.font={...c.font,color:{argb:rStyle?rStyle.argb:'FF007700'},bold:true}}
    if(j===6&&row.keluar){c.font={...c.font,color:{argb:rStyle?rStyle.argb:'FFCC0000'},bold:true}}
    if(j===7){c.font={...c.font,bold:true};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:row.type==='awal'?'FFF5F5F5':'FFF0F4FF'}}}
    if(typeof v==='number')c.numFmt='#,##0'});
   if(row.masuk)totM+=row.masuk;if(row.keluar)totK+=row.keluar;dr++});
  /* footer row */
  ws.mergeCells(dr,1,dr,5);const fc=ws.getCell(dr,1);fc.value='TOTAL';fc.font={name:'Arial',size:10,bold:true};fc.alignment={horizontal:'center'};fc.border=box;fc.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFDBDBDB'}};
  [[6,totM,'FF007700'],[7,totK,'FFCC0000'],[8,x.stok,'FF2F5496']].forEach(([col,val,clr])=>{const c=ws.getCell(dr,col);c.value=val;c.numFmt='#,##0';c.font={name:'Arial',size:10,bold:true,color:{argb:clr}};c.border=box;c.alignment={horizontal:'center'};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFDBDBDB'}}});ws.getCell(dr,9).border=box;ws.getCell(dr,9).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFDBDBDB'}};
  /* row height for header */
  ws.getRow(hr).height=30;
  const fname=`Kartu-Stok-${rmLabel(r).replace(/[^a-zA-Z0-9]/g,'-')}-${t}.xlsx`;
  const buf=await wb.xlsx.writeBuffer();await DLS.save({filename:fname,data:new Uint8Array(buf)})
 }catch(e){if(e.code!=='declined')toast('Gagal export Excel: '+(e.message||e.code))}
}

/* ---------- item drawer ---------- */
const _kartuBase=kartu;
kartu=function(g,id){if(g!=='rm')return _kartuBase(g,id);openDrawer(()=>{const r=byId('rm',id);if(!r)return null;const x=RMI(id);
 const mv=S.mutasi.filter(m=>m.gudang==='rm'&&m.item===id).sort((a,b)=>(b.tgl+b.at).localeCompare(a.tgl+a.at));
 const ch=lineChart({title:'Stok '+rmLabel(r),series:[{name:'Stok',cls:'s1',pts:x.series}],fmt:v=>n(Math.round(v))+' lbr'});
 return {t:esc(rmLabel(r)),s:`Kartu stok bahan baku${r.lokasi?' · Rak '+esc(r.lokasi):''}`,b:`<div class="kv"><div><span>Stok</span><b class="big">${n(x.stok)} lbr</b><div class="note">${n(Math.round(x.kg))} kg</div></div><div><span>Status</span><b>${chip(x.st,x.cls)}</b></div><div><span>Pakai / bulan</span><b>${x.perBln?n(Math.round(x.perBln))+' lbr':'–'}</b><div class="note">${esc(x.basis)}</div></div><div><span>Cukup untuk</span><b>${isFinite(x.cover)?Math.round(x.cover)+' hari':'–'}</b></div><div><span>Min / buffer</span><b>${n(x.min)} / ${n(x.buf)}</b></div><div><span>Titik pesan ulang</span><b>${x.avgDay?n(Math.ceil(x.rop))+' lbr':'–'}</b></div><div><span>Berat / lembar</span><b>${x.kg1.toFixed(2)} kg</b></div><div><span>Kelas</span><b>${x.abc!=='–'?x.abc:x.fsn==='N'?'Tidak bergerak':'–'}</b></div></div>
 ${r.usulan?`<div class="ro">Catatan buffer dari Excel: ${esc(r.usulan)}</div>`:''}${x.sug?`<div class="ro">Usulan order <b>${n(x.sug)} lbr</b> (${ton(x.sug*x.kg1)} ton): ${esc(x.why)}.</div>`:''}
 <div><h4 class="h3">Pergerakan stok</h4>${ch}</div>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn primary sm" data-act="mv" data-g="rm" data-j="masuk" data-item="${id}">${ic('inb')}Terima</button><button class="btn sm" data-act="mv" data-g="rm" data-j="keluar" data-item="${id}">${ic('outb')}Pakai</button><button class="btn sm" data-act="mv" data-g="rm" data-j="opname" data-item="${id}">${ic('chk')}Opname</button><button class="btn sm ghost" data-act="rmedit" data-id="${id}">Ubah data item</button></div>
 <div class="tbl-wrap"><table><thead><tr><th>Tanggal</th><th>Jenis</th><th class="num">Qty</th><th>Dokumen</th><th></th></tr></thead><tbody>${mv.map(m=>`<tr class="${m.dikoreksi?'void':''}"><td>${fd(m.tgl)}</td><td>${stChip(MVL[m.jenis]||m.jenis)}</td><td class="num" style="color:${m.delta<0?'var(--crit)':'var(--ok)'}">${m.delta>0?'+':''}${n(m.delta)}</td><td>${m.noDok?`<span class="mono">${esc(m.noDok)}</span> · `:''}${esc(m.pihak||'')}<div class="note">${esc(m.ket||m.ref||'')} · ${who(m.by)}</div></td><td>${!m.dikoreksi&&m.jenis!=='koreksi'&&CAN?`<button class="btn sm ghost" data-act="koreksi" data-id="${m._id}">Koreksi</button>`:''}</td></tr>`).join('')}<tr><td>${fd(r.tglStokAwal)}</td><td>${chip('Stok awal','plain')}</td><td class="num">${n(r.stokAwal)}</td><td class="note">Import Excel</td><td></td></tr></tbody></table></div>
 <p class="note">Histori sebelum ${fd(r.tglStokAwal)} berasal dari snapshot Excel; setelahnya dari transaksi aplikasi.</p>`}})};

/* ---------- forms: item edit, settings, PR ---------- */
function rmEditForm(id){const r=byId('rm',id);openModal(`Ubah item · ${esc(rmLabel(r))}`,fld('Material',inp('item',r.item))+fld('Ukuran (t×l×p mm)',inp('ukuran',r.ukuran))+fld('Stok minimum',inp('min',r.min||0,'number','min="0"'))+fld('Buffer (target stok)',inp('buffer',r.buffer||0,'number','min="0"'))+fld('Lokasi rak',inp('lokasi',r.lokasi||'','text','placeholder="mis. A-03"'))+fld('Harga per kg (Rp, opsional)',inp('harga',r.harga||'','number','min="0"'))+fld('Satuan',inp('satuan',r.satuan||'Lembar'))+(r.usulan?`<div class="note full">Catatan Excel: ${esc(r.usulan)}</div>`:''),
 async d=>{if(!d.item||!d.ukuran)throw new Error('Material dan ukuran wajib diisi.');if(num0(d.min)>num0(d.buffer)&&num0(d.buffer)>0)throw new Error('Minimum tidak boleh lebih besar dari buffer.');const itm=d.item.trim(),ukr=d.ukuran.trim();const dup=S.rm.find(r=>r._id!==id&&r.item.trim().toLowerCase()===itm.toLowerCase()&&r.ukuran.trim().toLowerCase()===ukr.toLowerCase());if(dup)throw new Error(`Kombinasi "${itm} – ${ukr}" sudah dipakai item lain. Ubah spesifikasi atau hapus duplikat terlebih dahulu.`);await updDoc('rm',id,{item:itm,ukuran:ukr,min:num0(d.min),buffer:num0(d.buffer),lokasi:String(d.lokasi||'').trim(),harga:num0(d.harga),satuan:d.satuan||'Lembar'})})}
function rmSetForm(){const s=SET();openModal('Pengaturan bahan baku',fld('Lead time pembelian (hari)',inp('leadBeli',s.leadBeli,'number','min="1"'))+fld('Target stok setelah order (lbr)',inp('cover',s.cover,'number','min="1"'))+`<div class="note full">Titik pesan ulang = minimum + pemakaian harian × lead time. Usulan order mengisi stok sampai buffer atau target, mana yang lebih besar. Untuk material besi, sesuaikan target dengan kebutuhan project aktif, bukan hari pemakaian.</div>`,
 async d=>{const v={leadBeli:Math.max(1,num0(d.leadBeli)),cover:Math.max(1,num0(d.cover))};if(byId('master','setting'))await updDoc('master','setting',v);else{need();await DB.doc('master/setting').set(v)}})}
function prNewForm(){
 const f=F['bahan-baku'],R=rmCalc();const items=Object.values(R.info).filter(x=>x.sug>0).map(x=>{const v=f.beli[x.r._id]||{on:true,q:x.sug};return {item:x.r._id,q:Math.round(+v.q||0),on:v.on}}).filter(i=>i.on&&i.q>0);
 if(!items.length){toast('Pilih minimal satu item dengan qty > 0.');return}
 openModal('Buat permintaan pembelian (PR)',`<div class="full tbl-wrap"><table class="lines"><thead><tr><th>Material</th><th class="num">Qty (lbr)</th><th class="num">Kg</th></tr></thead><tbody>${items.map(i=>{const r=byId('rm',i.item);return `<tr><td>${esc(rmLabel(r))}</td><td class="num">${n(i.q)}</td><td class="num">${n(Math.round(i.q*kgLbr(r)))}</td></tr>`}).join('')}</tbody></table></div>`+
  fld('Tanggal',inp('tgl',today(),'date'))+fld('Dibutuhkan paling lambat',inp('butuh',addDays(today(),SET().leadBeli),'date'))+fld('Supplier (opsional)',inp('supplier','','text','list="dl-sup2" autocomplete="off"'))+dl('dl-sup2',mNames('supplier'))+fld('Catatan',inp('ket'),true),
  async (d,form)=>{let sup='';if(String(d.supplier||'').trim())sup=await ensureMaster('supplier',d.supplier,form,'supplier');const t=d.tgl||today();const noPR=await nextDocNo('PR',t);
   await addDoc('pr',{noPR,tgl:t,butuh:d.butuh||'',supplier:sup,items:items.map(i=>({item:i.item,q:i.q,qTerima:0})),status:'Diajukan',ket:d.ket||''});F['bahan-baku'].beli={};toast(`${noPR} dibuat`)},{submit:'Buat PR',done:' '});
}
async function exportPrXlsx(id){
 const p=byId('pr',id);if(!p||!DLS){toast('Unduhan tidak tersedia di tampilan ini.');return}
 try{const X=await loadExcelJS();const wb=new X.Workbook();const ws=wb.addWorksheet(p.noPR.replace(/\//g,'-'),{pageSetup:{paperSize:9,orientation:'portrait',fitToPage:true,fitToWidth:1,fitToHeight:0}});
  [6,34,22,12,14,26].forEach((w,i)=>ws.getColumn(i+1).width=w);const th={style:'thin',color:{argb:'FF000000'}},box={top:th,left:th,bottom:th,right:th};
  const img=wb.addImage({base64:LOGO_B64,extension:'png'});ws.addImage(img,{tl:{col:0.1,row:0.2},ext:{width:200,height:53}});
  ws.mergeCells('C1:F1');Object.assign(ws.getCell('C1'),{value:'PT. MITRA NUSA INTERNASIONAL',font:{name:'Times New Roman',size:15,bold:true},alignment:{horizontal:'right'}});
  ws.mergeCells('C2:F2');Object.assign(ws.getCell('C2'),{value:'Ruko Gravitas B2 No.1, Lavon, Wana Kerta · Kec. Sindang Jaya, Kab. Tangerang',font:{name:'Arial',size:9},alignment:{horizontal:'right'}});
  ws.mergeCells('A5:F5');Object.assign(ws.getCell('A5'),{value:'PERMINTAAN PEMBELIAN BAHAN BAKU (PR)',font:{name:'Arial',size:14,bold:true},alignment:{horizontal:'center'},fill:{type:'pattern',pattern:'solid',fgColor:{argb:'FF92D050'}}});
  [['No PR',p.noPR],['Tanggal',tglLong(p.tgl)],['Dibutuhkan',tglLong(p.butuh)],['Supplier',p.supplier||'-']].forEach(([k,v],i)=>{ws.getCell(7+i,1).value=k;ws.mergeCells(7+i,2,7+i,4);ws.getCell(7+i,2).value=': '+v;ws.getCell(7+i,1).font=ws.getCell(7+i,2).font={name:'Arial',size:10.5}});
  const hr=12;['No','Material','Ukuran (t×l×p mm)','Qty (lbr)','Berat (kg)','Keterangan'].forEach((h,i)=>{const c=ws.getCell(hr,i+1);c.value=h;c.font={name:'Arial',size:10.5,bold:true};c.fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFDBDBDB'}};c.border=box;c.alignment={horizontal:'center',vertical:'middle'}});
  let r=hr+1,tq=0,tk=0;(p.items||[]).forEach((i,k)=>{const it=byId('rm',i.item)||{};const kg=Math.round(i.q*kgLbr(it));tq+=i.q;tk+=kg;[k+1,it.item||'',it.ukuran||'',i.q,kg,''].forEach((v,j)=>{const c=ws.getCell(r,j+1);c.value=v;c.border=box;c.font={name:'Arial',size:10.5};c.alignment={horizontal:j===1||j===5?'left':'center',vertical:'middle'};if(j===4)c.numFmt='#,##0'});r++});
  ws.mergeCells(r,1,r,3);ws.getCell(r,1).value='Total';[[4,tq],[5,tk]].forEach(([j,v])=>{ws.getCell(r,j).value=v;ws.getCell(r,j).numFmt='#,##0'});for(let j=1;j<=6;j++){const c=ws.getCell(r,j);c.border=box;c.font={name:'Arial',size:10.5,bold:true};c.alignment={horizontal:j<=3?'center':'center'}}
  if(p.ket){ws.mergeCells(r+2,1,r+2,6);ws.getCell(r+2,1).value='Catatan: '+p.ket;ws.getCell(r+2,1).font={name:'Arial',size:10,italic:true}}
  [['Dibuat oleh (PPIC / Gudang)',2],['Disetujui',4],['Procurement',6]].forEach(([l,c])=>{ws.getCell(r+4,c).value=l;ws.getCell(r+4,c).font={name:'Arial',size:10,bold:true};ws.getCell(r+9,c).value='(                        )';ws.getCell(r+9,c).font={name:'Arial',size:10}});
  const buf=await wb.xlsx.writeBuffer();await DLS.save({filename:`${p.noPR.replace(/\//g,'-')}.xlsx`,data:new Uint8Array(buf)})}
 catch(e){if(e.code!=='declined')toast('Gagal membuat Excel: '+(e.message||e.code))}
}
async function saveOpname(){
 const f=F['bahan-baku'],R=rmCalc();const rows=Object.entries(f.opn).filter(([,v])=>v!==''&&v!==undefined).map(([id,v])=>({id,fisik:+v,sistem:R.info[id]?R.info[id].stok:0})).filter(x=>R.info[x.id]);
 if(!rows.length){toast('Isi hitung fisik minimal satu item.');return}
 if(rows.some(x=>!(x.fisik>=0))){toast('Hitung fisik harus angka ≥ 0.');return}
 const diffs=rows.filter(x=>x.fisik!==x.sistem);
 openModal('Simpan hasil stock opname',`<div class="full kv"><div><span>Item dihitung</span><b>${rows.length}</b></div><div><span>Item selisih</span><b>${diffs.length}</b></div><div><span>Akurasi</span><b>${Math.round((rows.length-diffs.length)/rows.length*100)}%</b></div></div>${diffs.length?`<div class="full tbl-wrap"><table class="lines"><thead><tr><th>Item</th><th class="num">Sistem</th><th class="num">Fisik</th><th class="num">Selisih</th></tr></thead><tbody>${diffs.map(x=>`<tr><td>${esc(rmLabel(byId('rm',x.id)))}</td><td class="num">${n(x.sistem)}</td><td class="num">${n(x.fisik)}</td><td class="num">${x.fisik-x.sistem>0?'+':''}${n(x.fisik-x.sistem)}</td></tr>`).join('')}</tbody></table></div>`:''}`+fld('Tanggal opname',inp('tgl',today(),'date'))+fld('Penjelasan selisih',inp('ket','','text',diffs.length?'required placeholder="mis. plat penyok dipisah, salah catat pemakaian SPK 520"':''),true),
  async d=>{if(diffs.length&&!String(d.ket).trim())throw new Error('Tulis penjelasan selisih agar opname bisa diaudit.');const t=d.tgl||today();const noDok=await nextDocNo('OPN',t);
   for(const x of diffs)await addDoc('mutasi',{gudang:'rm',item:x.id,jenis:'opname',delta:x.fisik-x.sistem,tgl:t,noDok,ref:'Stock opname',spk:'',pihak:'',ket:d.ket||'',stokSistem:x.sistem,stokFisik:x.fisik});
   const kg=diffs.reduce((a,x)=>a+(x.fisik-x.sistem)*kgLbr(byId('rm',x.id)),0);
   await addDoc('opname',{noDok,tgl:t,gudang:'rm',items:rows.map(x=>({item:x.id,sistem:x.sistem,fisik:x.fisik})),counted:rows.length,selisih:diffs.length,kg,akurasi:(rows.length-diffs.length)/rows.length,ket:d.ket||''});
   F['bahan-baku'].opn={};toast(`${noDok} tersimpan · akurasi ${Math.round((rows.length-diffs.length)/rows.length*100)}%`)},{submit:'Simpan opname',done:' '});
}
/* live inputs inside the RM tabs (kept in state so realtime refreshes do not wipe them) */
document.addEventListener('input',e=>{const el=e.target;const f=F['bahan-baku'];
 if(el.dataset.opn){f.opn[el.dataset.opn]=el.value;const x=RMI(el.dataset.opn);const has=el.value!=='';const d=has?(+el.value-x.stok):0;const od=document.querySelector(`[data-od="${el.dataset.opn}"]`),ok=document.querySelector(`[data-ok="${el.dataset.opn}"]`);if(od){od.textContent=has?(d>0?'+':'')+n(d):'';od.style.color=d<0?'var(--crit)':d>0?'var(--ok)':''}if(ok)ok.textContent=has&&d?n(Math.round(d*x.kg1)):'';
  let c=0,df=0,kg=0;Object.entries(f.opn).forEach(([id,v])=>{if(v===''||v===undefined||!RMI(id))return;c++;const dd=+v-RMI(id).stok;if(dd){df++;kg+=dd*RMI(id).kg1}});const tt=$('#opn-tot');if(tt)tt.textContent=`${c} item dihitung · ${df} selisih · ${n(Math.round(kg))} kg`}
 if(el.dataset.beli){const id=el.dataset.id;const cur=f.beli[id]||{on:true,q:RMI(id).sug};if(el.dataset.beli==='q')cur.q=el.value;else cur.on=el.checked;f.beli[id]=cur;const bk=document.querySelector(`[data-bkg="${id}"]`);if(bk)bk.textContent=n(Math.round((+cur.q||0)*RMI(id).kg1));
  const R=rmCalc();let q=0,kg=0,rp=0;Object.values(R.info).filter(x=>x.sug>0).forEach(x=>{const v=f.beli[x.r._id]||{on:true,q:x.sug};if(v.on){q+=+v.q||0;kg+=(+v.q||0)*x.kg1;rp+=(+v.q||0)*x.kg1*(+x.r.harga||0)}});const tt=$('#beli-tot');if(tt)tt.innerHTML=`<b>${n(q)}</b> lembar · <b>${ton(kg)}</b> ton${rp?` · ± Rp ${n(Math.round(rp))}`:''}`}
});
document.addEventListener('change',e=>{const el=e.target;if(el.dataset&&el.dataset.beli==='on'){const ev=new Event('input',{bubbles:true});el.dispatchEvent(ev)}});

/* ---------- KATALOG ITEM SPK (descriptions, units, weights, section titles, sales) ---------- */
const SAT_DEF=['Btg','Pcs','Set','Unit','Lot','Mtr','Lbr','Kg'];
const satList=()=>{const k=KAT();return (k.satuanList&&k.satuanList.length?k.satuanList:SAT_DEF)};
const katNorm=d=>String(d||'').toLowerCase().replace(/\bmm\b/g,'').replace(/[^a-z0-9]/g,'').replace(/(\d)x(?=[a-z])/g,'$1');
function lev2(a,b){ /* edit distance capped at 3 (banded) */
 if(Math.abs(a.length-b.length)>2)return 3;const n=a.length,m=b.length;let prev=new Array(m+1);for(let j=0;j<=m;j++)prev[j]=j;
 for(let i=1;i<=n;i++){const cur=new Array(m+1).fill(3);cur[0]=i;let best=cur[0];for(let j=Math.max(1,i-2);j<=Math.min(m,i+2);j++){cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));if(cur[j]<best)best=cur[j]}if(best>2)return 3;prev=cur}return Math.min(3,prev[m])}
let KATX=null;
function katIndex(){ /* items with weights per thickness, usage in app SPKs, and suspected duplicates/typos */
 const k=KAT();if(KATX&&KATX.k===k&&KATX.n===S.spk.length)return KATX;
 const merged=k.merged||{};
 const items={};const add=d=>items[d]||(items[d]={d,u:'',w:{},use:0,last:0});
 Object.entries(k.satuan||{}).forEach(([d,u])=>{const rd=merged[d]||d;add(rd).u=u});
 Object.entries(k.berat||{}).forEach(([key,w])=>{const i=key.lastIndexOf('|');const d=key.slice(0,i),t=key.slice(i+1);const rd=merged[d]||d;add(rd).w[t||'–']=w});
 /* also pull items from SPK history that are NOT yet in master katalog */
 S.spk.slice().sort((a,b)=>(+a.no||0)-(+b.no||0)).forEach(s=>(s.items||[]).forEach(it=>{if(!it.d)return;const rd=merged[it.d]||it.d;if(items[rd]){items[rd].use++;items[rd].last=Math.max(items[rd].last,+s.no||0)}else{/* new item from history — seed it */add(rd);items[rd].use=1;items[rd].last=+s.no||0;if(it.u&&!items[rd].u)items[rd].u=it.u;if(it.w&&!Object.keys(items[rd].w).length)items[rd].w={'–':+it.w}}}));
 const arr=Object.values(items);const norm=arr.map(x=>katNorm(x.d));const sim={};
 /* words that make a different product (inside vs outside riser, type C, tee vs elbow…) must match exactly */
 const PROT=new Set(['ir','or','c','u','inside','outside','tee','elbow','cross','reducer','cover','riser','vertical','horizontal','left','right','lurus','sudut','l','t','x']);const prot=arr.map(x=>x.d.toLowerCase().split(/[^a-z0-9]+/).filter(t=>PROT.has(t)).sort().join(','));
 for(let i=0;i<arr.length;i++)for(let j=i+1;j<arr.length;j++){const a=norm[i],b=norm[j];if(a.length<8||b.length<8)continue;
  /* sizes differing only in digits are different products (W100 vs W200): compare only when the digit sequence is the same */
  if(a.replace(/[^0-9]/g,'')!==b.replace(/[^0-9]/g,''))continue;if(prot[i]!==prot[j])continue;const dd=a===b?0:lev2(a,b);if(dd<=2){(sim[arr[i].d]=sim[arr[i].d]||[]).push(arr[j].d);(sim[arr[j].d]=sim[arr[j].d]||[]).push(arr[i].d)}}
 arr.forEach(x=>{x.sim=sim[x.d]||[];const ws=Object.values(x.w);x.flag='';
  if(/^(jointing|cover clamp|hanger|bracket|angle|cover elbow|cover tee|cover inside|cover outside|cover reducer|separator|clamp|bolt|baut)/i.test(x.d)&&ws.some(w=>w>10))x.flag='Berat tampak terlalu besar untuk aksesoris';});
 KATX={k,n:S.spk.length,arr:arr.sort((a,b)=>a.d.localeCompare(b.d))};return KATX;
}
async function katSave(mut){need();const k=JSON.parse(JSON.stringify(KAT()));delete k._id;k.berat=k.berat||{};k.satuan=k.satuan||{};k.grup=k.grup||[];k.sales=k.sales||[];k.merged=k.merged||{};mut(k);await DB.doc('master/katalog').set(k);KATX=null}
const wTxt=w=>Object.entries(w).sort((a,b)=>parseFloat(a[0])-parseFloat(b[0])).map(([t,v])=>`<span class="wchip">${t==='–'?'':esc(t)+' mm · '}<b>${n(v)}</b> kg</span>`).join('')||'<span class="muted">–</span>';
function katExactGroups(){const X=katIndex();const g={};X.arr.forEach(x=>{const k=katNorm(x.d);(g[k]=g[k]||[]).push(x)});return Object.values(g).filter(a=>a.length>1).map(a=>{const c=a.slice().sort((p,q)=>q.use-p.use||Object.keys(q.w).length-Object.keys(p.w).length||(p.d.includes(', c/w')?-1:0)-(q.d.includes(', c/w')?-1:0)||p.d.localeCompare(q.d))[0];return {keep:c,drop:a.filter(x=>x!==c)}})}
function katAutoForm(){const G=katExactGroups();if(!G.length){toast('Tidak ada duplikat ejaan.');return}
 openModal('Rapikan duplikat ejaan',`<div class="full note">${G.length} kelompok item yang hanya beda spasi, koma, huruf besar/kecil, atau "mm". Ejaan yang dipertahankan = yang paling sering dipakai / punya data berat terlengkap. Berat & satuan dari ejaan lain dipindah ke situ.</div><div class="full tbl-wrap"><table class="lines"><thead><tr><th>Dipertahankan</th><th>Dihapus dari katalog</th></tr></thead><tbody>${G.map(g=>`<tr><td><b>${esc(g.keep.d)}</b></td><td class="note">${g.drop.map(x=>esc(x.d)).join('<br>')}</td></tr>`).join('')}</tbody></table></div><div class="full note">SPK yang sudah tersimpan tidak diubah. Salah ketik yang hurufnya beda (mis. "Cabe Tray") tetap diperiksa manual lewat tombol Gabungkan.</div>`,
  async()=>{let merged=0;await katSave(k=>{G.forEach(g=>g.drop.forEach(x=>{const d=x.d,to=g.keep.d;/* migrate berat keys */Object.keys(k.berat).forEach(key=>{const i=key.lastIndexOf('|');if(key.slice(0,i)===d){const nk=to+'|'+key.slice(i+1);if(!(nk in k.berat))k.berat[nk]=k.berat[key];delete k.berat[key]}});/* migrate satuan */if(!k.satuan[to]&&k.satuan[d])k.satuan[to]=k.satuan[d];if(k.satuan[d])delete k.satuan[d];/* record merge alias so SPK-history items consolidate too */k.merged[d]=to;merged++}))});toast(`${merged} ejaan ganda dirapikan`)},{submit:`Rapikan ${G.length} kelompok`,done:' '})}
function katItemTab(){
 const f=F['master-data'],q=f.q.toLowerCase(),X=katIndex();let rows=X.arr;
 const cnt={all:rows.length,now:rows.filter(x=>!Object.keys(x.w).length).length,sim:rows.filter(x=>x.sim.length).length,flag:rows.filter(x=>x.flag).length,used:rows.filter(x=>x.use).length};
 if(q)rows=rows.filter(x=>x.d.toLowerCase().includes(q));
 if(f.kf==='now')rows=rows.filter(x=>!Object.keys(x.w).length);else if(f.kf==='sim')rows=rows.filter(x=>x.sim.length);else if(f.kf==='flag')rows=rows.filter(x=>x.flag);else if(f.kf==='used')rows=rows.filter(x=>x.use);
 const chips=[['','Semua',cnt.all,'plain'],['used','Dipakai di SPK aplikasi',cnt.used,'info'],['now','Tanpa berat',cnt.now,'warn'],['sim','Dugaan dobel / typo',cnt.sim,'crit'],['flag','Berat janggal',cnt.flag,'crit']].map(([v,l,c,cl])=>`<button class="chip ${f.kf===v?'sel':''} ${cl}" data-act="filt" data-view="master-data" data-key="kf" data-val="${v}">${l} · ${c}</button>`).join('');
 const EG=katExactGroups();
 return `<section class="panel"><div class="pbody note">Daftar ini yang muncul sebagai pilihan <b>Description</b> di form SPK, beserta satuan dan berat/pcs yang terisi otomatis. Sumber awal: 1.072 baris item dari 159 sheet SPK di PPIC Dashboard. Setiap SPK yang disimpan menambah item, satuan, dan berat baru ke sini. Berat dicatat per tebal plat, karena item yang sama beda tebal beda berat.</div>
 <div class="pbody"><div class="summ">${chips}${EG.length?`<span class="grow"></span><button class="btn sm primary" data-act="katauto">Rapikan ${EG.length} duplikat ejaan otomatis</button>`:''}</div></div>
 ${rows.length?`<div class="tbl-wrap"><table class="katt"><thead><tr><th>Description</th><th>Satuan</th><th>Berat / pcs per tebal</th><th class="num">Dipakai</th><th>Catatan</th><th></th></tr></thead><tbody>${rows.slice(0,400).map(x=>`<tr><td><b>${esc(x.d)}</b></td><td>${esc(x.u||'–')}</td><td><div class="wchips">${wTxt(x.w)}</div></td><td class="num">${x.use?`${x.use}×<div class="note">terakhir SPK ${x.last}</div>`:'<span class="muted">–</span>'}</td><td>${x.sim.length?`<div class="note" style="color:var(--crit)">Mirip: ${x.sim.slice(0,2).map(esc).join('; ')}</div>`:''}${x.flag?`<div class="note" style="color:var(--crit)">${esc(x.flag)}</div>`:''}</td><td class="acts-r"><button class="btn sm ghost" data-act="katedit" data-d="${esc(x.d)}">Ubah</button>${x.sim.length?`<button class="btn sm" data-act="katmerge" data-d="${esc(x.d)}">Gabungkan</button>`:''}<button class="btn sm ghost danger" data-act="katdel" data-d="${esc(x.d)}">Hapus</button></td></tr>`).join('')}</tbody></table></div>${rows.length>400?`<div class="pbody note">Menampilkan 400 dari ${rows.length}. Persempit dengan pencarian.</div>`:''}`:empty('Tidak ada item yang cocok','Ubah kata kunci atau filter.')}</section>`;
}
function katGrupTab(){
 const f=F['master-data'],q=f.q.toLowerCase(),k=KAT();const use={};S.spk.forEach(s=>new Set((s.items||[]).map(i=>i.g)).forEach(g=>{if(g)use[g]=(use[g]||0)+1}));
 const rows=(k.grup||[]).map((g,i)=>({g,i,u:use[g]||0})).filter(x=>!q||x.g.toLowerCase().includes(q));
 return `<section class="panel"><div class="pbody note">Judul section kuning yang muncul sebagai pilihan di form SPK, mis. "CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED". Tebal di judul ini dipakai untuk mencari berat item yang tepat.</div>
 ${rows.length?`<div class="tbl-wrap"><table><thead><tr><th>Judul section</th><th>Material · tebal · type</th><th class="num">Dipakai di SPK aplikasi</th><th></th></tr></thead><tbody>${rows.map(x=>{const d=derive(x.g);return `<tr><td><b>${esc(x.g)}</b></td><td class="note">${esc(d.material)} · ${esc(d.tebal||'?')} mm${d.type?' · '+esc(d.type):''}</td><td class="num">${x.u||'–'}</td><td class="acts-r"><button class="btn sm ghost" data-act="grupedit" data-i="${x.i}">Ubah</button><button class="btn sm ghost danger" data-act="grupdel" data-i="${x.i}">Hapus</button></td></tr>`}).join('')}</tbody></table></div>`:empty('Belum ada judul section','Tambahkan dengan tombol Tambah.')}</section>`;
}
function katListTab(){
 const k=KAT();const satUse={},salUse={};S.spk.forEach(s=>{(s.items||[]).forEach(i=>satUse[i.u]=(satUse[i.u]||0)+1);if(s.sales)salUse[s.sales]=(salUse[s.sales]||0)+1});
 const sales=[...new Set([...(k.sales||[])])].sort();
 const unsales=Object.keys(salUse).filter(x=>!sales.includes(x));
 const list=(arr,kind,use)=>arr.map((x,i)=>`<tr><td><b>${esc(x)}</b></td><td class="num">${use[x]||'–'}</td><td class="acts-r"><button class="btn sm ghost" data-act="listedit" data-kind="${kind}" data-v="${esc(x)}">Ubah</button><button class="btn sm ghost danger" data-act="listdel" data-kind="${kind}" data-v="${esc(x)}">Hapus</button></td></tr>`).join('');
 return `<div class="grid2"><section class="panel"><header><h2>Satuan</h2><span class="hint">pilihan kolom Satuan di SPK</span><button class="btn sm" data-act="listnew" data-kind="sat" style="margin-left:8px">${ic('plus')}Tambah</button></header><div class="tbl-wrap"><table><thead><tr><th>Satuan</th><th class="num">Dipakai (baris SPK)</th><th></th></tr></thead><tbody>${list(satList(),'sat',satUse)}</tbody></table></div></section>
 <section class="panel"><header><h2>Sales</h2><span class="hint">pilihan kolom Sales di SPK</span><button class="btn sm" data-act="listnew" data-kind="sales" style="margin-left:8px">${ic('plus')}Tambah</button></header>${unsales.length?`<div class="pbody note" style="color:var(--warn)">Nama sales di SPK yang belum ada di daftar: ${unsales.map(esc).join(', ')}. Ejaan berbeda (mis. "Bpk Yusep" vs "Bapak Yusep") membuat laporan per sales terpecah.</div>`:''}<div class="tbl-wrap"><table><thead><tr><th>Sales</th><th class="num">SPK</th><th></th></tr></thead><tbody>${list(sales,'sales',salUse)}</tbody></table></div></section></div>`;
}
function katItemForm(d){
 const X=katIndex();const x=d?X.arr.find(y=>y.d===d):{d:'',u:'Btg',w:{}};if(!x)return;
 const ws=Object.entries(x.w).sort((a,b)=>parseFloat(a[0])-parseFloat(b[0]));
 const wrow=(t,v,i)=>`<tr><td><input class="inp" name="t_${i}" id="m-t_${i}" value="${esc(t==='–'?'':t)}" placeholder="1.2" inputmode="decimal"></td><td><input class="inp" name="w_${i}" id="m-w_${i}" value="${esc(v)}" type="number" min="0" step="any" inputmode="decimal"></td></tr>`;
 openModal(d?'Ubah item katalog':'Tambah item katalog',fld('Description',inp('d',x.d,'text','required'),true)+fld('Satuan',`<select class="sel" name="u" id="m-u">${[...new Set([...satList(),x.u].filter(Boolean))].map(s=>`<option ${s===x.u?'selected':''}>${esc(s)}</option>`).join('')}</select>`)+
  `<div class="full"><label class="fldl">Berat per pcs menurut tebal plat</label><div class="tbl-wrap"><table class="lines"><thead><tr><th>Tebal (mm)</th><th>Berat (kg/pcs)</th></tr></thead><tbody>${ws.map(([t,v],i)=>wrow(t,v,i)).join('')}${wrow('','',ws.length)}${wrow('','',ws.length+1)}</tbody></table></div><div class="note">Kosongkan berat untuk menghapus baris. Tebal kosong = berlaku untuk semua tebal.</div></div>`+
  (d?`<div class="note full">Mengganti nama hanya mengubah katalog. SPK yang sudah tersimpan tetap memakai deskripsi lamanya.</div>`:''),
  async dd=>{const nd=String(dd.d||'').trim().replace(/\s+/g,' ');if(!nd)throw new Error('Description wajib diisi.');const X2=katIndex();if(nd!==d&&X2.arr.some(y=>y.d===nd))throw new Error('Description itu sudah ada di katalog. Pakai Gabungkan.');
   const w={};for(let i=0;i<ws.length+2;i++){const t=String(dd['t_'+i]||'').replace(',','.').trim(),v=num0(dd['w_'+i]);if(v>0)w[t?String(parseFloat(t)):'']=v}
   await katSave(k=>{if(d&&d!==nd){delete k.satuan[d];Object.keys(k.berat).forEach(key=>{if(key.slice(0,key.lastIndexOf('|'))===d)delete k.berat[key]});/* update merged aliases that pointed to old name */Object.keys(k.merged).forEach(alias=>{if(k.merged[alias]===d)k.merged[alias]=nd});if(k.merged[d])delete k.merged[d]}else if(d){delete k.satuan[d];Object.keys(k.berat).forEach(key=>{if(key.slice(0,key.lastIndexOf('|'))===d)delete k.berat[key]})}k.satuan[nd]=dd.u||'Pcs';Object.entries(w).forEach(([t,v])=>k.berat[nd+'|'+t]=v)})});
}
function katMergeForm(d){
 const X=katIndex();const x=X.arr.find(y=>y.d===d);if(!x)return;
 openModal('Gabungkan item katalog',fld('Item yang dihapus',`<div style="padding:8px 0"><b>${esc(d)}</b></div>`,true)+fld('Digabung ke',`<select class="sel" name="to" id="m-to">${x.sim.map(s=>`<option>${esc(s)}</option>`).join('')}</select>`,true)+`<div class="note full">Satuan & berat yang belum ada di item tujuan ikut dipindah, lalu "${esc(d)}" dihapus dari katalog sehingga tidak muncul lagi di form SPK. SPK lama tidak diubah.</div>`,
  async dd=>{const to=dd.to;await katSave(k=>{Object.keys(k.berat).forEach(key=>{const i=key.lastIndexOf('|');if(key.slice(0,i)===d){const nk=to+'|'+key.slice(i+1);if(!(nk in k.berat))k.berat[nk]=k.berat[key];delete k.berat[key]}});if(!k.satuan[to]&&k.satuan[d])k.satuan[to]=k.satuan[d];if(k.satuan[d])delete k.satuan[d];k.merged[d]=to})},{submit:'Gabungkan'});
}
function katDelForm(d){openModal('Hapus item katalog',`<div class="full">Hapus <b>${esc(d)}</b> dari katalog? Item tidak lagi muncul sebagai pilihan di form SPK. SPK yang sudah memakainya tidak berubah.</div>`,async()=>{await katSave(k=>{delete k.satuan[d];Object.keys(k.berat).forEach(key=>{if(key.slice(0,key.lastIndexOf('|'))===d)delete k.berat[key]});delete k.merged[d]})},{submit:'Hapus'})}
function grupForm(i){const k=KAT();const g=i!==undefined?(k.grup||[])[+i]:'';const hb=parseH(g);
 openModal(i!==undefined?'Ubah judul section':'Tambah judul section',`<div class="full ehb">`+['p','t','tb','f'].map(x=>`<select class="sel" id="m-hb-${x}" data-hbm="${x}">${opt(HB[x],hb[x],{p:'Produk',t:'Type',tb:'Tebal',f:'Finishing'}[x])}</select>`).join('')+`</div>`+fld('Judul section',inp('g',g,'text','required style="text-transform:uppercase"'),true),
  async d=>{const v=String(d.g||'').trim().toUpperCase().replace(/\s+/g,' ');if(!v)throw new Error('Isi judul.');await katSave(k=>{const a=k.grup||[];if(i!==undefined){const old=a[+i];a[+i]=v;k.grup=[...new Set(a)]}else{if(a.includes(v))throw new Error('Judul itu sudah ada.');k.grup=[v,...a]}})},
  {mount:f=>f.addEventListener('change',e=>{if(e.target.dataset.hbm){const o={};['p','t','tb','f'].forEach(x=>o[x]=$('#m-hb-'+x).value);f.g.value=composeH(o)}})});
}
function listForm(kind,v){const lbl=kind==='sat'?'satuan':'sales';openModal(`${v?'Ubah':'Tambah'} ${lbl}`,fld(kind==='sat'?'Satuan':'Nama sales',inp('v',v||'','text','required'),true)+(v&&kind==='sales'?`<label class="ck full"><input type="checkbox" name="ren" id="m-ren" checked> Ganti juga nama sales di SPK yang memakai "${esc(v)}"</label>`:''),
 async d=>{const nv=cleanName(d.v);if(!nv)throw new Error('Wajib diisi.');
  await katSave(k=>{const key=kind==='sat'?'satuanList':'sales';const a=(kind==='sat'?satList():k.sales||[]).slice();if(v){const i=a.indexOf(v);if(i>=0)a[i]=nv}else{if(a.includes(nv))throw new Error('Sudah ada.');a.push(nv)}k[key]=[...new Set(a)]});
  if(v&&kind==='sales'&&d.ren&&nv!==v){for(const s of S.spk.filter(s=>s.sales===v))await DB.doc('spk/'+s._id).update({sales:nv})}})}
async function listDel(kind,v){await katSave(k=>{if(kind==='sat'){k.satuanList=satList().filter(x=>x!==v)}else k.sales=(k.sales||[]).filter(x=>x!==v)});toast(`"${v}" dihapus dari daftar`)}

/* ---------- CSV ---------- */
async function exportCsv(what){
 const c=calc();let head,rows,name;
 if(what==='rm'){head=['Material','Ukuran','Lokasi','Kg/lbr','Min','Buffer','Stok (lbr)','Stok (kg)','Pakai/bln (lbr)','Cukup (hari)','Kelas','Status','Usulan order (lbr)'];rows=S.rm.map(r=>{const x=RMI(r._id);return [r.item,r.ukuran,r.lokasi||'',x.kg1.toFixed(2),x.min,x.buf,x.stok,Math.round(x.kg),Math.round(x.perBln),isFinite(x.cover)?Math.round(x.cover):'',x.abc,x.st,x.sug||'']})}
 else if(what==='fg'){head=['Kategori','Type','Ukuran','Panjang','Finishing','Tebal','Satuan','Stok'];rows=S.fg.map(r=>[r.kategori,r.type,r.ukuran,r.panjang,r.finishing,r.tebal,r.satuan,c.stock.fg[r._id]])}
 else if(what==='vendor'){head=['No SJ','Tanggal','Vendor','Proses','SPK','Customer','Kirim','Kembali','Sisa','Umur (hari)','Status'];rows=c.vend.map(x=>{const s=byId('spk',x.v.spk);return [x.v.noSJ,x.v.tgl,x.v.vendor,x.v.proses,s?.no,s?.customer,x.out,x.back,x.sisa,x.st==='Selesai'?'':x.age,x.st]})}
 else if(what==='kirim'){head=['No SJ','Tanggal','SPK','Customer','Item','Qty','Kendaraan','No Polisi','Driver','Status'];rows=S.kirim.flatMap(k=>(k.items||[]).map(i=>[k.noSJ,k.tgl,byId('spk',k.spk)?.no,k.customer,i.d,i.q,k.kendaraan,k.nopol,k.driver,k.status]))}
 else if(what==='bongkar'){head=['Tanggal','Jenis','Muatan','Pihak','Referensi','Kendaraan','No Polisi','Driver','Jam Masuk','Jam Mulai','Jam Selesai','Status'];rows=S.bongkar.map(b=>[b.tgl,b.jenis,b.muatan,b.pihak,b.ref,b.kendaraan,b.nopol,b.driver,b.jamMasuk,b.jamMulai,b.jamSelesai,b.status])}
 else if(what==='prodlog'){head=['SPK','Customer','PO','Tanggal Log','Item','Qty Produksi','Update oleh','Catatan'];rows=S.spk.flatMap(s=>(s.prodLog||[]).flatMap(l=>(l.items||[]).map(i=>[s.no,s.customer,s.po,l.tgl,i.d,i.q,l.by||'',l.ket||''])))}
 else{head=['SPK','Tanggal','Customer','PO','Sales','Material','Due','Produksi %','Terkirim %','Status','Telat (hari)'];rows=S.spk.map(s=>{const x=c.spk[s._id];return [s.no,s.tgl,s.customer,s.po,s.sales,s.material,s.due,Math.round(x.pP*100),Math.round(x.pK*100),x.st,x.late||'']})}
 const q=v=>{const s=String(v??'');return /[",;\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
 const csv='﻿'+[head,...rows].map(r=>r.map(q).join(',')).join('\r\n');
 if(!DLS){toast('Unduhan tidak tersedia di tampilan ini.');return}
 try{await DLS.save({filename:`MNI-${what}-${today()}.csv`,data:new Blob([csv],{type:'text/csv'})})}catch(e){if(e.code!=='declined')toast('Gagal mengunduh: '+(e.message||e.code))}
}

const LOGO_B64='iVBORw0KGgoAAAANSUhEUgAAAlsAAACrCAYAAABRyFlBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAgAElEQVR4nO3deXQb130v8Dv3DrhIonZLFClxEW1LAkDYJkEx7yRunLZJk7ZJ+l6atOmSOk3bbE3SmiIpbwmTehFBMUn9TuKXtel7fW2zNF3Sl6VpEmdpU4qgZIMAtVIiKYOiNjsSTXHB3Jn3hwyForDcmbmDGQDfzzk6hwLu8sMQxPxw78y9imEYBK4LhCMaY4zFhroUt2NJ29124I0VPt+/LMxd85+IP3rU7XgAAADAHNXtANwUaB84w1TalP4/Y8zFaHKrWr1qLNQ5eOP/XkoIAQAAILuyS7ZCnYM3hvKYSt0MxZblr4MvLv1h4tkH/8rNeAAAACCzski2licmpYhVVnwx1Dn4RUIIOX/xcu3500+cdzsmAAAAuK5kky1/OPKcyljI7TgKbettm2bS042YagQAAHBfySVb6VEs1cPXXxVK+liMHtrnMwxDczseAACAclQyyVapTxXa0br3YCrUOUh0Tfvz+EjvJ92OBwAAoJwUdbKlbH5XTWuL/6rbcRQLqqqfCHUOfoJw/auxaPfb3I4HAACgHBTt7XihzkEDiZZFjL411Dlo7G478AG3QwEAACh1RTeyhelCeSp8vqdCnYNPjfITFUb0Mym34wEAAChFSrGsIF+IJIvrxpXE8L71TvdjViAceZ4xVu90P7h7EQAAQD7PJ1tNu/ua1q6rOeNU+3Ncu3c82vsTp9p3gpOJJ9f5eGK453an2gcAACg3nk62nEoqRs+crjEufOolJ9ouNKeOEUa5AAAA5PBksrX77shrKirZ92W2ybnx74novtfKbNNLdoX7X1XJ1B/LbFPXtUvx4d7bZLYJAABQbjyXbMkeqSnHERocQwAAAO/wVLIlM0lAgkBIsGNgglLaKKMtLbX4+2OHH/obGW0BAACUE08kW/72yLdUlb1eRltIsm7V2nHwlEKVFhlt4fgCAACY43qyJWs0y60kwEz8XOePJ4Z7HnEynlyCHRGdUmb7OCHhAgAAEOdqsiUj0XL7xG/3Neg6N+LDPQVdyb8UjjsAAECxcC3ZsnvC1zTts2Mjve+WFY9Vsi9G17m+EI92V8tsM5Mddz5ev2FD1fN22lhIpV594vD+H8mKCQAAoBS5kmzZTVC8NKri9Mr2Tr9Wu/FzTf9CYqT7j2TFAwAAUGoKmmztbu//lQpV/bbV+imNvPvoSNdnZcZkV6H2auRcjyei3a1OtK0ob2Otezs1q/V1bszGo/vWyowJAACgVBQs2fKHI30qYx+xWt9Lo1nLubExtlPHopRGHAEAALyiIBdm+8P9Hy3FRMstoc5Bw4kkLzbUpSzMp15ttb4biScAAIDXOT6y5Q9HPqYy9qiVuqOHzq81jMis7Jhk8kKC4UQyaud1ITkGAAD4OUeTrV13HfjFyirf96zULZYTtheSLUKcWULC6mtzYzkLAAAAr3LshLgl0Fdb6omWl1DKlFDnoLG7bUDachixoS6F6zxlNRZZcQAAABQzR0a2FEVRWvce1K3U9XqidUzZXLOmYctT2yfH3mm2bqA98ixT2V1OxLWSzOPo74g8pVL2AbP1FlKLbzlx+KGvy4oDAACgGDmSbFkZ1eCczyeiPaukB2PT6a07t65as2Zm5eO14zEpyUwgPHCGMdoko62VtJTWO3a4NyKjLf/d/W9TK9Uvm603Op1cZZz9+LyMGAAAAIqR9GTLSqKl6/pkfLi7SWogNkzW7XplZXXlT3KVkZVsLedvi7xH9bGnZbcra5Rre6hv+8bqmrNu9Q8AAFCMpCZb1ka09C8not2/LS0IG2ZaQsLxO5FsLRfoGPgBo/Q+We3JTHis/J6RcAEAQLmSlmxZHNFKxIe7g1ICsOhc454vKKrvD83WczrZWk7WxeZLi6nXHHt2/zMy2kLCBQAAIEZKstXSsn/d6s23/cxMHc71iUS0u9l25xZNNwcvU0o3Wq1fyGQrTUbSxVM8kTjcYzvBbdjdV7d+XU3STB1d0y/HR7o32+0bAACgmEhZ+sFsokUIIW4lWs83Bi7MtIQMO4mWW2JDXYrd0SHmY4FAOGJ5H8S0qWN90ylNe8hMHarSTXb7BQAAKDa2k61imU56vmFPZKYlZKgqu63QfcsWG+pSNK59yGp9xhiTMUp2dKT3Sa7pE2bqYP0tAAAoN7amEYMdA0lKaZ2ZOm4kWmYufBflxjRiJl7YPLpYEm4AAAA32BrZ8nqilWwKzjqRaHlJbKhLWUrxDqv1ZYw0Wfm9+sOR99jtFwAAoBhYTrbMnqRH+YnVVvuyYqYlZDBG1xSyT7ccO9wTtZPIBjoiS3ZjMNu/yuSvJwYAAOBFlpKtYPvAJTPlNZ1/14h+5pqVvsxKNgVOlfpoVjZWEy5GmS/YHjlX6P5x/RYAAJQDS8mW2bvKxoZ7XmelH7Ouj2axlkL05VXXL57nf2u2HlVZbaDtgOn9D1fSOL9opnzjXY+4tvwHAABAIZhOtsyORhTqOq1yHc3KZCza87uX+Kzpuy6Zz/eUhL63mCm/rmrDabt9AgAAeJmUdbayGT00VOlk+4QQcnrjxnUyEi3OU0955Q5DGaajfZesJLpuXDAfCEem7PYJAADgVaaSLbMnYsP4iu0Lr3NJNux676oN200vqLoc5/pQ7XhMqZ84anndKi9zK+G6tph6jWhZxtgOu/0BAAB4lXCytadt4MtmGnZ6+vBcU2CE+So/baeN60lW/BWyYvIqK7+LYEdk2k6fp0zuwYiL5QEAoFQJJ1s+H32baNmrc9f81sIRM9MSMhTG2qzWrx2PKaU0ZSjCbMJFKdtW6D4BAABKkVCy5W/vf95MoxPxR49aCye/6ebgEat1da4vlnKSlW90aO7agqnFT2WMNuk6F14mBKNbAABQioSSLVVV60UbdHI0I9ns76aU3m2lbu14TKmbiFfJjskrRBKV8dGHo7rGr5pp1+76W/HhnqLfixIAAMCOvMlWsH0gLtqYzvUFe+Fkd27bHX5G1YiVuqU8mkUIIUrtPuHV+eMjPevMtE1VVms+optdmU9tFC2L0S0AACg1eZMtqtKAaGPxaHe1vXCyU1ZVJ6zUK/VEixBCWhu3vWSmfKFXep+M7X/RTn0AAIBipuZ60t/ef0BVcxa5gXP+n1IiysDKOlq6pp+sm4zf6UQ8omZaQkbt6dFKYhiOLYFhNREaPTRZ1bq3UXgksralb8vMeN8FK31d7+8bvta9b0yJlA11Dhq4uB4AoLT5w/3vUpn6+UzPcc73JaI9g4WOySk5MylVVXtFG0pEe15pP5xbWUq0UvrX6qbib3UiHrNmdrYuXqmpu23X7LSp/SRF7G478JYKn89SXcN4ajHUKf4+3rK55jwhxHICZBjPaGb68xrZ05tmkkk3plbtJLuh8GCUMNIuUjaV4vuPHu7pt9pXxv5NHK9sr1OkjUx1vfC7ciIGp7/8BNoP9DPV1yNSVtf0y/GR7s1OxrOS6DG1epxE2l9Kpd507PD+b1it79Sai3ZmSlSWPQVhjB0MdQ4etNqPWTI+N3KRsoK8zvlPZLSzUrIpIDQSspyR0t7nlUQrbd2WzReTO/z7ZLdb4fN9zU59s2+YXeHIb9jpb/TQN4Qzw2BH5KSdvrwu1DlohDoHjV33fMzUHaKlxudjB2S2h2v+nJF+v94e6LvdifZFEy1CzO/NW0ib7vjgWrdj8Kr0e8it+rn4OyL/5kS7y2VNtsy8qHi051454dyMsRxpbwa6lvritqmxp52IxS5WoQ4kG/3SfqGy3nTJFyaFL5ivZOwf7fRlGM9oomUpZY58qHtNZcXqQ0gQoFisWlNzEu/X7Oo3Nl5xOwYvkvmeceJLqkrZa82UD3ZEdLN92B7Z0nR9zm4bmZidPtR1frRu8ui7nIhFFqaqr5Wxj2MgHPmOjHgIIeTyyadMLQVx592P77XT38Wpy8IbVbeE+03dOVnMyvkEJuu1BzsGhmS0A/nJfL/6w5Hn3OxfNi/H5gYnjkdlxepDt7c9+d9ktyuKUiZnGjEQHvi+aANjw91rzHaaj5WEpO5MwtFV62Wym3Axxl4nKxZCzE0nVlVW2TqhnTv3xEXRsquZamvfy2KDD2l7KKW2vgiAObLerypjIRnteEk5fVHMxcnPtFW+Cik35RXqczdjssUYFd5E2AuKcXkHqwlXKZyQOU99y+0YvCoQPnjW7Rjc4A8PRt2OAcwLhCPjbvW93f8Xd7jVdz7l9kUxk2A48kWn+3DzfGi2b1vTiE7cHWA2CSnGRCvN7GsNhgfmnYqlkHfHJaL7f1W0rL/tyd+y01exYUzZ7nYMblAF717MphS+hBQjxthOO/Xt/N421qw6Yadvp5X7e5Iy9k63Y/CSWy5AD3YcTFLqTv4y3Ry8TKl4/lfMiVbaTEvIEH0dlNGS3W4oG9VX8feEkC+7HYeIXAmrmQ/eO9oOvOXk4f3/INKu2T6wfpmziuV3la3tHTse2Lhu65aPUOb7oGhb/rYn3zN2+MH/JS86KCeZ3ouKcp9aiHUZ7SbEt4cebzsVe/iwSNlbMhtKlTqRioYuf6FOSqnwti4610/J7t/LCvEtycwbdk84IrwGWyajh/YxO/WLTWyoSxF9zdU2l/QoVlbf4/72/mHZsZSrs2c//kI8uv9DsaEuJaXpQgmU6qtw7Q5wf3vE05cklPvoVj7ZzjmG8Yw2emiostDxmLWqumpEtKzlacTR4X1SD4TZKbW6ibhn5+vLgY/ZWx/JMAzhW2fvvOuJ/2GnL68wDEPXdX3S7ThKjaqqYbdjKEVHR7rf62T7MhIRVWWvlxGLk4IdB7nbMRRasCMya7cNw/iKYzuvEELIrrsKe4nKTdOIwY7Ityj1/oBDKUwfetXE85c2N23fLH21ezuqqir/gdhYvd5L4sPdTfi2m10gPHAsEe3eLVpeURSlde/B/AXBkthQl4L3qz2UKlIWDy8mhkGkJBJOTqVXVlX8fb4yWop/SvWx9+cqEwhHphLRnoZ8bd30JqBU7FuCrnNTGx/nY2ZUS+Oa5f35IL+ryScvi5ZtDQ/8bzt94fohWIkxustM+da9B00vLgju89/Tn3dHjcXU0hsWFuZekbctF++IFFVuCatCjMdFygXCB3/kdCx2jB3u+dN8ZRhjO0TaspRxx4d7aqzUk2H7xNhWt/qGmymM/r7bMQBA8VEr1IF8ZY4ffvDbJ577cN51/VSbd0QWSjklXPFor1CyxZhyrz88UPChaZHteeYWFltl9un68KaZUa3U0lzJLX7nRV4ccQqGD3r6Nm9RmzZh77R8RE9KQQsrjwOAt6iMdoU6B409d/f/WsH6FNieZ/y5h+KEEKKllt6Rr6y/I/JivjI3ki1/eOBYvsJu23F2fNTtGOBminK/reUo5uYWXyVSjjKlJG6IqL8de6fJQktw5XGvcWI0JtBxMO8dXPNLizd2yRD58ueFUSPO9bxL1HghTq/yVar/mt5sWlE+6Jk7EccOP/h/8pVRKVufr8yNZEsVvFZi9NC/S1vrKdng/6poWVwU702te1ttLbQ6Hn/oP2TF4nX4oBWX7zqcbXc8dFuu53lKe4/ciMqPv6Nf6NrcuaVrd5ppl1GlLV+Zk0ce+q6ZNr0gEe3+bZFy5fI5YGeGpHVv40I68ZIZEyFix3/hpdl7ZPd7y6Km+RjGtxZldc586m/Kagvkmp19sammZsOE23EUE1kfDF6cxi20fNfh3LZxE26UscHfFvnDTI9TaryZMvVNhBCiUrHTw/iRR09KDM2yZv9jjWfGHnF1aRXcvXkzXePfpjaX50gfT875/kS0p19OZLmdSPQ9u/z/qZT2dp9P/btcdfItrur6NVsilrQrLW7HUG7OjD3mufWgAuGBt7odA8hzZT6V8++6Lty32Uq7usa/bS2i8qH62Bcy/UsnWqKWFudN7aMrkogsphZ/eeVjIgtc1tRUT5iJxSmc6z/OV6ZcErL4SM8bOOdJGW0xxg6EOgeNQLjf8l3wivJAtZV6Rw/35l0mIh9KiDv7zyWbgldFyzZMTp52MhZw11IqJTTCyRj9itOxuK2cRrUmY/tz/l1vZjUXMz0eaO/PWS8+0vMGO3GBuGPPPvKM7DaPH37oeysfc3qBS5kS0e5fECkX7BiYcDgUT0hEe7a/dHXW1JIuuTCm/r7VZLV1b/21fGWuXV2wvE/rHXcdyDr9SAm5sf9cXksLmrTVehmjri0fAXI17e5rslP/2LJ9AMvafEp4u6pyxlS12e0YwPwXg8bQgQ1OxZLmD0eedLoPESLHhlLaWIhYvOD00b4TsaEuRef8r2W16dTo4Kmjmfc6nF9I5b3WsLrKl3WfRFPTiMee6/2OmfIy4MJ492hce0Sk3Np1NWecjqXUvTid3BSL7c97+3CpyXdSCnQc/Nny/4dCB3Jey/XStcW7ZMQF2ek6P2ZlBHZdte+FfGUWtdQvZXtu9NBQ3i/oKmP7zcblFF3jz+YrUy7TiWnxaM/9saEuZfTMaSmDLWaO3+7gY/fZ6evkc/uP2KnvyjVb043BklgzqdSNCS5MB/bEhrqUs2c/nvdEVI4YVdbd9EC1L+ddiqdHH4o5GlCZiw11KfHhnj1OtX98ZP/3sz1nGF+RunOJ0+IjPUJ3tAXbI7ZO4sXIuPCpl2JDXUpsqEt58cWF7XbaCnZEMl5usFLF6uof5CuzODe3104shBASuCfytUyPu5JsUZUKrZnENT3n1f8AxSz9YeN2HF7nb3tM6BoYcI7d96r/nifeJTOeXILhiCfujiREcDpRZXcXIhavOnvi4WT6/TXHtbzrVa1EKbN0I00mx+MfHs71vEh8rIK9JdPjppd+KKT6yfjvuB0DFIau69+klP5qvnJ33vVk54nnHsy7hYfX6Jrx7Hxq/h3jsUexMO8K+W6XV33VPySEKMHwwDxl2b8fInEVt/xYiUzFBDsis3a2aVMrKj+frwzX9YvBjoHcd67pygxVldpcRShjt5sMz1Gazo+plAlvrl7OxqO9VwghCiFyp1j94f7PqCx/upPv/VdtY09xTydbUD5SmtZXWVGRN9mqqqr4L/LyH6PX4GTvLMqotAWVwRxK2Rqn+2CU5lyo9nogTkch39hwz55yuzZLBjNrlinKV5lhvJVne15l6p+ItEMprRONLxd/uP/8WLT3pn2caaB94C9EKnPOPykjiHNNrdIWRYXScfzIgzmHb6G0zbw0sy3X84FwRMv1POfaN+RGVD5EvyRYTRgCHZF/slLPDq8lN174ItbaMWDq3OuFYyh63ALtEx92OhYzVKZuueUxQsjviVReIEafjCAUplSIlBs/Pb0251gxAJSMC4mBmVDnYNbnGWMsV/1EtNfUYpxgjaIo1DAM3UwdRtmbnYqnmOi6MUNp7ilQJymUCp17ZQjsjSwxhfnylStEEuqFpJEQQihTaZNIwZfnUgvmlcal2UL2BwBQrkRPeq17D2adqvEau+v/yRYf3pdz9NaOq3xW6A5R0cRDtFy2942iGx8VqS9rQfXESI9Qf4W08hgW4Qw4AJQiq99y5+avhWTHUo4414Sm+/ztkexDkCu4OargxfX/nBrJmYj2HRMtG+ocNIJZphRlbf4cF1w2KN+C6v72yIxIO9lGWxXFxhXtkuECeQAoarjDU45EtPe/i5xoVZU9QAjpKkBIJUnT9TmV0tWy29V1fYkKThVSSivsJlVLqdQH7dRPC3UOGpf47G3T0b5LKx9X1ZxXD+Tl9khsS6i/dTzWO0pIgZOtZHPgI4zmP3ic60W1eB0AyMG5doFluLgUCmNxYf6XKquqb9mbcKVQ56CRb5RGUe6vat3bmrdPq6M9IsmCv+3Jh8cOP+ipxZnHhrvXODHiFx/urizkSOKxw/v/p6y2NrOai7mu2cxF1/k5O307+f5bXa3GyMt3zxd0iI1R1idSjhu0weFQAMCDEitul87HC3d5lZLjzz2SdQV3s1r3ts7Lassq1VfxmNsxZOLU+zal6UJLHNglEn+h/jbjwz0Zl2tozLO1l12jh2arzZT3zHzmcg2TsbLbIw4AwAucXgpiueSpyXX5S2U2OT27yW7/btJ0npLd5tGR7s9xB9pdbtHE/qOjh/Y5mmOMHmrIOju3Ls/WXnYZRt+CSDl/W+SvCPFosgUA5eulhaVdIuU0rv/Q6Vggt5a7+oKZHt999xOvEal/+fJTV632feVsn9B+ov5w5DmrfThpbLjHkaUYEsM9FU4kcoQQsjB37e7jJvYfNQzDGD00amoESBTX+OO5FjIVUYjRN9XH7icEyRYAeMzp5x4U2qh+LNp9n8OhlC3Rk9DqqpqMNydUVFZKm460S2XMs3erOnWyHxvuqdBT/HMy24wNdSkn4o+aTlwN40sLsl/n1PnZDYmRnkeyPR9oH8h5l6Mso2dOC29hhWQLAAAs84cHhEaYVrowec72FkBOjZqUgvjhnj+RkeRoPPVRGe3EhroUXedfk9HOzyb6fparDFOplPW78jEufEroZr5AODKFZAsAPCffh3tqceHXCxVLuRI9waqMblj+/0Bb5Lsi9WZmDs5ZiWs5w/iS0HUzXllFPBOnp7JiQ11KbKhLSaVSD1ipNxbd3ycrlvhwz1tjQ11K8tSsqWv1NK4dSMcjK5ZC3lzDGNuhtO49aGulWDNmWkJCfdWOx1y7w0hmjDLbsruir1WF7Net1wgAAOAkjGwBAAAAOAjJFmTlD/dLWSEYAACgnCHZgqxUpv6lSLnZ2RebHA4FAACgaCHZAtvOjD026XYMAAAAXiW8N6Ky6YNrDRsL0JWj123+A6FywivEAQAAQNGhXONCm3TubK5f73Qw4B1bmrpr3Y4BAACgFNDFRf3fRQquZiqmispI7dZaWzupAwAAwHX0VHz/M24HAflxnf+z2zFkMjp+fq2MdvztTz4lUo5z7fMy+gMAACgUT14g/1NFwRYMRcK4FJmV0Y6qVnxApNzshcsfkdEfAABAoRQ02dI1/g2Rcg2NgQNOxwLZeXlri6mpyLTbMQAAAJghfDeiDHWTiTeJbGHDGP0gIeRDBQgJbOCcP+12DFB46b9h0W21lv/N56tzdG39pg23bbok2r7ollgy20tp/Os7JhNvsduWxvmPtk8kXp2vnWxt5ns9Z2tbgr7Vq0dFysrqM5/kjkAXq2AHMz1ntm2z78OVzjbu+iOfWvm5TM8ZXF/aNhGvtNJuOi6uLXXXTx7L+FpXlvXC70dGLJCdqZGt9U1/hjsSS9yWLe9fI1o2Ee15n5OxQOmZbgwcdzsGr1AZ+wUzyeJK0017BmTGk4md+DK1lS3RSj//LUWxlOBYiSVbokUIIQqjFTMtIePM9js7rfbB1ArHfz8rJZsDpwvdJ4hRCSFE4/qgymhXvsINW3e8SAhB1lvCapt3SrkGy4w773787qrKqkJ3Cy6gKrtTZnsrv4UnmwPjjLKdmZ4zw9D54W1nEu1248sVRzqRmWkJGVZipcy3jxDSbTO8gjjbGPiAT2WEkMzHI30s7tnZukAcPseIjAQlG/0zTFW3VldW/VeyIfCd+qnE66325eRI0dlNO+p96zfc+D+jrNmpvsAeSgghY9HufW4HAsVFS/GPymqrqrLqiEg5nfO/ltUnuEfmaEkxW34Sfnb9elOzBlzXZwhx9lger6nbnP7Z0PUFO/35VPYUIYRomjaY6fnlx+IZRXHsm9fPp/j4hVxJUP3kWO3CwtV7CCGE+div2OnzbOOeD9upn4tv/YbnCSHE0LQnneoD5PDk3YiEEHKuMYh1vQrMzIXxY4d7+hwMJaN4tOf+QvcJzphuCk64HYOXbNlQ/2+mKnDytfSP0017/kJ6QISQdVs2XySEEJ1rD287E5dyh/j2ybGsX+xrx2NK7XhMuc8wFmT0tVKy0T+T/rl+MrE1X/mm5MSz6Z+tJJnpZM6n+qR9Mc1m2+TYQ4bOrxGCLzNeZTrZUhTF1pAo18hrhfpRaYOdfgDAe9InIMpoo9uxFLufH0vfI072Uzcx9sRNDygKs9qWm0k2U9WthJibXrY7BWhwPkCIMwlQssH/8PL/bzuTWC27D5DHdLLVuvegbqfD+smY0Ir1UFhmRrViQ13SrkFQNvfUyGoLikNqbq6VEHwDX25uYuaXrdQzNP4RQuQfy6lG/9+ufEzXtIuEEDKzs1Uz256uaR8n5HqSnWwM3tJ2MUg2BX9sts62iUTPjfoN/vfKjIf51McIIYQvLN7y3jm7ake9zL7AvhvJ1vzCtTY3A8kkoSjCd8ZBcWpt2YrNzcvMjpnxePrnZGNg1M1YstGJsX5mZ+itmf7J6mN5gnSHcdnS38G2ycTH0j+fawo+nKusGRWq+nZCCFnSrrSkH6ubHNtitb26ybEbN2Axlb59piVkzLSEjOe33/EKe5GKSTYE3mS3Dcboq6zUS4+OMZ/6absxZFKfPP699M+cp/6DEEJ8265fywXecSPZOvnco0IXKRfSpp2tBb8zrhyZGdVamJ83tS6QLOcvXsbG2CXkxglIZUG3Y8mEUXUnUchXMv4zKZ1YrPyXft7uVFW6vsLoY3bayaRhcjLjUgJnd+z+XbNt1Y7HlKUrP7tpxEWtrP7pyuPhCEpsJ1t2cE3/O0LkjUCeaw5ezvR4/cRRSwkhOM/SBfKB9v4/ttMpFk3zDkW539SdPydij/zIqVhyOX/6ifNu9AvOmV+Y3U2IN6cTDZ0fTl+wvfKfzH5ktcdT2ucIkXMsp5uDyWzP6Rp/nBBCfBUVf2Ol7YZLU9Pp43js9OhNF93PtISMZLN/3Eq7eenkXxxpV1D9ZPx30j9PNdzxOrvtKZRuJISQ2tOjFdnKJHfsedRuPyDPTcmWxvWLIpWYqn7WmXBuNd3gx0ryDmrd2zovWnZpSTP9bTaXYDhyRWZ7UFyak2duLHCabAqccjMWJ2VL1GQmbvVTY3+S/jnZGPiknbYopXWEEFJ7etS38rm6yYS0i/HvM4yF9HHRNX6FkJdHFMMQXTEAAAu+SURBVB1QP5WwnWzpnP+nnfrp33eFr/o7dmO5wTBSKx9a4qkHCCGEVfg+dmsFcMtNydZYtNvynLxTqE+19cEB2bV2DCyaKX/sSK/UC1spY2tFynGNf11mv+AdN6YTGWvJV7YULE+wpuv8v+FE20xlUr6gJpsCU8nm4PTKf+nnp5uDl2T0QwghdZOJG+uMnWtqNfW5VCh1E4lX2m1D01JfIcTeCOTyupl+P0xhRbHQbbmxvM5WoC3Sa6fj2tOjnl3jq1wolGYdgl5pkWv3OhlLLomRnrz70EHx4tr8Gwnx5nSiEwxdP0IIIbRa/UfZbadHX6wey+X1GKXbMv1LP08p3STabrIp+HBS8AJ+hSnCn0tWmDk2080B03de5rJ98uhvpX+earzT0h2oy+X7HcmOH6yzvBE187EDhJB+yz0bhkFaQkJFnd7ywCxD4z9wOwa7zFwUTwghx6O9P3Gzfyhd9ZMn/3Xm5c+C9Rs3HHM5HMdtOxNvs7tVTzZ1E4lXptumvso/tdpOvpjMJnPs5Yv3Z1pCj+V9vRr/SzNti6odjymmjruiVNCdrSxdV3YcFWrVd83Wndi+5xVVlb4b7eQqO9MSMihlltdEA7luGV2SuYZSPpzzosu6Da4lt00mftHtOOwwm+gU8j2xEudaPH8pKHbL7qjbnK9sKbj24vOmtucx48Z0YoX6bjP1zta2mL4zVDTp4vznCdRXlVtHrqbrdt2YoqudTPyZ2ThELU9QcsU+0xIyZnZen87kGpf+GaRrmqWlGaoqfT+9Xp9jvcoiY3lkixBCAuGBVCLafctFlKLqJxI+0T9WL4xuGVxf3DYxtt3NGOwKtg8MUVV8BpdzXXpC3BLqb11dLfbWS0R7W2X3D97EF+bfxKqqXb1rLE2hrC3bZ1NK41/fMZmwNbW984UXrqRH85z4bOOcf4cxc3v6+VavHn257uF8ZZePEomon0j82UxL6EOEEHLvztbFmRWzGrS6khBCyLUX5xzfWWDlCFeuslzjf1nvQPJXNzm2w860ed1kQmgnFkLMv7+yxeX2+bfYZTzr6lwX2puKMWorWSsmXOd820TcsQ1SC0HZ8v41VKV7zdSxk0xns7pajcluE4pfffLkN9yOoZCWn7yeb9jzDplt108kXm+jbrvMWNJqx2MKT2nvy/X8zhfGp5zoO2MsnGfdj1Ln+tXa8ZjiRKK1PAYz5c/t2N2Vv5T19sFZimFkTq5Fp5o4559MRHv+3E4QZjJ8p99AMrN60WMoMk0X6Ij8E6PszXba8sr0oWgcqSXt/qNHev/aiRgAAAAKxfYdgYwxxzL/TKYaQ46sw5JLKXxDMJtocc6F199yKg4kWgAAUAqyJlsazz7cu1JT+InddoIwk8xUqMSZFYazKMdEixBCEtGeVU7EAgAAUG6yJltj0d6nRRtZyyqPyglHTKHW4ynXRMvt6UMnYwAAACi0nNOImsaF96Nr3PPwtvylsjOb2Exs2eLoxsTlmmhduHRuqxOxAAAAlKucydbYSI9wQrNu7cbp/KXkqaqpPedU28WeaDXs7quzkmhxrh2ZGT94wYmYzMQzPX5eaBsfAACAYiB1yxx/e2TQTn2zSY4T04mFTrS0Jf5rMtsLhCM/Xb+uJmmlbiLa2yYzFqsuXYrMuh0DAACALHmTLTPXzqgqe8BeOITomv5tM+XPNQcv2+3TTWNHer4psz3G2Cus1HPyGikzo1oLiwudTsUBAADgBumbQQfC/dfs1K+bjL/BTHmF0o3Jhj1/YKdPt3jlInAn41CUd5u6q/HEsw8fcioWAAAANwglW2ZOxoyp1dbDuc7sVB7z+b5kt89CK4dEixBCWvfeOSda9tr8giMrVwMAALhJeGRL17VF0bL+9v7PWAvn5zRNE74TkpDCLQchQ2qJ/7HbMRDifKK1u33gfjPlT8UezrsnGwAAQLERTrbiw71C+wKO8hOrx0Z6Te02n8n2yTHTSzsUS8J19EjP592OoRAja8dGur8k2o9XRvoAAABkM3XNFtf1i7mejw11KUb0M7au2VrOyp2BXk+4vJBUFDoGL7xmAAAAt5hKthLD3VuyPefUCbWUEi63kw7OOXcrhlz9un1cAAAAnGT6bsRMJ0anT5ZLZPFes3VmWkLGxLamPU7EY8WSlnqnm/2PHtrnS0R7VDdjyPQ+0TX+rBuxAAAAFIqlpR90nRuEEKJr2tVCjEo0jB//ia7rC2brVa1aO5ZsDpxxIiazjo3s/5JbfceGuhTDMDS3+l8uNtSl6Lp+Y220+EjPPW7GAwAA4DRLyVZ8uIfyRf50fKR3neyAsqk7E7e0pASjrMntaUW3psm4rs95cYouPty9eWHumt+LsQEAAMimGIYnL2/Kyk7ilDw9WtFuGCmZ8eQS6hw0ZCUUgY7IPzHK3ixaHokMAACAN0hfQd5pdvYurN/ZulTIUa6lVOpdheorjevGFSRaAAAA3lF0I1tpdpOm5OnR1e2GIW2ZCqeJjGwhyQIAAPCeohvZSrMzwkUIIfU7W+fcvpbLjFyJ1osvvrAdiRYAAIA3uboUgF214zHFbsKUrm83eXPDwvz8q0/EHvmR23EAAABAdkWdbBFyPUlKNgY+wlTWZ6edYkq6rl2ebzh16pGzbscBAAAA+RXtNVsrPaMoVbt3ts7Las9rSVewY2AyPtzd6HYcAAAAYE7JJFtpsq/D0nV9uu5MvF5mmwAAAFA+Si7ZIoSQ6eZAklJWJ7tdznmqfiJRIbvdXKabA9+sO5P41UL2CQAAAPKUZLKVVoi7DVOa9kc7Jse+IKu96abWKcqUHcsf03X9SN2ZeJusPgAAAKBwSjrZIqQwCVcunPMLNz2gkE2MMma2Ha9dQwYAAABiSj7ZSnM76bILyRYAAEBxKtpFTc2qHY8px06PWtrM2gtm6vf8utsxAAAAgHllM7K13OmtO0Or1qx5zu04zMLoFgAAQPEpy2RruWKaXkSyBQAAUHzKZhoxm9rxmIIkBgAAAJxSVMnWTEvISDYGvu9E2+mki6f4551oXwYnRuGmGkMbZlpCxjOKUiW7bQAAACiiacSViUYhRqOSjYEfMZXd63Q/Zsh83W4cUwAAgHJTFMlWrhGdQiYI55oCUwpjO/KXlEvX9N66yXhEVnvTDcGvUh/9zUzPIeECAACQy/PJlsjUmcb1T22fiP9pIeJZbmJ9U1PFujX/TFUaktWmrvGn6yYT75PV3nLja2q3rN665Xy+cki4AAAA5PF0smX2GqXF+cVXNU4f/w+n4ilmZo8lEi4AAAA5PJts2bkYPLU0f9+Osyd/KDOeYmXnOCLhAgAAsM+TyZasu+441/9v/UT892S0VUymtu0OV6yqGJbRFhIuAAAAe0o62VquHJKGZGPwx0ylr5LZZjkcNwAAACd5MtkihJCpul2vqqiu/LHsdnVN/0TdZPwB2e26ZaL+jnuqqqoPy26Xc+3/1U+MYT9GAAAAmzybbKU5uZ0O5/r76yfin3aqfaecrNl2W82W2y441T5GswAAAOTxfLKV5vQehjrnz9dNJAq+hpaoZFPwvxijnY52YvC31Z5OfNXRPgAAAMpM0SRbhBAy3ej/IlXVdxaiL53rs3UT8bWF6CuTZHNwhlG6tVD9YTQLAADAGUWVbKU5PcqVCyf8isHJR7dPJD4ho71kU3CSMdogoy0rkGQBAAA4qyiTrTQ3k65ihyQLAACgMIo62UpD0iUOSRYAAEBhlUSylZZsCl5ljNa4HYcXIckCAABwR0klW2kTW7bUVtXUnnM7DrfxJf7P9WcTv+F2HAAAAOWsJJOt5c41B15QKNvgdhyFhFEsAAAA7yj5ZGu5c02tiwpTKtyOwwlIsAAAALyprJKt5aabgwlKqd/tOOxAggUAAOB9ZZtsrZRsDnJGKXU7jly0xaVf3P78sR+4HQcAAACIQ7KVxXRj4NNUZe91q39d40/XTSbe51b/AAAAIAeSLZN+qijVDQ17PsxUdb/dtjjX+kmKf7c+efx7MmIDAAAA7/n/gjiqZ0C7ZiIAAAAASUVORK5CYII=';
const LOGO='data:image/png;base64,'+LOGO_B64;
/* SPK → .xlsx — fixed 17-col layout matching renderSheet() */
function buildSpkXlsx(ExcelJS,spk,ctx){
 const wb=new ExcelJS.Workbook();wb.creator='MNI Gudang & Logistik';
 const ws=wb.addWorksheet('SPK '+spk.no,{pageSetup:{paperSize:9,orientation:'landscape',fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:0.2,right:0.2,top:0.3,bottom:0.3,header:0.2,footer:0.2}},views:[{showGridLines:false}]});
 // Fixed columns (0-based):
 // 0=No 1-3=Desc 4=QTY 5=Satuan 6=Brt/pcs 7=Brt/item 8=ProdSelesai 9=KirimVendor 10=BalikVendor 11=TerkirimCust 12=BlmProd 13=DiVendor 14=BlmKirim 15=PctProd 16=PctFin 17=PctKirim 18=Ket
 const cNo=0,cDesc=1,cQty=4,cSat=5,cBrp=6,cBri=7,cProd=8,cVkir=9,cVbal=10,cCust=11,cBP=12,cDV=13,cBK=14,cPP=15,cPF=16,cPK=17,cKet=18,last=18;
 const L=i=>{let s='';i++;while(i>0){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};
 // Column widths
 [10.9,18,12,12,10.3,9,9.3,9.4,12,11,15,13,13,11,11,10,10,10,28].forEach((w,i)=>ws.getColumn(i+1).width=w);
 [30,15,15,15,28.5,21.75,18.75,18.6,21,21].forEach((h,i)=>ws.getRow(i+1).height=h);
 const C=(r,c)=>ws.getCell(r,c+1);
 const thin={style:'thin',color:{argb:'FF000000'}};const box={top:thin,left:thin,bottom:thin,right:thin};
 const fill=a=>({type:'pattern',pattern:'solid',fgColor:{argb:a}});
 const GREEN='FF92D050',YEL='FFFFFF00',GREY='FFDBDBDB',BLUE='FFDDEBF7';
 const font=(o={})=>({name:o.mt?'Arial MT':'Arial',size:o.sz||10.5,bold:!!o.b,italic:!!o.i,color:{argb:o.c||'FF000000'}});
 const merge=(r1,c1,r2,c2)=>ws.mergeCells(r1,c1+1,r2,c2+1);
 const set=(r,c,v,st={})=>{const x=C(r,c);x.value=v;x.font=font(st);x.alignment={horizontal:st.h||'center',vertical:st.v||'middle',wrapText:st.wrap!==false};if(st.fill)x.fill=fill(st.fill);if(st.nf)x.numFmt=st.nf;if(st.border!==false)x.border=box;return x};
 const boxRange=(r1,c1,r2,c2,st={})=>{for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++){const x=C(r,c);x.border=box;if(st.fill)x.fill=fill(st.fill)}};
 // ── Header rows 1-4 ──
 merge(1,0,1,last);set(1,0,'PT. MITRA NUSA INTERNASIONAL',{sz:20,b:true,border:false});C(1,0).font={name:'Times New Roman',size:20,bold:true};
 merge(2,0,2,last);set(2,0,'Ruko Gravitas B2 No.1, Lavon, Wana Kerta',{mt:true,border:false,v:'top'});
 merge(3,0,3,last);set(3,0,'Kec. Sindang Jaya, Kab. Tangerang',{mt:true,border:false,v:'top'});
 if(ctx.logoB64){const id=wb.addImage({base64:ctx.logoB64,extension:'png'});ws.addImage(id,{tl:{col:0.05,row:0.05},ext:{width:250,height:66}})}
 // ── SPK title block rows 5-8 ──
 merge(5,0,8,1);set(5,0,'SURAT PERINTAH KERJA (SPK)',{sz:14,b:true});
 merge(5,2,8,7);set(5,2,`SPK ${spk.no}${spk.rev?` Rev.${spk.rev}`:''}`,{sz:26,b:true,fill:GREEN});boxRange(5,2,8,7,{fill:GREEN});
 const hl=8;merge(5,hl,5,last);set(5,hl,'WORKSHOP MNI',{sz:12.5,b:true});
 [['Nomor',': '+spk.nomor],['Tanggal',': '+ctx.tglLong],['Sales',': '+(spk.sales||'')]].forEach(([k,v],i)=>{set(6+i,hl,k,{mt:true,h:'left',border:false});merge(6+i,hl+1,6+i,last);set(6+i,hl+1,v,{mt:true,h:'left',border:false})});
 for(let c=hl;c<=last;c++){const x=C(8,c);x.border={...(x.border||{}),bottom:thin}}
 for(let rr=5;rr<=8;rr++){C(rr,hl).border={...(C(rr,hl).border||{}),left:thin};C(rr,last).border={...(C(rr,last).border||{}),right:thin}}
 // ── Row 9: Halaman / Lead time ──
 merge(9,0,9,1);set(9,0,'Halaman 1 dari 1',{mt:true,sz:10});merge(9,2,9,7);set(9,2,'',{});merge(9,hl,9,last);set(9,hl,'LEAD TIME : '+(spk.lead||'-'),{mt:true,b:true,h:'left'});
 // ── Row 10: Customer ──
 merge(10,0,10,5);set(10,0,`${spk.customer}${spk.po?' - '+spk.po:''}`,{sz:12.5,b:true,i:true,fill:YEL});
 for(let c=6;c<=last;c++){C(10,c).fill=fill(YEL);C(10,c).border={top:thin,bottom:thin}}C(10,last).border=box;
 // ── Rows 11-12: Table header ──
 merge(11,cNo,12,cNo);set(11,cNo,'No',{b:true,fill:GREY});
 merge(11,cDesc,11,cDesc+2);set(11,cDesc,'DESCRIPTION',{b:true,fill:GREY});
 merge(11,cQty,12,cQty);set(11,cQty,'QTY',{b:true,fill:GREY});
 merge(11,cSat,12,cSat);set(11,cSat,'Satuan',{b:true,fill:GREY});
 merge(11,cBrp,12,cBrp);set(11,cBrp,'Berat/pcs',{b:true,fill:GREY});
 merge(11,cBri,12,cBri);set(11,cBri,'Berat/item',{b:true,fill:GREY});
 merge(11,cProd,12,cProd);set(11,cProd,'Produksi\nSelesai',{b:true,fill:GREY});
 merge(11,cVkir,11,cVbal);set(11,cVkir,'Subcont / Vendor',{b:true,fill:YEL});
 set(12,cVkir,'Kirim',{b:true,fill:YEL});set(12,cVbal,'Balik',{b:true,fill:BLUE});
 merge(11,cCust,12,cCust);set(11,cCust,'Terkirim\nCustomer',{b:true,fill:GREY});
 merge(11,cBP,11,cBK);set(11,cBP,'KEKURANGAN',{b:true,fill:GREEN});
 set(12,cBP,'Blm Produksi',{b:true,fill:GREEN,sz:9});set(12,cDV,'Di Vendor',{b:true,fill:GREEN,sz:9});set(12,cBK,'Blm Kirim',{b:true,fill:GREEN,sz:9});
 merge(11,cPP,11,cPK);set(11,cPP,'PROGRESS ( % )',{b:true,fill:GREY});
 set(12,cPP,'Produksi',{b:true,fill:GREY,sz:9});set(12,cPF,'Finishing',{b:true,fill:GREY,sz:9});set(12,cPK,'Kirim',{b:true,fill:GREY,sz:9});
 merge(11,cKet,12,cKet);set(11,cKet,'Keterangan',{b:true,fill:GREY});
 // ── Section header in row 12 col desc ──
 const secs=[];for(const it of spk.items||[]){const g=it.g||'';if(!secs.length||secs[secs.length-1].h!==g)secs.push({h:g,lines:[]});secs[secs.length-1].lines.push(it)}
 if(secs[0]?.h){set(12,cDesc,secs[0].h,{b:true,fill:YEL,h:'left'});merge(12,cDesc,12,cDesc+2)}
 // Aggregate vendor/return/customer qty per item
 const vByItem={},rByItem={},cByItem={};
 ctx.vend.forEach(v=>Object.entries(v.map).forEach(([d,q])=>vByItem[d]=(vByItem[d]||0)+q));
 ctx.ret.forEach(v=>Object.entries(v.map).forEach(([d,q])=>rByItem[d]=(rByItem[d]||0)+q));
 ctx.cust.forEach(v=>Object.entries(v.map).forEach(([d,q])=>cByItem[d]=(cByItem[d]||0)+q));
 // ── Item rows starting at row 13 ──
 let r=13,no=0;const itemRows=[];
 secs.forEach((s,si)=>{
  if(si>0&&s.h){ws.getRow(r).height=21;merge(r,cDesc,r,cDesc+2);set(r,cDesc,s.h,{b:true,fill:YEL,h:'left'});for(let c=0;c<=last;c++){if(c<cDesc||c>cDesc+2)C(r,c).border=box}r++}
  s.lines.forEach(it=>{no++;ws.getRow(r).height=21;
   set(r,cNo,no,{b:true});merge(r,cDesc,r,cDesc+2);
   const xd=C(r,cDesc);xd.value=it.ket?{richText:[{text:it.d+' ',font:font({mt:true})},{text:'('+it.ket+')',font:font({mt:true,c:'FFFF0000'})}]}:it.d;xd.font=font({mt:true});xd.alignment={horizontal:'left',vertical:'middle',wrapText:true};xd.border=box;
   set(r,cQty,+it.q||0,{mt:true,nf:'0'});set(r,cSat,it.u||'');
   set(r,cBrp,+it.w||null,{mt:true,nf:'0.00'});
   set(r,cBri,{formula:`${L(cBrp)}${r}*${L(cQty)}${r}`},{mt:true,nf:'0.00'});
   const ln=(ctx.lines||{})[it.d]||{prodEff:0,kirim:0};const rj=(ctx.rej||{})[it.d]||0;
   const vS=vByItem[it.d]||0,rS=rByItem[it.d]||0,cS=cByItem[it.d]||0;
   const blmProd=Math.max(0,(+it.q||0)-ln.prodEff);
   const diVendor=Math.max(0,vS-rS-rj);
   const blmKirim=Math.max(0,(rS||ln.prodEff)-ln.kirim);
   const pP=+it.q?Math.min(1,ln.prodEff/(+it.q)):0;
   const pF=+it.q?Math.min(1,rS/(+it.q)):0;
   const pK=+it.q?Math.min(1,ln.kirim/(+it.q)):0;
   set(r,cProd,ln.prodEff||null,{mt:true,nf:'0'});
   set(r,cVkir,vS||null,{mt:true,nf:'0'});
   const balCell=C(r,cVbal);balCell.value=rS||null;balCell.numFmt='0';balCell.border=box;balCell.alignment={horizontal:'center',vertical:'middle'};
   if(vS>0&&rS<vS)balCell.fill=fill('FFFCE4D6');
   set(r,cCust,cS||null,{mt:true,nf:'0'});
   const bpC=C(r,cBP);bpC.value=blmProd||null;bpC.numFmt='0';bpC.border=box;bpC.alignment={horizontal:'center',vertical:'middle'};if(blmProd>0)bpC.fill=fill('FFFCE4D6');
   const dvC=C(r,cDV);dvC.value=vS>0?(diVendor||null):null;dvC.numFmt='0';dvC.border=box;dvC.alignment={horizontal:'center',vertical:'middle'};if(diVendor>0)dvC.fill=fill('FFFCE4D6');
   const bkC=C(r,cBK);bkC.value=blmKirim||null;bkC.numFmt='0';bkC.border=box;bkC.alignment={horizontal:'center',vertical:'middle'};if(blmKirim>0)bkC.fill=fill('FFFCE4D6');
   set(r,cPP,pP,{mt:true,nf:'0%'});set(r,cPF,vS>0?pF:null,{mt:true,nf:'0%'});set(r,cPK,pK,{mt:true,nf:'0%'});
   set(r,cKet,(it.catatan||'')+(rj?` (reject ${rj})`:''),{mt:true,h:'left'});
   itemRows.push(r);r++});
 });
 // ── Spacer + totals ──
 for(let c=0;c<=last;c++)C(r,c).border=box;r++;
 const f1=itemRows[0]||13,f2=itemRows[itemRows.length-1]||13;
 merge(r,cDesc,r,cDesc+2);set(r,cDesc,'Total',{mt:true,b:true});set(r,cNo,'',{});
 set(r,cQty,{formula:`SUM(${L(cQty)}${f1}:${L(cQty)}${f2})`},{mt:true,nf:'0'});set(r,cSat,'Btg/Pcs',{mt:true});
 set(r,cBrp,'',{});
 const totBri=C(r,cBri);totBri.value={formula:`SUM(${L(cBri)}${f1}:${L(cBri)}${f2})`};totBri.numFmt='0.00';totBri.border=box;totBri.alignment={horizontal:'center',vertical:'middle'};
 set(r,cProd,'Kg',{mt:true});
 for(let c=cVkir;c<=cBK;c++)set(r,c,'',{});
 set(r,cPP,{formula:`AVERAGE(${L(cPP)}${f1}:${L(cPP)}${f2})`},{mt:true,nf:'0%'});
 set(r,cPF,{formula:`AVERAGE(${L(cPF)}${f1}:${L(cPF)}${f2})`},{mt:true,nf:'0%'});
 set(r,cPK,{formula:`AVERAGE(${L(cPK)}${f1}:${L(cPK)}${f2})`},{mt:true,nf:'0%'});
 set(r,cKet,'',{});const tr=r;r+=2;
 // ── Footer: note, dist, signatures ──
 merge(r,0,r+1,5);set(r,0,spk.note||'',{b:true,i:true});boxRange(r,0,r+1,5);ws.getRow(r+1).height=35;
 const dc=Math.min(hl+1,last-3);
 merge(r,dc,r,dc+1);set(r,dc,'Distributed to:',{mt:true,border:false,h:'left',wrap:false});
 (spk.dist||[]).forEach((d,i)=>{const rr=r+i;merge(rr,dc+2,rr,last);set(rr,dc+2,'~ '+d,{mt:true,border:false,h:'left',wrap:false})});
 r+=Math.max(4,(spk.dist||[]).length)+1;
 set(r,1,'Procurement/Estimator',{b:true,border:false,h:'left'});set(r,9,'PPIC',{b:true,border:false,h:'left'});
 set(r+6,1,`( ${spk.signProc||''} )`,{b:true,border:false,h:'left',wrap:false});set(r+6,9,`( ${spk.signPpic||''} )`,{b:true,border:false,h:'left',wrap:false});
 if(spk.status==='Terbit'&&ctx.issued)set(r+7,1,ctx.issued,{sz:8,border:false,h:'left',c:'FF666666'});
 ws.pageSetup.printArea=`A1:${L(last)}${r+7}`;
 return wb;
}


/* ---------- SPK module: editor, document view, Excel ---------- */
const BLN_L=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const tglLong=s=>{if(!s)return '';const p=String(s).slice(0,10).split('-');return `${+p[2]} ${BLN_L[+p[1]-1]} ${p[0]}`};
const fdS=s=>{if(!s)return '';const p=String(s).slice(0,10).split('-');return `${p[2]}/${p[1]}/${p[0].slice(2)}`};
const leadMax=t=>{const m=String(t||'').match(/\d+/g);return m?Math.max(...m.map(Number)):0};
function addWorkdays(s,n){if(!s)return '';const d=new Date(s+'T00:00:00');let k=0;while(k<n){d.setDate(d.getDate()+1);const w=d.getDay();if(w!==0&&w!==6)k++}return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
const thkOf=h=>{const m=String(h||'').toUpperCase().match(/(\d+(?:[.,]\d+)?)\s*(?:MM\s*)?(ELECTRO|HOTDIP|HOT DIP|STAINLESS|POWDER|ALU|PDC|PAINT|NON|GALV)/);return m?m[1].replace(',','.'):''};
const KAT=()=>byId('master','katalog')||{berat:{},satuan:{},grup:[],customer:[],sales:[]};
function beratOf(d,h){const k=KAT().berat||{};const t=thkOf(h);if(k[d+'|'+t])return k[d+'|'+t];const tf=t?String(parseFloat(t)):'';for(const key in k){const[kd,kt]=key.split('|');if(kd===d&&kt&&parseFloat(kt)===parseFloat(tf))return k[key]}const fromCat=k[d+'|']||0;if(fromCat)return fromCat;return weightCalc(d,h)||0}
/* weightCalc: hitung berat per pcs dari dimensi produk berdasarkan template Excel
   Reference: REAL kg/pcs dari sheet SLU/SLW/SLHD/SLHDC/STC/STU (bj=7.85)
   Scaling: berat ∝ l (straight) dan ∝ t (semua tipe) */
function weightCalc(desc,sectionHeader){
 const D=String(desc||'').toUpperCase();const H=String(sectionHeader||'').toUpperCase();
 /* === parse fitment === */
 let fitment='STRAIGHT';
 if(/\bCROSS\b/.test(D))fitment='CROSS';
 else if(/\bTEE\b/.test(D))fitment='TEE';
 else if(/\bELBOW\b/.test(D))fitment='ELBOW';
 else if(/\bINSIDE\b/.test(D))fitment='INSIDE';
 else if(/\bOUTSIDE\b/.test(D))fitment='OUTSIDE';
 else if(/\bREDUCER\b/.test(D))fitment='REDUCER';
 else if(/\bJOINT(?:ING)?\b/.test(D))fitment='JOINTING';
 /* === parse product type === */
 let ptype='';
 if(/\bSLHDC\b/.test(D)||/\bSLHDC\b/.test(H))ptype='SLHDC';
 else if(/\bSLHD\b/.test(D)||/\bSLHD\b/.test(H))ptype='SLHD';
 else if(/\bSLW\b/.test(D)||/\bSLW\b/.test(H))ptype='SLW';
 else if(/\bSLU\b/.test(D)||/\bSLU\b/.test(H))ptype='SLU';
 else if(/\bSTU\b/.test(D)||/\bSTU\b/.test(H))ptype='STU';
 else if(/\bSTC\b/.test(D)||/\bSTC\b/.test(H))ptype='STC';
 else if(/CABLE LADDER/.test(D)||/CABLE LADDER/.test(H))ptype='SLU';
 else if(/PERFORATED CABLE TRAY/.test(D)||/PERFORATED CABLE TRAY/.test(H))ptype='STC';
 else if(/CABLE TRAY/.test(D)||/CABLE TRAY/.test(H))ptype='STU';
 if(!ptype)return 0;
 /* === reference table: [refKg, refL, refT] dari Excel REAL column === */
 const REF={
  SLU:  {STRAIGHT:[14.703,3000,1.8],ELBOW:[5.453,300,1.8],TEE:[10.743,300,1.8],CROSS:[16.725,300,1.8],INSIDE:[6.858,300,1.8],OUTSIDE:[6.858,300,1.8],REDUCER:[4.018,300,1.8],JOINTING:[0.341,300,1.8]},
  SLW:  {STRAIGHT:[31.638,3000,2.0],ELBOW:[4.911,300,2.0],TEE:[4.911,300,2.0],CROSS:[4.911,300,2.0],INSIDE:[4.911,300,2.0],OUTSIDE:[4.911,300,2.0],REDUCER:[4.911,300,2.0],JOINTING:[0.400,300,2.0]},
  SLHD: {STRAIGHT:[23.592,3000,2.0],ELBOW:[12.150,300,2.0],TEE:[8.964,300,2.0],CROSS:[11.467,300,2.0],INSIDE:[11.084,300,2.0],OUTSIDE:[8.839,300,2.0],REDUCER:[2.746,300,2.0],JOINTING:[0.453,300,2.0]},
  SLHDC:{STRAIGHT:[20.026,3000,1.8],ELBOW:[7.233,300,1.8],TEE:[9.957,300,1.8],CROSS:[12.584,300,1.8],INSIDE:[6.383,300,1.8],OUTSIDE:[6.383,300,1.8],REDUCER:[3.183,300,1.8],JOINTING:[0.203,300,1.8]},
  STC:  {STRAIGHT:[13.713,3000,1.8],ELBOW:[2.871,300,1.8],TEE:[4.446,300,1.8],CROSS:[6.230,300,1.8],INSIDE:[6.715,300,1.8],OUTSIDE:[6.579,300,1.8],REDUCER:[2.504,300,1.8],JOINTING:[0.341,300,1.8]},
  STU:  {STRAIGHT:[12.722,3000,1.8],ELBOW:[2.017,300,1.8],TEE:[3.800,300,1.8],CROSS:[8.179,300,1.8],INSIDE:[7.612,300,1.8],OUTSIDE:[11.624,300,1.8],REDUCER:[3.608,300,1.8],JOINTING:[0.321,300,1.8]}
 };
 const ref=REF[ptype]&&REF[ptype][fitment];if(!ref)return 0;
 const[refKg,refL,refT]=ref;
 /* === parse dimensi dari desc: W___xH___xL___ atau W___H___L___ === */
 let l=null,t=null;
 const lm=D.match(/L\s*[=x×]?\s*(\d+(?:[.,]\d+)?)/i)||D.match(/[×x]\s*(\d{3,4})\s*(?:MM|PCS|$)/i);
 if(lm)l=parseFloat(lm[1].replace(',','.'));
 /* thickness from section header */
 const th=thkOf(sectionHeader);if(th)t=parseFloat(th);
 /* scale: untuk STRAIGHT scale by l and t; untuk fitting hanya t */
 let kg=refKg;
 if(fitment==='STRAIGHT'&&l&&l>0)kg=kg*(l/refL);
 if(t&&t>0)kg=kg*(t/refT);
 return Math.round(kg*1000)/1000;
}
function derive(h){const H=String(h||'').toUpperCase();let fin='';if(H.includes('ELECTRO'))fin='ELG';else if(H.includes('HOTDIP')||H.includes('HOT DIP'))fin='HDG';else if(H.includes('POWDER')||H.includes('PDC'))fin='PDC';else if(H.includes('NON'))fin='Non Finishing';
 let base='SPHC';if(H.includes('STAINLESS')||/SS ?3\d\d/.test(H))base=H.includes('316')?'SS316':'SS304';else if(H.includes('ALU'))base='Aluminium';
 return {material:(base==='SPHC'&&fin)?`SPHC / ${fin}`:base,tebal:thkOf(h),type:(H.match(/TYPE\s+([A-Z]+)/)||[])[1]||''}}
const DIST_DEF=['PPIC','Produksi (CNC / Shearing / Bending / Punching Jointing / Punching Tray)','Procurement','Logistic'];
const HB={p:['CABLE TRAY','PERFORATED CABLE TRAY','CABLE LADDER','CABLE DUCT','COVER TRAY','ACCS TRAY','ACCS LADDER','ACCS DUCT','SUPPORT TRAY','WIREMESH CABLE TRAY'],t:['STU','STC','SLU','SLHD','SLW','C','U'],tb:['1.0','1.2','1.5','1.6','1.8','2.0','2.5','3.0'],f:['ELECTRO GALVANIZED','HOTDIP GALVANIZED','STAINLESS STEEL 304','STAINLESS STEEL 316L','POWDER COATING WHITE','POWDER COATING ORANGE RAL 2000','POWDER COATING BLUE RAL 5017','ALUMINIUM 1100','NON FINISHING']};
function parseH(h){const H=String(h||'').toUpperCase();const o={p:'',t:'',tb:'',f:''};o.p=[...HB.p].sort((a,b)=>b.length-a.length).find(x=>H.startsWith(x))||'';o.t=(H.match(/TYPE\s+([A-Z]+)/)||[])[1]||'';const tk=thkOf(H);o.tb=HB.tb.find(x=>parseFloat(x)===parseFloat(tk))||'';o.f=HB.f.find(x=>H.endsWith(x))||'';return o}
const composeH=o=>[o.p,o.t?'TYPE '+o.t:'',o.tb,o.f].filter(Boolean).join(' ');
const accsOf=h=>String(h||'').replace(/^PERFORATED CABLE TRAY|^CABLE TRAY|^COVER TRAY/,'ACCS TRAY').replace(/^CABLE LADDER/,'ACCS LADDER').replace(/^CABLE DUCT/,'ACCS DUCT');
const nextNo=()=>Math.max(0,...S.spk.map(s=>+s.no||0))+1;
const blankLine=()=>({d:'',q:'',u:'Btg',w:'',ket:'',catatan:'',prod:0});
const HOLDER='tab-'+Math.random().toString(36).slice(2,10);
function secsOf(s){const secs=[];for(const it of s.items||[]){const g=it.g||'';if(!secs.length||secs[secs.length-1].h!==g)secs.push({h:g,lines:[]});secs[secs.length-1].lines.push(it)}return secs}

/* ----- editor ----- */
let ED=null,EDT=null,EDDIRTY=false;
function newEd(){const no=nextNo();return {id:null,no,tgl:today(),sales:'',customer:'',po:'',lead:'5 Hari Kerja',due:'',dueAuto:true,material:'',tebal:'',type:'',matAuto:true,note:'',noteAuto:true,dist:DIST_DEF.slice(),signProc:'Halimah',signPpic:'Muin M.K.',status:'Draft',rev:0,revAlasan:'',orig:null,sections:[{h:'CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED',lines:[blankLine(),blankLine(),blankLine()]}]}}
function edFrom(s,copy){const secs=secsOf(s).map(x=>({h:x.h,lines:x.lines.map(it=>({d:it.d,q:it.q,u:it.u||'Pcs',w:+it.w||'',ket:it.ket||'',catatan:it.catatan||'',prod:copy?0:(+it.prod||0)}))}));
 if(!secs.length)secs.push({h:'',lines:[blankLine()]});
 return {id:copy?null:s._id,no:copy?nextNo():s.no,tgl:copy?today():s.tgl,sales:s.sales||'',customer:copy?'':s.customer||'',po:copy?'':(s.po||''),lead:s.lead||'',due:copy?'':(s.due||''),dueAuto:copy||!s.due,material:s.material||'',tebal:s.tebal||'',type:s.type||'',matAuto:!s.material,note:copy?'':(s.note||''),noteAuto:copy||!s.note,dist:(s.dist||DIST_DEF).slice(),signProc:s.signProc||'Halimah',signPpic:s.signPpic||'Muin M.K.',status:copy?'Draft':(s.status||'Terbit'),rev:copy?0:(s.rev||0),revAlasan:'',orig:copy?null:s,sections:secs}}
function edAuto(){const e=ED;if(e.dueAuto&&leadMax(e.lead))e.due=addWorkdays(e.tgl,leadMax(e.lead));if(e.noteAuto)e.note=e.due?'NOTE : ESTIMASI KIRIM '+tglLong(e.due).toUpperCase():'';
 if(e.matAuto){const h=(e.sections.find(s=>s.h)||{}).h;if(h){const d=derive(h);e.material=d.material;e.tebal=d.tebal;e.type=[...new Set(e.sections.map(s=>derive(s.h).type).filter(Boolean))].join(' & ')}}}
async function openEditor(ed){
 if(!DB){toast('Database belum tersambung.');return}if(!CAN){toast('Akses Anda lihat saja.');return}try{guard('spk',null,null,'upd')}catch(x){toast(x.message);return}
 if(ed.id){try{const r=await DB.doc('lock/'+ed.id).acquire({holder:ME||HOLDER,ttlMs:90000});if(r&&r.acquired===false){const t=r.expiresAt?new Date(r.expiresAt).toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}):'';toast(`SPK ${ed.no} sedang diedit pengguna lain${t?' (kunci lepas '+t+')':''}.`);return}
  clearInterval(EDT);EDT=setInterval(()=>DB.doc('lock/'+ed.id).acquire({holder:ME||HOLDER,ttlMs:90000}).catch(()=>{}),45000)}catch(e){}}
 ED=ed;EDDIRTY=false;edAuto();closeDrawer();closeSheet();renderEditor();$('#editor').hidden=false;document.body.style.overflow='hidden';
}
function closeEditor(){clearInterval(EDT);ED=null;$('#editor').hidden=true;$('#editor').innerHTML='';document.body.style.overflow=''}
const opt=(arr,sel,ph)=>`<option value="">${ph}</option>`+arr.map(x=>`<option ${x===sel?'selected':''}>${esc(x)}</option>`).join('');
function edSecHtml(s,si,startNo){
 const hb=parseH(s.h);let no=startNo;
 const rows=s.lines.map((l,li)=>{no++;const bi=(+l.q||0)*(+l.w||0);return `<tr data-s="${si}" data-l="${li}"><td class="c-no">${no}</td>
  <td class="c-d"><input class="inp" data-f="d" value="${esc(l.d)}" list="dl-desc" placeholder="Cable Tray W100xH50xL3000 mm" id="ed-d-${si}-${li}" autocomplete="off"></td>
  <td class="c-ket"><input class="inp red" data-f="ket" value="${esc(l.ket)}" placeholder="opsional" id="ed-k-${si}-${li}"></td>
  <td class="c-q"><input class="inp num" data-f="q" type="number" min="0" step="any" value="${esc(l.q)}" id="ed-q-${si}-${li}" inputmode="decimal"></td>
  <td class="c-u"><input class="inp" data-f="u" value="${esc(l.u)}" list="dl-sat" id="ed-u-${si}-${li}"></td>
  <td class="c-w"><input class="inp num" data-f="w" type="number" min="0" step="any" value="${esc(l.w)}" id="ed-w-${si}-${li}" inputmode="decimal"></td>
  <td class="c-bi num" data-bi>${bi?n(bi):'–'}</td>
  <td class="c-cat"><input class="inp" data-f="catatan" value="${esc(l.catatan)}" id="ed-c-${si}-${li}"></td>
  <td><button type="button" class="ibtn" data-act="ed-delline" data-s="${si}" data-l="${li}" aria-label="Hapus baris">×</button></td></tr>`}).join('');
 return `<div class="esec"><div class="esec-h"><span class="esec-tag">Section ${si+1}</span>
  <select class="sel" data-hb="p" data-s="${si}" id="ed-hp-${si}">${opt(HB.p,hb.p,'Produk')}</select><select class="sel" data-hb="t" data-s="${si}" id="ed-ht-${si}">${opt(HB.t,hb.t,'Type')}</select><select class="sel" data-hb="tb" data-s="${si}" id="ed-htb-${si}">${opt(HB.tb,hb.tb,'Tebal')}</select><select class="sel" data-hb="f" data-s="${si}" id="ed-hf-${si}">${opt(HB.f,hb.f,'Finishing')}</select>
  <span class="esec-acts"><button type="button" class="ibtn" data-act="ed-up" data-s="${si}" aria-label="Naikkan" ${si?'':'disabled'}>↑</button><button type="button" class="ibtn" data-act="ed-down" data-s="${si}" aria-label="Turunkan" ${si<ED.sections.length-1?'':'disabled'}>↓</button><button type="button" class="ibtn" data-act="ed-delsec" data-s="${si}" aria-label="Hapus section" ${ED.sections.length>1?'':'disabled'}>×</button></span>
  <input class="inp esec-title" data-sf="h" data-s="${si}" value="${esc(s.h)}" list="dl-grup" placeholder="JUDUL SECTION, mis. CABLE TRAY TYPE STU 1.5 ELECTRO GALVANIZED" id="ed-h-${si}"></div>
  <div class="tbl-wrap"><table class="edt"><thead><tr><th>No</th><th>Description</th><th>Catatan merah</th><th class="num">Qty</th><th>Satuan</th><th class="num">Berat/pcs</th><th class="num">Berat/item</th><th>Keterangan</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
  <button type="button" class="btn sm ghost" data-act="ed-addline" data-s="${si}">${ic('plus')}Baris</button></div>`;
}
function edTotals(){let q=0,w=0,c=0;ED.sections.forEach(s=>s.lines.forEach(l=>{if(String(l.d).trim()){c++;q+= +l.q||0;w+=(+l.q||0)*(+l.w||0)}}));return {q,w,c}}
function renderTotals(){const t=edTotals();const el=$('#ed-tot');if(el)el.innerHTML=`<b>${t.c}</b> item · Total <b>${n(t.q)}</b> Btg/Pcs · <b>${n(Math.round(t.w*100)/100)}</b> Kg${t.w>=1000?` <span class="muted">(${ton(t.w)} ton)</span>`:t.w>0?` <span class="muted">(${n(Math.round(t.w/100)/10)} ton)</span>`:''}`}
function renderEditor(){
 const e=ED,k=KAT();const editTerbit=e.id&&e.orig&&(e.orig.status||'Terbit')==='Terbit';
 let no=0;const secs=e.sections.map((s,i)=>{const h=edSecHtml(s,i,no);no+=s.lines.length;return h}).join('');
 const distAll=[...new Set([...DIST_DEF,...e.dist])];
 $('#editor').innerHTML=`<div class="ed"><header class="ed-top"><div class="ed-ttl"><h3>${e.id?`Edit SPK ${e.no}`:'SPK baru'} ${e.rev?`<span class="chip info plain">Rev.${e.rev}</span>`:''} ${stChip(e.status)}</h3><p>${e.id?'Dikunci untuk Anda selama editor terbuka, pengguna lain tidak bisa mengedit bersamaan.':'Format mengikuti lembar SPK Workshop MNI. Nomor SPK diklaim saat disimpan.'}</p></div>
  <div class="ed-btns"><button type="button" class="btn ghost" data-act="ed-close">Batal</button>${e.status==='Draft'?`<button type="button" class="btn" data-act="ed-save" data-mode="draft">Simpan draft</button>`:''}<button type="button" class="btn primary" data-act="ed-save" data-mode="terbit">${ic('chk')}${e.status==='Draft'?'Terbitkan SPK':'Simpan revisi'}</button></div></header>
  <div class="ed-body">
  ${editTerbit?`<div class="ro">SPK ini sudah terbit. Menyimpan perubahan akan membuat <b>Rev.${(e.orig.rev||0)+1}</b>. <label class="fld" style="margin-top:8px"><span>Alasan revisi</span><input class="inp" data-h="revAlasan" id="ed-rev" value="${esc(e.revAlasan)}" placeholder="mis. tambah qty jointing sesuai PO revisi"></label></div>`:''}
  <section class="ecard"><h4>Header SPK</h4><div class="egrid">
   <label class="fld"><span>No SPK</span><input class="inp" data-h="no" type="number" id="ed-no" value="${esc(e.no)}" ${e.id&&e.status!=='Draft'?'disabled':''}></label>
   <label class="fld"><span>Nomor dokumen</span><input class="inp" id="ed-nomor" value="${esc(`${e.no}/SPK/${String(e.tgl).slice(0,4)}/WS`)}" disabled></label>
   <label class="fld"><span>Tanggal</span><input class="inp" type="date" data-h="tgl" id="ed-tgl" value="${esc(e.tgl)}"></label>
   <label class="fld"><span>Sales</span><input class="inp" data-h="sales" id="ed-sales" value="${esc(e.sales)}" list="dl-sales2" placeholder="Ibu Auliah"></label>
   <label class="fld span2"><span>Customer</span><input class="inp" data-h="customer" id="ed-cust" value="${esc(e.customer)}" list="dl-cust" placeholder="PT CAKRA NUSANTARA ALAMRAYA"></label>
   <label class="fld"><span>No PO / SO</span><input class="inp" data-h="po" id="ed-po" value="${esc(e.po)}" placeholder="SO-02178"></label>
   <label class="fld"><span>Lead time</span><input class="inp" data-h="lead" id="ed-lead" value="${esc(e.lead)}" list="dl-lead" placeholder="3 Hari Kerja"></label>
   <label class="fld"><span>Estimasi kirim ${e.dueAuto?'<em class="auto">otomatis</em>':''}</span><input class="inp" type="date" data-h="due" id="ed-due" value="${esc(e.due)}"></label>
   <label class="fld"><span>Material / finishing ${e.matAuto?'<em class="auto">otomatis</em>':''}</span><input class="inp" data-h="material" id="ed-mat" value="${esc(e.material)}"></label>
   <label class="fld"><span>Tebal</span><input class="inp" data-h="tebal" id="ed-tebal" value="${esc(e.tebal)}"></label>
   <label class="fld"><span>Type</span><input class="inp" data-h="type" id="ed-type" value="${esc(e.type)}"></label>
  </div><p class="note">Estimasi kirim dihitung dari tanggal + lead time hari kerja (Senin–Jumat). Ubah manual bila perlu.</p></section>
  <section class="ecard"><div class="ecard-h"><h4>Item pekerjaan</h4><span class="note">Tips: copy baris dari Excel SPK lama (kolom No/Description/Qty/Satuan/Berat) lalu paste di kolom Description. Judul section kuning ikut terbaca. Pilihan Description, satuan, dan berat diambil dari <button type="button" class="linkbtn" data-act="katgo">Master Data › Item SPK</button>.</span></div>
   <div id="ed-secs" class="esecs">${secs}</div>
   <div class="ed-add"><button type="button" class="btn sm" data-act="ed-addsec">${ic('plus')}Section</button><button type="button" class="btn sm" data-act="ed-addacc">${ic('plus')}Section ACCS</button></div></section>
  <section class="ecard"><h4>Catatan &amp; distribusi</h4><div class="egrid">
   <label class="fld span2"><span>Note ${e.noteAuto?'<em class="auto">otomatis</em>':''}</span><input class="inp" data-h="note" id="ed-note" value="${esc(e.note)}"></label>
   <label class="fld"><span>Procurement / Estimator</span><input class="inp" data-h="signProc" id="ed-sp" value="${esc(e.signProc)}"></label>
   <label class="fld"><span>PPIC</span><input class="inp" data-h="signPpic" id="ed-spp" value="${esc(e.signPpic)}"></label>
   <div class="fld span4"><span>Distributed to</span><div class="dist">${distAll.map((d,i)=>`<label class="ck"><input type="checkbox" data-dist="${esc(d)}" id="ed-dist-${i}" ${e.dist.includes(d)?'checked':''}> ${esc(d)}</label>`).join('')}<input class="inp" id="ed-distnew" placeholder="+ tambah bagian, Enter"></div></div>
  </div></section>
  </div>
  <footer class="ed-foot"><span id="ed-tot"></span><span class="err" id="ed-err"></span></footer></div>
  <datalist id="dl-desc">${katIndex().arr.map(x=>`<option value="${esc(x.d)}" label="${esc([x.u,Object.entries(x.w).map(([t,v])=>(t==='–'?'':t+'mm ')+v+'kg').join(', ')].filter(Boolean).join(' · '))}">`).join('')}</datalist>
  <datalist id="dl-grup">${(k.grup||[]).map(d=>`<option value="${esc(d)}">`).join('')}</datalist>
  <datalist id="dl-cust">${[...new Set([...(k.customer||[]),...S.spk.map(s=>s.customer)])].sort().map(d=>`<option value="${esc(d)}">`).join('')}</datalist>
  <datalist id="dl-sales2">${[...new Set([...(k.sales||[]),...S.spk.map(s=>s.sales).filter(Boolean)])].sort().map(d=>`<option value="${esc(d)}">`).join('')}</datalist>
  <datalist id="dl-sat">${satList().map(d=>`<option value="${esc(d)}">`).join('')}</datalist>
  <datalist id="dl-lead">${['2 Hari Kerja','3 Hari Kerja','5 Hari Kerja','5 - 7 Hari Kerja','7 Hari Kerja','7 - 10 Hari Kerja','10 Hari Kerja','14 Hari Kerja'].map(d=>`<option value="${d}">`).join('')}</datalist>`;
 renderTotals();
}
function rerenderSecs(){let no=0;$('#ed-secs').innerHTML=ED.sections.map((s,i)=>{const h=edSecHtml(s,i,no);no+=s.lines.length;return h}).join('');renderTotals()}
function edSyncHeader(){const e=ED;const set=(id,v)=>{const x=$('#'+id);if(x&&document.activeElement!==x)x.value=v};set('ed-due',e.due);set('ed-note',e.note);set('ed-mat',e.material);set('ed-tebal',e.tebal);set('ed-type',e.type);set('ed-nomor',`${e.no}/SPK/${String(e.tgl).slice(0,4)}/WS`)}
function parsePaste(txt,curH){
 const out=[];let sec=null;const num=v=>{const x=parseFloat(String(v).replace(/\./g,'').replace(',','.'));return isNaN(x)?null:x};
 const numDot=v=>{const s=String(v).trim();if(/^\d+([.,]\d+)?$/.test(s))return parseFloat(s.replace(',','.'));return num(s)};
 for(const raw of txt.split(/\r?\n/)){if(!raw.trim())continue;let c=raw.split('\t').map(x=>x.trim());
  if(c.length>1&&/^\d+$/.test(c[0])&&c[1]&&numDot(c[1])===null)c=c.slice(1);else if(c.length>1&&c[0]===''&&c[1])c=c.slice(1);
  const rest=c.slice(1).filter(x=>x!=='');const d=c[0];if(!d)continue;
  if(!rest.length&&d===d.toUpperCase()&&/[A-Z]{3}/.test(d)){if(/^total$/i.test(d))continue;sec={h:d,lines:[]};out.push(sec);continue}
  if(/^total$/i.test(d))continue;
  let q=numDot(rest[0]),u=rest[1]||'',w=rest[2]!==undefined?numDot(rest[2]):null;if(u&&numDot(u)!==null){w=numDot(u);u=''}
  if(!sec){sec={h:curH,lines:[],cont:true};out.push(sec)}
  const h=sec.h;sec.lines.push({d,q:q??'',u:u||(KAT().satuan||{})[d]||'Pcs',w:w||beratOf(d,h)||weightCalc(d,h)||'',ket:'',catatan:'',prod:0})}
 return out;
}
function edInput(e){
 const t=e.target;if(!ED)return;
 if(t.dataset.h){const k=t.dataset.h;let v=t.value;if(k==='no')v=parseInt(v)||'';ED[k]=v;EDDIRTY=true;
  if(k==='due')ED.dueAuto=false;if(k==='note')ED.noteAuto=false;if(['material','tebal','type'].includes(k))ED.matAuto=false;
  if(['tgl','lead','due','no'].includes(k)){edAuto();edSyncHeader()}return}
 if(t.dataset.sf==='h'){const si=+t.dataset.s;ED.sections[si].h=t.value;EDDIRTY=true;edAuto();edSyncHeader();
  if(e.type==='change'){const hb=parseH(t.value);['p','t','tb','f'].forEach(k=>{const s=$(`#ed-h${k}-${si}`);if(s)s.value=hb[k]})}return}
 if(t.dataset.hb){const si=+t.dataset.s;const hb=parseH(ED.sections[si].h);hb[t.dataset.hb]=t.value;ED.sections[si].h=composeH(hb);$('#ed-h-'+si).value=ED.sections[si].h;EDDIRTY=true;edAuto();edSyncHeader();return}
 if(t.dataset.dist!==undefined){const d=t.dataset.dist;ED.dist=t.checked?[...new Set([...ED.dist,d])]:ED.dist.filter(x=>x!==d);EDDIRTY=true;return}
 const tr=t.closest('tr[data-s]');if(!tr||!t.dataset.f)return;
 const si=+tr.dataset.s,li=+tr.dataset.l,f=t.dataset.f,L=ED.sections[si].lines[li];L[f]=t.value;EDDIRTY=true;
 if(f==='d'&&e.type==='change'){const k=KAT();if(!L.w){const w=beratOf(L.d,ED.sections[si].h);if(w){L.w=w;tr.querySelector('[data-f=w]').value=w}}if(k.satuan&&k.satuan[L.d]){L.u=k.satuan[L.d];tr.querySelector('[data-f=u]').value=L.u}/* fallback: fill satuan & berat from SPK history if not in master katalog */if(!L.u||!L.w){const hi=katIndex().arr.find(x=>x.d===L.d);if(hi){if(!L.u&&hi.u){L.u=hi.u;const uf=tr.querySelector('[data-f=u]');if(uf)uf.value=hi.u}if(!L.w&&hi.w&&hi.w['–']){L.w=hi.w['–'];const wf=tr.querySelector('[data-f=w]');if(wf)wf.value=hi.w['–']}}}/* final fallback: hitung dari formula Excel weightCalc */if(!L.w){const wc=weightCalc(L.d,ED.sections[si].h);if(wc){L.w=wc;const wf=tr.querySelector('[data-f=w]');if(wf)wf.value=wc}}}
 const bi=(+L.q||0)*(+L.w||0);tr.querySelector('[data-bi]').textContent=bi?n(bi):'–';renderTotals();
 if(li===ED.sections[si].lines.length-1&&f==='d'&&t.value&&e.type==='input'&&!tr.nextElementSibling){ED.sections[si].lines.push(blankLine());const id=t.id;const pos=t.selectionStart;rerenderSecs();const x=$('#'+id);if(x){x.focus();try{x.setSelectionRange(pos,pos)}catch(_){}}}
}
function edPaste(e){
 const t=e.target;if(!ED||t.dataset.f!=='d')return;const txt=(e.clipboardData||window.clipboardData).getData('text');if(!txt||(!txt.includes('\t')&&!txt.includes('\n')))return;
 e.preventDefault();const tr=t.closest('tr[data-s]');const si=+tr.dataset.s,li=+tr.dataset.l;const secs=parsePaste(txt,ED.sections[si].h);if(!secs.length)return;
 const cur=ED.sections[si];const before=cur.lines.slice(0,li).filter(l=>String(l.d).trim()),after=cur.lines.slice(li+1).filter(l=>String(l.d).trim());
 const first=secs[0];const rest=secs.slice(1);
 if(first.cont||first.h===cur.h){cur.lines=[...before,...first.lines]}else{cur.lines=before.length?before:[];if(!before.length&&!cur.lines.length){cur.h=first.h;cur.lines=first.lines}else rest.unshift(first)}
 if(!cur.lines.length)cur.lines=[blankLine()];
 const ins=rest.map(s=>({h:s.h,lines:s.lines.length?s.lines:[blankLine()]}));
 if(ins.length){ins[ins.length-1].lines.push(...after,blankLine())}else cur.lines.push(...after,blankLine());
 ED.sections.splice(si+1,0,...ins);EDDIRTY=true;edAuto();edSyncHeader();rerenderSecs();
 const cnt=secs.reduce((a,s)=>a+s.lines.length,0);toast(`${cnt} baris ditempel${ins.length?` · ${ins.length} section baru`:''}`);
}
async function learnKatalog(items,e){
 const k=KAT();const berat={},satuan={};
 for(const it of items){if(+it.w>0){const key=it.d+'|'+thkOf(it.g);if((k.berat||{})[key]!==+it.w)berat[key]=+it.w}if(it.u&&(k.satuan||{})[it.d]!==it.u)satuan[it.d]=it.u}
 const up={};if(Object.keys(berat).length)up.berat=berat;if(Object.keys(satuan).length)up.satuan=satuan;
 const g=[...new Set(items.map(i=>i.g).filter(Boolean))].filter(x=>!(k.grup||[]).includes(x));if(g.length)up.grup=[...g,...(k.grup||[])].slice(0,250);
 if(e.customer&&!(k.customer||[]).includes(e.customer))up.customer=[...(k.customer||[]),e.customer].sort();
 if(e.sales&&!(k.sales||[]).includes(e.sales))up.sales=[...(k.sales||[]),e.sales].sort();
 if(!Object.keys(up).length)return;
 try{if(byId('master','katalog'))await DB.doc('master/katalog').update(up);else await DB.doc('master/katalog').set({berat:{},satuan:{},grup:[],customer:[],sales:[],...up})}catch(_){}
}
async function saveEditor(mode){
 const e=ED,err=$('#ed-err');err.textContent='';
 try{need('spk');
  const no=parseInt(e.no);if(!no)throw new Error('Isi No SPK.');if(!String(e.customer).trim())throw new Error('Isi nama customer.');e.customer=cleanName(e.customer);{const sim=similarTo('customer',e.customer);if(sim){e.customer=sim.nama;const ci=$('#ed-cust');if(ci)ci.value=sim.nama;throw new Error(`Customer disamakan ke "${sim.nama}" (sudah terdaftar). Klik simpan lagi.`)}}if(!e.tgl)throw new Error('Isi tanggal SPK.');
  const items=[];for(const s of e.sections)for(const l of s.lines){if(!String(l.d).trim())continue;const q=num0(l.q);if(q<=0)throw new Error(`Qty untuk "${l.d}" belum diisi.`);items.push({d:String(l.d).trim(),g:String(s.h||'').trim(),q,u:String(l.u||'Pcs').trim(),w:num0(l.w),ket:String(l.ket||'').trim(),catatan:String(l.catatan||'').trim(),prod:Math.min(q,+l.prod||0)})}
  if(!items.length)throw new Error('Tambahkan minimal satu item.');
  const editTerbit=e.id&&e.orig&&(e.orig.status||'Terbit')==='Terbit';
  if(editTerbit&&!String(e.revAlasan).trim())throw new Error('Isi alasan revisi.');
  const status=mode==='terbit'?'Terbit':'Draft';const now=new Date().toISOString();
  const data={no,nomor:`${no}/SPK/${String(e.tgl).slice(0,4)}/WS`,tgl:e.tgl,customer:String(e.customer).trim(),po:String(e.po||'').trim(),sales:String(e.sales||'').trim(),lead:String(e.lead||'').trim(),due:e.due||'',material:e.material||'',tebal:e.tebal||'',type:e.type||'',note:e.note||'',dist:e.dist,signProc:e.signProc||'',signPpic:e.signPpic||'',items,status};
  const btns=document.querySelectorAll('#editor [data-act=ed-save]');btns.forEach(b=>b.disabled=true);
  try{
   if(!e.id||(e.orig&&e.orig.no!==no)){
    const id='spk-'+no;
    try{const r=await DB.doc('lock/new-'+no).acquire({holder:ME||HOLDER,ttlMs:20000});if(r&&r.acquired===false)throw new Error(`Nomor ${no} sedang diklaim pengguna lain. Pakai nomor ${nextNo()+1}.`)}catch(x){if(x.message&&x.message.startsWith('Nomor'))throw x}
    const ex=await DB.doc('spk/'+id).get();if(ex.exists)throw new Error(`SPK ${no} sudah dipakai. Nomor berikutnya yang kosong: ${nextNo()}.`);
    Object.assign(data,{alasan:'',rev:0,revisi:[],at:now,by:ME||null},status==='Terbit'?{terbitAt:now,terbitBy:ME||null}:{});
    await DB.doc('spk/'+id).set(data);logAct('spk',id,'add',data);
    if(e.id&&e.orig&&e.orig.no!==no){await DB.doc('spk/'+e.id).delete()}
    e.id=id;
   }else{
    const o=e.orig||{};const up={...data,updAt:now,updBy:ME||null};
    if(editTerbit){up.rev=(o.rev||0)+1;up.revisi=[...(o.revisi||[]),{rev:up.rev,at:now,by:ME||null,alasan:String(e.revAlasan).trim()}];up.status='Terbit'}
    else if(status==='Terbit'){up.terbitAt=now;up.terbitBy=ME||null}
    await DB.doc('spk/'+e.id).update(up);logAct('spk',e.id,'upd',up);
   }
  }finally{btns.forEach(b=>b.disabled=false)}
  learnKatalog(items,e);if(!inMaster('customer',data.customer))addDoc('mcustomer',{nama:data.customer,pic:'',telp:'',alamat:'',aktif:true}).catch(()=>{});
  const id=e.id;closeEditor();toast(status==='Terbit'?(editTerbit?`SPK ${no} Rev.${(e.orig.rev||0)+1} tersimpan · tim langsung melihat`:`SPK ${no} terbit · tim langsung melihat`):`Draft SPK ${no} tersimpan`);
  setTimeout(()=>openSheet(id),60);
 }catch(x){err.textContent=x.message||('Gagal menyimpan ('+(x.code||'error')+')')}
}

/* ----- document (sheet) view ----- */
let SHEET=null;
const spkFull=s=>({...s,note:s.note||(s.due?'NOTE : ESTIMASI KIRIM '+tglLong(s.due).toUpperCase():''),dist:s.dist||DIST_DEF,signProc:s.signProc||'Halimah',signPpic:s.signPpic||'Muin M.K.'});
function sheetCtx(s){
 const sum=its=>{const m={};(its||[]).forEach(i=>m[i.d]=(m[i.d]||0)+(+i.q||0));return m};
 const vs=S.vendor.filter(v=>v.spk===s._id).sort((a,b)=>(a.tgl+(a.at||'')).localeCompare(b.tgl+(b.at||'')));
 const ks=S.kirim.filter(k=>k.spk===s._id&&k.status!=='Batal').sort((a,b)=>(a.tgl+(a.at||'')).localeCompare(b.tgl+(b.at||'')));
 const lines={};(calc().spk[s._id]?.lines||[]).forEach(l=>{if(!lines[l.d])lines[l.d]=l});const ret=[],rej={};vs.filter(v=>v.status!=='Batal').forEach(v=>{(v.items||[]).forEach(i=>rej[i.d]=(rej[i.d]||0)+(+i.reject||0));vReturns(v).forEach(r=>ret.push({name:v.vendor,date:r.tgl?fdS(r.tgl)+(r.est?'*':''):'-',sort:r.tgl||'9',map:r.items||{}}))});ret.sort((a,b)=>a.sort.localeCompare(b.sort));
 return {lines,ret,rej,vend:vs.filter(v=>v.status!=='Batal').map(v=>({name:v.vendor,date:fdS(v.tgl),map:sum(v.items)})),cust:ks.map(k=>({name:k.noSJ||'',date:fdS(k.tgl),map:sum(k.items)})),tglLong:tglLong(s.tgl),logoB64:LOGO_B64,issued:s.terbitAt?`Diterbitkan via MNI Gudang & Logistik · ${tglLong(s.terbitAt)}`:''};
}
function openSheet(id,tries=0){if(!byId('spk',id)){if(tries<25)setTimeout(()=>openSheet(id,tries+1),120);return} /* B-010: tunggu snapshot SPK baru (maks ±3 dtk); jangan tampilkan lembar kosong yang menutup layar */SHEET=id;closeDrawer();renderSheet();$('#sheet').hidden=false;document.body.style.overflow='hidden'}
function closeSheet(){SHEET=null;$('#sheet').hidden=true;$('#sheet').innerHTML='';if(!ED)document.body.style.overflow=''}
function renderSheet(){
 const s0=byId('spk',SHEET);if(!s0){closeSheet();return}const s=spkFull(s0);
 const ctx=sheetCtx(s),x=calc().spk[s._id];
 const secs=secsOf(s);const lineBy={};x.lines.forEach(l=>lineBy[l.d]=lineBy[l.d]||l);
 // Fixed 13-column layout: No | Desc | QTY | Satuan | Berat/pcs | Berat/item | Produksi | Kirim Vendor | Balik Vendor | Terkirim | Blm Produksi | Di Vendor | Blm Kirim | % Prod | % Finish | % Kirim | Ket
 const all=17;
 const pc=v=>Math.round(v*100)+'%';
 let no=0,tq=0,tw=0,pp=[],pf=[],pk=[];
 const itemRows=[];
 // Build vendor / return / kirim lookup per item (aggregate all surat jalan)
 const vByItem={},rByItem={},cByItem={};
 ctx.vend.forEach(v=>Object.entries(v.map).forEach(([d,q])=>vByItem[d]=(vByItem[d]||0)+q));
 ctx.ret.forEach(r=>Object.entries(r.map).forEach(([d,q])=>rByItem[d]=(rByItem[d]||0)+q));
 ctx.cust.forEach(c=>Object.entries(c.map).forEach(([d,q])=>cByItem[d]=(cByItem[d]||0)+q));
 // Build date hints per item for tooltip lines
 const vDates=ctx.vend.map(v=>v.date).filter(Boolean);
 const rDates=ctx.ret.map(r=>r.date).filter(Boolean);
 const cDates=ctx.cust.map(c=>c.date).filter(Boolean);
 const dateHint=(dates,label)=>dates.length?`<div class="note" style="font-size:10px;color:var(--muted)">${label}: ${dates.join(', ')}</div>`:'';

 secs.forEach((sec,si)=>{
  if(si>0&&sec.h)itemRows.push(`<tr><td></td><td class="ys" colspan="${all-1}">${esc(sec.h)}</td></tr>`);
  sec.lines.forEach(it=>{no++;const l=lineBy[it.d]||{prodEff:0,kirim:0};const q=+it.q||0,w=+it.w||0;tq+=q;tw+=q*w;
   const vS=vByItem[it.d]||0,rS=rByItem[it.d]||0,cS=cByItem[it.d]||0;
   const blmProd=Math.max(0,q-l.prodEff);
   const diVendor=Math.max(0,vS-rS-(ctx.rej[it.d]||0));
   const blmKirim=Math.max(0,(rS||l.prodEff)-l.kirim);
   const pP=q?Math.min(1,l.prodEff/q):0,pF=q?Math.min(1,rS/q):0,pK=q?Math.min(1,l.kirim/q):0;
   pp.push(pP);pf.push(pF);pk.push(pK);
   const hasVendor=vS>0||rS>0;
   itemRows.push(`<tr>
    <td class="c b">${no}</td>
    <td class="l">${esc(it.d)}${it.ket?` <span class="red">(${esc(it.ket)})</span>`:''}${ctx.rej[it.d]?` <span class="red">(reject ${n(ctx.rej[it.d])})</span>`:''}</td>
    <td class="c">${n(q)}</td>
    <td class="c">${esc(it.u||'')}</td>
    <td class="c">${w?w.toFixed(2):''}</td>
    <td class="c">${w?(q*w).toFixed(2):''}</td>
    <td class="c b">${n(l.prodEff)}</td>
    <td class="c${hasVendor?' yl':''}">${vS?n(vS):'–'}${hasVendor?dateHint(vDates,'Kirim'):''}</td>
    <td class="c${hasVendor?' rt':''}">${hasVendor?n(rS)+'<span class="muted">/'+n(vS)+'</span>':'–'}${hasVendor?dateHint(rDates,'Balik'):''}</td>
    <td class="c">${cS?n(cS):'–'}${cS?dateHint(cDates,'Tgl'):''}
    </td>
    <td class="c gr${blmProd>0?' red':' ok'}">${blmProd>0?n(blmProd):'✓'}</td>
    <td class="c gr${diVendor>0?' red':' ok'}">${hasVendor?(diVendor>0?n(diVendor)+' di vendor':'✓'):'–'}</td>
    <td class="c gr${blmKirim>0?' red':' ok'}">${blmKirim>0?n(blmKirim):'✓'}</td>
    <td class="c">${pc(pP)}</td>
    <td class="c">${hasVendor?pc(pF):'–'}</td>
    <td class="c">${pc(pK)}</td>
    <td class="l">${esc(it.catatan||'')}</td>
   </tr>`);
  });
 });
 const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
 const st=s.status||'Terbit';
 const revs=(s.revisi||[]).slice().reverse();
 const hasAnyVendor=ctx.vend.length>0;
 $('#sheet').innerHTML=`<div class="sh"><header class="sh-bar"><button class="btn ghost" data-act="sheet-close">← Kembali</button><div class="sh-ttl"><b>SPK ${s.no}${s.rev?' Rev.'+s.rev:''}</b> <span class="muted">${esc(s.customer)}</span> ${stChip(st)} ${stChip(x.st)}</div>
  <div class="sh-btns"><button class="btn" data-act="spkedit" data-id="${s._id}">Edit</button><button class="btn" data-act="spkdup" data-id="${s._id}">Duplikat</button>${st==='Draft'?`<button class="btn" data-act="spkpub" data-id="${s._id}">${ic('chk')}Terbitkan</button>`:''}<button class="btn" data-act="doc" data-kind="spk" data-ref="${s._id}" data-fmt="pdf">${ic('file')}PDF</button><button class="btn primary" data-act="spkxlsx" data-id="${s._id}">${ic('dl')}Excel</button></div></header>
  <div class="sh-scroll"><div class="paper ${st==='Draft'?'draft':''}">
   <div class="pp-head"><img src="${LOGO}" alt="PT Mitra Nusa Internasional"><div class="pp-co"><b>PT. MITRA NUSA INTERNASIONAL</b><span>Ruko Gravitas B2 No.1, Lavon, Wana Kerta</span><span>Kec. Sindang Jaya, Kab. Tangerang</span></div></div>
   <table class="pp"><tbody>
    <tr class="r-t"><td colspan="2" class="c b t14">SURAT PERINTAH KERJA (SPK)</td><td colspan="4" class="c gr t26">SPK ${s.no}${s.rev?' <small>Rev.'+s.rev+'</small>':''}</td><td colspan="${all-6}" class="ws"><div class="c b t12">WORKSHOP MNI</div><div class="kvp"><span>Nomor</span><span>: ${esc(s.nomor||'')}</span><span>Tanggal</span><span>: ${esc(tglLong(s.tgl))}</span><span>Sales</span><span>: ${esc(s.sales||'')}</span></div></td></tr>
    <tr><td colspan="2" class="c">Halaman 1 dari 1</td><td colspan="4"></td><td colspan="${all-6}" class="b">LEAD TIME : ${esc(s.lead||'-')}</td></tr>
    <tr class="r-c"><td colspan="6" class="c b i yl t125">${esc(s.customer)}${s.po?' - '+esc(s.po):''}</td><td colspan="${all-6}" class="yl"></td></tr>
    <tr class="hd">
     <th rowspan="2">No</th><th rowspan="2">DESCRIPTION<br><small class="ys">${esc(secs[0]?.h||'')}</small></th>
     <th rowspan="2">QTY</th><th rowspan="2">Satuan</th><th rowspan="2">Berat/<br>pcs</th><th rowspan="2">Berat/<br>item</th>
     <th rowspan="2">Produksi<br>Selesai</th>
     <th colspan="2" class="yl">Subcont / Vendor</th>
     <th rowspan="2">Terkirim<br>Customer</th>
     <th colspan="3" class="gr">KEKURANGAN</th>
     <th colspan="3">PROGRESS ( % )</th>
     <th rowspan="2">Keterangan</th>
    </tr>
    <tr class="hd">
     <th class="yl w">Kirim</th><th class="rt w">Balik</th>
     <th class="gr">Blm Produksi</th><th class="gr">Di Vendor</th><th class="gr">Blm Kirim</th>
     <th>Produksi</th><th>${hasAnyVendor?'Finishing':'–'}</th><th>Kirim</th>
    </tr>
    ${itemRows.join('')}
    <tr><td colspan="${all}">&nbsp;</td></tr>
    <tr><td></td><td class="c b">Total</td><td class="c b">${n(tq)}</td><td class="c">Btg/Pcs</td><td></td><td class="c b">${tw?tw.toFixed(2):''} Kg</td><td colspan="4"></td><td colspan="3"></td><td class="c b">${pc(avg(pp))}</td><td class="c b">${hasAnyVendor?pc(avg(pf)):'–'}</td><td class="c b">${pc(avg(pk))}</td><td></td></tr>
   </tbody></table>
   <div class="pp-foot"><div class="pp-note">${esc(s.note||'')}</div><div class="pp-dist"><span>Distributed to:</span><ul>${(s.dist||DIST_DEF).map(d=>`<li>~ ${esc(d)}</li>`).join('')}</ul></div></div>
   <div class="pp-sign"><div><b>Procurement/Estimator</b><span class="sp"></span><b>( ${esc(s.signProc||'Halimah')} )</b></div><div><b>PPIC</b><span class="sp"></span><b>( ${esc(s.signPpic||'Muin M.K.')} )</b></div></div>
  </div>
  <div class="sh-meta">${st==='Draft'?'<span class="chip warn">Draft · belum terbit, belum masuk monitoring produksi</span>':''}
   ${s.terbitAt?`<span>Terbit ${fd(s.terbitAt)} oleh ${who(s.terbitBy)}</span>`:''}${revs.length?`<div><b>Riwayat revisi</b><ul>${revs.map(r=>`<li>Rev.${r.rev} · ${fd(r.at)} · ${who(r.by)} — ${esc(r.alasan||'')}</li>`).join('')}</ul></div>`:''}
   <span class="note">Kolom produksi, subcont/vendor, dan progress terisi otomatis dari transaksi realtime. Kolom "Balik" menampilkan qty kembali / qty yang dikirim ke vendor. ✓ = sudah selesai semua. Tanggal kecil di bawah qty = referensi surat jalan.</span></div>
  </div></div>`;
 resolveNames();
}
let XL=null;
function loadExcelJS(){if(window.ExcelJS)return Promise.resolve(window.ExcelJS);if(XL)return XL;
 const tryLoad=src=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=()=>window.ExcelJS?res(window.ExcelJS):rej(new Error('ExcelJS tidak termuat'));s.onerror=()=>rej(new Error('Gagal memuat ExcelJS'));document.head.appendChild(s)});
 XL=tryLoad('https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js').catch(()=>tryLoad('https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js')).catch(e=>{XL=null;throw e});return XL}
async function exportSpkXlsx(id){
 const s=byId('spk',id);if(!s)return;if(!DLS){toast('Unduhan tidak tersedia di tampilan ini.');return}
 toast('Menyiapkan file Excel…');
 try{const X=await loadExcelJS();const wb=buildSpkXlsx(X,spkFull(s),sheetCtx(s));const buf=await wb.xlsx.writeBuffer();
  const name=`SPK ${s.no}${s.rev?' Rev.'+s.rev:''} - ${String(s.customer).replace(/[\\/:*?"<>|]/g,'').slice(0,60)}.xlsx`;
  await DLS.save({filename:name,data:new Uint8Array(buf)});}
 catch(e){if(e.code!=='declined')toast('Gagal membuat Excel: '+(e.message||e.code))}
}
async function publishDraft(id){const s=byId('spk',id);if(!s)return;const items=(s.items||[]);if(!items.length){toast('SPK belum punya item.');return}
 const now=new Date().toISOString();await updDoc('spk',id,{status:'Terbit',terbitAt:now,terbitBy:ME||null});toast(`SPK ${s.no} terbit · tim langsung melihat`)}

/* ---------- events ---------- */
let delArm=null;
/* ================= USERS, ROLES & KPI ================= */
/* Peran = paket hak bawaan (preset). Hak sebenarnya disimpan per pengguna di muser.modul {modul:'lihat'|'ubah'};
   admin (super admin) selalu memiliki semua modul. mods = modul yang boleh DIUBAH, lihat = modul yang hanya boleh DILIHAT. */
const ROLES={
 admin:{l:'Super Admin',d:'Semua modul dan kelola pengguna',mods:['*'],lihat:[]},
 ppic:{l:'PPIC',d:'SPK dan kirim ke vendor; melihat gudang dan pengiriman',mods:['spk','vendor'],lihat:['bahan-baku','barang-jadi','pengiriman','bongkar-muat']},
 produksi:{l:'Produksi',d:'Progres produksi pada SPK; melihat vendor',mods:['spk'],lihat:['vendor']},
 gbb:{l:'Gudang Bahan Baku',d:'Stok plat, terima material, pakai produksi, opname, PR',mods:['bahan-baku','bongkar-muat'],lihat:['spk']},
 gbj:{l:'Gudang Barang Jadi',d:'Stok barang jadi, terima dari vendor, surat jalan',mods:['barang-jadi','vendor','pengiriman','bongkar-muat'],lihat:['spk']},
 logistik:{l:'Logistik / Pengiriman',d:'Surat jalan, armada, bongkar muat',mods:['pengiriman','bongkar-muat'],lihat:['spk','barang-jadi']},
 viewer:{l:'Viewer',d:'Hanya melihat semua modul, tidak mencatat',mods:[],lihat:['bahan-baku','barang-jadi','vendor','pengiriman','spk','bongkar-muat']}
};
const MODS=[['bahan-baku','Bahan baku'],['barang-jadi','Barang jadi'],['vendor','Vendor'],['pengiriman','Kirim customer'],['spk','SPK & produksi'],['bongkar-muat','Bongkar muat'],['master-data','Master data']];
const MODL=Object.fromEntries(MODS);
const presetModul=r=>{const p=ROLES[r];if(!p||p.mods[0]==='*')return {};const o={};p.lihat.forEach(m=>o[m]='lihat');p.mods.forEach(m=>o[m]='ubah');return o};
let IS_OWNER=false,IS_EDITOR=false,ME_P=null;
function myRole(){return ME_P?(ME_P.role||'viewer'):null}
/* level saya pada satu modul: 'ubah' | 'lihat' | null (tidak terlihat) */
function myLevel(m){
 if(!ME_P)return CAN?'ubah':'lihat';
 if(ME_P.role==='admin')return 'ubah';
 if(ME_P.modul&&typeof ME_P.modul==='object')return ME_P.modul[m]||null;
 const md=(ROLES[ME_P.role]||{mods:[]}).mods;return md.includes(m)?'ubah':'lihat'}
const myAnyEdit=()=>ME_P?(ME_P.role==='admin'||MODS.some(([m])=>myLevel(m)==='ubah')):CAN;
const roleL=r=>(ROLES[r]||{}).l||'Belum terdaftar';
function myAcc(){
 if(!ME)return {st:'anon',role:null};
 const mu=byId('muser',ME);
 if(ME_P&&ME_P.role){if(ME_P.terdaftar===false)return {st:'new',role:null,mu};return {st:'ok',role:ROLES[ME_P.role]?ME_P.role:'viewer',mu}} /* peran dari tabel pengguna (Supabase) */
 if(IS_OWNER)return {st:'ok',role:'admin',mu};
 if(mu&&mu.aktif===false)return {st:'off',role:'viewer',mu};
 if(mu&&ROLES[mu.role])return {st:'ok',role:mu.role,mu};
 if(IS_EDITOR)return {st:'ok',role:'admin',mu,implicit:true};
 return {st:'new',role:null};
}
function canMod(m){if(!ME_P&&!ME)return false;if(m==='*any')return myAnyEdit();return myLevel(m)==='ubah'}
const canManage=()=>!!ME_P&&myRole()==='admin';
function modOf(c,data,id,op){
 if(['rm','rmhist','pr','opname'].includes(c))return 'bahan-baku';
 if(c==='fg')return 'barang-jadi';
 if(c==='mutasi'){const g=(data&&data.gudang)||(byId('mutasi',id)||{}).gudang;return g==='rm'?'bahan-baku':'barang-jadi'}
 if(c==='spk')return 'spk';if(c==='vendor')return 'vendor';if(c==='kirim')return 'pengiriman';
 if(c==='bongkar')return op==='add'&&data&&data.auto?'*any':'bongkar-muat';
 if(c==='master')return id==='setting'?'bahan-baku':'*any';
 if(['mvendor','mcustomer','msupplier','marmada'].includes(c))return op==='del'?'master-data':'*any';
 return '*any';
}
function guard(c,data,id,op){
 if(!ROLE_ON&&!(ME_P&&ME_P.role))return;
 const a=myAcc();
 if(a.st==='new')throw new Error('Akun Anda belum terdaftar sebagai pengguna. Minta super admin mendaftarkan akun Anda.');
 if(a.st==='off')throw new Error('Akun Anda dinonaktifkan admin.');
 const m=modOf(c,data,id,op);
 if(!canMod(m))throw new Error(`Akses Anda (${roleL(a.role)}) tidak mencakup pencatatan di ${MODL[m]||'modul ini'}. Minta super admin menambah akses.`);
}
/* ---- audit log: one row per write ---- */
const CNM={rm:'item bahan baku',fg:'item barang jadi',mutasi:'mutasi stok',spk:'SPK',vendor:'kiriman vendor',kirim:'surat jalan',bongkar:'bongkar muat',pr:'PR',opname:'opname',master:'pengaturan',mvendor:'master vendor',mcustomer:'master customer',msupplier:'master supplier',marmada:'master armada',rmhist:'riwayat harga',muser:'data pengguna'};
function actLabel(c,op,d){
 if(op==='del')return 'Hapus '+(CNM[c]||c);
 if(op==='add'){
  if(c==='mutasi'){const j=d.jenis;return (j==='masuk'?(d.gudang==='rm'?'Terima material':'Barang masuk'):j==='keluar'?(d.gudang==='rm'?'Pakai produksi':'Barang keluar'):j==='opname'?'Stock opname':MVL[j]||'Mutasi')}
  return {vendor:'Kirim ke vendor',kirim:'Buat surat jalan',bongkar:d.auto?'Antrian bongkar (otomatis)':'Catat kendaraan masuk',spk:d.status==='Draft'?'Buat draft SPK':'Terbitkan SPK',pr:'Buat PR',opname:'Stock opname',rm:'Item bahan baku baru',fg:'Item barang jadi baru'}[c]||'Tambah '+(CNM[c]||c);
 }
 if(d.batal)return 'Batalkan '+(CNM[c]||c);
 if(d.riwayat)return 'Terima dari vendor';
 if(d.revisi)return 'Revisi SPK';
 if(d.terbitAt)return 'Terbitkan SPK';
 if(d.dikoreksi)return 'Koreksi mutasi';
 if(c==='spk'&&d.items)return 'Update progres produksi';
 if(c==='bongkar'&&d.status)return d.status==='Proses'?'Mulai bongkar muat':d.status==='Selesai'?'Selesai bongkar muat':'Update bongkar muat';
 if(d.status)return `${CNM[c]||c} → ${d.status}`.replace(/^./,x=>x.toUpperCase());
 return 'Ubah '+(CNM[c]||c);
}
function refOf(c,d){
 if(c==='spk')return d.no?'SPK '+d.no+(d.customer?' · '+d.customer:''):'';
 if(c==='vendor')return [d.noSJ,d.vendor,d.spk?spkName(d.spk):''].filter(Boolean).join(' · ');
 if(c==='kirim')return [d.noSJ,d.customer].filter(Boolean).join(' · ');
 if(c==='mutasi'){const it=byId(d.gudang,d.item);return `${d.delta>0?'+':''}${n(d.delta)} · ${d.gudang==='rm'?rmLabel(it):fgLabel(it)}${d.ref?' · '+d.ref:''}`}
 if(c==='bongkar')return [d.jenis,d.nopol,d.pihak].filter(Boolean).join(' · ');
 if(c==='pr')return d.noPR||'';
 if(c==='rm')return rmLabel(d);if(c==='fg')return fgLabel(d);
 return d.nama||d.nopol||'';
}
function logAct(c,id,op,data){
 if(!DB||!ME||c==='log')return;
 try{const d={...(byId(c,id)||{}),...(data||{})};
  let tgl=op==='add'?(d.tgl||''):'';if(op==='upd'&&data&&data.riwayat){const r=data.riwayat[data.riwayat.length-1];tgl=r&&r.tgl||''}
  const row={u:ME,at:new Date().toISOString(),c,d:id||'',op,k:actLabel(c,op,data||{}),mod:modOf(c,d,id,op),ref:String(refOf(c,d)||'').slice(0,140),tgl};
  if(op==='add'&&d.auto)row.auto=true;
  DB.collection('log').add(row).catch(()=>{});
 }catch(_){}
}
/* ---- activity stream: audit log + history rebuilt from documents before the log existed ---- */
const locDate=iso=>{const d=new Date(iso);return isNaN(d)?'':d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
function acts(){
 const c=calc();if(c._acts)return c._acts;
 const ev=[];const L=S.log.filter(l=>l.u&&l.at);const START=L.reduce((a,l)=>!a||l.at<a?l.at:a,'');
 const old=at=>at&&(!START||at<START);
 const push=(u,at,c2,k,ref,tgl,auto,mod)=>{if(u&&old(at))ev.push({u,at,c:c2,mod:mod||modOf(c2,null,null,'add'),k,ref,tgl:tgl||'',auto:!!auto})};
 for(const cn of ['rm','fg','mutasi','spk','vendor','kirim','bongkar','pr','opname','mvendor','mcustomer','msupplier','marmada']){
  for(const d of S[cn]){const seen=new Set();
   if(d.by&&d.at){push(d.by,d.at,cn,actLabel(cn,'add',d),refOf(cn,d),d.tgl,d.auto,modOf(cn,d,d._id,'add'));seen.add(d.at)}
   if(cn==='spk'){if(d.terbitBy&&d.terbitAt&&d.terbitAt!==d.at){push(d.terbitBy,d.terbitAt,cn,'Terbitkan SPK',refOf(cn,d));seen.add(d.terbitAt)}(d.revisi||[]).forEach(r=>{push(r.by,r.at,cn,'Revisi SPK',refOf(cn,d));seen.add(r.at)})}
   if(cn==='vendor')(d.riwayat||[]).forEach(r=>{const at=r.at||(r.tgl?r.tgl+'T12:00:00':'');push(r.by,at,cn,'Terima dari vendor',refOf(cn,d),r.tgl);seen.add(at)});
   if(d.batal&&d.batal.by){push(d.batal.by,d.batal.at,cn,'Batalkan '+CNM[cn],refOf(cn,d));seen.add(d.batal.at)}
   if(d.updBy&&d.updAt&&!seen.has(d.updAt)&&cn!=='vendor'&&cn!=='spk')push(d.updBy,d.updAt,cn,actLabel(cn,'upd',{status:d.status}),refOf(cn,d),'',false,modOf(cn,d,d._id,'upd'))
  }
 }
 for(const l of L)ev.push({u:l.u,at:l.at,c:l.c,mod:l.mod,k:l.k,ref:l.ref||'',tgl:l.tgl||'',auto:!!l.auto,op:l.op});
 ev.forEach(e=>{e.day=locDate(e.at);e.late=e.tgl&&e.day?Math.max(0,days(e.tgl,e.day)-1):0});
 ev.sort((a,b)=>b.at.localeCompare(a.at));
 c._acts=ev;c._logStart=START;return ev;
}
const uname=id=>(byId('muser',id)||{}).nama||(byId('ureq',id)||{}).nama||'';
const initials=s=>String(s||'?').trim().split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase()||'?';
const av=(id,sz)=>`<span class="av${sz?' '+sz:''}" data-uav="${esc(id||'')}" aria-hidden="true">${esc(initials(uname(id)))}</span>`;
const uName=id=>`<span data-uid="${esc(id)}">${esc(uname(id)||'Pengguna')}</span>`;
function userIds(){const s=new Set();S.muser.forEach(m=>s.add(m._id));acts().forEach(e=>s.add(e.u));if(ME&&myAcc().role)s.add(ME);return [...s]}
const userRole=id=>{const m=byId('muser',id);if(m)return m.aktif===false?'off':m.role;return id===ME&&myAcc().role?myAcc().role:''};
/* ---- period ---- */
F.kinerja={p:'30',role:'',sort:'total'};
function period(p){const t=today();const d=new Date();
 if(p==='0')return [t,t,'hari ini'];if(p==='bln')return [t.slice(0,8)+'01',t,'bulan ini'];
 const k=+p||30;return [addDays(t,-(k-1)),t,k+' hari terakhir']}
function workdays(a,b){let k=0;for(let d=a;d<=b;d=addDays(d,1)){const w=new Date(d+'T00:00:00').getDay();if(w!==0)k++}return Math.max(1,k)}
function kpiAgg(p){
 const [a,b]=period(p);const E=acts().filter(e=>!e.auto&&e.day>=a&&e.day<=b);
 const U={};const get=u=>U[u]||(U[u]={u,total:0,mods:{},days:new Set(),meas:0,late:0,lateDays:0,batal:0,last:'',ev:[]});
 userIds().forEach(u=>{const r=userRole(u);if(r&&r!=='off'||E.some(e=>e.u===u))get(u)});
 E.forEach(e=>{const o=get(e.u);o.total++;o.mods[e.mod]=(o.mods[e.mod]||0)+1;o.days.add(e.day);if(e.tgl){o.meas++;if(e.late>0){o.late++;o.lateDays+=e.late}}if(/^Batalkan|^Hapus/.test(e.k))o.batal++;if(!o.last||e.at>o.last)o.last=e.at;o.ev.push(e)});
 const lastAll={};acts().forEach(e=>{if(!lastAll[e.u])lastAll[e.u]=e.at});
 Object.values(U).forEach(o=>{o.lastAll=lastAll[o.u]||'';o.tw=o.meas?(o.meas-o.late)/o.meas:null});
 return {a,b,E,U,wd:workdays(a,b)};
}
/* ---- KINERJA TIM ---- */
T.kinerja=()=>{const f=F.kinerja;const roles=[...new Set(userIds().map(userRole).filter(r=>r&&r!=='off'))];
 return `${segBtns('kinerja','p',[['0','Hari ini'],['7','7 hari'],['30','30 hari'],['bln','Bulan ini'],['90','90 hari']])}
 <select class="sel" data-act="filtsel" data-view="kinerja" data-key="role" id="f-krole"><option value="">Semua peran</option>${Object.keys(ROLES).filter(r=>roles.includes(r)).map(r=>`<option value="${r}" ${f.role===r?'selected':''}>${ROLES[r].l}</option>`).join('')}</select>
 <span class="grow"></span><button class="btn ghost" data-act="kpicsv">${ic('dl')}CSV</button>`};
B.kinerja=()=>{
 const f=F.kinerja;const K=kpiAgg(f.p);const [a,b,lbl]=period(f.p);
 let rows=Object.values(K.U).filter(o=>!f.role||userRole(o.u)===f.role);
 const sk={total:o=>o.total,days:o=>o.days.size,tw:o=>o.tw??-1,last:o=>o.last||''}[f.sort]||(o=>o.total);
 rows.sort((x,y)=>{const p=sk(y),q=sk(x);return p>q?1:p<q?-1:y.total-x.total});
 const E=K.E.filter(e=>!f.role||userRole(e.u)===f.role);
 const act=new Set(E.map(e=>e.u)).size;const meas=E.filter(e=>e.tgl).length,late=E.filter(e=>e.tgl&&e.late>0).length;
 const tw=meas?(meas-late)/meas:null;
 const kp=(cls,lb,v,unit,s)=>`<div class="kpi ${cls}" style="cursor:default"><span class="lb">${lb}</span><span class="v">${v}${unit?`<small>${unit}</small>`:''}</span><span class="s">${s}</span></div>`;
 let h=`<section class="kpis">
  ${kp('info','Total aktivitas',n(E.length),'entri',`${lbl} · ${n(Math.round(E.length/K.wd*10)/10)} per hari kerja`)}
  ${kp(act?'ok':'warn','Pengguna aktif',act,'/ '+rows.length,`mencatat minimal 1 transaksi ${lbl}`)}
  ${kp(tw==null?'':tw>=.9?'ok':tw>=.75?'warn':'crit','Input tepat waktu',tw==null?'–':Math.round(tw*100)+'%','',tw==null?'belum ada transaksi bertanggal':`${n(late)} dari ${n(meas)} dicatat lewat H+1`)}
  ${kp(E.filter(e=>/^Batalkan|^Hapus/.test(e.k)).length?'warn':'ok','Batal / hapus',E.filter(e=>/^Batalkan|^Hapus/.test(e.k)).length,'entri','koreksi data setelah dicatat')}
 </section>`;
 // daily bars
 let bars=[];if(f.p==='0'){const hr={};E.forEach(e=>{const x=new Date(e.at).getHours();hr[x]=(hr[x]||0)+1});for(let x=6;x<=21;x++)bars.push({label:pad(x),v:hr[x]||0,tip:`Jam ${pad(x)}.00 · ${hr[x]||0} aktivitas`})}
 else{const dd={};E.forEach(e=>dd[e.day]=(dd[e.day]||0)+1);const span=[];for(let d=a;d<=b;d=addDays(d,1))span.push(d);const step=span.length>45?7:1;
  if(step===1)bars=span.map(d=>({label:span.length>16?String(+d.slice(8)):(+d.slice(8))+'/'+(+d.slice(5,7)),v:dd[d]||0,tip:`${d.split('-').reverse().join('/')} · ${dd[d]||0} aktivitas`}));
  else for(let i=0;i<span.length;i+=7){const w=span.slice(i,i+7);const v=w.reduce((s,d)=>s+(dd[d]||0),0);bars.push({label:String(+w[0].slice(8))+'/'+String(+w[0].slice(5,7)),v,tip:`Minggu mulai ${w[0].split('-').reverse().join('/')} · ${v} aktivitas`})}}
 const modCnt={};E.forEach(e=>modCnt[e.mod]=(modCnt[e.mod]||0)+1);const mmx=Math.max(1,...Object.values(modCnt));
 const modBars=`<div class="hbars">${MODS.map(([k,l])=>`<div class="hb"><span class="nm">${l}</span><span class="track"><i style="width:${pct(modCnt[k]||0,mmx)*100}%"></i></span><span class="vv">${n(modCnt[k]||0)}</span></div>`).join('')}</div>`;
 h+=`<div class="grid3"><section class="panel"><header><h2>Aktivitas ${f.p==='0'?'per jam':'per hari'}</h2><span class="hint">${lbl}</span></header><div class="pbody">${E.length?barChart({bars,fmt:v=>n(Math.round(v)),title:'Aktivitas tim'}):empty('Belum ada aktivitas di periode ini','Setiap transaksi yang dicatat tim akan tercatat otomatis di sini.')}</div></section>
 <section class="panel"><header><h2>Per modul</h2><span class="hint">jumlah entri</span></header><div class="pbody">${modBars}</div></section></div>`;
 // leaderboard
 const th=(k,l,cls='')=>`<th class="${cls}"><button class="linkbtn" style="text-decoration:none;color:inherit;font-weight:inherit" data-act="filt" data-view="kinerja" data-key="sort" data-val="${k}">${l}${f.sort===k?' ↓':''}</button></th>`;
 const mx=Math.max(1,...rows.map(o=>o.total));
 h+=`<section class="panel"><header><h2>Kinerja per pengguna</h2><span class="hint">klik baris untuk detail aktivitas</span></header>${rows.length?`<div class="tbl-wrap"><table class="kt"><thead><tr><th>#</th><th>Pengguna</th>${th('total','Aktivitas','num')}${MODS.map(([k,l])=>`<th class="num mcol">${l}</th>`).join('')}${th('days','Hari aktif','num')}${th('tw','Tepat waktu','num')}<th class="num">Batal/hapus</th>${th('last','Terakhir aktif')}</tr></thead><tbody>
 ${rows.map((o,i)=>{const r=userRole(o.u);return `<tr class="click" data-act="kpiuser" data-uid="${esc(o.u)}"><td class="muted">${i+1}</td><td><div class="ucell">${av(o.u)}<div><b>${uName(o.u)}</b><div class="note">${esc(roleL(r==='off'?'':r))}${r==='off'?' · nonaktif':''}</div></div></div></td>
  <td class="num"><div class="tbar"><i style="width:${pct(o.total,mx)*100}%"></i></div><b>${n(o.total)}</b></td>
  ${MODS.map(([k])=>`<td class="num mcol ${o.mods[k]?'':'muted'}">${o.mods[k]?n(o.mods[k]):'·'}</td>`).join('')}
  <td class="num">${o.days.size}<span class="muted">/${K.wd}</span></td>
  <td class="num">${o.tw==null?'<span class="muted">–</span>':chip(Math.round(o.tw*100)+'%',o.tw>=.9?'ok':o.tw>=.75?'warn':'crit')}</td>
  <td class="num ${o.batal?'':'muted'}">${o.batal||'·'}</td>
  <td class="muted">${o.lastAll?ago(o.lastAll):'belum pernah'}</td></tr>`}).join('')}</tbody></table></div>`:empty('Belum ada pengguna terdaftar','Tambahkan anggota tim lewat menu Pengguna & Akses.')}</section>`;
 h+=`<section class="panel"><header><h2>Cara membaca KPI</h2></header><div class="pbody note kpi-help">
  <p><b>Aktivitas</b> menghitung setiap transaksi yang dicatat: terima/pakai material, barang masuk/keluar, kirim & terima vendor, surat jalan, SPK terbit/revisi/progres, bongkar muat, dan perubahan master data. Antrian bongkar yang dibuat otomatis tidak dihitung.</p>
  <p><b>Tepat waktu</b> membandingkan tanggal transaksi (di form) dengan kapan data diinput. Dicatat di hari yang sama atau H+1 dianggap tepat waktu. Input yang telat bikin stok dan dashboard tidak realtime.</p>
  <p><b>Hari aktif</b> dari ${K.wd} hari kerja (Senin–Sabtu) di periode ini. <b>Batal/hapus</b> tinggi bisa berarti salah input di awal.</p>
  ${calc()._logStart?`<p>Log audit lengkap aktif sejak ${fd(calc()._logStart)}. Data sebelum itu direkonstruksi dari riwayat dokumen, jadi perubahan kecil sebelum tanggal itu bisa tidak terhitung.</p>`:''}
 </div></section>`;
 return h;
};
function kpiUser(uid){openDrawer(()=>{
 const f=F.kinerja;const K=kpiAgg(f.p);const o=K.U[uid]||{total:0,mods:{},days:new Set(),meas:0,late:0,batal:0,ev:[],tw:null};const [,,lbl]=period(f.p);
 const r=userRole(uid);const mu=byId('muser',uid)||{};const all=acts().filter(e=>e.u===uid);
 const mmx=Math.max(1,...Object.values(o.mods));
 return {t:`${av(uid,'lg')} ${uName(uid)}`,s:`${esc(roleL(r==='off'?'':r))}${mu.jabatan?' · '+esc(mu.jabatan):''} · ${lbl}`,b:`
  <div class="ustat"><div><b>${n(o.total)}</b><span>aktivitas</span></div><div><b>${o.days.size}<small>/${K.wd}</small></b><span>hari aktif</span></div><div><b>${o.tw==null?'–':Math.round(o.tw*100)+'%'}</b><span>tepat waktu</span></div><div><b>${o.batal}</b><span>batal/hapus</span></div></div>
  ${o.total?`<div class="hbars" style="margin:6px 0 14px">${MODS.filter(([k])=>o.mods[k]).map(([k,l])=>`<div class="hb"><span class="nm">${l}</span><span class="track"><i style="width:${pct(o.mods[k],mmx)*100}%"></i></span><span class="vv">${n(o.mods[k])}</span></div>`).join('')}</div>`:''}
  ${o.late?`<div class="ro" style="margin-bottom:12px">${o.late} transaksi diinput lewat H+1 (rata-rata telat ${Math.round(o.lateDays/o.late*10)/10} hari).</div>`:''}
  <h4 class="dh">Aktivitas terbaru</h4>
  ${all.length?`<div class="feed">${all.slice(0,60).map(e=>`<div class="fi"><span class="ic ${/^Batalkan|^Hapus/.test(e.k)?'crit':e.late?'warn':''}">${ic(VIEWS.find(v=>v.id===e.mod)?.ic||'db')}</span><div><div class="t">${esc(e.k)}${e.late?` <span class="chip warn">input telat ${e.late} hari</span>`:''}</div><div class="m">${esc(e.ref||MODL[e.mod]||'')}${e.tgl?' · tgl '+fd(e.tgl):''}</div></div><time>${ago(e.at)}</time></div>`).join('')}</div>${all.length>60?`<div class="note" style="padding:8px 0">+${all.length-60} aktivitas lebih lama</div>`:''}`:empty('Belum ada aktivitas','Aktivitas pengguna ini akan muncul begitu mereka mencatat transaksi.')}`}});}
async function kpiCsv(){
 const f=F.kinerja;const K=kpiAgg(f.p);const [a,b]=period(f.p);
 const head=['Pengguna','Peran','Jabatan','Total aktivitas',...MODS.map(m=>m[1]),'Hari aktif','Hari kerja','Transaksi bertanggal','Input telat (>H+1)','Tepat waktu %','Batal/hapus','Terakhir aktif'];
 const ps=USER?await USER.profiles(Object.keys(K.U)):{};
 const rows=Object.values(K.U).filter(o=>!f.role||userRole(o.u)===f.role).sort((x,y)=>y.total-x.total).map(o=>{const m=byId('muser',o.u)||{};return [uname(o.u)||(ps[o.u]&&ps[o.u].name)||'Pengguna',roleL(userRole(o.u)),m.jabatan||'',o.total,...MODS.map(([k])=>o.mods[k]||0),o.days.size,K.wd,o.meas,o.late,o.tw==null?'':Math.round(o.tw*100),o.batal,o.lastAll?o.lastAll.slice(0,16).replace('T',' '):'']});
 await saveCsv(`MNI-kinerja-${a}_${b}.csv`,head,rows);
}
async function saveCsv(name,head,rows){
 const q=v=>{const s=String(v??'');return /[",;\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s};
 const csv='﻿'+[head,...rows].map(r=>r.map(q).join(',')).join('\r\n');
 if(!DLS){toast('Unduhan tidak tersedia di tampilan ini.');return}
 try{await DLS.save({filename:name,data:new Blob([csv],{type:'text/csv'})})}catch(e){if(e.code!=='declined')toast('Gagal mengunduh: '+(e.message||e.code))}
}
/* ---- PENGGUNA & AKSES (khusus super admin) ---- */
const LVL_OPT=[['','Tidak ada akses'],['lihat','Lihat saja'],['ubah','Lihat dan ubah']];
const modulEff=m=>m.role==='admin'?null:(m.modul&&typeof m.modul==='object'?m.modul:presetModul(m.role));
const modulChips=m=>{const o=modulEff(m);if(o===null)return '<span class="wchip">Semua modul</span>';const k=Object.keys(o);
 return k.length?k.map(x=>`<span class="wchip" style="${o[x]==='lihat'?'opacity:.6':''}" title="${o[x]==='ubah'?'Lihat dan ubah':'Lihat saja'}">${MODL[x]||x}${o[x]==='lihat'?' (lihat)':''}</span>`).join(''):'<span class="muted">tidak ada akses</span>'};
T.pengguna=()=>canManage()?`<span class="grow"></span><button class="btn" data-act="backup">${ic('dl')}Unduh cadangan</button><button class="btn primary" data-act="uinvite">${ic('plus')}Tambah anggota tim</button>`:'';
B.pengguna=()=>{
 if(!canManage())return `<section class="panel"><div class="pbody"><div class="ro">Hanya super admin yang bisa mengatur pengguna dan akses.</div></div></section>`;
 const K=kpiAgg('30');const us=S.muser.slice().sort((x,y)=>(x.role==='admin'?0:1)-(y.role==='admin'?0:1)||String(x.nama||'').localeCompare(String(y.nama||'')));
 const aktif=us.filter(u=>u.aktif!==false).length;
 let h=`<section class="panel"><header><h2>Daftar pengguna</h2><span class="hint">${aktif} aktif dari ${us.length} · aktivitas 30 hari</span></header>${us.length?`<div class="tbl-wrap"><table><thead><tr><th>Pengguna</th><th>Peran</th><th>Akses modul</th><th class="num">Aktivitas 30 hr</th><th>Terakhir aktif</th><th>Status</th><th></th></tr></thead><tbody>
  ${us.map(u=>{const o=K.U[u.email]||{total:0};const me=String(u.email||'').toLowerCase()===String(ME||'').toLowerCase();
   return `<tr class="click" data-act="kpiuser" data-uid="${esc(u.email)}"><td><div class="ucell">${av(u.email)}<div><b>${esc(u.nama||u.email)}</b>${me?' <span class="note">(Anda)</span>':''}<div class="note">${esc(u.email||'')}${u.jabatan?' · '+esc(u.jabatan):''}</div></div></div></td><td>${esc(roleL(u.role))}</td><td><div class="wchips">${modulChips(u)}</div></td><td class="num">${n(o.total)}</td><td class="muted">${o.lastAll?ago(o.lastAll):'–'}</td><td>${u.aktif===false?chip('Nonaktif','crit'):chip('Aktif','ok')}</td><td class="act"><button class="btn sm" data-act="uedit" data-uid="${esc(u._id)}">${ic('edit2')}Atur</button> <button class="btn sm ghost" data-act="upw" data-uid="${esc(u._id)}">Password</button></td></tr>`}).join('')}</tbody></table></div>`:empty('Belum ada pengguna','Tambahkan anggota tim agar setiap transaksi tercatat atas nama mereka.')}</section>`;
 h+=`<section class="panel"><header><h2>Paket peran bawaan</h2><span class="hint">titik awal; hak tiap orang tetap bisa diatur satu per satu</span></header><div class="tbl-wrap"><table class="mx"><thead><tr><th>Peran</th>${MODS.map(([,l])=>`<th class="c">${l}</th>`).join('')}</tr></thead><tbody>
  ${Object.entries(ROLES).map(([k,r])=>{const p=presetModul(k);return `<tr><td><b>${r.l}</b><div class="note">${r.d}</div></td>${MODS.map(([m])=>`<td class="c">${k==='admin'?'<span class="yes">✓</span>':p[m]==='ubah'?'<span class="yes" title="Lihat dan ubah">✓</span>':p[m]==='lihat'?'<span class="part" title="Lihat saja">lihat</span>':'<span class="no">–</span>'}</td>`).join('')}</tr>`}).join('')}</tbody></table></div>
  <div class="pbody note">✓ = lihat dan ubah · lihat = hanya melihat · – = modul tidak tampil. Aturan dijaga di database sehingga tidak bisa diakali dari browser. Data tetap satu dan terhubung: perubahan oleh satu pengguna terlihat oleh pengguna lain yang punya akses ke modul itu.</div></section>`;
 return h;
};
const genPw=()=>{const A='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';const b=crypto.getRandomValues(new Uint8Array(12));return [...b].map(x=>A[x%A.length]).join('')};
const modulGrid=cur=>`<div class="fld full"><label>Akses per modul</label><div class="tbl-wrap"><table class="mx"><tbody>${MODS.map(([m,l])=>`<tr><td>${l}</td><td><select class="sel" name="mod_${m}">${LVL_OPT.map(([v,t])=>`<option value="${v}" ${(cur[m]||'')===v?'selected':''}>${t}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div></div>`;
const modulFrom=d=>{const o={};MODS.forEach(([m])=>{const v=d['mod_'+m];if(v==='lihat'||v==='ubah')o[m]=v});return o};
const roleOpts=sel=>Object.entries(ROLES).map(([k,x])=>`<option value="${k}" ${sel===k?'selected':''}>${x.l}</option>`).join('');
function mountRoleGrid(f){const s=()=>{const adm=f.role.value==='admin';MODS.forEach(([m])=>{f['mod_'+m].disabled=adm});const r=ROLES[f.role.value];$('#m-rdesc').textContent=r?r.l+': '+r.d:''};
 f.role.addEventListener('change',()=>{const p=presetModul(f.role.value);MODS.forEach(([m])=>{f['mod_'+m].value=p[m]||''});s()});s()}
function inviteForm(){
 if(!canManage()){toast('Hanya super admin yang bisa menambah anggota.');return}
 openModal('Tambah anggota tim',
  fld('Nama lengkap',inp('nama','','text','required placeholder="mis. Budi Santoso"'),true)+
  fld('Email (untuk login)',inp('email','','email','required placeholder="nama@perusahaan.com" autocomplete="off"'),true)+
  fld('Jabatan (opsional)',inp('jabatan','','text','placeholder="mis. Kepala Gudang"'))+
  fld('Peran (paket hak bawaan)',`<select class="sel" name="role" id="m-role">${roleOpts('gbb')}</select>`)+
  `<div class="note full" id="m-rdesc"></div>`+modulGrid(presetModul('gbb'))+
  fld('Cara memberi akses',`<select class="sel" name="cara"><option value="pw">Buat password sementara (disarankan)</option><option value="inv">Kirim undangan lewat email</option></select>`,true)+
  `<div class="note full">Dengan password sementara, Anda menerima kata sandi satu kali untuk diberikan ke orangnya. Mereka bisa langsung masuk lewat "Masuk dengan password".</div>`,
  async d=>{if(!USER||!USER.manage)throw new Error('Fitur kelola pengguna belum tersedia di mode ini.');
   const role=d.role;const password=d.cara==='pw'?genPw():'';
   await USER.manage('create',{email:String(d.email).trim(),nama:cleanName(d.nama),role,jabatan:String(d.jabatan||'').trim(),modul:role==='admin'?null:modulFrom(d),password});
   setTimeout(()=>credMsg(String(d.email).trim().toLowerCase(),cleanName(d.nama),role,password),60)},
  {submit:'Buat akun',done:' ',mount:mountRoleGrid});
}
function credMsg(email,nama,role,password){
 const msg=`Halo ${nama}, akun kamu di aplikasi Gudang & Logistik PT Mitra Nusa Internasional sudah siap (${roleL(role)}).\n\nBuka: ${location.origin}\nEmail: ${email}\n${password?`Password sementara: ${password}\n\nKlik "Masuk dengan password" lalu masukkan email dan password di atas.`:'Cek email kamu untuk undangan, lalu ikuti tautannya.'}`;
 openModal(password?'Akun siap, kirim ke orangnya':'Undangan terkirim',
  `<div class="full note">${password?'Password ini hanya ditampilkan sekali. Salin dan kirim lewat WhatsApp atau email.':'Undangan dikirim ke '+esc(email)+'.'}</div><div class="full"><textarea class="invmsg" id="m-invmsg" readonly>${esc(msg)}</textarea></div>`,
  async()=>{const t=$('#m-invmsg');let ok=false;try{await navigator.clipboard.writeText(t.value);ok=true}catch(_){}if(!ok){t.focus();t.select();try{ok=document.execCommand('copy')}catch(_){}}if(!ok)throw new Error('Browser menolak menyalin otomatis. Teks sudah diblok, tekan Ctrl+C.')},
  {submit:'Salin pesan',done:'Pesan tersalin'})}
function userForm(uid){
 if(!canManage()){toast('Hanya super admin yang bisa mengatur pengguna.');return}
 const m=S.muser.find(x=>x._id===uid);if(!m)return;const me=String(m.email||'').toLowerCase()===String(ME||'').toLowerCase();
 openModal('Atur pengguna',
  fld('Nama tampil',inp('nama',m.nama||'','text','required'),true)+
  fld('Email',`<input class="inp" value="${esc(m.email||'')}" disabled>`,true)+
  fld('Jabatan',inp('jabatan',m.jabatan||'','text','placeholder="mis. Kepala Gudang"'))+
  fld('Peran (paket hak bawaan)',`<select class="sel" name="role" id="m-role" ${me?'disabled':''}>${roleOpts(m.role)}</select>`)+
  `<div class="note full" id="m-rdesc"></div>`+modulGrid(modulEff(m)||{})+
  (me?'<div class="note full">Anda tidak bisa mengubah peran atau menonaktifkan akun sendiri.</div>':`<label class="ck full"><input type="checkbox" name="aktif" ${m.aktif===false?'':'checked'}> Aktif — bisa masuk dan memakai aplikasi</label>`)+
  `<div class="note full">Perubahan berlaku segera di database. Menu baru tampil pada orang tersebut setelah ia memuat ulang halaman.</div>`,
  async d=>{if(!String(d.nama).trim())throw new Error('Isi nama tampil.');
   const role=me?m.role:d.role;
   await DB.doc('muser/'+m._id).update({nama:cleanName(d.nama),role,jabatan:String(d.jabatan||'').trim(),aktif:me?true:!!d.aktif,modul:role==='admin'?null:modulFrom(d),updAt:new Date().toISOString(),updBy:ME})},
  {submit:'Simpan',done:'Tersimpan · akses langsung berlaku',mount:mountRoleGrid});
}
/* ---- Akun saya: informasi, ganti password sendiri, keluar ---- */
function accountModal(){
 if(!ME_P){toast('Belum masuk.');return}
 const a=myAcc();
 const mo=ME_P.role==='admin'?null:modulEff({role:ME_P.role,modul:ME_P.modul});
 const mods=mo===null?'Semua modul':Object.entries(mo).map(([m,l])=>(MODL[m]||m)+(l==='lihat'?' (lihat)':'')).join(', ')||'Tidak ada';
 openModal('Akun saya',`<div class="full"><div class="ucell">${av(ME,'xl')}<div><b>${esc(ME_P.name||'')}</b><div class="note">${esc(ME_P.email||'')}${ME_P.jabatan?' · '+esc(ME_P.jabatan):''}</div></div></div></div>
  <div class="full note"><b>Peran:</b> ${esc(roleL(a.role))}<br><b>Akses modul:</b> ${esc(mods)}</div>
  <div class="full" style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn" data-act="pwself">Ganti password</button>${canManage()?'<a class="btn" href="#pengguna" data-act="closemodal">Kelola pengguna</a><button type="button" class="btn" data-act="backup">Unduh cadangan</button>':''}<button type="button" class="btn ghost danger" data-act="logout">Keluar</button></div>`,
  async()=>{},{submit:'Tutup',done:' '});
}
/* ---- Cadangan data (super admin): unduh semua tabel sebagai satu berkas JSON ---- */
async function backupData(){
 if(!canManage()){toast('Hanya super admin yang bisa mengunduh cadangan.');return}
 if(!USER||!USER.exportAll){toast('Cadangan hanya tersedia di backend Supabase.');return}
 toast('Menyiapkan cadangan…');
 try{
  const data=await USER.exportAll();
  const jumlah=Object.fromEntries(Object.entries(data).map(([k,v])=>[k,v.length]));
  const file={format:'mni-gudang-backup',versi:1,dibuat:new Date().toISOString(),oleh:ME,jumlah,data};
  await DLS.save({filename:`MNI-cadangan-${today()}.json`,data:new Blob([JSON.stringify(file)],{type:'application/json'})});
  await DB.doc('master/backup').set({ts:file.dibuat,by:ME,jumlah}); /* bidang 'ts': 'at' ditimpa created_at oleh adapter */
  toast('Cadangan diunduh · simpan di tempat aman, bukan di folder repo');
 }catch(e){if(e.code!=='declined')toast('Gagal membuat cadangan: '+(e.message||e.code))}
}
function pwSelf(){
 openModal('Ganti password',fld('Password baru (minimal 8 karakter)',inp('pw1','','password','required minlength="8" autocomplete="new-password"'),true)+fld('Ulangi password baru',inp('pw2','','password','required autocomplete="new-password"'),true),
  async d=>{if(String(d.pw1).length<8)throw new Error('Password minimal 8 karakter.');if(d.pw1!==d.pw2)throw new Error('Kedua password tidak sama.');
   if(!USER||!USER.changePassword)throw new Error('Fitur ganti password belum tersedia di mode ini.');await USER.changePassword(String(d.pw1))},
  {submit:'Simpan password',done:'Password diganti · pakai password baru saat masuk berikutnya'});
}
function pwForm(uid){
 if(!canManage())return;const m=S.muser.find(x=>x._id===uid);if(!m)return;const pw=genPw();
 openModal('Atur ulang password',
  fld('Pengguna',`<input class="inp" value="${esc((m.nama||'')+' · '+(m.email||''))}" disabled>`,true)+
  fld('Password baru (minimal 8 karakter)',inp('password',pw,'text','required minlength="8" autocomplete="off"'),true)+
  `<div class="note full">Password lama langsung tidak berlaku. Kirim password baru ke orangnya lewat saluran yang aman.</div>`,
  async d=>{if(!USER||!USER.manage)throw new Error('Fitur kelola pengguna belum tersedia di mode ini.');
   if(String(d.password).length<8)throw new Error('Password minimal 8 karakter.');
   await USER.manage('reset_password',{email:m.email,password:String(d.password)});
   setTimeout(()=>credMsg(String(m.email).toLowerCase(),m.nama||m.email,m.role,String(d.password)),60)},
  {submit:'Atur ulang',done:' '});
}
/* ---- shell bits ---- */
function renderMe(){
 const a=myAcc();const nm=ME?(uname(ME)||(ME_P&&ME_P.name)||'Pengguna'):'Tamu';
 const role=ME_P&&ME_P.role&&a.st==='ok'?roleL(a.role):a.st==='new'?'Belum terdaftar':a.st==='off'?'Nonaktif':CAN?'Bisa mencatat':'Lihat saja';
 const html=`${av(ME,'sm')}<span class="mi"><b>${esc(nm)}</b><small>${esc(role)}</small></span>`;
 const w=$('#who');if(w)w.innerHTML=`<button type="button" class="mebtn" data-act="mepage">${html}</button>`;
 const t=$('#mechip');if(t){t.innerHTML=html;t.title=nm+' · '+role}
 fillAvatars();
}
function renderAccess(){
/*RA*/ const ro=$('#ro');if(!ro)return;const a=myAcc();let msg='';
 if(!ME_P){ro.hidden=CAN;ro.className='ro';ro.textContent=CAN?'':'Anda punya akses lihat saja.';$('#tools').classList.remove('locked');return}
 const lvl=VIEW_MOD[VIEW]?myLevel(VIEW_MOD[VIEW]):'ubah';
 if(a.st==='new')msg='Akun Anda belum terdaftar sebagai pengguna aplikasi. Minta super admin mendaftarkan akun Anda.';
 else if(a.st==='off')msg='Akun Anda dinonaktifkan oleh super admin.';
 else if(!CAN)msg=`Akses Anda (<b>${esc(roleL(a.role))}</b>) hanya untuk melihat. Minta super admin menambah akses ubah bila perlu mencatat.`;
 else if(lvl==='lihat'){const who=Object.values(ROLES).filter(r=>r.mods.includes(VIEW_MOD[VIEW])).map(r=>r.l).join(', ');msg=`Anda hanya bisa <b>melihat</b> modul ini. Pencatatan oleh: ${esc(who)}.`}
 ro.hidden=!msg;ro.className='ro';ro.innerHTML=msg;
 $('#tools').classList.toggle('locked',!!(!CAN||lvl==='lihat'||a.st!=='ok'));
}

async function fillAvatars(){
 if(!USER)return;const els=[...document.querySelectorAll('[data-uav]')].filter(e=>e.dataset.uav&&!e.dataset.done);const ids=[...new Set(els.map(e=>e.dataset.uav))];if(!ids.length)return;
 const ps=await USER.profiles(ids);els.forEach(e=>{const p=ps[e.dataset.uav];if(!p)return;e.style.setProperty('--uc',p.color||'');if(p.avatarUrl){const i=new Image();i.alt='';i.src=p.avatarUrl;i.onload=()=>{e.textContent='';e.appendChild(i)}}e.dataset.done='1'});
}

/* ================= SPK FLOW, KPI & DOCUMENTS ================= */
const SPKT_DEF={prod:3,hdg:5,elg:3,pdc:3,lain:3,kirim:1};
const SPKT=()=>({...SPKT_DEF,...((byId('master','setting')||{}).spkT||{})});
const vKey=p=>{const P=String(p||'').toUpperCase();if(P.includes('HDG')||P.includes('HOT'))return 'hdg';if(P.includes('ELG')||P.includes('ELECTRO'))return 'elg';if(P.includes('PDC')||P.includes('POWDER'))return 'pdc';return 'lain'};
const isWd=d=>{const w=new Date(d+'T00:00:00').getDay();return w!==0&&w!==6};
function wd(a,b){if(!a||!b)return null;a=a.slice(0,10);b=b.slice(0,10);if(a===b)return 0;const s=a<b?1:-1;let k=0,d=a,g=0;while(d!==b&&g<800){d=addDays(d,s);if(isWd(d))k+=s;g++}return k}
const sumBy=(arr,f)=>arr.reduce((a,x)=>a+(+f(x)||0),0);
/* vendor return events per SJ: [{tgl,est,items:{d:ok},rej:{d:x},ket,by,at,k}] */
function vReturns(v){
 const R=(v.riwayat||[]).map((r,k)=>({tgl:r.tgl||'',at:r.at||'',by:r.by||null,ket:r.ket||'',k,est:false,items:r.items?Object.fromEntries(r.items.map(x=>[x.d,+x.ok||0])):null,rej:r.items?Object.fromEntries(r.items.map(x=>[x.d,+x.rej||0])):{} ,qty:+r.qty||0,rq:+r.rej||0}));
 const tot={},totR={};(v.items||[]).forEach(i=>{tot[i.d]=(tot[i.d]||0)+(+i.kembali||0);totR[i.d]=(totR[i.d]||0)+(+i.reject||0)});
 const known={};R.filter(r=>r.items).forEach(r=>{for(const d in r.items)known[d]=(known[d]||0)+r.items[d]});
 const noIt=R.filter(r=>!r.items);
 if(noIt.length){const rem={},remR={};for(const d in tot){rem[d]=Math.max(0,tot[d]-(known[d]||0));remR[d]=totR[d]||0}
  noIt.forEach((r,i)=>{if(i===noIt.length-1){r.items=rem;r.rej=remR}else{r.items={};r.rej={}}})}
 else{const rem={};let any=false;for(const d in tot){const x=Math.max(0,tot[d]-(known[d]||0));if(x>0){rem[d]=x;any=true}}
  if(any){const ks=S.kirim.filter(k=>k.spk===v.spk&&k.status!=='Batal'&&k.tgl>=v.tgl&&(k.items||[]).some(i=>rem[i.d])).sort((a,b)=>a.tgl.localeCompare(b.tgl));
   R.push({tgl:ks[0]?ks[0].tgl:'',est:true,items:rem,rej:totR,ket:'',by:null,at:'',k:-1})}}
 return R.sort((a,b)=>(a.tgl||'9').localeCompare(b.tgl||'9'));
}
/* first date when cumulative qty per item reaches order for every item */
function fullDate(events,need){ // events:[{tgl,map}] sorted
 const cum={};const ds=Object.keys(need).filter(d=>need[d]>0);if(!ds.length)return null;
 for(const e of events){for(const d in e.map)cum[d]=(cum[d]||0)+(+e.map[d]||0);if(ds.every(d=>(cum[d]||0)>=need[d]))return e.tgl||null}
 return null;
}
function flow(id){
 const c=calc();c._flow=c._flow||{};if(c._flow[id])return c._flow[id];
 const s=byId('spk',id);if(!s)return null;const x=c.spk[id];const T=SPKT();
 const need={};(s.items||[]).forEach(i=>need[i.d]=(need[i.d]||0)+(+i.q||0));
 const vs=S.vendor.filter(v=>v.spk===id&&v.status!=='Batal').sort((a,b)=>(a.tgl+(a.at||'')).localeCompare(b.tgl+(b.at||'')));
 const ks=S.kirim.filter(k=>k.spk===id&&k.status!=='Batal').sort((a,b)=>(a.tgl+(a.at||'')).localeCompare(b.tgl+(b.at||'')));
 const mp=its=>{const m={};(its||[]).forEach(i=>m[i.d]=(m[i.d]||0)+(+i.q||0));return m};
 // production
 let P=null,Pest='';
 const log=(s.prodLog||[]).slice().sort((a,b)=>(a.tgl+a.at).localeCompare(b.tgl+b.at));
 for(const e of log){const m={};(e.items||[]).forEach(i=>m[i.d]=(m[i.d]||0)+(+i.q||0));if(Object.keys(need).every(d=>(m[d]||0)>=need[d])){P=e.tgl;break}}
 if(!P&&x.pP>=1){const vf=fullDate(vs.map(v=>({tgl:v.tgl,map:mp(v.items)})),need);if(vf){P=vf;Pest='dari kirim vendor'}else{const kf=fullDate(ks.map(k=>({tgl:k.tgl,map:mp(k.items)})),need);if(kf){P=kf;Pest='dari kirim customer'}else if(log.length){P=log[log.length-1].tgl;Pest='update terakhir'}}}
 // vendor
 const vend=vs.map(v=>{const R=vReturns(v);const out=sumBy(v.items||[],i=>i.q),back=sumBy(v.items||[],i=>i.kembali),rej=sumBy(v.items||[],i=>i.reject);
  const done=out>0&&back+rej>=out;const last=done?R.reduce((a,r)=>!a||(r.tgl&&r.tgl>a)?r.tgl:a,''):'';const est=R.some(r=>r.est);
  const tgt=v.target||'';const tDays=tgt?wd(v.tgl,tgt):T[vKey(v.proses)];const turn=done&&last?wd(v.tgl,last):null;const age=done?null:wd(v.tgl,today());
  return {v,R,out,back,rej,sisa:Math.max(0,out-back-rej),done,last,est,tDays,turn,ok:turn==null?null:turn<=tDays,age,late:!done&&age>tDays}});
 const V1=vs[0]?vs[0].tgl:null;
 const Vfull=fullDate(vs.map(v=>({tgl:v.tgl,map:mp(v.items)})),need);
 const retEv=[];vend.forEach(o=>o.R.forEach(r=>retEv.push({tgl:r.tgl,est:r.est,map:r.items||{}})));retEv.sort((a,b)=>(a.tgl||'9').localeCompare(b.tgl||'9'));
 const allBack=vend.length&&vend.every(o=>o.done);
 const Rfull=allBack?(fullDate(retEv.filter(e=>e.tgl),need)||vend.reduce((a,o)=>o.last>a?o.last:a,'')||null):null;const Rest=retEv.some(e=>e.est);
 // customer
 const K1=ks[0]?ks[0].tgl:null;const Kfull=fullDate(ks.map(k=>({tgl:k.tgl,map:mp(k.items)})),need);
 const recv=ks.length&&ks.every(k=>k.status==='Diterima')?ks.reduce((a,k)=>(k.tglTerima||'')>a?k.tglTerima:a,''):'';
 const ready=vs.length?(Rest?null:Rfull):(Pest?null:P);
 // metrics
 const dProd=P?Math.max(0,wd(s.tgl,P)):null;const okProd=dProd==null?null:dProd<=T.prod;
 const dWaitV=P&&V1&&!Pest?Math.max(0,wd(P,V1)):null;
 const dKirim=ready&&Kfull?Math.max(0,wd(ready,Kfull)):null;const okKirim=dKirim==null?null:dKirim<=T.kirim;
 const otd=Kfull&&s.due?Kfull<=s.due:null;const lateK=Kfull&&s.due&&Kfull>s.due?wd(s.due,Kfull):0;
 const cycle=Kfull?Math.max(0,wd(s.tgl,Kfull)):null;
 const draft=(s.status||'Terbit')==='Draft';
 const stage=draft?'Draft':x.pK>=1?'Terkirim':x.pP<1?'Produksi':vend.some(o=>!o.done)?'Di vendor':x.kir>0?'Kirim sebagian':'Siap kirim';
 const r={s,x,need,vs,ks,vend,log,P,Pest,V1,Vfull,Rfull,Rest,K1,Kfull,recv,ready,dProd,okProd,dWaitV,dKirim,okKirim,otd,lateK,cycle,stage};
 c._flow[id]=r;return r;
}
const STAGE_CLS={Draft:'plain',Produksi:'info','Di vendor':'warn','Siap kirim':'info','Kirim sebagian':'info',Terkirim:'ok'};
const okChip=(ok,yes='Tepat',no='Telat')=>ok==null?'':chip(ok?yes:no,ok?'ok':'crit');
const dTxt=v=>v==null?'–':v+' hk';

/* ---------- SPK KPI tab ---------- */
F.spk.tab='list';F.spk.p='90';
function spkPeriod(p){const t=today();if(p==='all')return ['0000-00-00',t,'semua SPK'];if(p==='bln')return [t.slice(0,8)+'01',t,'SPK bulan ini'];const k=+p||90;return [addDays(t,-(k-1)),t,`SPK ${k} hari terakhir`]}
const avgOf=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
const r1=v=>v==null?'–':String(Math.round(v*10)/10).replace('.',',');
const pctTxt=(a,b)=>b?Math.round(a/b*100)+'%':'–';
function spkKpi(p){
 const [a,b,lbl]=spkPeriod(p);const T=SPKT();
 const Fl=S.spk.filter(s=>(s.status||'Terbit')!=='Draft'&&s.tgl>=a&&s.tgl<=b).map(s=>flow(s._id)).filter(Boolean);
 const prod=Fl.filter(f=>f.dProd!=null),prodOk=prod.filter(f=>f.okProd);
 const prodOpen=Fl.filter(f=>f.x.pP<1).map(f=>({f,age:Math.max(0,wd(f.s.tgl,today()))})).sort((x,y)=>y.age-x.age);
 const VL=Fl.flatMap(f=>f.vend);const vDone=VL.filter(o=>o.turn!=null);
 const byV={};VL.forEach(o=>{const k=o.v.vendor||'(tanpa nama)';const z=byV[k]||(byV[k]={k,sj:0,out:0,back:0,rej:0,turns:[],ok:0,meas:0,est:0,open:0,oldest:0,late:0,proses:new Set()});z.sj++;z.out+=o.out;z.back+=o.back;z.rej+=o.rej;z.proses.add(o.v.proses||'-');if(o.turn!=null){z.turns.push(o.turn);z.meas++;if(o.ok)z.ok++;if(o.est)z.est++}if(!o.done){z.open++;z.oldest=Math.max(z.oldest,o.age||0);if(o.late)z.late++}});
 const waits=Fl.filter(f=>f.dWaitV!=null);
 const kir=Fl.filter(f=>f.Kfull);const otd=kir.filter(f=>f.otd);const kSpeed=Fl.filter(f=>f.dKirim!=null);
 const lateOpen=Fl.filter(f=>!f.Kfull&&f.s.due&&f.s.due<today());
 const sjs=Fl.flatMap(f=>f.ks);const transit=sjs.filter(k=>k.tglTerima&&k.tgl).map(k=>wd(k.tgl,k.tglTerima));
 return {a,b,lbl,T,Fl,prod,prodOk,prodOpen,VL,vDone,byV:Object.values(byV).sort((x,y)=>y.out-x.out),waits,kir,otd,kSpeed,lateOpen,sjs,transit,
  avgProd:avgOf(prod.map(f=>f.dProd)),avgTurn:avgOf(vDone.map(o=>o.turn)),avgWait:avgOf(waits.map(f=>f.dWaitV)),avgKirim:avgOf(kSpeed.map(f=>f.dKirim)),avgCycle:avgOf(kir.map(f=>f.cycle)),avgLate:avgOf(kir.filter(f=>!f.otd).map(f=>f.lateK)),avgTransit:avgOf(transit)};
}
function spkKpiBody(){
 const K=spkKpi(F.spk.p);const T=K.T;
 const kp=(cls,lb,v,unit,s)=>`<div class="kpi ${cls}" style="cursor:default"><span class="lb">${lb}</span><span class="v">${v}${unit?`<small>${unit}</small>`:''}</span><span class="s">${s}</span></div>`;
 const cls=(a,b,g=.9,w=.75)=>!b?'':a/b>=g?'ok':a/b>=w?'warn':'crit';
 const vOk=K.vDone.filter(o=>o.ok).length;
 let h=`<section class="kpis">
  ${kp(cls(K.otd.length,K.kir.length),'Kirim tepat waktu (OTD)',pctTxt(K.otd.length,K.kir.length),'',`${K.otd.length} dari ${K.kir.length} SPK terkirim penuh ≤ due date`)}
  ${kp(cls(K.prodOk.length,K.prod.length),'Produksi tepat target',pctTxt(K.prodOk.length,K.prod.length),'',`rata-rata ${r1(K.avgProd)} hari kerja · target ${T.prod} hk`)}
  ${kp(cls(vOk,K.vDone.length),'Vendor tepat target',pctTxt(vOk,K.vDone.length),'',`rata-rata ${r1(K.avgTurn)} hk di vendor · ${K.vDone.length} SJ kembali penuh`)}
  ${kp(K.avgKirim==null?'':K.avgKirim<=T.kirim?'ok':'warn','Siap → kirim customer',r1(K.avgKirim),'hk',`target ${T.kirim} hk setelah barang siap`)}
  ${kp('info','Siklus SPK → terkirim',r1(K.avgCycle),'hk',`dari tanggal SPK sampai surat jalan terakhir`)}
  ${kp(K.lateOpen.length?'crit':'ok','Lewat due, belum terkirim',K.lateOpen.length,'SPK',K.lateOpen.length?`tertua ${Math.max(...K.lateOpen.map(f=>wd(f.s.due,today())))} hk lewat`:'tidak ada')}
 </section>`;
 // flow funnel
 const st={};K.Fl.forEach(f=>st[f.stage]=(st[f.stage]||0)+1);
 h+=`<section class="panel"><header><h2>Posisi SPK saat ini</h2><span class="hint">${esc(K.lbl)} · ${K.Fl.length} SPK</span></header><div class="pbody flowbar">${['Produksi','Di vendor','Siap kirim','Kirim sebagian','Terkirim'].map(k=>`<button class="fstep ${STAGE_CLS[k]}" data-act="spkstage" data-st="${k}"><b>${st[k]||0}</b><span>${k}</span></button>`).join('<i>›</i>')}</div></section>`;
 // 1 production
 const prodRows=K.prodOpen.slice(0,8).map(o=>`<tr class="click" data-act="openspk" data-id="${o.f.s._id}"><td class="mono"><b>${o.f.s.no}</b></td><td>${esc(o.f.s.customer)}</td><td>${prog(o.f.x.pP)}</td><td class="num ${o.age>T.prod?'bad':''}">${o.age} hk</td><td>${fd(o.f.s.due)}</td></tr>`).join('');
 const slowProd=K.prod.filter(f=>!f.okProd).sort((a,b)=>b.dProd-a.dProd).slice(0,6).map(f=>`<tr class="click" data-act="openspk" data-id="${f.s._id}"><td class="mono"><b>${f.s.no}</b></td><td>${esc(f.s.customer)}</td><td>${fd(f.s.tgl)} → ${fd(f.P)}${f.Pest?` <span class="note">(est.)</span>`:''}</td><td class="num bad">${f.dProd} hk</td><td class="muted">${esc(f.s.alasan||'')}</td></tr>`).join('');
 h+=`<section class="panel"><header><h2>1 · Kecepatan & ketepatan produksi</h2><span class="hint">target ${T.prod} hari kerja dari tanggal SPK</span></header>
  <div class="ana"><div class="ana-c"><h3>Masih di produksi</h3>${prodRows?`<div class="tbl-wrap"><table><thead><tr><th>SPK</th><th>Customer</th><th>Progres</th><th class="num">Umur</th><th>Due</th></tr></thead><tbody>${prodRows}</tbody></table></div>`:'<p class="note">Semua SPK di periode ini sudah selesai produksi.</p>'}</div>
  <div class="ana-c"><h3>Produksi melewati target</h3>${slowProd?`<div class="tbl-wrap"><table><thead><tr><th>SPK</th><th>Customer</th><th>Mulai → selesai</th><th class="num">Durasi</th><th>Kendala</th></tr></thead><tbody>${slowProd}</tbody></table></div>`:'<p class="note">Tidak ada.</p>'}</div></div>
  <div class="pbody note">${K.prod.filter(f=>f.Pest).length} dari ${K.prod.length} tanggal selesai produksi masih <b>estimasi</b> (diambil dari tanggal kirim ke vendor/customer) karena belum diisi lewat Update progres produksi. Mulai sekarang setiap update menyimpan tanggalnya.</div></section>`;
 // 2 vendor
 const vRows=K.byV.map(z=>{const av=avgOf(z.turns);return `<tr class="click" data-act="kpivendor" data-v="${esc(z.k)}"><td><b>${esc(z.k)}</b><div class="note">${esc([...z.proses].join(', '))}</div></td><td class="num">${z.sj}</td><td class="num">${n(z.out)}</td><td class="num">${n(z.back)}</td><td class="num ${z.rej?'bad':''}">${z.rej?n(z.rej)+' <span class="note">('+pctTxt(z.rej,z.out)+')</span>':'0'}</td><td class="num"><b>${r1(av)}</b> hk${z.est?` <span class="note" title="${z.est} SJ tanggal kembali diestimasi">*</span>`:''}</td><td class="num">${z.meas?chip(pctTxt(z.ok,z.meas),z.ok/z.meas>=.9?'ok':z.ok/z.meas>=.75?'warn':'crit'):'–'}</td><td class="num ${z.late?'bad':''}">${z.open?`${z.open} SJ · ${z.oldest} hk`:'–'}</td></tr>`}).join('');
 h+=`<section class="panel"><header><h2>2 · Kirim ke finishing & kepulangan dari vendor</h2><span class="hint">target: HDG ${T.hdg} · ELG ${T.elg} · PDC ${T.pdc} · lain ${T.lain} hari kerja</span></header>
  <div class="kpis inner">${kp('',`Produksi selesai → kirim vendor`,r1(K.avgWait),'hk',`${K.waits.length} SPK dengan tanggal produksi tercatat`)}${kp('','Lama di vendor',r1(K.avgTurn),'hk',`${K.vDone.length} SJ kembali penuh`)}${kp(K.VL.some(o=>o.late)?'crit':'ok','Melewati target, belum kembali',K.VL.filter(o=>o.late).length,'SJ',`${K.VL.filter(o=>!o.done).length} SJ masih di vendor`)}</div>
  ${vRows?`<div class="tbl-wrap"><table><thead><tr><th>Vendor</th><th class="num">SJ</th><th class="num">Qty kirim</th><th class="num">Kembali OK</th><th class="num">Reject</th><th class="num">Rata-rata di vendor</th><th class="num">Tepat target</th><th class="num">Masih di vendor</th></tr></thead><tbody>${vRows}</tbody></table></div>`:empty('Belum ada kiriman vendor','Kiriman ke vendor finishing di periode ini akan muncul di sini.')}
  <div class="pbody note">* Sebagian tanggal kembali dari data lama tidak tercatat, jadi diestimasi = tanggal kirim customer pertama setelahnya. Penerimaan baru lewat tombol Terima kembali selalu tercatat tanggal & qty per item.</div></section>`;
 // 3 logistics
 const lateRows=K.kir.filter(f=>!f.otd).sort((a,b)=>b.lateK-a.lateK).slice(0,8).map(f=>`<tr class="click" data-act="openspk" data-id="${f.s._id}"><td class="mono"><b>${f.s.no}</b></td><td>${esc(f.s.customer)}</td><td>${fd(f.s.due)}</td><td>${fd(f.Kfull)}</td><td class="num bad">+${f.lateK} hk</td><td class="num">${f.dKirim==null?'–':f.dKirim+' hk'}</td></tr>`).join('');
 const openRows=K.lateOpen.sort((a,b)=>a.s.due.localeCompare(b.s.due)).slice(0,8).map(f=>`<tr class="click" data-act="openspk" data-id="${f.s._id}"><td class="mono"><b>${f.s.no}</b></td><td>${esc(f.s.customer)}</td><td>${fd(f.s.due)}</td><td>${chip(f.stage,STAGE_CLS[f.stage])}</td><td class="num bad">+${wd(f.s.due,today())} hk</td></tr>`).join('');
 h+=`<section class="panel"><header><h2>3 · Kecepatan & ketepatan kirim ke customer</h2><span class="hint">tepat waktu = surat jalan terakhir ≤ due date SPK</span></header>
  <div class="kpis inner">${kp(cls(K.otd.length,K.kir.length),'On-time delivery',pctTxt(K.otd.length,K.kir.length),'',`rata-rata telat ${r1(K.avgLate)} hk bila telat`)}${kp('','Barang siap → surat jalan',r1(K.avgKirim),'hk',`${K.kSpeed.length} SPK terukur · target ${T.kirim} hk`)}${kp('','Surat jalan → diterima',r1(K.avgTransit),'hk',`${K.transit.length} dari ${K.sjs.length} SJ ada tanggal terima`)}</div>
  <div class="ana"><div class="ana-c"><h3>Terkirim tapi telat</h3>${lateRows?`<div class="tbl-wrap"><table><thead><tr><th>SPK</th><th>Customer</th><th>Due</th><th>Kirim penuh</th><th class="num">Telat</th><th class="num">Siap→kirim</th></tr></thead><tbody>${lateRows}</tbody></table></div>`:'<p class="note">Tidak ada.</p>'}</div>
  <div class="ana-c"><h3>Lewat due, belum terkirim penuh</h3>${openRows?`<div class="tbl-wrap"><table><thead><tr><th>SPK</th><th>Customer</th><th>Due</th><th>Posisi</th><th class="num">Lewat</th></tr></thead><tbody>${openRows}</tbody></table></div>`:'<p class="note">Tidak ada.</p>'}</div></div></section>`;
 return h;
}
function kpiVendor(name){openDrawer(()=>{const K=spkKpi(F.spk.p);const L=K.VL.filter(o=>(o.v.vendor||'(tanpa nama)')===name).sort((a,b)=>b.v.tgl.localeCompare(a.v.tgl));
 return {t:esc(name),s:`Kiriman finishing · ${esc(K.lbl)}`,b:`<div class="tbl-wrap"><table><thead><tr><th>SJ</th><th>SPK</th><th>Kirim</th><th>Kembali</th><th class="num">Durasi</th><th>Target</th><th></th></tr></thead><tbody>${L.map(o=>`<tr class="click" data-act="openvendor" data-id="${o.v._id}"><td class="mono">${esc(o.v.noSJ||'')}<div class="note">${esc(o.v.proses||'')}</div></td><td>${esc(spkName(o.v.spk))}</td><td>${fd(o.v.tgl)}</td><td>${o.done?fd(o.last)+(o.est?' <span class="note">est.</span>':''):`<span class="note">sisa ${n(o.sisa)}</span>`}</td><td class="num">${o.turn!=null?o.turn+' hk':o.age+' hk'+(o.done?'':' …')}</td><td>${o.tDays} hk</td><td>${o.done?okChip(o.ok):o.late?chip('Lewat target','crit'):chip('Di vendor','warn')}</td></tr>`).join('')}</tbody></table></div>`}})}
function spkTargetForm(){const T=SPKT();
 openModal('Target waktu proses (hari kerja)',fld('Produksi (dari tanggal SPK)',inp('prod',T.prod,'number','min="0"'))+fld('Siap → surat jalan customer',inp('kirim',T.kirim,'number','min="0"'))+
  fld('Vendor HDG',inp('hdg',T.hdg,'number','min="0"'))+fld('Vendor ELG',inp('elg',T.elg,'number','min="0"'))+fld('Vendor Powder Coating',inp('pdc',T.pdc,'number','min="0"'))+fld('Vendor proses lain',inp('lain',T.lain,'number','min="0"'))+
  `<div class="note full">Hari kerja = Senin–Jumat. Bila form Kirim ke vendor mengisi "Target kembali", tanggal itu yang dipakai untuk SJ tersebut. Ketepatan kirim customer selalu dibandingkan dengan due date SPK.</div>`,
  async d=>{const spkT={};for(const k in SPKT_DEF)spkT[k]=Math.max(0,num0(d[k]));need('master',{},'setting');const cur={...(byId('master','setting')||{})};delete cur._id;await DB.doc('master/setting').set({...cur,spkT});})}

/* ---------- drawer timeline ---------- */
function spkFlowHtml(id){
 const f=flow(id);if(!f)return '';const s=f.s,T=SPKT();
 const dl2=(kind,ref)=>`<span class="docb"><button class="btn sm ghost" data-act="doc" data-kind="${kind}" data-ref="${esc(ref)}" data-fmt="xlsx" title="Unduh Excel">${ic('dl')}Excel</button><button class="btn sm ghost" data-act="doc" data-kind="${kind}" data-ref="${esc(ref)}" data-fmt="pdf" title="Unduh PDF">${ic('file')}PDF</button></span>`;
 const step=(st,title,meta,docs,extra='')=>`<div class="tl ${st}"><span class="dot"></span><div class="tlb"><div class="tlt">${title}</div><div class="tlm">${meta}</div>${extra}${docs?`<div class="tld">${docs}</div>`:''}</div></div>`;
 let h='';
 h+=step(s.terbitAt||s.status!=='Draft'?'done':'now',`SPK ${(s.status||'Terbit')==='Draft'?'draft':'terbit'} <span class="note">${fd(s.tgl)}</span>`,`Due ${fd(s.due)} · ${esc(s.lead||'')}`,`<span class="docn">Surat Perintah Kerja</span>`+dl2('spk',id));
 const pSt=f.x.pP>=1?'done':f.x.pP>0?'now':'todo';
 h+=step(pSt,`Produksi ${f.x.pP>=1?'selesai':Math.round(f.x.pP*100)+'%'} ${f.P?`<span class="note">${fd(f.P)}${f.Pest?' · est. '+f.Pest:''}</span>`:f.x.pP>=1?'<span class="note">tanggal tidak tercatat</span>':''}`,f.P?`${f.dProd} hari kerja · target ${T.prod} ${okChip(f.okProd)}`:f.x.pP>=1?'update berikutnya akan menyimpan tanggal':`berjalan ${Math.max(0,wd(s.tgl,today()))} hari kerja · target ${T.prod}`,`<span class="docn">Laporan Progres Produksi · ${f.log.length} update</span>`+dl2('lpp',id));
 if(f.vend.length)f.vend.forEach(o=>{
  h+=step(o.done?'done':'now',`Kirim ke ${esc(o.v.vendor||'vendor')} <span class="note">${fd(o.v.tgl)} · ${esc(o.v.proses||'')}</span>`,`${n(o.out)} pcs · ${esc(o.v.noSJ||'')}${f.dWaitV!=null&&o===f.vend[0]?` · ${f.dWaitV} hk setelah produksi selesai`:''}`,`<span class="docn">Surat Jalan Vendor</span>`+dl2('sjv',o.v._id));
  o.R.forEach(r=>h+=step('done',`Kembali dari ${esc(o.v.vendor||'vendor')} <span class="note">${r.tgl?fd(r.tgl):'tgl tidak tercatat'}${r.est?' · est.':''}</span>`,`${n(sumBy(Object.values(r.items||{}),q=>q))} OK${sumBy(Object.values(r.rej||{}),q=>q)?` · <b style="color:var(--crit)">${n(sumBy(Object.values(r.rej||{}),q=>q))} reject</b>`:''}${r.ket?' · '+esc(r.ket):''}`,`<span class="docn">Bukti Terima Barang</span>`+dl2('btb',o.v._id+'|'+r.k)));
  if(!o.done)h+=step(o.late?'late':'now',`Menunggu kembali dari ${esc(o.v.vendor||'vendor')}`,`sisa ${n(o.sisa)} · ${o.age} hk di vendor · target ${o.tDays} hk ${o.late?chip('Lewat target','crit'):''}`,'');
  else h=h.replace(/<\/div><\/div>$/,`<div class="tlm">Durasi di vendor <b>${o.turn==null?'–':o.turn+' hk'}</b> · target ${o.tDays} hk ${okChip(o.ok)}</div></div></div>`);
 });
 else h+=step(f.x.pP>=1?'skip':'todo','Kirim ke vendor finishing','belum ada pengiriman ke vendor','');
 if(f.ks.length)f.ks.forEach(k=>h+=step(k.status==='Diterima'?'done':'now',`Surat jalan ke customer <span class="note">${fd(k.tgl)}</span>`,`${esc(k.noSJ||'')} · ${n(sumBy(k.items||[],i=>i.q))} pcs · ${esc(k.status)}${k.tglTerima?' '+fd(k.tglTerima):''}${k.nopol?' · '+esc(k.nopol):''}`,`<span class="docn">Surat Jalan</span>`+dl2('sjc',k._id)));
 else h+=step('todo','Kirim ke customer','belum ada surat jalan','');
 h+=step(f.Kfull?(f.otd?'done':'late'):s.due&&s.due<today()?'late':'todo',f.Kfull?`Terkirim penuh <span class="note">${fd(f.Kfull)}</span>`:'Belum terkirim penuh',f.Kfull?`due ${fd(s.due)} ${okChip(f.otd,'Tepat waktu','Telat '+f.lateK+' hk')} · siklus ${f.cycle} hk${f.dKirim!=null?` · siap→kirim ${f.dKirim} hk ${okChip(f.okKirim)}`:''}`:`due ${fd(s.due)}${s.due&&s.due<today()?` · <b style="color:var(--crit)">lewat ${wd(s.due,today())} hk</b>`:''}`,'');
 return `<div class="tlw">${h}</div>`;
}

/* ---------- document engine (Excel + PDF from one model) ---------- */
const CO={nama:'PT. MITRA NUSA INTERNASIONAL',a1:'Ruko Gravitas B2 No.1, Lavon, Wana Kerta',a2:'Kec. Sindang Jaya, Kab. Tangerang'};
const fnSafe=s=>String(s).replace(/[\\/:*?"<>|]/g,'-').slice(0,90);
function docModel(kind,ref){
 const T=SPKT();
 if(kind==='spk'){const s=byId('spk',ref);return s?{special:'spk',file:`SPK ${s.no}${s.rev?' Rev.'+s.rev:''} - ${s.customer}`}:null}
 if(kind==='lpp'){const s=byId('spk',ref);if(!s)return null;const f=flow(ref);
  const log=f.log;
  return {file:`Laporan Produksi SPK ${s.no} - ${s.customer}`,title:'LAPORAN PROGRES PRODUKSI',no:`LPP/${s.no}/${today().slice(0,4)}`,date:today(),
   meta:[['No SPK',s.nomor||String(s.no)],['Customer',s.customer],['Tanggal SPK',tglLong(s.tgl)],['PO',s.po||'-'],['Due date',tglLong(s.due)],['Lead time',s.lead||'-'],['Selesai produksi',f.P?tglLong(f.P)+(f.Pest?' (estimasi)':''):'Belum selesai'],['Durasi produksi',f.dProd==null?'-':`${f.dProd} hari kerja (target ${T.prod})`]],
   tables:[{title:'Progres per item',cols:[['No',6,'c'],['Item',60,'l'],['Order',12,'r'],['Satuan',10,'c'],['Diproduksi',14,'r'],['Sisa',12,'r'],['Progres',12,'r']],
     rows:f.x.lines.map((l,i)=>[i+1,l.d,l.q,l.u||'',l.prodEff,Math.max(0,l.q-l.prodEff),Math.round(pct(l.prodEff,l.q)*100)+'%']),
     foot:['','TOTAL',f.x.q,'',f.x.prod,Math.max(0,f.x.q-f.x.prod),Math.round(f.x.pP*100)+'%']},
    {title:'Riwayat update produksi',cols:[['Tanggal',16,'c'],['Diinput',22,'c'],['Total diproduksi',18,'r'],['Catatan',70,'l']],
     rows:log.length?log.map(e=>[fdS(e.tgl),e.at?new Date(e.at).toLocaleString('id-ID',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'}):'',sumBy(e.items||[],i=>i.q),e.ket||'']):[['-','-','-','Belum ada update bertanggal. Update berikutnya lewat tombol Update progres produksi akan tercatat di sini.']]}],
   note:s.alasan?'Kendala: '+s.alasan:'',signs:['Dibuat oleh,\nAdmin Produksi','Diperiksa,\nKepala Produksi','Mengetahui,\nPPIC']}}
 if(kind==='sjv'){const v=byId('vendor',ref);if(!v)return null;const s=byId('spk',v.spk)||{};const tgt=v.target||addWorkdays(v.tgl,T[vKey(v.proses)]);
  return {file:`SJ Vendor ${v.noSJ||''} - ${v.vendor||''}`,title:'SURAT JALAN KE VENDOR',no:v.noSJ||'',date:v.tgl,
   meta:[['Kepada',v.vendor||'-'],['Proses',v.proses||'-'],['Tanggal kirim',tglLong(v.tgl)],['Target kembali',tglLong(tgt)+(v.target?'':' (standar)')],['Ref SPK',s.nomor||(s.no?String(s.no):'-')],['Customer akhir',s.customer||'-'],['Kendaraan',[v.kendaraan,v.nopol].filter(Boolean).join(' · ')||'-'],['Driver',v.driver||'-']],
   tables:[{cols:[['No',6,'c'],['Nama barang',70,'l'],['Qty',12,'r'],['Satuan',10,'c'],['Keterangan',30,'l']],rows:(v.items||[]).map((i,k)=>[k+1,i.d,+i.q||0,i.u||'',v.rework?'Rework':'']),foot:['','TOTAL',sumBy(v.items||[],i=>i.q),'','']}],
   note:[v.ket,v.batal?'DIBATALKAN: '+v.batal.alasan:''].filter(Boolean).join(' · '),signs:['Pengirim,\nGudang MNI','Pengemudi','Penerima,\n'+(v.vendor||'Vendor')]}}
 if(kind==='btb'){const [vid,k]=String(ref).split('|');const v=byId('vendor',vid);if(!v)return null;const R=vReturns(v);const r=R.find(x=>String(x.k)===String(k));if(!r)return null;const s=byId('spk',v.spk)||{};
  const idx=r.k>=0?r.k+1:0;
  return {file:`BTB ${v.noSJ||''}-${idx||'lama'} - ${v.vendor||''}`,title:'BUKTI TERIMA BARANG DARI VENDOR',no:`BTB/${v.noSJ||''}/${idx||'-'}`,date:r.tgl,
   meta:[['Dari vendor',v.vendor||'-'],['Proses',v.proses||'-'],['Tanggal terima',r.tgl?tglLong(r.tgl)+(r.est?' (estimasi)':''):'Tidak tercatat'],['Ref SJ vendor',v.noSJ||'-'],['Tanggal kirim',tglLong(v.tgl)],['Lama di vendor',r.tgl?wd(v.tgl,r.tgl)+' hari kerja':'-'],['Ref SPK',s.nomor||(s.no?String(s.no):'-')],['Customer akhir',s.customer||'-']],
   tables:[{cols:[['No',6,'c'],['Nama barang',62,'l'],['Dikirim',12,'r'],['Diterima OK',14,'r'],['Reject',12,'r'],['Sisa di vendor',14,'r'],['Satuan',10,'c']],
    rows:(v.items||[]).filter(i=>(r.items||{})[i.d]||(r.rej||{})[i.d]).map((i,n2)=>[n2+1,i.d,+i.q||0,(r.items||{})[i.d]||0,(r.rej||{})[i.d]||0,Math.max(0,(+i.q||0)-(+i.kembali||0)-(+i.reject||0)),i.u||'']),
    foot:['','TOTAL','',sumBy(Object.values(r.items||{}),q=>q),sumBy(Object.values(r.rej||{}),q=>q),'','']}],
   note:[r.ket,r.est?'Data penerimaan lama: tanggal diestimasi dari surat jalan customer pertama setelahnya.':''].filter(Boolean).join(' · '),signs:['Diserahkan,\n'+(v.vendor||'Vendor'),'Diterima,\nGudang MNI','Diperiksa,\nQC']}}
 if(kind==='sjc'){const k=byId('kirim',ref);if(!k)return null;const s=byId('spk',k.spk)||{};const cu=mList('customer').find(x=>x.nama===k.customer)||{};
  return {file:`Surat Jalan ${k.noSJ||''} - ${k.customer||''}`,title:'SURAT JALAN',no:k.noSJ||'',date:k.tgl,
   meta:[['Kepada',k.customer||'-'],['Alamat',cu.alamat||'-'],['Tanggal',tglLong(k.tgl)],['No PO',s.po||'-'],['Ref SPK',s.nomor||(s.no?String(s.no):'-')],['Kendaraan',[k.kendaraan,k.nopol].filter(Boolean).join(' · ')||'-'],['Driver',k.driver||'-'],['Status',k.status+(k.tglTerima?' '+tglLong(k.tglTerima):'')]],
   tables:[{cols:[['No',6,'c'],['Nama barang',72,'l'],['Qty',12,'r'],['Satuan',10,'c'],['Keterangan',28,'l']],rows:(k.items||[]).map((i,n2)=>[n2+1,i.d,+i.q||0,i.u||'','']),foot:['','TOTAL',sumBy(k.items||[],i=>i.q),'','']}],
   note:[k.ket,k.batal?'DIBATALKAN: '+k.batal.alasan:''].filter(Boolean).join(' · '),signs:['Hormat kami,\nPT Mitra Nusa Internasional','Pengemudi','Diterima oleh,\n'+(k.customer||'Customer')]}}
 if(kind==='kpi'){const K=spkKpi(F.spk.p);
  return {file:`Laporan KPI SPK ${K.a}_${K.b}`,title:'LAPORAN KPI PRODUKSI, VENDOR & PENGIRIMAN',no:`KPI/${today()}`,date:today(),landscape:true,
   meta:[['Periode',`${K.a==='0000-00-00'?'Semua':tglLong(K.a)} s/d ${tglLong(K.b)}`],['Jumlah SPK',String(K.Fl.length)],['OTD (kirim tepat due)',`${pctTxt(K.otd.length,K.kir.length)} (${K.otd.length}/${K.kir.length})`],['Produksi tepat target',`${pctTxt(K.prodOk.length,K.prod.length)} · rata-rata ${r1(K.avgProd)} hk`],['Vendor tepat target',`${pctTxt(K.vDone.filter(o=>o.ok).length,K.vDone.length)} · rata-rata ${r1(K.avgTurn)} hk`],['Siap → kirim customer',`rata-rata ${r1(K.avgKirim)} hk`],['Siklus SPK → terkirim',`rata-rata ${r1(K.avgCycle)} hk`],['Target (hk)',`Produksi ${K.T.prod} · HDG ${K.T.hdg} · ELG ${K.T.elg} · PDC ${K.T.pdc} · Kirim ${K.T.kirim}`]],
   tables:[{title:'Kinerja vendor finishing',cols:[['Vendor',36,'l'],['Proses',20,'l'],['SJ',8,'r'],['Qty kirim',12,'r'],['Kembali OK',12,'r'],['Reject',10,'r'],['Rata2 hk',11,'r'],['Tepat target',12,'r'],['Masih di vendor',14,'r']],
     rows:K.byV.map(z=>[z.k,[...z.proses].join(', '),z.sj,z.out,z.back,z.rej,r1(avgOf(z.turns)),z.meas?pctTxt(z.ok,z.meas):'-',z.open?`${z.open} SJ / ${z.oldest} hk`:'-'])},
    {title:'Detail per SPK',cols:[['SPK',10,'c'],['Customer',38,'l'],['Tgl SPK',12,'c'],['Due',12,'c'],['Produksi selesai',15,'c'],['Durasi prod.',11,'r'],['Kembali vendor',15,'c'],['Kirim penuh',13,'c'],['Siap→kirim',11,'r'],['Ketepatan',14,'c'],['Posisi',14,'c']],
     rows:K.Fl.slice().sort((a,b)=>b.s.no-a.s.no).map(f=>[f.s.no,f.s.customer,fdS(f.s.tgl),fdS(f.s.due),f.P?fdS(f.P)+(f.Pest?'*':''):'-',f.dProd==null?'-':f.dProd,f.Rfull?fdS(f.Rfull)+(f.Rest?'*':''):f.vend.length?'-':'n/a',f.Kfull?fdS(f.Kfull):'-',f.dKirim==null?'-':f.dKirim,f.otd==null?(f.s.due&&f.s.due<today()?'Lewat due':'-'):f.otd?'Tepat':'Telat '+f.lateK+' hk',f.stage])}],
   note:'hk = hari kerja (Senin–Jumat). * = tanggal diestimasi dari data lama.',signs:['Disiapkan,\nPPIC','Diperiksa,\nKepala Produksi','Mengetahui,\nDirektur Operasional']}}
 return null;
}
async function docXlsx(m){
 const X=await loadExcelJS();const wb=new X.Workbook();wb.creator='MNI Gudang & Logistik';
 const ws=wb.addWorksheet((m.title||'Dokumen').slice(0,28),{pageSetup:{paperSize:9,orientation:m.landscape?'landscape':'portrait',fitToPage:true,fitToWidth:1,fitToHeight:0,margins:{left:.4,right:.4,top:.5,bottom:.5,header:.2,footer:.2}},views:[{showGridLines:false}]});
 const t0=m.tables[0];const nc=Math.max(...m.tables.map(t=>t.cols.length),4);
 const W=m.tables.reduce((a,t)=>t.cols.length===nc?t.cols.map(c=>c[1]):a,t0.cols.map(c=>c[1]));for(let i=0;i<nc;i++)ws.getColumn(i+1).width=Math.max(8,(W[i]||14)*.9);
 const thin={style:'thin',color:{argb:'FF000000'}},box={top:thin,left:thin,bottom:thin,right:thin};
 const F_=(o={})=>({name:'Arial',size:o.sz||10,bold:!!o.b,italic:!!o.i,color:{argb:o.c||'FF000000'}});
 const put=(r,c,v,o={})=>{const x=ws.getCell(r,c);x.value=v;x.font=F_(o);x.alignment={horizontal:o.h||'left',vertical:'middle',wrapText:true};if(o.box)x.border=box;if(o.fill)x.fill={type:'pattern',pattern:'solid',fgColor:{argb:o.fill}};if(o.nf)x.numFmt=o.nf;return x};
 const id=wb.addImage({base64:LOGO_B64,extension:'png'});ws.addImage(id,{tl:{col:0.1,row:0.15},ext:{width:170,height:45}});
 ws.getRow(1).height=20;ws.getRow(2).height=15;ws.getRow(3).height=15;
 ws.mergeCells(1,3,1,nc);put(1,3,CO.nama,{b:true,sz:14,h:'right'});ws.mergeCells(2,3,2,nc);put(2,3,CO.a1,{sz:9,h:'right'});ws.mergeCells(3,3,3,nc);put(3,3,CO.a2,{sz:9,h:'right'});
 for(let c=1;c<=nc;c++)ws.getCell(4,c).border={bottom:{style:'medium',color:{argb:'FF1F3A6E'}}};
 ws.getRow(6).height=24;ws.mergeCells(6,1,6,nc);put(6,1,m.title,{b:true,sz:15,h:'center'});
 ws.mergeCells(7,1,7,nc);put(7,1,'No: '+(m.no||'-'),{sz:10,h:'center',c:'FF444444'});
 let r=9;const half=Math.ceil(nc/2);
 for(let i=0;i<m.meta.length;i+=2){[0,1].forEach(j=>{const kv=m.meta[i+j];if(!kv)return;const c0=j?half+1:1,c1=j?nc:half;put(r,c0,kv[0],{sz:9,c:'FF555555'});if(c1>c0+1){ws.mergeCells(r,c0+1,r,c1);}put(r,c0+1,kv[1],{b:true,sz:10})});r++}
 r++;
 for(const t of m.tables){
  if(t.title){ws.mergeCells(r,1,r,nc);put(r,1,t.title,{b:true,sz:11});r++}
  t.cols.forEach((c,i)=>put(r,i+1,c[0],{b:true,box:true,fill:'FFDCE5F4',h:'center'}));ws.getRow(r).height=20;r++;
  for(const row of t.rows){row.forEach((v,i)=>{const al=(t.cols[i]||[])[2];put(r,i+1,v,{box:true,h:al==='r'?'right':al==='c'?'center':'left',nf:typeof v==='number'&&al==='r'?'#,##0.##':undefined})});r++}
  if(t.foot){t.foot.forEach((v,i)=>{const al=(t.cols[i]||[])[2];put(r,i+1,v,{b:true,box:true,fill:'FFF2F4F8',h:al==='r'?'right':al==='c'?'center':'left',nf:typeof v==='number'?'#,##0.##':undefined})});r++}
  r++;
 }
 if(m.note){ws.mergeCells(r,1,r,nc);put(r,1,'Catatan: '+m.note,{i:true,sz:9});ws.getRow(r).height=30;r+=2}
 if(m.signs){const per=Math.max(1,Math.floor(nc/m.signs.length));m.signs.forEach((sg,i)=>{const c0=1+i*per,c1=i===m.signs.length-1?nc:c0+per-1;if(c1>c0){ws.mergeCells(r,c0,r,c1);ws.mergeCells(r+4,c0,r+4,c1)}put(r,c0,sg,{h:'center',sz:9.5});ws.getRow(r).height=28;put(r+4,c0,'( ............................ )',{h:'center'})});r+=6}
 ws.mergeCells(r,1,r,nc);put(r,1,`Dicetak dari MNI Gudang & Logistik · ${new Date().toLocaleString('id-ID')}`,{sz:8,c:'FF888888',i:true});
 return new Uint8Array(await wb.xlsx.writeBuffer());
}
let PDFL=null,H2C=null;
const loadScript=(urls,test)=>urls.reduce((p,u)=>p.catch(()=>new Promise((res,rej)=>{const s=document.createElement('script');s.src=u;s.onload=()=>test()?res(test()):rej(new Error('lib'));s.onerror=()=>rej(new Error('Gagal memuat '+u));document.head.appendChild(s)})),Promise.reject());
function loadPdf(){if(PDFL)return PDFL;PDFL=loadScript(['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js'],()=>window.jspdf&&window.jspdf.jsPDF)
 .then(()=>loadScript(['https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js','https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js'],()=>window.jspdf.jsPDF.API.autoTable&&window.jspdf.jsPDF)).catch(e=>{PDFL=null;throw e});return PDFL}
function loadH2C(){if(H2C)return H2C;H2C=loadScript(['https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js','https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js'],()=>window.html2canvas).catch(e=>{H2C=null;throw e});return H2C}
async function docPdf(m){
 const fx=v=>typeof v==='string'?v.replace(/→/g,'->').replace(/≤/g,'<=').replace(/≥/g,'>=').replace(/×/g,'x'):v;m={...m,title:fx(m.title),note:fx(m.note),meta:m.meta.map(r=>r.map(fx)),tables:m.tables.map(t=>({...t,title:fx(t.title),cols:t.cols.map(c=>[fx(c[0]),c[1],c[2]]),rows:t.rows.map(r=>r.map(fx)),foot:t.foot&&t.foot.map(fx)}))};
 const jsPDF=await loadPdf();const doc=new jsPDF({orientation:m.landscape?'landscape':'portrait',unit:'mm',format:'a4'});
 const PW=doc.internal.pageSize.getWidth(),M=12;
 doc.addImage('data:image/png;base64,'+LOGO_B64,'PNG',M,9,46,12.3);
 doc.setFont('helvetica','bold');doc.setFontSize(12.5);doc.text(CO.nama,PW-M,13,{align:'right'});doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(90);doc.text(CO.a1,PW-M,17.5,{align:'right'});doc.text(CO.a2,PW-M,21,{align:'right'});
 doc.setDrawColor(31,58,110);doc.setLineWidth(.6);doc.line(M,24.5,PW-M,24.5);
 doc.setTextColor(0);doc.setFont('helvetica','bold');doc.setFontSize(14);doc.text(m.title,PW/2,33,{align:'center'});doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor(70);doc.text('No: '+(m.no||'-'),PW/2,38.5,{align:'center'});doc.setTextColor(0);
 const mrows=[];for(let i=0;i<m.meta.length;i+=2){const a=m.meta[i],b=m.meta[i+1]||['',''];mrows.push([a[0],a[1],b[0],b[1]])}
 doc.autoTable({startY:42,body:mrows,theme:'plain',styles:{fontSize:8.8,cellPadding:{top:.8,bottom:.8,left:1,right:1}},columnStyles:{0:{textColor:90,cellWidth:30},1:{fontStyle:'bold'},2:{textColor:90,cellWidth:30},3:{fontStyle:'bold'}},margin:{left:M,right:M}});
 let y=doc.lastAutoTable.finalY+4;
 for(const t of m.tables){
  if(t.title){doc.setFont('helvetica','bold');doc.setFontSize(10);doc.text(t.title,M,y+3);y+=5}
  const tw=t.cols.reduce((a,c)=>a+c[1],0),avail=PW-2*M;
  const cs={};t.cols.forEach((c,i)=>cs[i]={cellWidth:c[1]/tw*avail,halign:c[2]==='r'?'right':c[2]==='c'?'center':'left'});
  const fmt=v=>typeof v==='number'?n(v):String(v??'');
  doc.autoTable({startY:y,head:[t.cols.map(c=>c[0])],body:t.rows.map(r=>r.map(fmt)),foot:t.foot?[t.foot.map(fmt)]:undefined,theme:'grid',
   styles:{fontSize:8.5,cellPadding:1.6,lineColor:[60,60,60],lineWidth:.15,textColor:20,overflow:'linebreak'},headStyles:{fillColor:[220,229,244],textColor:20,fontStyle:'bold',halign:'center'},footStyles:{fillColor:[242,244,248],textColor:20,fontStyle:'bold'},columnStyles:cs,margin:{left:M,right:M},showFoot:'lastPage'});
  y=doc.lastAutoTable.finalY+6;
 }
 const PH=doc.internal.pageSize.getHeight();
 if(m.note){doc.setFont('helvetica','italic');doc.setFontSize(8.5);const ln=doc.splitTextToSize('Catatan: '+m.note,PW-2*M);if(y+ln.length*4>PH-40){doc.addPage();y=20}doc.text(ln,M,y);y+=ln.length*4+4}
 if(m.signs){if(y>PH-42){doc.addPage();y=20}const w=(PW-2*M)/m.signs.length;doc.setFont('helvetica','normal');doc.setFontSize(9);m.signs.forEach((sg,i)=>{const cx=M+w*i+w/2;doc.text(sg.split('\n'),cx,y+3,{align:'center'});doc.text('( .............................. )',cx,y+28,{align:'center'})})}
 const np=doc.getNumberOfPages();for(let i=1;i<=np;i++){doc.setPage(i);doc.setFont('helvetica','italic');doc.setFontSize(7);doc.setTextColor(140);doc.text(`Dicetak dari MNI Gudang & Logistik · ${new Date().toLocaleString('id-ID')} · Hal ${i}/${np}`,M,PH-6)}
 return new Uint8Array(doc.output('arraybuffer'));
}
async function spkSheetPdf(id){
 const prev=SHEET;if(SHEET!==id)openSheet(id);await new Promise(r=>setTimeout(r,80));
 const el=document.querySelector('#sheet .paper');if(!el)throw new Error('Format SPK tidak tampil.');
 const [h2c,jsPDF]=await Promise.all([loadH2C(),loadPdf()]);
 el.classList.add('pdfmode');let cv;try{cv=await h2c(el,{scale:2,windowWidth:el.scrollWidth+40,width:el.scrollWidth,height:el.scrollHeight,backgroundColor:'#ffffff',useCORS:true,logging:false})}finally{el.classList.remove('pdfmode')}
 const doc=new jsPDF({orientation:'landscape',unit:'mm',format:'a4'});const PW=doc.internal.pageSize.getWidth(),PH=doc.internal.pageSize.getHeight(),M=6;
 const r=Math.min((PW-2*M)/cv.width,(PH-2*M)/cv.height);const w=cv.width*r,h=cv.height*r;
 doc.addImage(cv.toDataURL('image/jpeg',.92),'JPEG',(PW-w)/2,M,w,h);
 return new Uint8Array(doc.output('arraybuffer'));
}
async function downloadDoc(kind,ref,fmt){
 if(!DLS){toast('Unduhan tidak tersedia di tampilan ini.');return}
 const m=docModel(kind,ref);if(!m){toast('Data dokumen tidak ditemukan.');return}
 toast(`Menyiapkan ${fmt==='pdf'?'PDF':'Excel'}…`);
 try{let data;
  if(m.special==='spk'){if(fmt==='xlsx'){await exportSpkXlsx(ref);return}data=await spkSheetPdf(ref)}
  else data=fmt==='pdf'?await docPdf(m):await docXlsx(m);
  await DLS.save({filename:fnSafe(m.file)+(fmt==='pdf'?'.pdf':'.xlsx'),data});
 }catch(e){if(e.code!=='declined')toast('Gagal membuat dokumen: '+(e.message||e.code))}
}

document.addEventListener('click',async e=>{
 const el=e.target.closest('[data-act]');if(!el)return;const a=el.dataset.act,ds=el.dataset;
 if(a!=='del'&&delArm){delArm=null}
 try{
 switch(a){
  case 'filt':{let v=ds.val;if(v==='true')v=true;else if(v==='false')v=false;F[ds.view][ds.key]=v;renderTools();renderBody();break}
  case 'go':location.hash=ds.href;if(ds.open){const[k,id]=ds.open.split(':');setTimeout(()=>k==='spk'?spkDrawer(id):vendorDrawer(id),30)}break;
  case 'mv':mvForm(ds.g,ds.j,ds.item);break;
  case 'newitem':newItemForm(ds.g);break;
  case 'kartu':kartu(ds.g,ds.id);break;
  case 'editbuf':bufForm(ds.id);break;
  case 'csv':exportCsv(ds.what);break;
  case 'newbm':bmForm();break;
  case 'openbm':if(!e.target.closest('button'))bmDrawer(ds.id);break;
  case 'printbm':printBmChecklist(ds.id);break;
  case 'bmstep':{const b=byId('bongkar',ds.id);const t=nowTime();await updDoc('bongkar',ds.id,ds.to==='Proses'?{status:'Proses',jamMulai:t}:{status:'Selesai',jamSelesai:t,jamMulai:b.jamMulai||b.jamMasuk});toast(ds.to==='Proses'?'Mulai dikerjakan':'Bongkar muat selesai');break}
  case 'bmkoreksi':bmKoreksiForm(ds.id);break;
  case 'newvendor':vendorForm(ds.spk);break;
  case 'terima':terimaForm(ds.id);break;
  case 'openvendor':if(!e.target.closest('button'))vendorDrawer(ds.id);break;
  case 'newkirim':kirimForm(ds.spk);break;
  case 'openkirim':if(!e.target.closest('button'))kirimDrawer(ds.id);break;
  case 'kstep':{const up={status:ds.to};if(ds.to==='Diterima')up.tglTerima=today();await updDoc('kirim',ds.id,up);toast('Status: '+ds.to);break}
  case 'newspk':openEditor(newEd());break;
  case 'spksheet':openSheet(ds.id);break;
  case 'spkedit':{const s=byId('spk',ds.id);if(s)openEditor(edFrom(s,false));break}
  case 'spkdup':{const s=byId('spk',ds.id);if(s){closeSheet();openEditor(edFrom(s,true))}break}
  case 'spkxlsx':exportSpkXlsx(ds.id);break;
  case 'spkpub':await publishDraft(ds.id);break;
  case 'sheet-close':closeSheet();break;
  case 'ed-close':if(EDDIRTY&&!el.dataset.sure){el.dataset.sure='1';el.textContent='Klik lagi: buang perubahan';return}closeEditor();break;
  case 'ed-save':saveEditor(ds.mode);break;
  case 'ed-addline':ED.sections[+ds.s].lines.push(blankLine());rerenderSecs();{const x=$(`#ed-d-${ds.s}-${ED.sections[+ds.s].lines.length-1}`);x&&x.focus()}break;
  case 'ed-delline':{const L=ED.sections[+ds.s].lines;L.splice(+ds.l,1);if(!L.length)L.push(blankLine());EDDIRTY=true;rerenderSecs();break}
  case 'ed-addsec':ED.sections.push({h:ED.sections[ED.sections.length-1].h,lines:[blankLine(),blankLine()]});EDDIRTY=true;rerenderSecs();break;
  case 'ed-addacc':ED.sections.push({h:accsOf(ED.sections[ED.sections.length-1].h),lines:[blankLine(),blankLine()]});EDDIRTY=true;rerenderSecs();break;
  case 'ed-delsec':if(ED.sections.length>1){ED.sections.splice(+ds.s,1);EDDIRTY=true;edAuto();edSyncHeader();rerenderSecs()}break;
  case 'ed-up':case 'ed-down':{const i=+ds.s,j=a==='ed-up'?i-1:i+1;if(j>=0&&j<ED.sections.length){[ED.sections[i],ED.sections[j]]=[ED.sections[j],ED.sections[i]];EDDIRTY=true;rerenderSecs()}break}
  case 'openspk':spkDrawer(ds.id);break;
  case 'prod':prodForm(ds.id);break;
  case 'prodall':document.querySelectorAll('#mform [name^="p_"]').forEach(inpEl=>{const q=parseFloat(inpEl.max);if(q>0)inpEl.value=q});break; /* B-006: sebelumnya membaca sel tabel (closest('tr')) yang tidak ada di form kartu, sehingga melempar galat */
  case 'railtg':railToggle();break;
  case 'void':voidForm(ds.c,ds.id);break;
  case 'rmset':rmSetForm();break;
  case 'rmedit':rmEditForm(ds.id);break;
  case 'prnew':prNewForm();break;
  case 'prstep':await updDoc('pr',ds.id,{status:'Dipesan'});toast('PR ditandai sudah dipesan');break;
  case 'prterima':mvForm('rm','masuk',null,ds.id);break;
  case 'prxlsx':exportPrXlsx(ds.id);break;
  case 'ksxlsx':exportKartuXlsx(ds.id);break;
  case 'ksprint':window.print();break;
  case 'opnsave':saveOpname();break;
  case 'opnfill':rmFilter().forEach(r=>F['bahan-baku'].opn[r._id]=String(RMI(r._id).stok));renderBody();break;
  case 'opnclear':F['bahan-baku'].opn={};renderBody();break;
  case 'kendal':kendalForm(ds.id);break;
  case 'koreksi':koreksiForm(ds.id);break;
  case 'setvendor':setVendorForm(ds.id);break;
  case 'mvadd':{const tb=$('#m-mvl');const i=Math.max(...[...tb.querySelectorAll('tr')].map(r=>+r.dataset.ln))+1;tb.insertAdjacentHTML('beforeend',mvLine(ds.g,i,''));break}
  case 'mvdel':{const tb=$('#m-mvl');if(tb.children.length>1)el.closest('tr').remove();break}
  case 'mnew':{const tb=F['master-data'].tab;if(tb==='item')katItemForm();else if(tb==='grup')grupForm();else if(tb==='satuan')listForm('sat');else if(tb==='wc')wcForm();else masterForm(tb);break}
  case 'katedit':katItemForm(ds.d);break;
  case 'katauto':katAutoForm();break;
  case 'katmerge':katMergeForm(ds.d);break;
  case 'katdel':katDelForm(ds.d);break;
  case 'grupedit':grupForm(ds.i);break;
  case 'grupdel':{const g=(KAT().grup||[])[+ds.i];await katSave(k=>{k.grup=(k.grup||[]).filter(x=>x!==g)});toast('Judul section dihapus');break}
  case 'listnew':listForm(ds.kind);break;
  case 'listedit':listForm(ds.kind,ds.v);break;
  case 'listdel':await listDel(ds.kind,ds.v);break;
  case 'katgo':F['master-data'].tab='item';F['master-data'].kf=ds.kf||'';if(location.hash==='#master-data'){renderTools();renderBody()}else location.hash='master-data';break;
  case 'medit':masterForm(ds.k,ds.id);break;
  case 'mmerge':mergeForm(ds.k,ds.from,ds.to);break;
  case 'mreg':masterForm(ds.k,null,ds.nm);break;
  case 'mdel':masterDel(ds.k,ds.id);break;
  case 'mcsv':masterCsv(F['master-data'].tab);break;
  case 'wcedit':wcForm(ds.id);break;
  case 'wcdel':await wcDel(ds.id);break;
  case 'wcseed':await seedWc();break;
  case 'mshowInactive':F['master-data'].showInactive=el.checked;renderBody();break;
  case 'cekcsv':cekDataCsv();break;
  case 'cekgrp':F['cek-data'].grp=!F['cek-data'].grp;renderBody();break;
  case 'setcat':{const v=ds.cat||'';F['cek-data'].cat=v;F['cek-data'].sev='';F['cek-data'].vendorF='';renderTools();renderBody();break}
  case 'setsev':{F['cek-data'].sev=ds.sev||'';renderBody();break}
  case 'prodfix':{const s=byId('spk',ds.id);const x=calc().spk[ds.id];const items=s.items.map((it,i)=>{const l=x.lines[i];return l&&l.kirim>=l.q?{...it,prod:+it.q}:it});await updDoc('spk',ds.id,{items});toast(`Progres produksi SPK ${s.no} diperbarui`);break}
  case 'kpiuser':if(!e.target.closest('button')||el.matches('button'))kpiUser(ds.uid);break;
  case 'kpicsv':await kpiCsv();break;
  case 'mepage':case 'meclick':accountModal();break;
  case 'pwself':pwSelf();break;
  case 'backup':closeModal();await backupData();break;
  case 'logout':closeModal();if(USER&&USER.signOut)await USER.signOut();break;
  case 'uedit':userForm(ds.uid);break;
  case 'upw':pwForm(ds.uid);break;
  case 'uinvite':inviteForm();break;
  case 'doc':await downloadDoc(ds.kind,ds.ref,ds.fmt);break;
  case 'spktarget':spkTargetForm();break;
  case 'kpivendor':kpiVendor(ds.v);break;
  case 'spkstage':F.spk.stage=ds.st||'';F.spk.tab='list';if(ds.st)F.spk.st='';renderTools();renderBody();break;
  case 'dwtab':{const tab=ds.tab;document.querySelectorAll('.dw-tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===tab));document.querySelectorAll('.dw-pane').forEach(p=>p.classList.toggle('on',p.id==='dw-pane-'+tab));break}
  case 'closedrawer':closeDrawer();break;
  case 'closemodal':closeModal();break;
 }}catch(err){toast(err.message||('Gagal: '+err.code))}
});
document.addEventListener('input',e=>{const el=e.target;if(el.dataset.act==='q'){F[el.dataset.view].q=el.value;renderBody()}});
document.addEventListener('change',e=>{const el=e.target;if(el.dataset.act==='filtsel'){F[el.dataset.view][el.dataset.key]=el.value;renderBody()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#modal').hidden)closeModal();else if(ED)return;else if(SHEET)closeSheet();else if(DRAWER)closeDrawer()}});
$('#editor').addEventListener('input',edInput);$('#editor').addEventListener('change',edInput);$('#editor').addEventListener('paste',edPaste);
$('#editor').addEventListener('keydown',e=>{if(e.target.id==='ed-distnew'&&e.key==='Enter'){e.preventDefault();const v=e.target.value.trim();if(v&&ED){ED.dist=[...new Set([...ED.dist,v])];EDDIRTY=true;const keep=ED;renderEditor()}}});
let tt=0;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,3200)}
function themeGet(){try{return localStorage.getItem('mni-theme')||'light'}catch(e){return 'light'}}
function themeApply(t){if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t);document.querySelectorAll('[data-theme-set]').forEach(b=>b.classList.toggle('on',b.dataset.themeSet===t));try{localStorage.setItem('mni-theme',t)}catch(e){}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-theme-set]');if(b)themeApply(b.dataset.themeSet)});
themeApply(themeGet());
function railToggle(force){const h=document.documentElement;const mini=force!==undefined?force:!h.classList.contains('rail-mini');h.classList.toggle('rail-mini',mini);try{localStorage.setItem('mni-rail',mini?'mini':'full')}catch(e){}const b=$('#railtg');if(b){b.setAttribute('aria-label',mini?'Besarkan menu':'Kecilkan menu');b.title=(mini?'Besarkan menu':'Kecilkan menu')+' ( [ )';b.querySelector('span').textContent=mini?'Besarkan menu':'Kecilkan menu'}}
railToggle(document.documentElement.classList.contains('rail-mini'));
document.addEventListener('keydown',e=>{if(e.key==='['&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!e.target.closest('input,textarea,select,[contenteditable]')&&!ED&&$('#modal').hidden){e.preventDefault();railToggle()}});
boot();
