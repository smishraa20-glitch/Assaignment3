const scene = document.getElementById('scene');
const sun = document.getElementById('sun');
const ground = document.getElementById('ground');
const clock = document.getElementById('clock');
const dateBox = document.getElementById('date');
const clockBox = document.getElementById('clockBox');
const zones = Array.from(document.querySelectorAll('.zone'));

function updateClock(){
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  clock.textContent = `${h}:${m}:${s} ${ampm}`;

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  dateBox.textContent = `${day}, ${month} ${date}`;

  
  if(ampm === 'AM'){
    document.body.style.background = 'linear-gradient(180deg,#a1c4fd,#c2e9fb 50%,#fff8c9)';
    clockBox.style.background = 'rgba(255,255,255,0.2)';
  } else {
    document.body.style.background = 'linear-gradient(180deg,#ff9a9e,#fecf8b 50%,#ffd89b)';
    clockBox.style.background = 'rgba(0,0,0,0.25)';
  }
}
setInterval(updateClock,1000);
updateClock();

function makeRipple(x,y,color){
  const r = document.createElement('div');
  r.style.position = 'absolute';r.style.left=x+'px';r.style.top=y+'px';r.style.width='240px';r.style.height='240px';r.style.borderRadius='50%';r.style.background=color;r.style.pointerEvents='none';r.style.transform='translate(-50%,-50%) scale(0.2)';r.style.transition='transform 700ms, opacity 700ms';r.style.opacity='0.9';r.style.mixBlendMode='screen';scene.appendChild(r);
  requestAnimationFrame(()=>{r.style.transform='translate(-50%,-50%) scale(1)';r.style.opacity='0.5';});
  setTimeout(()=>{r.style.opacity='0';setTimeout(()=>r.remove(),800);},600);
}

function handleSide(side,clientX,clientY){
  const x = clientX || window.innerWidth/2;
  const y = clientY || window.innerHeight/2;
  if(side==='top'){
    document.body.style.background='linear-gradient(180deg,#8ec5ff,#e0c3fc 55%, #ffd89b)';
    makeRipple(x,y,'rgba(255,255,255,0.2)');
  }else if(side==='left'){
    sun.classList.remove('shrink');sun.classList.add('raise');
    document.body.style.background='linear-gradient(180deg,#ffd1a9,#ffe9a6 55%, #fff1c1)';
  }else if(side==='right'){
    sun.classList.remove('raise');sun.classList.add('shrink');
    document.body.style.background='linear-gradient(180deg,#ff9a9e,#fecf8b 55%, #ffcc80)';
  }else if(side==='bottom'){
    ground.style.height='26%';makeRipple(x,y,'rgba(255,200,150,0.18)');
    setTimeout(()=>ground.style.height='18%',450);
  }
  clearTimeout(resetTimer);
  resetTimer=setTimeout(()=>{
    updateClock();
    sun.classList.remove('raise');sun.classList.remove('shrink');
  },2000);
}

let resetTimer=null;
zones.forEach(z=>{
  z.addEventListener('click',e=>handleSide(z.dataset.side,e.clientX,e.clientY));
  z.addEventListener('touchstart',e=>{const t=e.changedTouches[0];handleSide(z.dataset.side,t.clientX,t.clientY);e.preventDefault();},{passive:false});
});
