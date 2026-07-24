const currency=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:1});
const wholeCurrency=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
const compactMoney=value=>value>=1?`${currency.format(value)}M`:`${wholeCurrency.format(value*1000000)}`;

const state={commitment:2,liquidity:9.4,allocation:18,calls:3.2,netWorth:52.4};
const output=document.querySelector('.decision-output');
const commitmentButtons=[...document.querySelectorAll('.commitment-option')];
const controls={
  liquidity:document.getElementById('liquidity-input'),
  allocation:document.getElementById('allocation-input'),
  calls:document.getElementById('calls-input')
};

function decisionFor(current){
  const remaining=current.liquidity-current.calls-current.commitment;
  const postAllocation=current.allocation+(current.commitment/current.netWorth*100);
  let type='proceed';
  if(remaining<2.5||postAllocation>26)type='wait';
  else if(remaining<4.5||postAllocation>22)type='reduce';

  if(type==='wait'){
    return{
      headline:'Strong opportunity. Poor fit today.',
      summary:'The manager remains attractive, but this commitment would leave too little flexibility relative to expected capital calls and the Harrison family’s existing private-market exposure.',
      action:'Wait',recommended:0,confidence:'High',remaining,postAllocation,
      reasons:[
        `Liquidity would fall to ${compactMoney(Math.max(remaining,0))} after the commitment and expected capital calls.`,
        `Private-equity exposure would rise to ${postAllocation.toFixed(1)}%, above the family’s current comfort range.`,
        'Revisit after distributions improve liquidity or another private commitment exits the portfolio.'
      ],
      journal:'Passed for now. The opportunity was attractive, but portfolio fit and decision flexibility mattered more than access.'
    };
  }

  if(type==='reduce'){
    const recommended=current.commitment<=.5?current.commitment:(remaining<3.5||postAllocation>24?.5:1);
    return{
      headline:recommended===current.commitment?'Strong opportunity. Proceed carefully.':'Strong opportunity. Better at a smaller size.',
      summary:recommended===current.commitment?'The selected commitment fits, but the family should preserve a larger liquidity cushion and pause additional growth-equity commitments.':`A ${compactMoney(recommended)} commitment captures the manager relationship without allowing one attractive opportunity to crowd out future decisions.`,
      action:recommended===current.commitment?'Proceed':`Commit ${compactMoney(recommended)}`,recommended,confidence:'High',remaining,postAllocation,
      reasons:[
        `The selected commitment would leave ${compactMoney(Math.max(remaining,0))} after expected capital calls.`,
        `Private-equity exposure would move to ${postAllocation.toFixed(1)}%, near the upper end of the family’s range.`,
        'Smaller sizing preserves room for follow-on commitments and opportunities with lower portfolio overlap.'
      ],
      journal:`Approved at ${compactMoney(recommended)}. Sizing was reduced to protect liquidity and avoid overconcentration in growth equity.`
    };
  }

  return{
    headline:'Strong opportunity. Fits the portfolio.',
    summary:`The ${compactMoney(current.commitment)} commitment remains inside the Harrison family’s allocation and liquidity guardrails, while adding a manager with differentiated operating experience.`,
    action:`Commit ${compactMoney(current.commitment)}`,recommended:current.commitment,confidence:'High',remaining,postAllocation,
    reasons:[
      `The family retains ${compactMoney(Math.max(remaining,0))} after the commitment and expected capital calls.`,
      `Private-equity exposure rises to ${postAllocation.toFixed(1)}%, still within the strategic range.`,
      'Collective Intelligence supports the manager thesis while flagging succession planning for continued review.'
    ],
    journal:`Approved at ${compactMoney(current.commitment)}. The opportunity fit the family’s allocation, liquidity, and long-term return objectives.`
  };
}

function setText(id,value){const element=document.getElementById(id);if(element)element.textContent=value;}

function render(){
  const result=decisionFor(state);
  if(output)output.classList.add('is-updating');
  window.setTimeout(()=>{
    setText('liquidity-value',compactMoney(state.liquidity));
    setText('allocation-value',`${state.allocation}%`);
    setText('calls-value',compactMoney(state.calls));
    setText('recommendation-headline',result.headline);
    setText('recommendation-summary',result.summary);
    setText('recommendation-action',result.action);
    setText('result-liquidity',compactMoney(Math.max(result.remaining,0)));
    setText('result-allocation',`${result.postAllocation.toFixed(1)}%`);
    setText('result-confidence',result.confidence);
    setText('reason-one',result.reasons[0]);
    setText('reason-two',result.reasons[1]);
    setText('reason-three',result.reasons[2]);
    setText('journal-decision',result.action);
    setText('journal-reason',result.journal);
    setText('journal-review',result.action==='Wait'?'Revisit after the next distribution cycle.':'Review manager succession and portfolio pacing in six months.');
    if(output)output.classList.remove('is-updating');
  },100);
}

commitmentButtons.forEach(button=>button.addEventListener('click',()=>{
  state.commitment=Number(button.dataset.commitment);
  commitmentButtons.forEach(item=>{
    const active=item===button;
    item.classList.toggle('active',active);
    item.setAttribute('aria-pressed',active?'true':'false');
  });
  render();
}));

Object.entries(controls).forEach(([key,input])=>{
  if(!input)return;
  input.addEventListener('input',()=>{state[key]=Number(input.value);render();});
});

render();