(function(){
var header=document.getElementById('siteHeader');
var toTop=document.getElementById('toTop');
function onScroll(){
var y=window.scrollY||document.documentElement.scrollTop;
if(header)header.classList.toggle('is-scrolled',y>10);
if(toTop)toTop.classList.toggle('show',y>700);
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
if(toTop)toTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
var toggle=document.getElementById('navToggle');
var menu=document.getElementById('mobileMenu');
if(toggle&&menu){
toggle.addEventListener('click',function(){
var open=menu.hasAttribute('hidden');
if(open){menu.removeAttribute('hidden');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close menu');}
else{menu.setAttribute('hidden','');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');}
});
menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.setAttribute('hidden','');toggle.setAttribute('aria-expanded','false');});});
}
var links=document.querySelectorAll('.nav-link');
var sections=['home','about','services','projects','process','publishing','contact'].map(function(id){return document.getElementById(id);}).filter(Boolean);
function spy(){
var pos=window.scrollY+140;var current='home';
sections.forEach(function(s){if(s.offsetTop<=pos)current=s.id;});
links.forEach(function(l){l.classList.toggle('is-active',l.getAttribute('href')==='#'+current);});
}
window.addEventListener('scroll',spy,{passive:true});spy();
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(el){if(io)io.observe(el);else el.classList.add('visible');});
var filters=document.querySelectorAll('.filter');
var cards=document.querySelectorAll('.proj');
filters.forEach(function(btn){
btn.addEventListener('click',function(){
filters.forEach(function(b){b.classList.remove('is-active');b.setAttribute('aria-selected','false');});
btn.classList.add('is-active');btn.setAttribute('aria-selected','true');
var f=btn.getAttribute('data-filter');
cards.forEach(function(c){
var show=(f==='all'||(c.getAttribute('data-cat')||'').indexOf(f)>-1);
c.classList.toggle('hidden',!show);
});
});
});
document.querySelectorAll('.proj').forEach(function(card){
card.setAttribute('tabindex','0');
function go(){document.getElementById('contact').scrollIntoView({behavior:'smooth'});}
card.addEventListener('click',go);
card.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
});
var form=document.getElementById('quoteForm');
var title=document.getElementById('formTitle');
var sub=document.getElementById('formSub');
var service=document.getElementById('fService');
function presetQuote(kind){
if(!form)return;
if(kind==='supply'){title.textContent='Submit a Supply Requirement';sub.textContent='List the items, quantities and delivery location.';service.value='General Supplies';}
else{title.textContent='Request a Quote';sub.textContent='Share a few details and our team will respond.';}
setTimeout(function(){document.getElementById('fName').focus({preventScroll:true});},450);
}
document.querySelectorAll('[data-open-quote]').forEach(function(a){a.addEventListener('click',function(){presetQuote('quote');});});
document.querySelectorAll('[data-open-supply]').forEach(function(a){a.addEventListener('click',function(){presetQuote('supply');});});
if(form){
form.addEventListener('submit',function(e){
e.preventDefault();
var name=document.getElementById('fName').value.trim();
var phone=document.getElementById('fPhone').value.trim();
var msg=document.getElementById('fMsg').value.trim();
var err=document.getElementById('formError');
var ok=document.getElementById('formOk');
if(!name||!phone||!msg){err.hidden=false;ok.hidden=true;return;}
err.hidden=true;
var email=document.getElementById('fEmail').value.trim();
var subject=encodeURIComponent('Website enquiry — '+service.value+' — '+name);
var body=encodeURIComponent('Name: '+name+'\nPhone: '+phone+'\nEmail: '+email+'\nService: '+service.value+'\n\nDetails:\n'+msg);
window.location.href='mailto:sg-protowestafrica@gmail.com?subject='+subject+'&body='+body;
ok.hidden=false;
form.reset();
});
}
var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
