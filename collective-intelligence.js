const collectiveRecords={
  horizon:{
    label:'Manager intelligence',title:'Horizon Growth Partners',badge:'Permissioned',reviewed:'17',invested:'11',passed:'6',repeat:'8',
    finding:'Strong operating support. Succession remains the recurring concern.',
    findingBody:'Members consistently praised portfolio-company involvement and communication, while several questioned how much of the edge depends on two senior partners.',
    investedQuote:'We invested, but at half the proposed size. The manager fit; the portfolio could not absorb the full commitment.',
    investedMeta:'Member 08 · Growth equity investor',
    passedQuote:'The track record was strong. We passed because succession risk and technology overlap were both higher than they first appeared.',
    passedMeta:'Member 14 · Former operator',
    context:'For the Harrison family, the manager may be attractive—but another $2 million commitment would push private-equity exposure above the current range.'
  },
  northshore:{
    label:'Strategy intelligence',title:'Northshore Private Credit',badge:'Permissioned',reviewed:'9',invested:'6',passed:'3',repeat:'4',
    finding:'Income met expectations. Documentation quality separated the experiences.',
    findingBody:'Members reported consistent distributions, but outcomes varied based on covenant strength, amendment discipline, and the manager’s willingness to disclose problems early.',
    investedQuote:'The yield was as expected. The real value was quarterly transparency on leverage, defaults, and amendments.',
    investedMeta:'Member 03 · Credit-focused family office',
    passedQuote:'We passed after the documents gave the manager too much discretion. The economics were attractive; the creditor protections were not.',
    passedMeta:'Member 11 · Former lender',
    context:'The Harrison family already owns the strategy. The useful question is not whether to add more—it is whether the existing position is earning its complexity.'
  },
  founder:{
    label:'Decision intelligence',title:'Founder Stock Concentration',badge:'Anonymous',reviewed:'23',invested:'—',passed:'—',repeat:'18',
    finding:'Most members diversified later than planned—and earlier than felt comfortable.',
    findingBody:'The recurring lesson was that tax cost, identity, control, and optimism make founder concentration unusually difficult to evaluate with portfolio math alone.',
    investedQuote:'Our best decision was adopting a written reduction range before the stock moved again. The rule removed the burden of deciding from scratch each quarter.',
    investedMeta:'Member 05 · Founder, software exit',
    passedQuote:'We delayed because the company still looked exceptional. That was true, but it did not answer whether the family should keep 30% of its wealth in one position.',
    passedMeta:'Member 19 · Founder, consumer business',
    context:'The Harrison family’s founder stock has risen from 19% to 28% of net worth. Member experience helps frame the tradeoff; the family still decides.'
  }
};

const collectiveTabs=[...document.querySelectorAll('.collective-search-tab')];
const collectiveResults=document.getElementById('collective-results');
const fields=['label','title','badge','reviewed','invested','passed','repeat','finding','findingBody','investedQuote','investedMeta','passedQuote','passedMeta','context'];

function renderCollectiveRecord(key,focusTab=false){
  const record=collectiveRecords[key];
  if(!record||!collectiveResults)return;
  collectiveResults.classList.add('is-changing');
  window.setTimeout(()=>{
    fields.forEach(field=>{
      const node=document.getElementById(`collective-${field}`);
      if(node)node.textContent=record[field];
    });
    collectiveTabs.forEach(tab=>{
      const selected=tab.dataset.search===key;
      tab.classList.toggle('active',selected);
      tab.setAttribute('aria-selected',selected?'true':'false');
      tab.tabIndex=selected?0:-1;
      if(selected&&focusTab)tab.focus();
    });
    collectiveResults.classList.remove('is-changing');
  },120);
}

collectiveTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>renderCollectiveRecord(tab.dataset.search));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(event.key))return;
    event.preventDefault();
    const direction=['ArrowDown','ArrowRight'].includes(event.key)?1:-1;
    const next=(index+direction+collectiveTabs.length)%collectiveTabs.length;
    renderCollectiveRecord(collectiveTabs[next].dataset.search,true);
  });
});

renderCollectiveRecord('horizon');