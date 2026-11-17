/* BBBwealth free-resource funnel (P1-3, P1-4, P1-6, P2-7, P2-8, P2-10, P2-11).
 * <script src="…/assets/bbb-funnel.js" data-funnel="retirement" data-root="../../" defer></script>
 * Pages: hub | calc-hub | retirement | ci | term | fd | tax | cards | cash
 * WhatsApp links only pre-fill a draft; the visitor edits and sends. Nothing is stored or submitted.
 */
(()=>{
const S=document.currentScript,PAGE=S.dataset.funnel,ROOT=S.dataset.root||'';
const WA='601156281541';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const zh=()=>document.documentElement.lang.startsWith('zh');
const L=(en,cn)=>zh()?cn:en;
const fill=(t,v)=>t.replace(/\{(\w+)\}/g,(_,k)=>v[k]??'');
const waHref=msg=>'https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
const num=t=>{const m=String(t||'').replace(/,/g,'').match(/-?\d+(\.\d+)?/);return m?+m[0]:null};
const rm=n=>'RM'+Math.round(n).toLocaleString('en-MY');
const WA_ICON='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';
const MICRO=()=>L('Opens WhatsApp with a draft message. You can edit it before sending.','会打开 WhatsApp 并预先填好讯息，你可以修改后再发送。');
const LEGAL=()=>L("General information only, not personal advice. We'll need to understand your situation first.",'以上为一般资讯，不构成个人建议。我们需要先了解你的情况。');
const waBtn=(label,msg,cta,cls='bbb-btn bbb-btn--wa')=>`<a class="${cls}" href="${waHref(msg)}" target="_blank" rel="noopener" data-cta="${cta}">${WA_ICON}<span>${label}</span></a>`;

/* ---------- per-page copy & config ---------- */
const C={
 hub:{hero:'.ux-starts, h1',cover:['.resource-grid','footer'],
  msg:()=>L("Hi BBBwealth, I'm looking at your free resources and have a question about: ",'你好 BBBwealth，我在看你们的免费资源，想问一下：'),
  heroLink:()=>L('Not sure where to start? Ask us on WhatsApp','不知道从哪里开始？WhatsApp 问我们')},
 'calc-hub':{hero:'.calc-grid, h1',cover:['.calc-grid','footer'],
  msg:()=>L("Hi BBBwealth, I'd like help choosing the right calculator for my situation.",'你好 BBBwealth，想请你们帮我看看哪个计算器适合我的情况。'),
  heroLink:()=>L('Not sure which calculator? Ask us','不知道用哪个？问问我们')},
 retirement:{hero:'.bbb-task-actions',cover:['#bbb-retirement-form','.rc-contact'],
  read:()=>{const g=$('#rcSnapGap');if(!g||!g.textContent.trim())return null;const v=num(g.textContent);if(v===null)return null;return{value:Math.abs(v),state:v>0?'gap':'ok'}},
  anchor:()=>$('.rc-snapshot'),
  card:r=>r.state==='gap'?{label:L('Estimated retirement gap','估算退休缺口'),value:rm(r.value),h:L("Let's talk about realistic ways to close it.",'一起看看有哪些实际可行的补法。'),p:L('Based on the assumptions you entered. Small changes to savings, returns or retirement age can move this number a lot.','按你填的假设计算。储蓄、回酬或退休年龄的小调整，都会大幅改变这个数字。'),btn:L('Talk to us about this gap','跟我们聊聊这个缺口'),msg:L(`Hi BBBwealth, I used your retirement calculator. My estimated gap is ${rm(r.value)}. Can we talk about how to close it?`,`你好 BBBwealth，我用了你们的退休计算器，估算退休缺口约 ${rm(r.value)}。想聊聊怎样补上这个缺口。`)}
   :{label:L('Your result','你的结果'),value:L('On track','进度不错'),h:L('You look on track, based on these assumptions.','按这些假设，你目前进度不错。'),p:L('Worth a second look: inflation, returns and retirement age are big assumptions.','值得再确认：通胀、回酬和退休年龄都是关键假设。'),btn:L('Get a second opinion','请我们帮你再看一眼'),msg:L("Hi BBBwealth, your retirement calculator says I'm on track. Could you sanity-check my assumptions?",'你好 BBBwealth，退休计算器显示我目前进度够，想请你们帮我看看假设是否合理。')},
  next:()=>[ROOT+'calculator/critical-illness/index.html',L('Next: check your protection → Critical illness calculator','下一步：看看保障够不够 → 重疾保障计算器')],
  readout:r=>r.state==='gap'?[L('Gap','缺口'),rm(r.value)]:[L('Result','结果'),L('On track','进度不错')],
  msg:()=>L("Hi BBBwealth, I'm using your retirement calculator and have a question.",'你好 BBBwealth，我在用你们的退休计算器，想问一下。')},
 ci:{hero:'a.hero-start',cover:['form#calc','.bbb-result-cta'],
  read:()=>{const g=num($('output#gap')?.textContent),t=num($('output#target')?.textContent);if(g===null||t===null)return null;return{value:g,target:t,state:g>0?'gap':'ok'}},
  anchor:()=>$('output#gap')?.closest('section'),inside:true,
  card:r=>r.state==='gap'?{label:L('Additional cover to consider','可考虑补足'),value:rm(r.value),h:L('Before buying anything, check what your existing policies actually cover.','先别急着买新保单，先看清楚现有保单实际保什么。'),p:L('We can review them with you, including the illness definitions and stages.','我们可以陪你一起检视，包括疾病定义和阶段。'),btn:L('Review my cover with BBBwealth','请 BBBwealth 帮我检视保障'),msg:L(`Hi BBBwealth, I used your critical illness calculator. Additional cover to consider: ${rm(r.value)} (36-month target ${rm(r.target)}). I'd like to review my existing policies.`,`你好 BBBwealth，我用了你们的重疾保障计算器，估算可考虑补足 ${rm(r.value)}（36 个月目标 ${rm(r.target)}）。想请你们帮我检视现有保单。`)}
   :{label:L('Your result','你的结果'),value:L('Benchmark met','已达基准'),h:L('Your entered cover meets the 36-month benchmark.','你填的保额已达 36 个月基准。'),p:L('Whether a claim pays still depends on each policy’s definitions.','是否赔付，仍要看每份保单的定义。'),btn:L('Check my policy definitions','帮我看看保单定义'),msg:L("Hi BBBwealth, my CI cover meets your 36-month benchmark. Could you check my policy definitions?",'你好 BBBwealth，我的重疾保额已达 36 个月基准，想请你们帮我看看保单定义。')},
  next:()=>[ROOT+'calculator/term-coverage/index.html',L('Next: Term coverage calculator →','下一步：寿险保障计算器 →')],
  readout:r=>[L('Gap','缺口'),rm(r.value)],
  msg:()=>L("Hi BBBwealth, I'd like to review my critical illness cover.",'你好 BBBwealth，想请你们帮我检视重疾保障。')},
 term:{hero:'a.hero-start',cover:['form#calc','.bbb-result-cta'],
  read:()=>{const g=num($('output#gap')?.textContent),t=num($('output#target')?.textContent);if(g===null||t===null)return null;return{value:g,target:t,state:g>0?'gap':'ok'}},
  anchor:()=>$('output#gap')?.closest('section'),inside:true,
  card:r=>r.state==='gap'?{label:L('Additional cover to consider','可考虑补足'),value:rm(r.value),h:L('This 5-year income rule is only a starting point.','五年收入法只是起点。'),p:L('Debts, dependants and education costs can change the number.','贷款、受抚养人和教育费用，都可能改变这个数字。'),btn:L('Work out my real number with BBBwealth','跟 BBBwealth 算出我的实际需要'),msg:L(`Hi BBBwealth, I used your term coverage calculator. Additional cover to consider: ${rm(r.value)} (benchmark ${rm(r.target)}). I'd like to check what I actually need.`,`你好 BBBwealth，我用了你们的寿险保障计算器，估算可考虑补足 ${rm(r.value)}（基准 ${rm(r.target)}）。想了解我实际需要多少保障。`)}
   :{label:L('Your result','你的结果'),value:L('Benchmark met','已达基准'),h:L('Your entered cover meets this benchmark.','你填的保额已达到这个基准。'),p:L('The benchmark ignores debts, dependants and education costs.','这个基准没有计算贷款、受抚养人和教育费用。'),btn:L('Check if the benchmark fits me','看看这个基准适不适合我'),msg:L("Hi BBBwealth, my life cover meets your 5-year income benchmark. Does that benchmark fit my situation?",'你好 BBBwealth，我的寿险保额已达五年收入基准，想看看这个基准适不适合我。')},
  next:()=>[ROOT+'calculator/retirement/index.html',L('Next: Retirement calculator →','下一步：退休准备计算器 →')],
  readout:r=>[L('Gap','缺口'),rm(r.value)],
  msg:()=>L("Hi BBBwealth, I'd like to check how much life cover I actually need.",'你好 BBBwealth，想了解我实际需要多少寿险保障。')},
 fd:{hero:'.hero .intro a.button, .hero a.button',cover:['#list .table-wrap','section.calc','.bbb-affiliate'],
  read:()=>{const i=num($('#interest')?.textContent),a=num($('#amount')?.value);if(!i||!a)return null;return{value:i,amount:a,state:'ok'}},
  anchor:()=>$('section.calc'),
  card:r=>({label:L('Estimated interest','预计利息'),value:'RM'+r.value.toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2}),h:L(`On ${rm(r.amount)}. Not sure whether this money should be in an FD or something more flexible?`,`存 ${rm(r.amount)}。不确定这笔钱该放定存，还是更灵活的地方？`),p:L('Ask us before you lock it in.','锁定之前，先问问我们。'),btn:L('Ask about FD vs MMF','问问定存还是 MMF'),msg:L(`Hi BBBwealth, I'm comparing November FD offers for about ${rm(r.amount)}. Could you help me think through FD vs MMF for this money?`,`你好 BBBwealth，我在比较 11 月定存优惠，金额大约 ${rm(r.amount)}。想请你们帮我想想，这笔钱放定存还是 MMF 比较好。`)}),
  next:()=>[ROOT+'resources/cash/index.html',L('Compare savings, MMFs and FDs →','比较储蓄、MMF 与定存 →')],
  ctx:()=>[L('MMF & codes','MMF 与代码'),'offer'],
  msg:()=>L("Hi BBBwealth, I'm comparing November FD offers. Could you help me think through FD vs MMF?",'你好 BBBwealth，我在比较 11 月定存优惠，想请你们帮我想想定存还是 MMF 比较好。')},
 tax:{hero:'.hero a.button.primary',cover:['.offer','.bbb-affiliate','#calculator details[open]'],
  read:()=>{const v=num($('#mobile-saving')?.textContent);if(!v)return null;return{value:v,state:'ok'}},
  anchor:()=>$('.summary-card'),
  card:r=>({label:L('Estimated tax saving','估计少缴'),value:rm(r.value),h:L('Thinking about PRS to save more?','想用 PRS 再多省一点？'),p:L('Tax savings are not investment returns. We can check whether PRS suits you.','节税不等于投资回报。我们可以帮你看看 PRS 适不适合你。'),btn:L('Ask us about PRS & my tax','问问 PRS 与我的税务'),msg:L(`Hi BBBwealth, your tax calculator estimates I could save about ${rm(r.value)} with my reliefs. I'd like to know if PRS makes sense for me.`,`你好 BBBwealth，你们的税务计算器估算我可少缴约 ${rm(r.value)}。想了解 PRS 适不适合我。`)}),
  readout:r=>[L('Est. saving','预计省税'),rm(r.value)],
  msg:()=>L("Hi BBBwealth, I read your tax relief guide and would like to know if PRS makes sense for me.",'你好 BBBwealth，我看了减税指南，想了解 PRS 适不适合我。')},
 cards:{hero:'.hero a.button',cover:['#card-list','dialog[open]'],
  staticCard:()=>({anchor:$('.reward-advice'),label:L('Cash back or points?','现金回扣还是积分？'),value:'',h:L('It depends on how you spend.','要看你怎么花钱。'),p:L('Tell us your usual spending and we will help you think it through. We do not ask for card or bank details.','告诉我们你平时的消费习惯，我们帮你想清楚。不需要提供卡号或银行资料。'),btn:L('Ask which suits my spending','问问哪种适合我的消费'),msg:L("Hi BBBwealth, I read your credit card guide. I'd like to ask about choosing between cash back and points for my spending.",'你好 BBBwealth，我看了你们的信用卡指南，想问问以我的消费习惯，现金回扣和积分怎么选。')}),
  ctx:()=>[L('9 cards ↓','9 张卡 ↓'),'#card-list'],
  msg:()=>L("Hi BBBwealth, I read your credit card guide and have a question.",'你好 BBBwealth，我看了你们的信用卡指南，想问一下。')},
 cash:{hero:'.hero-actions',cover:['#ptable','#calcForm','#partners'],
  read:()=>{const a=num($('#cAmt')?.value),v=num($('#cOut')?.textContent),d=num($('#cDays')?.value);if(!a||v===null)return null;return{value:v,amount:a,days:d,state:'ok'}},
  readout:r=>[L('≈ earnings','预计收益'),'RM'+r.value.toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2})],
  ctx:()=>[L('Platforms ↓','平台 ↓'),'#partners'],
  finalBefore:'#related',
  msg:()=>L("Hi BBBwealth, I'm deciding where to keep my short-term cash (savings, MMF or FD). Can you help me think it through?",'你好 BBBwealth，我在考虑短期闲钱放储蓄、MMF 还是定存，想请你们帮我想清楚。')}
};
const cfg=C[PAGE];if(!cfg)return;
let result=null;

/* ---------- C: result CTA ---------- */
function cardHTML(d,cta){
  const next=cfg.next?cfg.next():null;
  return `<div class="bbb-result-cta__label">${d.label}</div>${d.value?`<div class="bbb-result-cta__value" aria-live="polite">${d.value}</div>`:''}<h3>${d.h}</h3><p>${d.p}</p><div class="bbb-actions">${waBtn(d.btn,d.msg,cta)}${next?`<a class="bbb-link" href="${next[0]}?lang=${zh()?'zh':'en'}" data-cta="${PAGE}-result-next">${next[1]}</a>`:''}</div><p class="bbb-cta-micro">${MICRO()}</p><p class="bbb-cta-risk">${LEGAL()}</p>`;
}
let calls=[];
function placeResult(){
  if(!cfg.read)return;
  const now=Date.now();calls=calls.filter(t=>now-t<1000);if(calls.length>=6)return; // safety net against observer ping-pong with page scripts
  calls.push(now);
  const r=cfg.read();result=r;
  let box=$('.bbb-result-cta[data-kind="result"]');
  if(!r){if(box)box.hidden=true;return bar.update()}
  const anchor=cfg.anchor&&cfg.anchor();if(!anchor)return;
  if(!box){box=document.createElement('div');box.className='bbb-result-cta bbb-funnel';box.dataset.kind='result'}
  const html=cardHTML(cfg.card(r),PAGE+'-result-wa');box.hidden=false;if(box.dataset.sig!==html){box.innerHTML=html;box.dataset.sig=html}
  if(cfg.inside){if(box.parentNode!==anchor)anchor.append(box)}else if(anchor.nextElementSibling!==box)anchor.after(box);
  bar.update();
}
function placeStatic(){
  if(!cfg.staticCard)return;const d=cfg.staticCard();if(!d.anchor)return;
  let box=$('.bbb-result-cta[data-kind="static"]');
  if(!box){box=document.createElement('div');box.className='bbb-result-cta bbb-funnel';box.dataset.kind='static';d.anchor.after(box)}
  const html=cardHTML(d,PAGE+'-mid-wa');if(box.dataset.sig!==html){box.innerHTML=html;box.dataset.sig=html}
}

/* ---------- D + E: proof strip and final CTA ---------- */
function placeFinal(){
  let wrap=$('.bbb-final-wrap');
  if(!wrap){
    wrap=document.createElement('section');wrap.className='bbb-final-wrap bbb-funnel';wrap.setAttribute('aria-label','Next step');
    const before=(cfg.finalBefore&&$(cfg.finalBefore))||$('.bbb-related-resources')||$('footer');
    if(before)before.before(wrap);else document.body.append(wrap);
  }
  const lang=zh()?'zh':'en';
  const html=`<div class="bbb-proof"><span class="bbb-proof__label">${L('As seen on','媒体与内容')}</span>
   <span class="item"><b>8TV</b><small>${L('Morning Express market commentary','早晨新闻 · 市场评论')}</small></span>
   <a href="https://www.enanyang.my/tag/%E8%B0%AD%E5%87%AF%E4%BF%8A" target="_blank" rel="noopener" data-cta="${PAGE}-proof-np"><b>南洋商报</b><small>${L('《股势先机》 market column','《股势先机》市场专栏')}</small></a>
   <a href="https://www.youtube.com/@BBBwealth?sub_confirmation=1" target="_blank" rel="noopener" data-cta="${PAGE}-proof-yt"><b>YouTube</b><small>${L('@BBBwealth · 19.9K subscribers','@BBBwealth · 1.99万订阅')}</small></a></div>
   <div class="bbb-final-cta"><div><h2>${L('Not sure what this means for you?','看完了，还是不确定怎么做？')}</h2><p>${L('Send us your question on WhatsApp. The BBBwealth team will reply and help you think it through.','在 WhatsApp 把问题发给我们，BBBwealth 团队会回复你，陪你把下一步想清楚。')}</p><p class="bbb-cta-legal">${LEGAL()}</p></div>
   <div class="bbb-actions">${waBtn(L('Ask us on WhatsApp','WhatsApp 问我们'),currentMsg(),PAGE+'-final-wa')}<a class="bbb-btn bbb-btn--on-dark" href="${ROOT}index.html?lang=${lang}#newsletter" data-cta="${PAGE}-final-newsletter">${L('Get new guides by email →','新指南出炉，电邮通知我 →')}</a>${PAGE==='hub'?`<a class="bbb-link" href="${ROOT}calculator/index.html?lang=${lang}" data-cta="hub-final-calcs">${L('Browse calculators →','浏览全部计算器 →')}</a>`:''}<p class="bbb-cta-micro">${MICRO()}</p></div></div>`;
  if(wrap.dataset.sig!==html){wrap.innerHTML=html;wrap.dataset.sig=html}
}
function currentMsg(){
  if(result&&cfg.card){try{return cfg.card(result).msg}catch(e){}}
  if(PAGE==='cash'&&result)return L(`Hi BBBwealth, I'm deciding where to keep about ${rm(result.amount)} of short-term cash (savings, MMF or FD). Can you help me think it through?`,`你好 BBBwealth，我有大约 ${rm(result.amount)} 短期闲钱，在考虑放储蓄、MMF 还是定存，想请你们帮我想清楚。`);
  return cfg.msg();
}

/* ---------- hero helper link (hub, calculator hub) ---------- */
function placeHeroLink(){
  if(!cfg.heroLink)return;
  let a=$('.bbb-hero-wa');
  if(!a){const host=$(PAGE==='hub'?'.ux-starts':'.calc-grid')||$('h1');if(!host)return;a=document.createElement('div');a.className='bbb-hero-wa bbb-funnel';PAGE==='hub'?host.after(a):host.before(a)}
  const starts=PAGE==='hub'&&$('.ux-starts');if(starts&&starts.nextElementSibling!==a)starts.after(a); // move under the late-injected starter questions
  const html=waBtn(cfg.heroLink(),cfg.msg(),PAGE+'-hero-wa','bbb-btn bbb-btn--ghost');if(a.dataset.sig!==html){a.innerHTML=html;a.dataset.sig=html}
}

/* ---------- P2-8 / P2-11 page tweaks ---------- */
function pageTweaks(){
  if(PAGE==='fd'){ // demote the early MMF referral link to a line below the FD table
    const e=$('.ux-early-cta'),table=$('#list .table-wrap');
    if(e)e.style.display='none'; // the hero referral nudge is replaced by a quieter line below the table
    let n=$('.bbb-fd-mmf-line');
    if(!n&&table){n=document.createElement('a');n.className='bbb-fd-mmf-line bbb-link bbb-funnel';n.dataset.cta='fd-table-mmf';table.after(n)}
    if(n){n.href=ROOT+'resources/cash/index.html?lang='+(zh()?'zh':'en');const t=L('Considering an MMF instead? Compare first →','也在考虑 MMF？先比较再决定 →');if(n.textContent!==t)n.textContent=t}
  }
  if(PAGE==='cards'){
    $$('.hero a.button').forEach(a=>{if(/↗/.test(a.textContent)&&a.getAttribute('href')?.startsWith('#'))a.textContent=a.textContent.replace('↗','↓')});
    const list=$('#card-list');
    if(list){let n=$('.bbb-apply-note');if(!n){n=document.createElement('p');n.className='bbb-apply-note bbb-cta-micro bbb-funnel';(list.querySelector('.table-wrap')||list.lastElementChild||list).after(n)}
      n.textContent=L("Apply on the bank's official page; check the annual fee and terms first.",'申请请到银行官网，先看清年费与条款。');}
  }
}

/* ---------- P1-6: copy confirmation inside the tapped card ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-copy-referral],[data-copy],.copy-code,[data-offer-copy]');if(!b)return;
  const code=b.dataset.copyReferral||b.dataset.copy||b.dataset.offerCopy||b.dataset.code||(b.textContent.match(/[A-Z0-9]{4,}/)||[''])[0];
  setTimeout(()=>{let s=b.parentElement.querySelector(':scope > .bbb-copy-inline');if(!s){s=document.createElement('span');s.className='bbb-copy-inline';s.setAttribute('role','status');b.after(s)}
    s.textContent=L(`✓ Copied ${code}. Enter it when you sign up.`,`✓ 已复制 ${code}，注册时记得填写。`)},60);
},true);

/* ---------- P1-3: sticky mobile bar ---------- */
const bar=(()=>{
  const el=document.createElement('nav');el.className='bbb-cta-bar';el.setAttribute('aria-label','Quick actions / 快捷操作');
  const key='bbb-bar-closed:'+location.pathname;let closed=false;try{closed=sessionStorage.getItem(key)==='1'}catch(e){}
  const mq=matchMedia('(max-width:767px)');
  let heroSeen=true,coverOn=new Set(),focus=false;
  /* Layout: [page action — wide] [compact WhatsApp] [✕]. The page action is the promo-code / tool CTA;
     on calculators it turns into the live result once there is one. */
  const PRIMARY={
    hub:()=>[L('Browse all resources ↓','浏览全部资源 ↓'),'.resource-grid'],
    'calc-hub':()=>[L('Pick a calculator ↓','选一个计算器 ↓'),'.calc-grid'],
    retirement:()=>[L('Calculate my gap ↓','算算我的退休缺口 ↓'),'#bbb-retirement-form'],
    ci:()=>[L('Start calculating ↓','开始计算 ↓'),'#calc'],
    term:()=>[L('Start calculating ↓','开始计算 ↓'),'#calc'],
    fd:()=>[L('Get our MMF promo codes','领取 MMF 优惠码'),'offer'],
    tax:()=>[L('Get our PRS promo codes ↓','领取 PRS 优惠码 ↓'),'#prs-offers'],
    cards:()=>[L('Compare 9 cards ↓','比较 9 张卡 ↓'),'#card-list'],
    cash:()=>[L('Get our promo codes ↓','领取我们的优惠码 ↓'),'#partners']
  };
  function render(){
    let main='';
    const usesReadout=result&&cfg.readout&&['retirement','ci','term'].includes(PAGE);
    if(usesReadout){const [lab,val]=cfg.readout(result);main=`<button type="button" class="bbb-cta-bar__readout" data-cta="${PAGE}-bar-readout"><small>${lab}</small><b>${val} →</b></button>`}
    else if(PRIMARY[PAGE]){const [lab,target]=PRIMARY[PAGE]();main=`<a class="bbb-btn bbb-btn--primary" href="${target==='offer'?'#bbb-affiliate-details':(target.startsWith('#')?target:'#')}" data-bar-target="${target}" data-cta="${PAGE}-bar-primary">${lab}</a>`}
    const wa=`<a class="bbb-cta-bar__wa" href="${waHref(currentMsg())}" target="_blank" rel="noopener" data-cta="${PAGE}-bar-wa" aria-label="${L('Ask us on WhatsApp','WhatsApp 问我们')}">${WA_ICON}<span>WhatsApp</span></a>`;
    const html=`<div class="bbb-cta-bar__main">${main}</div>${wa}<button type="button" class="bbb-cta-bar__close" aria-label="${L('Hide','隐藏')}">✕</button>`;
    if(el.dataset.sig!==html){el.innerHTML=html;el.dataset.sig=html}
  }
  function visible(){
    return mq.matches&&!closed&&!heroSeen&&coverOn.size===0&&!focus&&!$('dialog[open]')&&!$('.bbb-site-links.is-open')&&!(window.visualViewport&&visualViewport.height<innerHeight*.75);
  }
  function update(){render();const v=visible();el.classList.toggle('is-visible',v);el.toggleAttribute('inert',!v);el.setAttribute('aria-hidden',String(!v));document.documentElement.classList.toggle('bbb-bar-on',v)}
  el.addEventListener('click',e=>{
    if(e.target.closest('.bbb-cta-bar__close')){closed=true;try{sessionStorage.setItem(key,'1')}catch(x){}update();return}
    if(e.target.closest('.bbb-cta-bar__readout')){const a=cfg.anchor&&cfg.anchor();(a||document.body).scrollIntoView({behavior:'smooth',block:'start'});return}
    const t=e.target.closest('[data-bar-target]');
    if(!t)return;const tg=t.dataset.barTarget;
    if(tg==='offer'){e.preventDefault();if(!(typeof window.bbbOpenOffer==='function'&&window.bbbOpenOffer())){const d=$('#bbb-affiliate-details')||$('.bbb-affiliate');if(d)d.scrollIntoView({behavior:'smooth'})}return}
    if(!tg.startsWith('#')){e.preventDefault();const d=$(tg);if(d)d.scrollIntoView({behavior:'smooth',block:'start'})}
  });
  /* Position checks on scroll/resize (works even where IntersectionObserver is throttled). */
  let heroEl=null,covers=[];
  function measure(){
    const vh=innerHeight||document.documentElement.clientHeight;
    // the bar waits until the visitor has scrolled past the hero CTA (also when the CTA starts below the fold)
    if(heroEl&&heroEl.isConnected){const r=heroEl.getBoundingClientRect();heroSeen=r.height?r.bottom>60:scrollY<Math.max(400,vh*.6)}else heroSeen=scrollY<Math.max(400,vh*.6);
    coverOn=new Set(covers.filter(n=>{if(!n.isConnected)return false;const r=n.getBoundingClientRect();if(!r.height)return false;const seen=Math.min(r.bottom,vh)-Math.max(r.top,0);return seen>0&&(seen>=r.height*.25||seen>=vh*.5)}));
  }
  function watch(){
    heroEl=$(cfg.hero.split(',')[0].trim())||$(cfg.hero);
    covers=[...new Set([...cfg.cover,'.bbb-final-cta','.bbb-result-cta','.bbb-related-resources','footer'].flatMap(s=>$$(s)))];
    measure();
  }
  addEventListener('scroll',()=>{measure();update()},{passive:true});
  addEventListener('resize',()=>{measure();update()});
  document.addEventListener('focusin',e=>{if(e.target.matches('input,select,textarea')){focus=true;update()}});
  document.addEventListener('focusout',()=>{focus=false;setTimeout(update,50)});
  mq.addEventListener('change',update);
  window.visualViewport&&visualViewport.addEventListener('resize',update);
  new MutationObserver(update).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
  const links=document.getElementById('bbbSiteLinks');if(links)new MutationObserver(update).observe(links,{attributes:true,attributeFilter:['class']});
  window.bbbFunnelDebug=()=>({heroSeen,cover:[...coverOn].map(n=>n.id||String(n.className).slice(0,30)),focus,mq:mq.matches,closed,dialog:!!$('dialog[open]'),menu:!!$('.bbb-site-links.is-open')});
  return{el,update,watch,mount(){document.body.append(el);watch();update()}};
})();

/* ---------- result watching (no page edits needed) ---------- */
function watchResults(){
  if(!cfg.read)return;
  const targets={retirement:['#rcResults','#rcSnapGap'],ci:['output#gap'],term:['output#gap'],fd:['#interest'],tax:['#mobile-saving'],cash:['#cOut']}[PAGE]||[];
  let t;const kick=recs=>{if(Array.isArray(recs)&&recs.every(r=>r.target.closest&&r.target.closest('.bbb-funnel')||(r.target.parentElement&&r.target.parentElement.closest('.bbb-funnel'))))return;clearTimeout(t);t=setTimeout(placeResult,120)};
  targets.forEach(s=>{const n=$(s);if(n)new MutationObserver(kick).observe(n,{subtree:true,childList:true,characterData:true})});
  // retirement rebuilds #rcResults; watch its parent too
  if(PAGE==='retirement'){const r=$('#rcResults');if(r&&r.parentElement)new MutationObserver(kick).observe(r.parentElement,{childList:true,subtree:true})}
  document.addEventListener('input',e=>{if(e.target.matches('#amount,#bank-select,#cAmt,#cRate,#cDays,#income'))kick()});
  document.addEventListener('change',kick);
  document.addEventListener('bbb:result',kick);
  kick();
}

/* ---------- boot ---------- */
function renderAll(){placeHeroLink();placeStatic();placeFinal();pageTweaks();placeResult();bar.watch();bar.update()}
function boot(){
  const link=document.createElement('link');link.rel='stylesheet';link.href=ROOT+'assets/bbb-funnel.css';document.head.append(link);
  bar.mount();renderAll();watchResults();
  let lastLang=zh();
  new MutationObserver(()=>{if(zh()!==lastLang){lastLang=zh();renderAll()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  setTimeout(renderAll,1200); // late-injected blocks (related panel, ux-starts)
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else setTimeout(boot,0);
})();
