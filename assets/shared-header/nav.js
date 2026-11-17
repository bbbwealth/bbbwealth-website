/* One navigation menu for every resource page, matching the homepage.
 * Rebuilds the links inside #bbbSiteLinks in the current language and again whenever <html lang> changes.
 * Keeps any page-specific WhatsApp href (e.g. a prefilled message) set on .bbb-site-consult.
 */
(()=>{
  const box=document.getElementById('bbbSiteLinks');if(!box)return;
  // pill style for the Free-resources item; injected here so every page gets it (most pages inline their header CSS)
  if(!document.getElementById('bbb-nav-res-style')){const st=document.createElement('style');st.id='bbb-nav-res-style';st.textContent='html body .bbb-site-header .bbb-site-links a.bbb-site-res{display:inline-flex!important;align-items:center;gap:5px;padding:7px 13px!important;border-radius:999px!important;background:#fff3cc!important;border:1.5px solid #f5d36b!important;color:#122650!important;font-weight:800!important;text-decoration:none!important;box-shadow:none!important}html body .bbb-site-header .bbb-site-links a.bbb-site-res:hover{background:#f5b800!important}html body .bbb-site-header .bbb-site-links a.bbb-site-res::after,html body .bbb-site-header .bbb-site-links a.bbb-site-res::before{display:none!important}@media (max-width:1024px){html body .bbb-site-header .bbb-site-links a.bbb-site-res{display:flex!important;border-radius:12px!important;margin:6px 0!important}}';document.head.append(st)}
  const brand=document.querySelector('.bbb-site-brand');
  const root=(brand&&brand.getAttribute('href')||'index.html').replace(/index\.html.*$/,'');
  const here=location.pathname;
  const items=[
    ['index.html#services','Services','服务'],
    ['index.html#insights','Insights','观点'],
    ['calculator/index.html','Calculators','计算器',/\/calculator\//],
    ['index.html#training','Training','企业培训'],
    ['index.html#team','Team','团队'],
    ['resources/index.html','Free resources','免费资源',/\/resources\/|\/fd-november|\/taxrelief|\/cash-savings/]
  ];
  let last=null;
  function build(){
    const zh=document.documentElement.lang.startsWith('zh'),lang=zh?'zh':'en';
    const old=box.querySelector('.bbb-site-consult');
    const wa=old&&/wa\.me/.test(old.href)&&old.href.includes('text=')?old.href:'https://wa.me/601156281541';
    if(last===lang&&box.dataset.navBuilt)return;last=lang;box.dataset.navBuilt='1';
    box.innerHTML=items.map(([p,en,cn,cur])=>{const res=p.startsWith('resources/');const cls=[cur&&cur.test(here)?'bbb-site-current':'',res?'bbb-site-res':''].filter(Boolean).join(' ');return `<a href="${root}${p.replace(/(\.html)/,'$1?lang='+lang)}"${cls?` class="${cls}"`:''}${cur&&cur.test(here)?' aria-current="page"':''}>${res?'<span aria-hidden="true">🎁</span> ':''}${zh?cn:en}</a>`}).join('')
      +`<a class="bbb-site-consult" href="${wa}" target="_blank" rel="noopener noreferrer">${zh?'WhatsApp 联系':'WhatsApp us'}</a>`;
  }
  // close the mobile menu after a tap on any rebuilt link
  box.addEventListener('click',e=>{if(!e.target.closest('a'))return;box.classList.remove('is-open');const m=document.querySelector('.bbb-site-menu');if(m)m.setAttribute('aria-expanded','false')});
  // act only on a real language change: some pages rewrite <html lang> with the same value after every DOM change
  new MutationObserver(()=>{const l=document.documentElement.lang.startsWith('zh')?'zh':'en';if(l!==last)build()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  build();
})();
