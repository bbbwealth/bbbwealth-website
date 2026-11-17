/* FD guide: show the bank table as compact logo cards.
 * Reads the existing table (single source of the rates), keeps it in the DOM for other scripts,
 * mirrors the search filter, and rebuilds after a language switch.
 */
(()=>{
  const wrap=document.querySelector('#list .table-wrap');if(!wrap)return;
  const grid=document.createElement('div');grid.className='fd-cards';grid.setAttribute('role','list');
  const css=`.fd-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px;margin:12px 0}
.fd-card{background:#fff;border:1px solid #e3e7ef;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px}
.fd-card.top{border-color:#f5d36b;box-shadow:inset 0 0 0 1px #f5d36b}
.fd-top{display:flex;align-items:center;gap:10px}
.fd-logo{width:72px;height:40px;border-radius:10px;background:#f4f6fa;display:grid;place-items:center;padding:6px;box-sizing:border-box;flex:0 0 auto}
.fd-logo img{max-width:100%;max-height:26px;object-fit:contain}
.fd-name{font-weight:800;font-size:15px;color:#0f1729;line-height:1.2}
.fd-rank{margin-left:auto;font-size:11px;font-weight:800;color:#7a5a00;background:#fff3cc;border-radius:999px;padding:3px 8px}
.fd-rate{font-size:28px;font-weight:800;color:#122650;line-height:1}
.fd-chips{display:flex;flex-wrap:wrap;gap:6px}
.fd-chip{font-size:12px;font-weight:700;border-radius:999px;padding:4px 9px;background:#f1f4f9;color:#1e3a6f}
.fd-chip.fresh{background:#fff3cc;color:#7a5a00}.fd-chip.ok{background:#e6f5ed;color:#1c7a3e}
.fd-card details summary{font-size:12px;font-weight:700;color:#6b7487;cursor:pointer;list-style:none}
.fd-card details summary::after{content:' ▾'}.fd-card details[open] summary::after{content:' ▴'}
.fd-card details p{margin:6px 0 0;font-size:12.5px;line-height:1.55;color:#4a5468}
@media(max-width:560px){.fd-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.fd-card{padding:12px;gap:6px}.fd-top{flex-direction:column;align-items:flex-start;gap:6px}.fd-logo{width:60px;height:34px}.fd-rank{position:absolute;top:10px;right:10px;margin:0}.fd-card{position:relative}.fd-rate{font-size:23px}.fd-name{font-size:14px}}`;
  const st=document.createElement('style');st.textContent=css;document.head.append(st);
  wrap.before(grid);wrap.style.display='none';
  const rowsOf=()=>[...wrap.querySelectorAll('tbody tr')];
  let sig='';
  function build(){
    const rows=rowsOf();
    const html=rows.map((tr,idx)=>{
      const td=tr.children;if(td.length<5)return'';
      const img=td[1].querySelector('img');const name=td[1].textContent.trim();
      const rateCell=td[2].cloneNode(true);const qual=rateCell.querySelector('small');const qtxt=qual?qual.textContent.trim():'';if(qual)qual.remove();
      const rate=rateCell.textContent.trim();const tenure=td[3].textContent.trim();
      const fresh=td[4].querySelector('.ux-fresh');const ftxt=fresh?fresh.textContent.trim():'';
      const cond=td[4].querySelector('details p');const ctxt=cond?cond.textContent.trim():td[4].textContent.trim();
      const sum=td[4].querySelector('details summary');const stxt=sum?sum.textContent.trim():'';
      const fcls=/未确认|unconfirmed|not confirmed/i.test(ftxt)?'':(/是|yes/i.test(ftxt)?'fresh':'ok');
      return `<article class="fd-card${idx<3?' top':''}" role="listitem" data-row="${idx}" ${tr.style.display==='none'||tr.hidden?'hidden':''}>
        <div class="fd-top">${img?`<span class="fd-logo"><img src="${img.getAttribute('src')}" alt="${name}"></span>`:''}<span class="fd-name">${name}</span>${idx<3?`<span class="fd-rank">#${idx+1}</span>`:''}</div>
        <div class="fd-rate">${rate}</div>
        <div class="fd-chips"><span class="fd-chip">${tenure}</span>${qtxt?`<span class="fd-chip">${qtxt}</span>`:''}${ftxt?`<span class="fd-chip ${fcls}">${ftxt}</span>`:''}</div>
        <details><summary>${stxt||'条件'}</summary><p>${ctxt}</p></details>
      </article>`}).join('');
    if(html!==sig){sig=html;grid.innerHTML=html}
  }
  function syncVisibility(){rowsOf().forEach((tr,i)=>{const c=grid.querySelector(`[data-row="${i}"]`);if(c)c.hidden=tr.style.display==='none'||tr.hidden||getComputedStyle(tr).display==='none'})}
  build();
  // search / filters hide rows; translations rewrite text
  new MutationObserver(()=>{syncVisibility()}).observe(wrap,{subtree:true,attributes:true,attributeFilter:['style','hidden','class']});
  let lastLang=document.documentElement.lang;
  new MutationObserver(()=>{if(document.documentElement.lang!==lastLang){lastLang=document.documentElement.lang;setTimeout(()=>{build();syncVisibility()},60)}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  setTimeout(()=>{build();syncVisibility()},800); // after the page's own enhancers have run
})();
