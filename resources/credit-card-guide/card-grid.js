/* Credit-card guide: show the 9-card comparison table as compact logo cards.
 * Reads the existing table (kept in the DOM, hidden) and rebuilds after a language switch.
 */
(()=>{
  const wrap=document.querySelector('#card-list .table-wrap');if(!wrap)return;
  const grid=document.createElement('div');grid.className='cc-cards';grid.setAttribute('role','list');
  const css=`.cc-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin:12px 0}
.cc-card{background:#fff;border:1px solid #e3e7ef;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px}
.cc-top{display:flex;align-items:center;gap:10px}
.cc-logo{width:72px;height:40px;border-radius:10px;background:#f4f6fa;display:grid;place-items:center;padding:6px;box-sizing:border-box;flex:0 0 auto}
.cc-logo img{max-width:100%;max-height:26px;object-fit:contain}
.cc-num{margin-left:auto;font-size:11px;font-weight:800;color:#6b7487}
.cc-name{font-weight:800;font-size:15px;line-height:1.25;color:#0f1729}
.cc-chips{display:flex;flex-wrap:wrap;gap:6px}
.cc-chip{font-size:12px;font-weight:700;border-radius:999px;padding:4px 9px;background:#f1f4f9;color:#1e3a6f}
.cc-chip.pts{background:#e6f0ff;color:#17438f}.cc-chip.cb{background:#e6f5ed;color:#1c7a3e}.cc-chip.fit{background:#fff3cc;color:#7a5a00}
.cc-ben{margin:0;font-size:13px;line-height:1.5;color:#4a5468;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.cc-card.open .cc-ben{-webkit-line-clamp:unset}
.cc-more{align-self:flex-start;border:0;background:none;padding:0;font:700 12px/1.4 inherit;color:#6b7487;cursor:pointer;min-height:24px}
@media(max-width:560px){.cc-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cc-card{padding:12px;gap:6px}.cc-top{flex-direction:column;align-items:flex-start;gap:6px;position:relative;width:100%}.cc-num{position:absolute;top:0;right:0}.cc-logo{width:60px;height:34px}.cc-name{font-size:13.5px}.cc-ben{font-size:12px}}`;
  const st=document.createElement('style');st.textContent=css;document.head.append(st);
  wrap.before(grid);wrap.style.display='none';
  let sig='';
  function build(){
    const zh=document.documentElement.lang.startsWith('zh');
    const html=[...wrap.querySelectorAll('tbody tr')].map(tr=>{
      const td=tr.children;if(td.length<5)return'';
      const img=td[0].querySelector('img');
      const num=(td[1].querySelector('.row-number')||{}).textContent||'';
      const name=(td[1].querySelector('strong')||td[1]).textContent.trim();
      const badge=td[2].querySelector('.reward-badge');const btxt=badge?badge.textContent.trim():'';
      const sm=td[2].querySelector('small');const stxt=sm?sm.textContent.trim():'';
      const isCb=/回扣|cash ?back/i.test(btxt);
      const ben=td[3].textContent.trim();const fit=td[4].textContent.trim();
      return `<article class="cc-card" role="listitem">
        <div class="cc-top">${img?`<span class="cc-logo"><img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt')||''}"></span>`:''}<span class="cc-num">${num}</span></div>
        <div class="cc-name">${name}</div>
        <div class="cc-chips">${btxt?`<span class="cc-chip ${isCb?'cb':'pts'}">${btxt}${stxt?' · '+stxt:''}</span>`:''}</div>
        <p class="cc-ben">${ben}</p>
        <div class="cc-chips"><span class="cc-chip fit">${fit}</span></div>
        <button type="button" class="cc-more">${zh?'看完整 ▾':'More ▾'}</button>
      </article>`}).join('');
    if(html!==sig){sig=html;grid.innerHTML=html}
  }
  grid.addEventListener('click',e=>{const b=e.target.closest('.cc-more');if(!b)return;const c=b.closest('.cc-card');const o=c.classList.toggle('open');const zh=document.documentElement.lang.startsWith('zh');b.textContent=o?(zh?'收起 ▴':'Less ▴'):(zh?'看完整 ▾':'More ▾')});
  build();
  let lastLang=document.documentElement.lang;
  new MutationObserver(()=>{if(document.documentElement.lang!==lastLang){lastLang=document.documentElement.lang;setTimeout(build,60)}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  setTimeout(build,800);
})();
