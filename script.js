const layoutStyles=document.createElement('link');
layoutStyles.rel='stylesheet';
layoutStyles.href='site-footer.css';
document.head.appendChild(layoutStyles);

const designStyles=document.createElement('link');
designStyles.rel='stylesheet';
designStyles.href='design-system.css';
document.head.appendChild(designStyles);

const typographyStyles=document.createElement('link');
typographyStyles.rel='stylesheet';
typographyStyles.href='typography.css';
document.head.appendChild(typographyStyles);

const COMPANY_NAME='syndicateIQ';
const LEGACY_COMPANY_NAME='Investment Collective';

function applyCompanyName(){
  if(document.title.includes(LEGACY_COMPANY_NAME)){
    document.title=document.title.replaceAll(LEGACY_COMPANY_NAME,COMPANY_NAME);
  }

  document.querySelectorAll('[content],[title],[aria-label],[placeholder]').forEach(element=>{
    ['content','title','aria-label','placeholder'].forEach(attribute=>{
      const value=element.getAttribute(attribute);
      if(value&&value.includes(LEGACY_COMPANY_NAME)){
        element.setAttribute(attribute,value.replaceAll(LEGACY_COMPANY_NAME,COMPANY_NAME));
      }
    });
  });

  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      const parent=node.parentElement;
      if(!parent||['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName))return NodeFilter.FILTER_REJECT;
      return node.nodeValue.includes(LEGACY_COMPANY_NAME)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  textNodes.forEach(node=>{
    node.nodeValue=node.nodeValue.replaceAll(LEGACY_COMPANY_NAME,COMPANY_NAME);
  });
}

applyCompanyName();

const currentPage=window.location.pathname.split('/').pop()||'index.html';
const main=document.querySelector('main');
if(main&&!main.id)main.id='main-content';

const headerLinks=[
  ['Advisor','investment-office.html'],
  ['Peers','peer-councils.html'],
  ['Community','collective-intelligence.html'],
  ['How It Works','how-membership-works.html']
];

const footerLinks=[
  ['Home','index.html'],
  ['Advisor','investment-office.html'],
  ['Peers','peer-councils.html'],
  ['Community','collective-intelligence.html'],
  ['How It Works','how-membership-works.html'],
  ['One Decision','one-decision.html'],
  ['Allocation Insights','allocation-insights.html'],
  ['Decision Journal','decision-journal.html'],
  ['Your First Year','your-first-year.html'],
  ['Investment Legacy','investment-legacy.html'],
  ['Founding Members','founding-members.html'],
  ['Apply','apply.html']
];

function createNavLink(label,href,className=''){
  const link=document.createElement('a');
  link.href=href;
  link.textContent=label;
  if(className)link.className=className;
  if(currentPage===href){
    link.classList.add('is-active');
    link.setAttribute('aria-current','page');
  }
  return link;
}

function renderSharedHeader(){
  const existingHeaders=[...document.querySelectorAll('header.site-header')];
  let header=existingHeaders.shift();
  existingHeaders.forEach(element=>element.remove());

  if(!header){
    header=document.createElement('header');
    document.body.prepend(header);
  }

  header.className='site-header';

  const skipLink=document.createElement('a');
  skipLink.className='skip-link';
  skipLink.href='#main-content';
  skipLink.textContent='Skip to content';

  const brand=createNavLink(COMPANY_NAME,'index.html','brand');
  const nav=document.createElement('nav');
  nav.className='nav-links';
  nav.setAttribute('aria-label','Primary navigation');
  nav.replaceChildren(...headerLinks.map(([label,href])=>createNavLink(label,href)));

  const apply=createNavLink('Apply',currentPage==='apply.html'?'#application':'apply.html','nav-cta');
  if(currentPage==='apply.html'){
    apply.classList.add('is-active');
    apply.setAttribute('aria-current','page');
  }

  header.replaceChildren(skipLink,brand,nav,apply);
}

function renderSharedFooter(){
  const existingFooters=[...document.querySelectorAll('footer.site-footer')];
  let footer=existingFooters.shift();
  existingFooters.forEach(element=>element.remove());

  if(!footer){
    footer=document.createElement('footer');
    document.body.appendChild(footer);
  }

  footer.className='site-footer';

  const identity=document.createElement('div');
  identity.className='site-footer-identity';
  const name=document.createElement('strong');
  name.textContent=COMPANY_NAME;
  const tagline=document.createElement('span');
  tagline.textContent='Independent Advice. Collective Intelligence.';
  identity.replaceChildren(name,tagline);

  const nav=document.createElement('nav');
  nav.className='footer-links';
  nav.setAttribute('aria-label','Site pages');
  nav.replaceChildren(...footerLinks.map(([label,href])=>createNavLink(label,href)));

  footer.replaceChildren(identity,nav);
}

renderSharedHeader();
renderSharedFooter();

const revealElements=[...document.querySelectorAll('.reveal')];
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduceMotion||!('IntersectionObserver' in window)){
  revealElements.forEach(element=>element.classList.add('visible'));
}else{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  revealElements.forEach(element=>observer.observe(element));
}

if(document.querySelector('.dashboard-shell')){
  const demo=document.createElement('script');
  demo.src='investment-office-demo.js';
  document.body.appendChild(demo);
}

const applicationForm=document.querySelector('#membership-application');
if(applicationForm){
  applicationForm.addEventListener('submit',event=>{
    event.preventDefault();
    const status=document.querySelector('#form-status');
    if(!applicationForm.reportValidity())return;
    const data=new FormData(applicationForm);
    const complexities=data.getAll('complexity').join(', ')||'Not specified';
    const lines=[
      `${COMPANY_NAME} — Confidential Membership Inquiry`,'',
      `Name: ${data.get('firstName')} ${data.get('lastName')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')||'Not provided'}`,
      `Location: ${data.get('location')}`,'',
      `Family profile: ${data.get('familyProfile')}`,
      `Approximate family net worth: ${data.get('netWorth')}`,
      `Investable assets: ${data.get('investableAssets')}`,
      `Relevant complexity: ${complexities}`,'',
      'Current structure:',data.get('currentStructure'),'','Primary challenge:',data.get('challenge'),'','What would create value:',data.get('value'),'','Potential contribution:',data.get('contribution'),'',
      `Referral source: ${data.get('referral')||'Not provided'}`,
      `Timing: ${data.get('timing')}`,
      `Two-year founding commitment: ${data.get('commitment')}`
    ];
    const subject=encodeURIComponent(`${COMPANY_NAME} Founding Membership Inquiry — ${data.get('firstName')} ${data.get('lastName')}`);
    const body=encodeURIComponent(lines.join('\n'));
    if(status){
      status.textContent='Opening your email application for review…';
      status.className='form-status success';
    }
    window.location.href=`mailto:hello@investmentcollective.com?subject=${subject}&body=${body}`;
  });
}