const allocationInsights={
  'founder-stock':{
    label:'Concentration insight',title:'Founder stock',badge:'Review',exposure:'28%',target:'15–20%',confidence:'High',
    thesis:'Share appreciation increased the position from 19% to 28% of family net worth without a deliberate decision to add exposure.',
    change:'The operating business, employment income, and personal balance sheet now share many of the same economic risks.',
    question:'Would the family invest 28% of its net worth in this company today if it had inherited cash instead?',
    decision:'Evaluate a gradual reduction toward 20%, while preserving voting influence and considering tax and estate implications.',
    action:'Prepare scenarios for the September allocation review.'
  },
  'private-equity':{
    label:'Pacing insight',title:'Private equity',badge:'Monitor',exposure:'34%',target:'25–30%',confidence:'Medium',
    thesis:'Three consecutive commitments and slower distributions moved private-market exposure above the family’s intended range.',
    change:'Expected capital calls over the next 18 months now exceed expected distributions by $2.1 million.',
    question:'Is another commitment still the best use of illiquidity capacity, or is familiarity driving the decision?',
    decision:'Pause new generalist buyout commitments and reserve capacity for differentiated managers or secondaries.',
    action:'Complete the commitment-pacing model before the next investment committee meeting.'
  },
  'municipal-bonds':{
    label:'Liquidity insight',title:'Liquidity reserve',badge:'Rebuild',exposure:'18 months',target:'24 months',confidence:'High',
    thesis:'The reserve exists to fund family spending, taxes, and capital calls without forcing asset sales at the wrong time.',
    change:'New commitments and planned real-estate spending reduced the forward cushion below family policy.',
    question:'Is the family accepting unnecessary decision risk in exchange for a small increase in expected return?',
    decision:'Rebuild the reserve with short-duration Treasuries and municipal bonds matched to expected cash needs.',
    action:'Fund the first $1.5 million liquidity ladder within 45 days.'
  }
};

const reviewTabs=document.querySelectorAll('.conviction-tab');
const reviewDetail=document.querySelector('.conviction-detail');
const reviewFields={label:'review-label',title:'review-title',badge:'review-badge',exposure:'review-exposure',target:'review-target',confidence:'review-confidence',thesis:'review-thesis',change:'review-change',question:'review-question',decision:'review-decision',action:'review-action'};

function renderAllocationInsight(key){
  const insight=allocationInsights[key];
  if(!insight||!reviewDetail)return;
  reviewDetail.classList.add('is-changing');
  window.setTimeout(()=>{
    Object.entries(reviewFields).forEach(([field,id])=>{
      const element=document.getElementById(id);
      if(element)element.textContent=insight[field];
    });
    reviewTabs.forEach(tab=>{
      const selected=tab.dataset.review===key;
      tab.classList.toggle('active',selected);
      tab.setAttribute('aria-selected',selected?'true':'false');
    });
    reviewDetail.classList.remove('is-changing');
  },150);
}
reviewTabs.forEach(tab=>tab.addEventListener('click',()=>renderAllocationInsight(tab.dataset.review)));