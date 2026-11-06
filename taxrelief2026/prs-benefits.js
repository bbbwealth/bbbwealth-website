const prsRates=[['0 – 5,000',0],['5,001 – 20,000',1],['20,001 – 35,000',3],['35,001 – 50,000',6],['50,001 – 70,000',11],['70,001 – 100,000',19],['100,001 – 400,000',25],['400,001 – 600,000',26],['600,001 – 2,000,000',28],['超过 2,000,000',30]];
document.getElementById('prs-rate-rows').innerHTML=prsRates.map(([range,rate])=>`<tr${rate===11?' class="reference-rate"':''}><th scope="row">${range}</th><td>${rate}%</td><td><strong>${rate*30}</strong></td><td>${rate*15}<span class="treat-unit"> 份</span></td></tr>`).join('');
function prsImpact(income,other,prs){
 const clean=n=>Math.max(0,Math.min(1e9,Number(n)||0));
 const annual=clean(income),deductions=Math.max(9000,clean(other)),contribution=Math.min(3000,clean(prs));
 const withoutIncome=Math.max(0,annual-deductions),withIncome=Math.max(0,withoutIncome-contribution);
 const withoutTax=netTax(withoutIncome),withTax=netTax(withIncome);
 return{annual,deductions,contribution,withoutIncome,withIncome,withoutTax,withTax,saving:Math.max(0,withoutTax-withTax)};
}
function updatePrsImpact(){
 const p=prsImpact(document.getElementById('impact-income').value,document.getElementById('impact-other').value,document.getElementById('impact-prs').value);
 const rm=n=>'RM'+n.toLocaleString('en-MY',{minimumFractionDigits:Number.isInteger(n)?0:2,maximumFractionDigits:2});
 document.querySelectorAll('[data-impact="income"]').forEach(el=>el.textContent=rm(p.annual));
 document.querySelectorAll('[data-impact="other"]').forEach(el=>el.textContent=rm(p.deductions));
 for(const[id,n]of Object.entries({'impact-deduction':p.contribution,'impact-with-income':p.withIncome,'impact-without-income':p.withoutIncome,'impact-with-tax':p.withTax,'impact-without-tax':p.withoutTax,'impact-saving':p.saving}))document.getElementById(id).textContent=(id==='impact-deduction'?'+ ':'')+rm(n);
 document.getElementById('impact-treats').textContent=Math.floor(p.saving/2).toLocaleString('en-MY');
 const rawOther=Number(document.getElementById('impact-other').value)||0,rawPrs=Number(document.getElementById('impact-prs').value)||0;
 let limits='';if(rawOther<9000)limits+='其他减免已按至少 RM9,000 个人基本减免计算。';if(rawPrs>3000)limits+='PRS 减免已按 RM3,000 上限计算。';
 document.getElementById('impact-explanation').textContent=limits+rm(p.contribution)+' 是此处可计入的 PRS 减免；'+rm(p.saving)+' 是估算税款差额，不是投资回酬。供款的实际投资金额受费用影响。';
 return p;
}
document.getElementById('prs-impact-form').addEventListener('input',updatePrsImpact);
document.getElementById('prs-impact-form').addEventListener('submit',event=>event.preventDefault());
document.getElementById('impact-reset').addEventListener('click',()=>{document.getElementById('impact-income').value=80000;document.getElementById('impact-other').value=20000;document.getElementById('impact-prs').value=3000;updatePrsImpact();});
updatePrsImpact();
if(typeof IntersectionObserver!=='undefined'){
 const sticky=document.querySelector('.mobile-result');
 if(sticky)new IntersectionObserver(entries=>sticky.classList.toggle('in-prs',entries[0].isIntersecting)).observe(document.getElementById('prs-offers'));
}
