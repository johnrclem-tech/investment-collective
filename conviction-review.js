const convictionReviews={
  'founder-stock':{
    label:'Concentration review',title:'Founder stock',badge:'Reduce',exposure:'28%',target:'20%',confidence:'Medium',
    thesis:'The company remained the family’s highest-conviction asset, with strong information advantage, meaningful influence, and substantial long-term upside.',
    change:'The operating business, employment income, and personal balance sheet are now exposed to many of the same economic risks.',
    question:'Would you invest 28% of your family’s net worth in this company today if you had inherited cash instead?',
    decision:'Reduce exposure gradually to 20%, preserve voting influence, and redirect proceeds toward liquidity and uncorrelated assets.',
    action:'Complete the first scheduled sale before September 30.'
  },
  'private-equity':{
    label:'Allocation review',title:'Private equity',badge:'Hold',exposure:'18%',target:'15–20%',confidence:'High',
    thesis:'Private equity should provide long-duration exposure to control-oriented managers, operational improvement, and return sources unavailable in public markets.',
    change:'Fund pacing has accelerated and several commitments overlap by strategy, but near-term distributions are also improving.',
    question:'Are you being paid enough for illiquidity once fees, concentration, and delayed information are considered together?',
    decision:'Hold the current allocation, pause new buyout commitments for six months, and prioritize secondaries and differentiated specialist managers.',
    action:'Complete a manager-overlap review before approving the next commitment.'
  },
  'municipal-bonds':{
    label:'Purpose review',title:'Municipal bonds',badge:'Rebuild',exposure:'9%',target:'12%',confidence:'High',
    thesis:'The allocation provides tax-efficient income, downside resilience, and a dependable source of liquidity for capital calls and family spending.',
    change:'Recent private commitments and planned real-estate spending have reduced the family’s forward liquidity cushion below policy.',
    question:'Is this portfolio being judged by return alone when its real job is to protect decision-making flexibility?',
    decision:'Increase the allocation to 12% using short- and intermediate-duration securities matched to expected cash needs.',
    action:'Build the first $1.5 million ladder within 45 days.'
  }
};

const reviewTabs=document.querySelectorAll('.conviction-tab');
const reviewDetail=document.querySelector('.conviction-detail');
const reviewFields={label:'review-label',title:'review-title',badge:'review-badge',exposure:'review-exposure',target:'review-target',confidence:'review-confidence',thesis:'review-thesis',change:'review-change',question:'review-question',decision:'review-decision',action:'review-action'};

function renderConvictionReview(key){
  const review=convictionReviews[key];
  if(!review||!reviewDetail)return;
  reviewDetail.classList.add('is-changing');
  window.setTimeout(()=>{
    Object.entries(reviewFields).forEach(([field,id])=>{
      const element=document.getElementById(id);
      if(element)element.textContent=review[field];
    });
    reviewTabs.forEach(tab=>{
      const selected=tab.dataset.review===key;
      tab.classList.toggle('active',selected);
      tab.setAttribute('aria-selected',selected?'true':'false');
    });
    reviewDetail.classList.remove('is-changing');
  },150);
}
reviewTabs.forEach(tab=>tab.addEventListener('click',()=>renderConvictionReview(tab.dataset.review)));