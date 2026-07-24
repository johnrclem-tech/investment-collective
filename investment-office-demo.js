const officePanels=[...document.querySelectorAll('.dashboard-panel')];
const officeDetails=[
  {label:'Upcoming decisions',title:'Horizon Growth Partners V',status:'Decision due in 30 days',body:'A $2.0M commitment would increase private-equity exposure from 18% to 21% and reduce twelve-month excess liquidity by $1.4M after modeled capital calls.',items:[['Portfolio fit','Moderate'],['Peer experience','17 members'],['Primary tension','Quality vs. liquidity']],action:'Open One Decision',href:'one-decision.html'},
  {label:'Liquidity forecast',title:'Twelve-month liquidity',status:'Reserve remains above policy',body:'Expected inflows and available credit cover modeled obligations, but the proposed fund commitment narrows the cushion during the fourth quarter.',items:[['Starting liquidity','$8.4M'],['Modeled obligations','$3.6M'],['Ending reserve','$4.8M']],action:'Review liquidity assumptions',href:'#'},
  {label:'Attention required',title:'Technology concentration',status:'Above family guideline',body:'Public equities, venture funds, and the operating business create overlapping technology exposure that is not obvious when each account is reviewed separately.',items:[['Direct exposure','22%'],['Look-through exposure','31%'],['Family guideline','25%']],action:'View concentration map',href:'#'},
  {label:'Decision Journal',title:'2026 decision history',status:'14 opportunities evaluated',body:'The journal preserves the original assumptions behind every investment and pass, then compares those expectations with what actually happened.',items:[['Invested','5'],['Passed','9'],['Postmortems due','3']],action:'Explore the Decision Journal',href:'#'}
];
if(officePanels.length){
  const shell=document.querySelector('.dashboard-shell');
  const drawer=document.createElement('section');
  drawer.className='office-drawer';
  drawer.setAttribute('aria-live','polite');
  shell.appendChild(drawer);
  const render=(index)=>{
    const d=officeDetails[index];
    officePanels.forEach((p,i)=>p.classList.toggle('active',i===index));
    drawer.innerHTML=`<div class="office-drawer-copy"><span class="eyebrow">${d.label}</span><h3>${d.title}</h3><p>${d.body}</p><a class="button primary" href="${d.href}">${d.action}</a></div><div class="office-drawer-data"><span class="office-status">${d.status}</span>${d.items.map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join('')}</div>`;
    drawer.classList.add('open');
  };
  officePanels.forEach((panel,index)=>{
    panel.tabIndex=0;
    panel.setAttribute('role','button');
    panel.setAttribute('aria-label',`Open ${officeDetails[index].label}`);
    panel.addEventListener('click',()=>render(index));
    panel.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();render(index)}});
  });
  render(0);
}
