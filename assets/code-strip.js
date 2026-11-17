/* Promo-code strip: a slim yellow bar with tap-to-copy referral codes.
 * <script src="…/assets/code-strip.js" data-root="../" data-codes="moomoo,versa,webull,fsmone"
 *         data-after=".hero" data-more="#bbb-affiliate-details"></script>
 * Codes and logos live here so every page shows the same, current set.
 */
(()=>{
  const S=document.currentScript,ROOT=S.dataset.root||'';
  const ALL={
    moomoo:{code:'MAD6',logo:'assets/brand/moomoo.svg',name:'moomoo',url:'https://start.moomoo.com/00Jox1'},
    versa:{code:'VERSAMAD',logo:'assets/brand/versa.png',name:'Versa',url:'https://versa.com.my/download/',download:true},
    webull:{code:'bbb1234',logo:'assets/brand/webull.svg',name:'Webull',dark:true,url:'https://www.webull.com.my/k/bbb1234'},
    fsmone:{code:'WELCOME',logo:'assets/brand/fsmone.png',name:'FSMOne',url:'https://www.fsmone.com.my/referral/WELCOME'}
  };
  const keys=(S.dataset.codes||'moomoo,versa,webull,fsmone').split(',').map(s=>s.trim()).filter(k=>ALL[k]);
  const zh=()=>document.documentElement.lang.startsWith('zh');
  const css=`.bbb-code-strip{background:#fff3cc;border-block:1px solid #f5d36b;padding:12px 0;margin:0 0 8px;font-family:Inter,system-ui,'PingFang SC','Microsoft YaHei',sans-serif}
.bbb-code-strip .cs-in{max-width:1120px;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;box-sizing:border-box}
.bbb-code-strip .cs-l{font-weight:800;color:#122650;font-size:15px}
.bbb-code-strip .cs-c{display:flex;gap:8px;flex-wrap:wrap}
.bbb-code-strip .cs-g{display:inline-flex;align-items:stretch;border:1.5px dashed #e0a800;background:#fff;border-radius:12px;overflow:hidden;flex:0 0 auto}
.bbb-code-strip button{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:6px 10px 6px 12px;border:0;background:transparent;font:800 14px/1 inherit;color:#122650;cursor:pointer;letter-spacing:.03em}
.bbb-code-strip a.cs-go{margin:0;display:inline-flex;align-items:center;padding:0 10px;background:#122650;color:#fff;font-size:12px;font-weight:800;text-decoration:none;white-space:nowrap}
.bbb-code-strip a.cs-go:hover{background:#1e3a6f}
.bbb-code-strip button img{height:18px;width:auto;max-width:64px;object-fit:contain}
.bbb-code-strip button img.dark{background:#0b1b3a;padding:3px 6px;border-radius:6px;height:22px}
.bbb-code-strip button.done{background:#e6f5ed;border-color:#1c7a3e;color:#1c7a3e}
.bbb-code-strip a.cs-more{margin-left:auto;font-size:13px;font-weight:700;color:#1e3a6f;text-decoration:none}
@media(max-width:700px){.bbb-code-strip .cs-in{padding:0 16px;gap:8px}.bbb-code-strip .cs-c{flex-wrap:nowrap;overflow-x:auto;width:100%;scrollbar-width:none}.bbb-code-strip .cs-c::-webkit-scrollbar{display:none}.bbb-code-strip a.cs-more{margin-left:0}}`;
  const st=document.createElement('style');st.textContent=css;document.head.append(st);
  const bar=document.createElement('section');bar.className='bbb-code-strip';bar.setAttribute('aria-label','Promo codes');
  let last=null;
  function render(){
    const z=zh();if(z===last)return;last=z;
    const more=S.dataset.more||'';
    bar.innerHTML=`<div class="cs-in"><span class="cs-l">🎟 ${z?'我们的开户优惠码':'Our account-opening codes'}</span><div class="cs-c">${keys.map(k=>{const c=ALL[k];const go=c.download?(z?'下载 ↗':'Get app ↗'):(z?'开户 ↗':'Open ↗');return `<span class="cs-g"><button type="button" data-strip-copy="${c.code}" aria-label="${(z?'复制 ':'Copy ')+c.name+' '+c.code}"><img src="${ROOT+c.logo}" alt="${c.name}"${c.dark?' class="dark"':''}><b>${c.code}</b></button><a class="cs-go" href="${c.url}" target="_blank" rel="noopener noreferrer" data-cta="strip-open-${k}" aria-label="${c.name} ${z?'开户':'open account'}">${go}</a></span>`}).join('')}</div>${more?`<a class="cs-more" href="${more}">${z?'点代码复制 · 条件 ↓':'Tap code to copy · terms ↓'}</a>`:''}</div>`;
  }
  bar.addEventListener('click',async e=>{const b=e.target.closest('[data-strip-copy]');if(!b)return;const c=b.dataset.stripCopy;try{await navigator.clipboard.writeText(c)}catch{}const old=b.innerHTML;b.innerHTML='✓ '+(zh()?'已复制 ':'Copied ')+c;b.classList.add('done');setTimeout(()=>{b.innerHTML=old;b.classList.remove('done')},1800)});
  /* Versa's link is a plain app-download page that cannot carry our code, so tapping ANY Versa
     download link on the page also copies VERSAMAD and shows a reminder to paste it at sign-up. */
  const toast=document.createElement('div');toast.className='bbb-code-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');
  const tcss=document.createElement('style');tcss.textContent=`.bbb-code-toast{position:fixed;left:50%;bottom:calc(92px + env(safe-area-inset-bottom));transform:translate(-50%,20px);opacity:0;z-index:1200;max-width:min(92vw,420px);background:#fff;color:#122650;border:2px solid #f5b800;border-radius:14px;padding:12px 16px;font:600 14px/1.45 Inter,system-ui,'PingFang SC','Microsoft YaHei',sans-serif;box-shadow:0 14px 34px #0b1b3a59;transition:opacity .2s,transform .2s;pointer-events:none;text-align:center}
.bbb-code-toast b{color:#9a6b00;letter-spacing:.04em}.bbb-code-toast.show{opacity:1;transform:translate(-50%,0)}
@media(prefers-reduced-motion:reduce){.bbb-code-toast{transition:none}}`;document.head.append(tcss);
  let tt;
  function remind(code){
    toast.innerHTML=zh()?`✓ 已复制 <b>${code}</b>，注册时贴上就好`:`✓ <b>${code}</b> copied: paste it when you sign up`;
    if(!toast.isConnected)document.body.append(toast);
    toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),4200);
  }
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href*="versa.com.my/download"],a[href*="link.versa.com.my"]');if(!a)return;
    const code=ALL.versa.code;
    try{navigator.clipboard.writeText(code).catch(()=>{})}catch(x){}
    remind(code);
  },true);
  function mount(){
    const anchor=document.querySelector(S.dataset.after||'.hero');
    if(anchor)anchor.after(bar);else (document.querySelector('main')||document.body).prepend(bar);
    render();
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
