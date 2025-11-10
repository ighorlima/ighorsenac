
const data = [
  {id:1, brand:"Aston Martin", model:"DB11", type:"Coupe", year:2022, price:820000, mileage:12000, color:"Preto", img:"images/aston_db11.png", desc:"Motor V8 4.0, luxo e desempenho."},
  {id:2, brand:"Porsche", model:"911 Carrera", type:"Sport", year:2023, price:950000, mileage:5000, color:"Branco", img:"images/porsche_911.png", desc:"Clássico esportivo."},
  {id:3, brand:"Mercedes-Benz", model:"S-Class", type:"Sedan", year:2021, price:720000, mileage:25000, color:"Prata", img:"images/mercedes_s.png", desc:"Sedã executivo."},
  {id:4, brand:"BMW", model:"X7", type:"SUV", year:2022, price:680000, mileage:18000, color:"Cinza", img:"images/bmw_x7.png", desc:"SUV de luxo."},
  {id:5, brand:"Audi", model:"RS6", type:"Sport", year:2020, price:560000, mileage:30000, color:"Preto", img:"images/audi_rs6.png", desc:"Performa elevada."},
  {id:6, brand:"Ferrari", model:"F8 Tributo", type:"Sport", year:2023, price:2900000, mileage:2000, color:"Vermelho", img:"images/ferrari_f8.png", desc:"Supercarro V8."},
  {id:7, brand:"Lamborghini", model:"Urus", type:"SUV", year:2022, price:1450000, mileage:9000, color:"Preto", img:"images/lamborghini_urus.png", desc:"SUV esportivo."},
  {id:8, brand:"Rolls-Royce", model:"Ghost", type:"Sedan", year:2021, price:3500000, mileage:12000, color:"Branco", img:"images/rr_ghost.png", desc:"Luxo absoluto."}
];

let filtered = [...data];
let favorites = [];
const inventory = document.getElementById('inventory');
const search = document.getElementById('search');
const filterBrand = document.getElementById('filter-brand');
const filterType = document.getElementById('filter-type');
const filterYear = document.getElementById('filter-year');
const filterPrice = document.getElementById('filter-price');
const sortBy = document.getElementById('sort-by');
const favCount = document.getElementById('fav-count');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const compareListEl = document.getElementById('compare-list');
const compareBtn = document.getElementById('compare-btn');
let compare = [];

function formatMoney(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }

function populateFilters(){
  Array.from(new Set(data.map(d=>d.brand))).sort().forEach(b=>{
    const o=document.createElement('option');o.value=b;o.textContent=b;filterBrand.appendChild(o);
  });
  Array.from(new Set(data.map(d=>d.year))).sort((a,b)=>b-a).forEach(y=>{const o=document.createElement('option');o.value=y;o.textContent=y;filterYear.appendChild(o)});
}

function renderInventory(list){
  inventory.innerHTML='';
  list.forEach(car=>{
    const c=document.createElement('article');c.className='card';
    c.innerHTML=`<img src="${car.img}" alt="${car.brand} ${car.model}" loading="lazy"/><h3>${car.brand} ${car.model}</h3><div class="meta"><span>${car.type} • ${car.year}</span><span class="price">${formatMoney(car.price)}</span></div><div style="color:var(--muted)">${car.mileage.toLocaleString()} km • ${car.color}</div><div class="actions"><button class="btn btn-gold" data-id="${car.id}" data-action="details">Ver detalhes</button><button class="btn" data-id="${car.id}" data-action="fav">${favorites.find(f=>f.id===car.id)?'Remover':'Favoritar'}</button><button class="btn" data-id="${car.id}" data-action="compare">Comparar</button></div>`;
    inventory.appendChild(c);
  });
}

function applyFilters(){
  const q=(search.value||'').toLowerCase();
  const brand=filterBrand.value; const type=filterType.value; const year=filterYear.value; const price=filterPrice.value;
  filtered = data.filter(d=>{ if(brand && d.brand!==brand) return false; if(type && d.type!==type) return false; if(year && String(d.year)!==String(year)) return false; if(price){const [min,max]=price.split('-').map(Number); if(d.price<min||d.price>max) return false;} if(q){ if(!(d.brand+' '+d.model+' '+d.type+' '+d.year).toLowerCase().includes(q)) return false;} return true; });
  const s = sortBy.value;
  if(s==='price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(s==='price-desc') filtered.sort((a,b)=>b.price-a.price);
  if(s==='year-desc') filtered.sort((a,b)=>b.year-a.year);
  if(s==='year-asc') filtered.sort((a,b)=>a.year-b.year);
  renderInventory(filtered);
}

inventory.addEventListener('click', e=>{ const btn=e.target.closest('button'); if(!btn) return; const id=Number(btn.dataset.id); const action=btn.dataset.action; const car=data.find(d=>d.id===id); if(action==='details') openDetails(car); if(action==='fav'){ toggleFavorite(car); applyFilters(); } if(action==='compare') toggleCompare(car); });

function openDetails(car){
  modalBody.innerHTML=`<div style="display:flex;gap:12px;flex-wrap:wrap"><div style="flex:1;min-width:260px"><img src="${car.img}" style="width:100%;border-radius:8px"/></div><div style="flex:1;min-width:260px"><h2>${car.brand} ${car.model}</h2><div style="color:var(--muted)">${car.type} • ${car.year} • ${car.mileage.toLocaleString()} km</div><h3 style="margin-top:12px">${formatMoney(car.price)}</h3><p style="margin-top:10px;color:var(--muted)">${car.desc}</p><div style="margin-top:12px;display:flex;gap:8px"><button class="btn btn-gold" id="inquire" data-id="${car.id}">Solicitar contato</button><button class="btn" id="modal-fav" data-id="${car.id}">${favorites.find(f=>f.id===car.id)?'Remover favorito':'Favoritar'}</button></div></div></div>`;
  modal.className='';
}

modalClose && modalClose.addEventListener('click', ()=> modal.className='modal-hidden');
modal && modal.addEventListener('click', e=>{ if(e.target===modal) modal.className='modal-hidden' });

function toggleFavorite(car){ const exists = favorites.find(f=>f.id===car.id); if(exists) favorites = favorites.filter(f=>f.id!==car.id); else favorites.push(car); updateFavCount(); renderInventory(filtered); }
function updateFavCount(){ favCount.textContent = favorites.length; }

document.getElementById('favorites-btn').addEventListener('click', ()=>{ if(favorites.length===0) return alert('Nenhum favorito.'); modalBody.innerHTML = '<h2>Favoritos</h2>' + favorites.map(f=>`<div style="margin-top:8px"><strong>${f.brand} ${f.model}</strong> — ${formatMoney(f.price)}</div>`).join(''); modal.className=''; });

function toggleCompare(car){ const exists=compare.find(c=>c.id===car.id); if(exists) compare = compare.filter(c=>c.id!==car.id); else{ if(compare.length>=3) return alert('Máximo 3 veículos'); compare.push(car);} renderCompare(); }
function renderCompare(){ if(compare.length===0){ compareListEl.textContent='Nenhum veículo selecionado'; compareBtn.disabled=true; return;} compareListEl.innerHTML = compare.map(c=>`${c.brand} ${c.model} (${c.year}) <button data-id="${c.id}" class="btn">Remover</button>`).join('<br/>'); compareBtn.disabled=false; }
compareListEl && compareListEl.addEventListener('click', e=>{ const btn=e.target.closest('button'); if(!btn) return; const id=Number(btn.dataset.id); compare = compare.filter(c=>c.id!==id); renderCompare(); });
compareBtn && compareBtn.addEventListener('click', ()=>{ if(compare.length<2) return alert('Selecione ao menos 2'); modalBody.innerHTML = '<h2>Comparação</h2>' + compare.map(c=>`<div style="display:inline-block;width:30%;padding:8px"><img src="${c.img}" style="width:100%;height:120px;object-fit:cover"/><h3>${c.brand} ${c.model}</h3><div>${c.year} • ${c.type}</div><div style="margin-top:8px">${formatMoney(c.price)}</div></div>`).join(''); modal.className=''; });

document.getElementById('calc-fin').addEventListener('click', ()=>{ const price=Number(document.getElementById('fin-price').value)||0; const down=Number(document.getElementById('fin-down').value)||0; const term=Number(document.getElementById('fin-term').value)||1; const rate=Number(document.getElementById('fin-rate').value)||0; const monthly=rate/100/12; const principal=price-down; const payment=(principal*monthly)/(1-Math.pow(1+monthly,-term)); document.getElementById('fin-output').textContent = payment? payment.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) : formatMoney(0); });

[search, filterBrand, filterType, filterYear, filterPrice, sortBy].forEach(el=>{ if(el) { el.addEventListener('input', applyFilters); el.addEventListener('change', applyFilters); } });
populateFilters();
applyFilters();
renderCompare();
updateFavCount();
