const allocationInsights={
  'founder-stock':{
    label:'Concentration insight',title:'Founder stock',badge:'Review now',exposure:'28%',target:'15–20%',confidence:'High',
    thesis:'Share appreciation increased the position from 19% to 28% of family net worth—without a deliberate decision to add exposure.',
    change:'The Harrison family’s wealth, operating income, and professional risk are now increasingly tied to the same company.',
    question:'Would the family invest 28% of its net worth in this company today if it held cash instead?',
    decision:'Compare gradual-sale scenarios that preserve voting influence while improving diversification, liquidity, and estate flexibility.',
    action:'Review three diversification scenarios before September 15.',
    link:'one-decision.html'
  },
  'private-equity':{
    label:'Commitment-pacing insight',title:'Private equity',badge:'Review',exposure:'34%',target:'25–30%',confidence:'Medium',
    thesis:'Three consecutive commitments and slower distributions moved private-market exposure above the Harrison family’s intended range.',
    change:'Expected capital calls over the next 18 months now exceed projected distributions by $2.1 million.',
    question:'Is another commitment the best use of remaining illiquidity capacity—or is familiarity driving the decision?',
    decision:'Pause new generalist buyout commitments while preserving capacity for differentiated managers and secondaries.',
    action:'Complete the commitment-pacing review before evaluating the next fund.',
    link:'one-decision.html'
  },
  'liquidity':{
    label:'Liquidity insight',title:'Liquidity reserve',badge:'Action needed',exposure:'18 months',target:'24 months',confidence:'High',
    thesis:'The reserve exists to fund family spending, taxes, and capital calls without forcing asset sales at the wrong time.',
    change:'New commitments and planned real-estate spending reduced the forward cushion below family policy.',
    question:'Is the family accepting unnecessary decision risk for a modest increase in expected return?',
    decision:'Rebuild the reserve with short-duration Treasuries and municipal bonds matched to expected cash needs.',
    action:'Fund the first $1.5 million liquidity ladder within 45 days.',
    link:'one-decision.html'
  }
};

const reviewTabs=[...document.querySelectorAll('.conviction-tab')];
const reviewDetail=document.querySelector('.conviction-detail');
const reviewLink=document.getElementById('review-link');
const reviewFields={
  label:'review-label',title:'review-title',badge:'review-badge',exposure:'review-exposure',target:'review-target',confidence:'review-confidence',
  thesis:'review-thesis',change:'review-change',question:'review-question',decision:'review-decision',action:'review-action'
};

function renderAllocationInsight(key,focusTab=false){
  const insight=allocationInsights[key];
  if(!insight||!reviewDetail)return;
  reviewDetail.classList.add('is-changing');
  window.setTimeout(()=>{
    Object.entries(reviewFields).forEach(([field,id])=>{
      const element=document.getElementById(id);
      if(element)element.textContent=insight[field];
    });
    if(reviewLink)reviewLink.href=insight.link;
    reviewTabs.forEach(tab=>{
      const selected=tab.dataset.review===key;
      tab.classList.toggle('active',selected);
      tab.setAttribute('aria-selected',selected?'true':'false');
      tab.tabIndex=selected?0:-1;
      if(selected&&focusTab)tab.focus();
    });
    reviewDetail.classList.remove('is-changing');
  },120);
}

reviewTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>renderAllocationInsight(tab.dataset.review));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(event.key))return;
    event.preventDefault();
    const direction=['ArrowDown','ArrowRight'].includes(event.key)?1:-1;
    const next=(index+direction+reviewTabs.length)%reviewTabs.length;
    renderAllocationInsight(reviewTabs[next].dataset.review,true);
  });
});

renderAllocationInsight('founder-stock');