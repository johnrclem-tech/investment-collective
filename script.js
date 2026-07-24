const footerStyles=document.createElement('link');
footerStyles.rel='stylesheet';
footerStyles.href='site-footer.css';
document.head.appendChild(footerStyles);

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const footerLinks=[
  ['Home','index.html'],
  ['Manifesto','manifesto.html'],
  ['Investment Office','investment-office.html'],
  ['Allocation Insights','allocation-insights.html'],
  ['Decision Journal','decision-journal.html'],
  ['Collective Intelligence','collective-intelligence.html'],
  ['Peer Councils','peer-councils.html'],
  ['One Decision','one-decision.html'],
  ['Your First Year','your-first-year.html'],
  ['Investment Legacy','investment-legacy.html'],
  ['Founding Members','founding-members.html'],
  ['Apply','apply.html']
];
document.querySelectorAll('.footer-links').forEach(footer=>{
  footer.setAttribute('aria-label','Site pages');
  footer.replaceChildren(...footerLinks.map(([label,href])=>{
    const link=document.createElement('a');
    link.href=href;
    link.textContent=label;
    return link;
  }));
});

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
      'Investment Collective — Confidential Membership Inquiry','',
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
    const subject=encodeURIComponent(`Founding Membership Inquiry — ${data.get('firstName')} ${data.get('lastName')}`);
    const body=encodeURIComponent(lines.join('\n'));
    status.textContent='Opening your email application for review…';
    status.className='form-status success';
    window.location.href=`mailto:hello@investmentcollective.com?subject=${subject}&body=${body}`;
  });
}