const layoutStyles=document.createElement('link');
layoutStyles.rel='stylesheet';
layoutStyles.href='site-footer.css';
document.head.appendChild(layoutStyles);

const coreStyles=document.createElement('link');
coreStyles.rel='stylesheet';
coreStyles.href='core.css';
document.head.appendChild(coreStyles);

const COMPANY_NAME='syndicateIQ';
const LEGACY_COMPANY_NAME='Investment Collective';
const SECTION_NAMES={Advisor:'The Advisor',Peers:'The Council',Community:'The Community'};

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

function applySectionNames(){
  Object.entries(SECTION_NAMES).forEach(([oldName,newName])=>{
    if(document.title===`${oldName} — ${COMPANY_NAME}`)document.title=`${newName} — ${COMPANY_NAME}`;
  });

  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      const parent=node.parentElement;
      if(!parent||['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName))return NodeFilter.FILTER_REJECT;
      return SECTION_NAMES[node.nodeValue.trim()]?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
    }
  });

  const textNodes=[];
  while(walker.nextNode())textNodes.push(walker.currentNode);
  textNodes.forEach(node=>{
    const leading=node.nodeValue.match(/^\s*/)?.[0]||'';
    const trailing=node.nodeValue.match(/\s*$/)?.[0]||'';
    node.nodeValue=`${leading}${SECTION_NAMES[node.nodeValue.trim()]}${trailing}`;
  });
}

function createBrandLockup(className='brand'){
  const brand=document.createElement('a');
  brand.href='index.html';
  brand.className=className;
  brand.setAttribute('aria-label',`${COMPANY_NAME} home`);
  if(currentPage==='index.html'){
    brand.classList.add('is-active');
    brand.setAttribute('aria-current','page');
  }

  const mark=document.createElement('span');
  mark.className='brand-mark';
  mark.setAttribute('aria-hidden','true');
  mark.innerHTML='<svg viewBox="0 0 512 512" focusable="false"><path fill="currentColor" d="M256 21C126.213 21 21 126.213 21 256s105.213 235 235 235 235-105.213 235-235S385.787 21 256 21zm0 34.956c110.515 0 200.044 89.529 200.044 200.044S366.515 456.044 256 456.044 55.809 366.515 55.809 256 145.486 55.956 256 55.956zm0 23.207c-17.437 0-31.578 14.141-31.578 31.578s14.141 31.578 31.578 31.578 31.578-14.141 31.578-31.578S273.437 79.163 256 79.163zm-73.584 19.534c-5.09.132-10.115 1.535-14.834 4.259-15.101 8.719-20.322 28.081-11.603 43.181s27.933 20.028 43.034 11.31 20.322-27.787 11.603-42.888c-5.994-10.382-17.001-16.153-28.2-15.862zm147.168 0c-11.199-.29-22.206 5.481-28.2 15.862-8.719 15.101-3.645 34.316 11.456 43.034s34.463 3.645 43.181-11.456 3.498-34.463-11.603-43.181c-4.719-2.724-9.744-4.127-14.834-4.259zM131.009 151.866c-11.199-.29-22.206 5.481-28.2 15.862-8.718 15.101-3.498 34.316 11.603 43.034s34.169 3.498 42.888-11.603 3.791-34.316-11.31-43.034c-4.719-2.725-9.891-4.128-14.981-4.259zm249.981 0c-5.09.132-10.262 1.535-14.981 4.259-15.101 8.718-20.175 28.081-11.456 43.181s27.933 20.175 43.034 11.456 20.322-27.933 11.603-43.034c-5.994-10.382-17.001-16.153-28.2-15.862zM256 166.26c-49.558 0-89.741 40.183-89.741 89.741s40.183 89.741 89.741 89.741 89.741-40.183 89.741-89.741S305.558 166.26 256 166.26zm-145.406 58.309c-17.437 0-31.431 14.141-31.431 31.578s13.994 31.578 31.431 31.578 31.431-14.141 31.431-31.578-13.994-31.578-31.431-31.578zm290.812 0c-17.437 0-31.578 14.141-31.578 31.578s14.141 31.578 31.578 31.578 31.431-14.141 31.431-31.578-13.994-31.578-31.431-31.578zm-272.159 72.703c-5.073.122-10.115 1.535-14.834 4.259-15.101 8.719-20.322 27.934-11.603 43.034s28.08 20.322 43.181 11.603 20.028-27.933 11.309-43.034c-5.994-10.382-16.892-16.131-28.053-15.862zm250.422 0c-10.113.715-19.667 6.278-25.116 15.716-8.718 15.101-3.645 34.463 11.456 43.181s34.463 3.498 43.181-11.603 3.498-34.316-11.603-43.034c-5.663-3.269-11.851-4.688-17.918-4.26zm-198.575 53.169c-10.091.678-19.667 6.131-25.116 15.569-8.718 15.101-3.498 34.463 11.603 43.181s34.316 3.498 43.034-11.603 3.498-34.169-11.603-42.888c-5.663-3.269-11.864-4.666-17.918-4.259zm146.728 0c-5.09.132-10.262 1.535-14.981 4.259-15.101 8.718-20.175 27.934-11.456 43.034s27.933 20.322 43.034 11.603 20.322-28.08 11.603-43.181c-5.994-10.382-17.001-16.006-28.2-15.715zM256 389.828c-17.437 0-31.578 13.994-31.578 31.431s14.141 31.578 31.578 31.578 31.578-14.141 31.578-31.578-14.141-31.431-31.578-31.431z"/></svg>';

  const wordmark=document.createElement('span');
  wordmark.className='brand-wordmark';
  wordmark.append(document.createTextNode('syndicate'));
  const iq=document.createElement('span');
  iq.className='brand-iq';
  iq.textContent='IQ';
  wordmark.append(iq);
  brand.replaceChildren(mark,wordmark);
  return brand;
}

applyCompanyName();
applySectionNames();

const currentPage=window.location.pathname.split('/').pop()||'index.html';
const main=document.querySelector('main');
if(main&&!main.id)main.id='main-content';

const headerLinks=[
  ['The Advisor','advisor.html'],
  ['The Council','peer-councils.html'],
  ['The Community','collective-intelligence.html'],
  ['The Adventure','adventures.html']
];

const footerLinks=[
  ['Home','index.html'],
  ['The Advisor','advisor.html'],
  ['The Council','peer-councils.html'],
  ['The Community','collective-intelligence.html'],
  ['The Adventure','adventures.html'],
  ['How It Works','how-membership-works.html'],
  ['One Decision','one-decision.html'],
  ['Allocation Insights','allocation-insights.html'],
  ['Decision Journal','decision-journal.html'],
  ['Your First Year','your-first-year.html'],
  ['Investment Legacy','investment-legacy.html'],
  ['Founding Membership','apply.html']
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

  const brand=createBrandLockup();
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
  const brand=createBrandLockup('footer-brand');
  const tagline=document.createElement('span');
  tagline.textContent='Independent Advice. Collective Intelligence.';
  identity.replaceChildren(brand,tagline);

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
      `${COMPANY_NAME} — Founding 12 Inquiry`,'',
      `Name: ${data.get('firstName')} ${data.get('lastName')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')||'Not provided'}`,
      `Location: ${data.get('location')}`,'',
      `Family profile: ${data.get('familyProfile')}`,
      `Investable assets: ${data.get('investableAssets')}`,
      `Relevant complexity: ${complexities}`,'',
      'What feels fragmented:',data.get('challenge'),'','What would create value:',data.get('value'),'','Potential contribution:',data.get('contribution'),'','Why the founding cohort appeals:',data.get('foundingAppeal'),'',
      `Referral source: ${data.get('referral')||'Not provided'}`,
      `Timing: ${data.get('timing')}`,
      `Open to a two-year founding commitment: ${data.get('commitment')}`
    ];
    const subject=encodeURIComponent(`${COMPANY_NAME} Founding 12 Inquiry — ${data.get('firstName')} ${data.get('lastName')}`);
    const body=encodeURIComponent(lines.join('\n'));
    if(status){
      status.textContent='Opening your email inquiry for review…';
      status.className='form-status success';
    }
    window.location.href=`mailto:hello@investmentcollective.com?subject=${subject}&body=${body}`;
  });
}

// Deployment trigger after Vercel project cleanup.