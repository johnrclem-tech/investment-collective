const journalRecords={
  horizon:{
    number:'Decision 042 · May 2023',
    title:'Horizon Growth Partners IV',
    status:'Passed',
    amount:'$2,000,000',
    confidence:'72%',
    review:'June 2026',
    thesis:'A strong growth-equity manager with differentiated sourcing and credible operating support could compound capital over a ten-year horizon.',
    context:'Private equity already represented 18% of Harrison family capital, with $5.9 million of unfunded commitments and limited near-term distributions.',
    risks:'Manager succession, aggressive entry valuations, overlapping technology exposure, and a draw schedule that could tighten liquidity.',
    decision:'Pass. The fund may be attractive, but the commitment is not right for the family at this point in the portfolio cycle.',
    expected:'The manager could perform well, while the family would preserve flexibility and keep private-market exposure inside its intended range.',
    actual:'Early portfolio marks were positive, but distributions remained limited. The preserved liquidity funded a later direct investment with less portfolio overlap.',
    lesson:'A strong investment is not automatically the right portfolio decision. Underwrite opportunity quality and family fit separately.'
  },
  credit:{
    number:'Decision 037 · November 2024',
    title:'Northshore Private Credit',
    status:'Invested',
    amount:'$1,250,000',
    confidence:'78%',
    review:'May 2026',
    thesis:'Senior-secured loans with conservative advance rates could add current income while reducing duration relative to the existing private portfolio.',
    context:'The Harrison family held excess cash, expected few near-term capital calls, and wanted more income without increasing public-equity exposure.',
    risks:'Underwriting deterioration, hidden leverage, weak creditor protections, delayed liquidity, and returns that might not justify complexity after fees.',
    decision:'Invest at half the manager’s suggested allocation and require quarterly transparency on leverage, defaults, amendments, and covenant changes.',
    expected:'A net return near 9%, quarterly income, low loss severity, and modest correlation with public equity markets.',
    actual:'Income met expectations, but several amendments exposed weaker documentation than anticipated. The position remained profitable and was not increased.',
    lesson:'Yield is easy to compare. Creditor protections are harder—and often more important. Future reviews will score documentation quality explicitly.'
  },
  stock:{
    number:'Decision 029 · June 2025',
    title:'Founder Stock Reduction',
    status:'Trimmed',
    amount:'$3,400,000',
    confidence:'65%',
    review:'July 2026',
    thesis:'The company remained exceptional, but the position had grown large enough that family risk depended more on valuation and sentiment than business execution.',
    context:'Founder stock represented 28% of family net worth and overlapped with employment income, private technology funds, and broader market exposure.',
    risks:'Selling too early, realizing significant taxes, continued appreciation, and replacing a known high-quality asset with weaker opportunities.',
    decision:'Reduce the position gradually toward 20%, reserve for taxes, preserve voting influence, and adopt a written concentration range.',
    expected:'Some forgone upside if the shares kept rising, offset by stronger liquidity, diversification, and reduced dependence on one company.',
    actual:'The shares continued rising before a sharp decline the following year. The smaller position preserved meaningful gains and reduced pressure during the downturn.',
    lesson:'Risk controls often feel worst immediately after they are used. Judge them by the exposure they prevent, not the upside they forgo.'
  }
};

const journalTabs=[...document.querySelectorAll('.journal-tab')];
const journalRecord=document.getElementById('journal-record');
const fields=['number','title','status','amount','confidence','review','thesis','context','risks','decision','expected','actual','lesson'];

function renderJournalRecord(key,focusTab=false){
  const record=journalRecords[key];
  if(!record||!journalRecord)return;
  journalRecord.classList.add('is-changing');
  window.setTimeout(()=>{
    fields.forEach(field=>{
      const node=document.getElementById(`record-${field}`);
      if(node)node.textContent=record[field];
    });
    journalTabs.forEach(tab=>{
      const selected=tab.dataset.record===key;
      tab.classList.toggle('active',selected);
      tab.setAttribute('aria-selected',selected?'true':'false');
      tab.tabIndex=selected?0:-1;
      if(selected&&focusTab)tab.focus();
    });
    journalRecord.classList.remove('is-changing');
  },120);
}

journalTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>renderJournalRecord(tab.dataset.record));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(event.key))return;
    event.preventDefault();
    const direction=['ArrowDown','ArrowRight'].includes(event.key)?1:-1;
    const next=(index+direction+journalTabs.length)%journalTabs.length;
    renderJournalRecord(journalTabs[next].dataset.record,true);
  });
});

renderJournalRecord('horizon');