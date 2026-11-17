/* Offer expiry + stale-data notices.
 *   <tr data-expires="2026-12-31">       → after that date (Malaysia time) the row gets .is-expired and an "Ended" badge
 *   <p data-checked="2026-11-12" data-stale-days="30"> → after N days shows a "may be out of date" notice
 * Language follows <html lang>, so it re-renders when a page switches EN / 中文.
 */
(()=>{
  const todayMY=()=>{const d=new Date(Date.now()+8*3600e3);return d.toISOString().slice(0,10)};
  const zh=()=>document.documentElement.lang.startsWith('zh');
  const daysBetween=(a,b)=>Math.round((Date.parse(b)-Date.parse(a))/864e5);
  function run(){
    const today=todayMY();
    document.querySelectorAll('[data-expires]').forEach(el=>{
      const ended=today>el.dataset.expires;
      el.classList.toggle('is-expired',ended);
      let badge=el.querySelector(':scope .offer-ended');
      if(ended){
        if(!badge){badge=document.createElement('span');badge.className='offer-ended';(el.querySelector('[data-expiry-slot]')||el).prepend(badge)}
        badge.textContent=zh()?'优惠已结束':'Offer ended';
      }else if(badge)badge.remove();
    });
    document.querySelectorAll('[data-checked]').forEach(el=>{
      const age=daysBetween(el.dataset.checked,today),limit=+(el.dataset.staleDays||30);
      let note=el.querySelector(':scope > .data-stale');
      if(age>limit){
        if(!note){note=document.createElement('span');note.className='data-stale';el.append(note)}
        note.textContent=zh()?` 资料已超过 ${age} 天，可能已更新，请以官方最新资料为准。`:` This information is ${age} days old and may have changed; check the provider's latest terms.`;
      }else if(note)note.remove();
    });
  }
  const style=document.createElement('style');
  style.textContent='.is-expired{opacity:.55}.is-expired a,.is-expired button{pointer-events:none}.offer-ended{display:inline-block;margin:0 8px 4px 0;padding:2px 8px;border-radius:999px;background:#fde8e8;color:#9b1c1c;font-size:11px;font-weight:700;letter-spacing:.02em;opacity:1}.data-stale{color:#9b1c1c;font-weight:600}';
  document.head.append(style);
  window.addEventListener('bbb-rows',run);   // pages that re-render lists dispatch this
  new MutationObserver(run).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
