/* One navigation menu for every resource page, matching the homepage.
 * Rebuilds the links inside #bbbSiteLinks in the current language and again whenever <html lang> changes.
 * Keeps any page-specific WhatsApp href (e.g. a prefilled message) set on .bbb-site-consult.
 */
(()=>{
  const box=document.getElementById('bbbSiteLinks');if(!box)return;
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
    box.innerHTML=items.map(([p,en,cn,cur])=>{const res=p.startsWith('resources/');const cls=[cur&&cur.test(here)?'bbb-site-current':'',res?'bbb-site-res':''].filter(Boolean).join(' ');return `<a href="${root}${p.replace(/(\.html)/,'$1?lang='+lang)}"${cls?` class="${cls}"`:''}${cur&&cur.test(here)?' aria-current="page"':''}>${res?'<span aria-hidden="true">🎁</span> ':''}${zh?cn:en}${res?`<i class="bbb-site-badge">${zh?'免费':'FREE'}</i>`:''}</a>`}).join('')
      +`<a class="bbb-site-consult" href="${wa}" target="_blank" rel="noopener noreferrer">${zh?'WhatsApp 联系':'WhatsApp us'}</a>`;
  }
  // close the mobile menu after a tap on any rebuilt link
  box.addEventListener('click',e=>{if(!e.target.closest('a'))return;box.classList.remove('is-open');const m=document.querySelector('.bbb-site-menu');if(m)m.setAttribute('aria-expanded','false')});
  // act only on a real language change: some pages rewrite <html lang> with the same value after every DOM change
  new MutationObserver(()=>{const l=document.documentElement.lang.startsWith('zh')?'zh':'en';if(l!==last)build()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  build();
})();
