(function(){
  'use strict';
  const config=window.SMOOTHMOVE_CONFIG||{insuranceQuoteUrl:'',perks:[]};
  const icons={mail:'mail',zap:'zap',check:'check',box:'box',gift:'gift',home:'home',shield:'shield',sparkles:'sparkles'};
  const hrefOk = href => typeof href==='string' && (/^https:\/\/[^\s]+$/i.test(href) || /^#[a-z0-9_-]+$/i.test(href));
  const insuranceUrl=hrefOk(config.insuranceQuoteUrl)&&/^https:\/\//.test(config.insuranceQuoteUrl)?config.insuranceQuoteUrl:'';
  const modal=document.getElementById('insurance-modal');
  let previousFocus=null;
  function openInsurance(e){
    if(insuranceUrl){const a=document.createElement('a');a.href=insuranceUrl;a.target='_blank';a.rel='noopener noreferrer';a.click();return;}
    previousFocus=e.currentTarget;modal.hidden=false;document.body.classList.add('modal-open');document.getElementById('modal-close').focus();
  }
  function closeInsurance(){modal.hidden=true;document.body.classList.remove('modal-open');previousFocus?.focus();}
  document.querySelectorAll('[data-insurance]').forEach(node=>node.addEventListener('click',openInsurance));
  if(insuranceUrl)document.getElementById('insurance-state').textContent='Quotes are provided by an independent insurance professional';
  document.getElementById('modal-close').addEventListener('click',closeInsurance);
  document.getElementById('modal-done').addEventListener('click',closeInsurance);
  modal.addEventListener('click',e=>{if(e.target===modal)closeInsurance()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeInsurance()});

  const menuBtn=document.getElementById('menu-btn');const nav=document.getElementById('primary-nav');
  function closeMenu(){nav.classList.remove('is-open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open menu');}
  menuBtn.addEventListener('click',()=>{const next=!nav.classList.contains('is-open');nav.classList.toggle('is-open',next);menuBtn.setAttribute('aria-expanded',String(next));menuBtn.setAttribute('aria-label',next?'Close menu':'Open menu');});
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menuBtn.contains(e.target))closeMenu()});

  const perkGrid=document.getElementById('perks-grid');let currentFilter='all';
  function createIcon(id){const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');icon.classList.add('ico');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href','#'+(icons[id]||'gift'));icon.append(use);return icon;}
  function renderPerks(){perkGrid.replaceChildren();let shown=0;
    for(const perk of config.perks){if(!hrefOk(perk.href)||(currentFilter!=='all'&&perk.category!==currentFilter))continue;
      shown++;const a=document.createElement('a');a.className='perk-row';a.href=perk.href;if(perk.href.startsWith('https://')){a.target='_blank';a.rel='noopener noreferrer'+(perk.disclosure?' sponsored':'');}
      const badge=document.createElement('span');badge.className='perk-row__icon';badge.append(createIcon(perk.icon));
      const middle=document.createElement('span');middle.className='perk-row__content';const kind=document.createElement('small');kind.textContent=perk.kind||'Moving resource';const h=document.createElement('strong');h.textContent=perk.title;const sub=document.createElement('span');sub.textContent=perk.subtitle||'';middle.append(kind,h,sub);
      const arrow=document.createElement('span');arrow.className='perk-row__arrow';arrow.append(createIcon('arrow-up'));a.append(badge,middle,arrow);perkGrid.append(a);
    }
    if(!shown){const p=document.createElement('p');p.className='perks-empty';p.textContent='New partner offers are being curated for this category. Check back soon.';perkGrid.append(p);}
  }
  // Arrow icon is not a perk category icon; use icon symbol explicitly.
  icons['arrow-up']='arrow-up';
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    currentFilter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});renderPerks();
  }));renderPerks();

  const tasks={
    buyer:[['Connect utilities and internet','https://homeconnectpathway.com/','Utilities'],['Request homeowners insurance','insurance','Insurance'],['Change your mailing address','https://moversguide.usps.com/','USPS'],['Schedule movers or a moving truck',null,null],['Confirm your closing and key pickup',null,null],['Pack an essentials bag',null,null]],
    renter:[['Connect utilities and internet','https://homeconnectpathway.com/','Utilities'],['Request renters insurance','insurance','Insurance'],['Change your mailing address','https://moversguide.usps.com/','USPS'],['Schedule your move',null,null],['Review lease and move-in instructions',null,null],['Photograph the property at move-in',null,null]]
  };
  let mode='buyer';let memory={};const listEl=document.getElementById('check-items');
  function getSaved(){try{const val=JSON.parse(localStorage.getItem('smoothmove-checklist-'+mode)||'[]');return Array.isArray(val)?val.filter(Number.isInteger):[];}catch{return memory[mode]||[]}}
  function setSaved(arr){memory[mode]=arr;try{localStorage.setItem('smoothmove-checklist-'+mode,JSON.stringify(arr))}catch{}}
  function setProgress(){const count=getSaved().filter(i=>i>=0&&i<tasks[mode].length).length;document.getElementById('progress-label').textContent=`${count} of ${tasks[mode].length} completed`;document.getElementById('progress-pct').textContent=`${Math.round(count/tasks[mode].length*100)}%`;document.getElementById('progress-fill').style.width=`${count/tasks[mode].length*100}%`;}
  function renderList(){listEl.replaceChildren();const saved=new Set(getSaved());tasks[mode].forEach(([name,link,linkLabel],index)=>{
    const row=document.createElement('div');row.className='check-item';const label=document.createElement('label');label.className='check-item__label';const check=document.createElement('input');check.type='checkbox';check.checked=saved.has(index);check.addEventListener('change',()=>{let next=new Set(getSaved());check.checked?next.add(index):next.delete(index);setSaved([...next]);setProgress();});const fake=document.createElement('span');fake.className='check-item__box';fake.append(createIcon('check'));const title=document.createElement('span');title.textContent=name;label.append(check,fake,title);row.append(label);
    if(link){const a=document.createElement(link==='insurance'?'button':'a');a.className='check-item__link';a.textContent=linkLabel==='USPS'?'Open USPS ↗':link==='insurance'?'Get quote ↗':'Start here ↗';if(link==='insurance'){a.type='button';a.addEventListener('click',openInsurance);}else{a.href=link;a.target='_blank';a.rel='noopener noreferrer';}row.append(a);}
    listEl.append(row);
  });setProgress();}
  document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>{mode=btn.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));renderList();}));
  document.getElementById('reset-list').addEventListener('click',()=>{setSaved([]);renderList();});
  document.getElementById('print-list').addEventListener('click',()=>{window.print();});
  document.getElementById('year').textContent=new Date().getFullYear();renderList();
})();
