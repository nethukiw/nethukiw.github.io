(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function count(el){
  var end=+el.dataset.count,suf=el.dataset.suffix||'',t0=null,d=1500;
  function step(t){
    if(!t0)t0=t;
    var p=Math.min((t-t0)/d,1),v=Math.round(end*(1-Math.pow(1-p,3)));
    el.textContent=v.toLocaleString('en-US')+suf;
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(!e.isIntersecting)return;
    var el=e.target;io.unobserve(el);
    if(el.classList.contains('reveal'))el.classList.add('in');
    if(el.dataset.count)count(el);
  });
},{threshold:.15});
document.querySelectorAll('.reveal,[data-count]').forEach(function(el){
  if(el.dataset.count&&!rm)el.textContent='0'+(el.dataset.suffix||'');
  if(rm&&el.classList.contains('reveal'))el.classList.add('in');
  if(!(rm&&el.dataset.count))io.observe(el);
});
})();
