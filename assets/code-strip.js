/* Promo-code strip: a slim yellow bar with tap-to-copy referral codes.
 * <script src="…/assets/code-strip.js" data-root="../" data-codes="moomoo,versa,webull,fsmone"
 *         data-after=".hero" data-more="#bbb-affiliate-details"></script>
 * Codes and logos live here so every page shows the same, current set.
 */
(()=>{
  const S=document.currentScript,ROOT=S.dataset.root||'';
  const ALL={
    moomoo:{code:'MAD6',logo:'assets/brand/moomoo.svg',name:'moomoo'},
    versa:{code:'VERSAMAD',logo:'assets/brand/versa.png',name:'Versa'},
    webull:{code:'BBB1234',logo:'assets/brand/webull.svg',name:'Webull',dark:true},
    fsmone:{code:'WELCOME',logo:'assets/brand/fsmone.png',name:'FSMOne'}
  };
  const keys=(S.dataset.codes||'moomoo,versa,webull,fsmone').split(',').map(s=>s.trim()).filter(k=>ALL[k]);
  const zh=()=>document.documentElement.lang.startsWith('zh');
  const css=`.bbb-code-strip{background:#fff3cc;border-block:1px solid #f5d36b;padding:12px 0;margin:0 0 8px;font-family:Inter,system-ui,'PingFang SC','Microsoft YaHei',sans-serif}
.bbb-code-strip .cs-in{max-width:1120px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;box-sizing:border-box}
.bbb-code-strip .cs-l{font-weight:800;color:#122650;font-size:15px}
.bbb-code-strip .cs-c{display:flex;gap:8px;flex-wrap:wrap}
.bbb-code-strip button{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:6px 12px;border:1.5px dashed #e0a800;background:#fff;border-radius:12px;font:800 14px/1 inherit;color:#122650;cursor:pointer;letter-spacing:.03em}
.bbb-code-strip button img{height:18px;width:auto;max-width:64px;object-fit:contain}
.bbb-code-strip button img.dark{background:#0b1b3a;padding:3px 6px;border-radius:6px;height:22px}
.bbb-code-strip button.done{background:#e6f5ed;border-color:#1c7a3e;color:#1c7a3e}
.bbb-code-strip a{margin-left:auto;font-size:13px;font-weight:700;color:#1e3a6f;text-decoration:none}
@media(max-width:700px){.bbb-code-strip .cs-in{padding:0 16px;gap:8px}.bbb-code-strip .cs-c{flex-wrap:nowrap;overflow-x:auto;width:100%;scrollbar-width:none}.bbb-code-strip .cs-c::-webkit-scrollbar{display:none}.bbb-code-strip button{flex:0 0 auto}.bbb-code-strip a{margin-left:0}}`;
  const st=document.createElement('style');st.textContent=css;document.head.append(st);
  const bar=document.createElement('section');bar.className='bbb-code-strip';bar.setAttribute('aria-label','Promo codes');
  let last=null;
  function render(){
    const z=zh();if(z===last)return;last=z;
    const more=S.dataset.more||'';
    bar.innerHTML=`<div class="cs-in"><span class="cs-l">🎟 ${z?'我们的开户优惠码':'Our account-opening codes'}</span><div class="cs-c">${keys.map(k=>{const c=ALL[k];return `<button type="button" data-strip-copy="${c.code}" aria-label="${(z?'复制 ':'Copy ')+c.name+' '+c.code}"><img src="${ROOT+c.logo}" alt="${c.name}"${c.dark?' class="dark"':''}><b>${c.code}</b></button>`}).join('')}</div>${more?`<a href="${more}">${z?'点一下复制 · 条件 ↓':'Tap to copy · terms ↓'}</a>`:''}</div>`;
  }
  bar.addEventListener('click',async e=>{const b=e.target.closest('[data-strip-copy]');if(!b)return;const c=b.dataset.stripCopy;try{await navigator.clipboard.writeText(c)}catch{}const old=b.innerHTML;b.innerHTML='✓ '+(zh()?'已复制 ':'Copied ')+c;b.classList.add('done');setTimeout(()=>{b.innerHTML=old;b.classList.remove('done')},1800)});
  function mount(){
    const anchor=document.querySelector(S.dataset.after||'.hero');
    if(anchor)anchor.after(bar);else (document.querySelector('main')||document.body).prepend(bar);
    render();
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
