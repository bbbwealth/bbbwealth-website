const groups=[
['生活与居家','⌂','日常生活，也有减免空间。',[
['lifestyle','生活方式 Lifestyle',2500,'书报、电子读物、非商业用途电脑／手机／平板、本人名下网费及符合条件的个人提升课程，共用 RM2,500。','购买收据、网络账单、课程收据。'],
['sport','运动与健身',1000,'自己、配偶、孩子或父母的符合条件的运动器材、场地、比赛、健身房及培训费用。瑜伽／普拉提要先确认机构及活动资格。','正式收据、机构与活动资格。'],
['study','个人进修学费',7000,'认可机构与规定领域的课程；硕士、博士可为任何领域。技能提升课程细项上限 RM2,000，包含在 RM7,000 内。','学费收据、课程及机构认可证明。'],
['green','环保与居家安全设备',2500,'自用 EV 充电设施、家用堆肥机、厨余粉碎机与 CCTV 等，共用上限。堆肥机在 2025–2027 年间一次；粉碎机／CCTV 每两个课税年一次。','购买、安装、租用或订阅单据，并核对申报频次。'],
['home','首购住宅房贷利息',7000,'房价 ≤ RM500,000：上限 RM7,000；超过 RM500,000 至 RM750,000：上限 RM5,000。限符符合条件的的公民及税务居民，首宅不可用于产生收入。S&P 在 2025/1/1 至 2027/12/31 签署，首次支付利息起连续三个课税年。','S&P、银行年度利息证明；只计利息，不计本金。'],
['travel','国内景点与文化活动',1000,'符合条件的国内博物馆、主题乐园、国家／海洋公园、动物园、地质公园及文化艺术活动的入场费。不包括酒店、机票及交通。','列明景点／活动及入场费的票据。']]],
['医疗与照护','♡','照顾家人，注意医疗共用上限。',[
['medical','自己、配偶或孩子的医疗费',10000,'严重疾病及符合条件的生育治疗等。疫苗细项上限 RM1,000；牙科细项上限 RM1,000；全面体检、筛查、心理健康及监测器材等共用 RM1,000 细项上限。与儿童学习障碍诊断／干预共用 RM10,000。','医疗收据及医生／牙医证明。先核对细项上限后输入。'],
['intervention','儿童学习障碍诊断与干预',10000,'18 岁及以下孩子的符合条件的诊断、早期干预或康复治疗。2026 年细项上限 RM10,000，与上一项共用 RM10,000 总上限。','专业人员收据、诊断或治疗证明。'],
['parents','父母与祖父母医疗及照护',8000,'符合条件的医疗、牙科、特殊需要及照护费用。全面体检与符合条件的疫苗共用 RM1,000 细项上限。要符合居民身份、服务地点及证明条件。','医生证明、收据及照护资料；一般生活费不适用。'],
['equipment','残障人士基本辅助器材',6000,'为自己、配偶、孩子或父母购买的符合条件的辅助器材，如轮椅、义肢及助听器。眼镜和隐形眼镜不适用。','器材收据及符合规定的残障证明。'],
['breastfeed','哺乳器材',1000,'符合条件的女性纳税人为两岁及以下孩子购买自用哺乳器材。每两个课税年一次，多名孩子共用上限。','购买收据、孩子出生资料及上次申报年份。'],
['childcare','托儿、幼儿园与课后照顾',3000,'符合条件的注册托儿所、幼儿园，以及为 12 岁及以下孩子提供服务的 JKM 注册日间照顾／课后中转中心。夫妻分开评税时由符合条件的一方申报。','注册资料、收费收据及孩子身份资料；上限并非每名孩子计算。']]],
['个人与家庭','♧','固定减免按资格，储蓄按年度净存款。',[
['basic','个人基本减免',9000,'符合条件的马来西亚个人税务居民可享固定 RM9,000。计算器已算进，不用另外花钱。','税务居民身份与报税资料。'],
['disabled','本人残障额外减免',7000,'符合规定的残障纳税人，在个人基本减免以外额外申报 RM7,000。','JKM 登记或符合条件的证明；符符合条件的才填写 7000。'],
['spouse','配偶减免／前妻赡养费',4000,'配偶无收入或符合规定的合并评税情况；前妻赡养费须依法或正式协议支付。两者共用 RM4,000。','婚姻、收入、赡养费正式文件及付款证明。'],
['disabledspouse','残障配偶额外减免',6000,'符合规定的残障配偶可获额外减免，是否同时可申报配偶基本减免要按收入及评税方式判断。','残障证明及评税资料；符符合条件的才填写 6000。'],
['children','子女减免',null,'未婚未满 18 岁一般每名 RM2,000；18 岁及以上按认可课程可为 RM2,000 或 RM8,000。未婚残障子女每名 RM8,000；符合指定高等教育条件可再加 RM8,000。按适用类别计算，普通减免不重复叠加。','出生／领养、在学、课程认可及残障证明。输入由你申报的合计金额。'],
['sspn','SSPN 教育储蓄净存款',8000,'父母为孩子教育储蓄，按当年存款减提款计算；符合条件的高等教育费用提款可按规则排除。夫妻分开评税仅一方申报，为自己受惠的存款不适用。','PTPTN 年度税务减免结单及符合条件的提款证明。']]],
['保险与退休','◷','用年度结单核对保费及退休供款。',[
['epf','EPF 与人寿保险',7000,'第一部分 EPF 上限 RM4,000；第二部分人寿保险／家庭 takaful／额外自愿 EPF 上限 RM3,000。同一笔存入的款项不能重复计算；人寿保障范围按规定涵盖符合条件子女。','EPF 及保险年度税务结单；下方分两栏填写。'],
['prs','PRS 与递延年金',3000,'符合条件的私人退休计划（PRS）供款与递延年金保费共用 RM3,000。基金价格会波动、回酬不保证；提前提款有条件及可能的税务影响。','PRS／保险年度税务结单。平台奖励与税务减免分别计算。'],
['insurance','教育与医药保险',4000,'自己、配偶或符合条件孩子的符合条件的教育及医药保险保费。综合保单要按年度结单分拆，避免在人寿及医药保险重复申报。','保险年度税务结单、付款证明及适用子女资格。'],
['socso','SOCSO / EIS',350,'本人承担的符合条件的 SOCSO 及 EIS 供款，合计最高 RM350；雇主承担的部分不算进。','工资单、EA 表格及供款记录。']]]];
const money=n=>'RM'+Number(n).toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
const val=id=>Math.max(0,Math.min(1e9,Number(document.getElementById(id)?.value)||0));
const capped=(id,cap)=>Math.min(val(id),cap??1e9);
function input(id,label){return `<label class="amount-label" for="${id}">${label}<span class="input-wrap"><span>RM</span><input type="number" id="${id}" min="0" max="1000000000" step="0.01" placeholder="0" inputmode="decimal" aria-describedby="note-${id.startsWith('epf')?'epf':id}"></span></label>`}
let counter=0;
document.getElementById('relief-groups').innerHTML=groups.map(([name,icon,intro,items],gi)=>`<section class="relief-group" id="group-${gi}"><div class="group-title"><span class="group-icon" aria-hidden="true">${icon}</span><div><h3>${name}</h3><p>${intro}</p></div><span class="group-count">${items.length} 项</span></div>${items.map(([id,title,cap,desc,proof])=>{counter++;const field=id==='basic'?'<span class="included">已自动算进 RM9,000</span>':id==='epf'?input('epf1','EPF 第一部分')+input('epf2','人寿／自愿 EPF 第二部分'):input(id,id==='children'?'由你申报的合计金额':'你可以 claim 的金额');return `<article class="relief-row"><details><summary><span class="item-no">${String(counter).padStart(2,'0')}</span><span class="item-title">${title}</span><span class="limit">${cap?'最高 RM'+cap.toLocaleString('en-MY'):'按孩子资格'}</span><span class="expand" aria-hidden="true">+</span></summary><div class="item-detail" id="note-${id}"><p>${desc}</p><p class="proof"><strong>记得收好：</strong>${proof}</p>${id==='home'?'<label class="home-price" for="home-tier">首宅价格<select id="home-tier"><option value="7000">RM500,000 或以下</option><option value="5000">超过 RM500,000 至 RM750,000</option><option value="0">超过 RM750,000／不符符合条件的</option></select></label>':''}${id==='prs'?'<a class="text-link" href="#prs-offers">查看 PRS 开户奖励 ↗</a>':''}</div></details><div class="row-input ${id==='epf'?'double':''}">${field}</div></article>`}).join('')}</section>`).join('');
const brackets=[[5000,0],[20000,.01],[35000,.03],[50000,.06],[70000,.11],[100000,.19],[400000,.25],[600000,.26],[2000000,.28],[Infinity,.30]];
function grossTax(income){let tax=0,low=0;for(const [top,rate]of brackets){tax+=Math.max(0,Math.min(income,top)-low)*rate;if(income<=top)break;low=top}return tax}
function netTax(income){return Math.max(0,grossTax(income)-(income<=35000?400:0))}
function calculate(){let relief=9000,raw=9000;for(const [,,,items]of groups)for(const[id,,cap]of items){if(['basic','medical','intervention','epf'].includes(id))continue;raw+=val(id);relief+=capped(id,id==='home'?Number(document.getElementById('home-tier').value):cap)}raw+=val('medical')+val('intervention')+val('epf1')+val('epf2');relief+=Math.min(val('medical')+val('intervention'),10000)+capped('epf1',4000)+capped('epf2',3000);const income=val('income'),taxable=Math.max(0,income-relief),baseline=Math.max(0,income-9000),tax=netTax(taxable),saving=Math.max(0,netTax(baseline)-tax),entered=document.getElementById('income').value!=='';
document.getElementById('total-relief').textContent=money(relief);document.getElementById('taxable').textContent=entered?money(taxable):'等待填写收入';document.getElementById('estimated-tax').textContent=entered?money(tax):'—';document.getElementById('tax-saving').textContent=entered?money(saving):'—';document.getElementById('tax-before').textContent=entered?money(netTax(baseline)):'—';document.getElementById('selected-count').textContent=groups.flatMap(g=>g[3]).filter(([id])=>id==='basic'||(id==='epf'?val('epf1')+val('epf2'):val(id))>0).length;document.getElementById('cap-note').textContent=raw>relief?'已自动套用各项上限、EPF 分项上限及医疗共用 RM10,000 上限。':'已包含个人基本减免 RM9,000；其余项目请按资格与单据填写。';document.getElementById('after-bar').style.width=entered?tax/Math.max(netTax(baseline),1)*100+'%':'0%';document.getElementById('before-bar').style.width=entered?'100%':'0%';document.getElementById('mobile-saving').textContent=entered?money(saving):'先填写年度收入';document.getElementById('input-warning').hidden=![...document.querySelectorAll('.calculator-layout input[type=number]')].some(x=>Number(x.value)<0||Number(x.value)>1e9);return{relief,taxable,tax,saving}}
document.addEventListener('input',e=>{if(e.target.matches('input')&&!e.target.closest('#prs-impact-form')){document.getElementById('example-state').hidden=true;calculate()}});document.getElementById('home-tier').addEventListener('change',calculate);
document.getElementById('example').addEventListener('click',()=>{document.querySelectorAll('.calculator-layout input[type=number]').forEach(x=>x.value='');for(const[id,v]of Object.entries({income:90000,epf1:4000,lifestyle:2500,prs:3000}))document.getElementById(id).value=v;calculate();document.getElementById('example-state').hidden=false});
document.getElementById('reset').addEventListener('click',()=>{document.querySelectorAll('.calculator-layout input[type=number]').forEach(x=>x.value='');document.getElementById('home-tier').value='7000';document.getElementById('example-state').hidden=true;calculate()});
document.querySelectorAll('[data-code]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(b.dataset.code);b.textContent='已复制 ✓'}catch{b.textContent='请长按上方代码复制'}setTimeout(()=>b.textContent='复制 code',2200)}));
document.getElementById('expand-all').addEventListener('click',e=>{const open=e.target.dataset.open!=='true';document.querySelectorAll('.relief-row details').forEach(x=>x.open=open);e.target.dataset.open=String(open);e.target.textContent=open?'收起全部说明 −':'展开全部说明 +'});
const tabs=document.getElementById('category-tabs');
tabs.innerHTML=groups.map(([name,icon,,items],i)=>`<button type="button" class="category-tab" data-group="${i}" aria-pressed="${i===0}"><span aria-hidden="true">${icon}</span><b>${name}</b><small>${items.length} 项</small></button>`).join('')+'<button class="show-all" type="button" data-group="all" aria-pressed="false">查看全部 22 项</button>';
function showGroup(selected){document.querySelectorAll('.relief-group').forEach((g,i)=>g.hidden=selected!=='all'&&i!==Number(selected));document.querySelectorAll('[data-group]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.group===String(selected))))}
tabs.addEventListener('click',e=>{const b=e.target.closest('[data-group]');if(b)showGroup(b.dataset.group)});
document.querySelectorAll('.intro-strip a').forEach((a,i)=>a.addEventListener('click',()=>showGroup(i)));
showGroup(0);calculate();
const categoryArtwork=[
 '<svg viewBox="0 0 32 32" fill="none"><path d="m4 14 12-10 12 10M7 12v15h18V12M13 27v-9h6v9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 6h4v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 32 32" fill="none"><path d="M16 27S4 19.5 4 11.5C4 5 12 3 16 9c4-6 12-4 12 2.5C28 19.5 16 27 16 27Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M11 17h3l2-5 2 8 2-3h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 '<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="10" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M8 27v-3a8 8 0 0 1 16 0v3M6 9a3 3 0 0 0 0 6M26 9a3 3 0 0 1 0 6M3 25v-3a5 5 0 0 1 3-4M29 25v-3a5 5 0 0 0-3-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
 '<svg viewBox="0 0 32 32" fill="none"><path d="M16 29S5 25 5 15V6l11-3 11 3v9c0 10-11 14-11 14Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m11 16 4 4 7-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
];
document.querySelectorAll('.intro-strip .tile-icon').forEach((el,i)=>el.innerHTML=categoryArtwork[i]);
document.querySelectorAll('.group-icon').forEach((el,i)=>el.innerHTML=categoryArtwork[i]);
document.querySelectorAll('.category-tab>span').forEach((el,i)=>el.innerHTML=categoryArtwork[i]);

