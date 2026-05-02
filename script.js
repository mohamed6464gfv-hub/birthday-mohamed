const btn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const scene = document.getElementById("scene");
const title = document.getElementById("title");
const music = document.getElementById("music");
const carousel = document.getElementById("carousel");
const message = document.getElementById("message");

/* الصور */
const images = [
"img1.jpg","img2.jpg","img3.jpg","img4.jpg",
"img5.jpg","img6.jpg","img7.jpg","img8.jpg",
"img9.jpg","img10.jpg","img11.jpg","img12.jpg"
];

/* الرسائل */
const messages = [
"🔥 ملك اليوم 👑",
"🎂 20 سنة جامدين",
"😈20 سنة عدو في يوم",
"🚀 المستقبل ليك",
"❤️ happy birthday mohamed ",
"🔥 يومك يا نجم"
];

/* 3D */
const radius = 500;
let baseTransforms = [];

/* إنشاء الصور */
images.forEach((src,i)=>{
  let card = document.createElement("div");
  card.className = "card";

  let img = document.createElement("img");
  img.src = src;

  let text = document.createElement("p");
  text.innerText = messages[i % messages.length];

  card.appendChild(img);
  card.appendChild(text);

  let angleDeg = (i / images.length) * 360;

  let base = `rotateY(${angleDeg}deg) translateZ(${radius}px)`;
  baseTransforms.push(base);

  card.style.transform = base;

  carousel.appendChild(card);
});

/* تشغيل */
btn.onclick = async ()=>{
  startScreen.style.display="none";
  scene.style.display="flex";
  title.style.display="block";

  try{
    await music.play();
  }catch{
    document.body.addEventListener("click",()=>music.play(),{once:true});
  }

  animate();
  hearts();
  changeText();
};

/* دوران + زووم */
let angle = 0;

function animate(){
  angle += 0.3;

  carousel.style.transform = `rotateY(${angle}deg)`;

  let cards = document.querySelectorAll(".card");

  cards.forEach((card,i)=>{

    let rect = card.getBoundingClientRect();
    let center = window.innerWidth/2;

    let distance = Math.abs(rect.left - center);

    let scale = Math.max(0.8, 1.4 - distance / 400);

    card.style.transform = baseTransforms[i] + ` scale(${scale})`;
  });

  requestAnimationFrame(animate);
}

/* قلوب */
function hearts(){
  setInterval(()=>{
    let h = document.createElement("div");
    h.className="heart";
    h.innerText="❤️";
    h.style.left=Math.random()*100+"%";
    h.style.fontSize=(20+Math.random()*20)+"px";

    document.body.appendChild(h);

    setTimeout(()=>h.remove(),4000);
  },200);
}

/* تغيير الرسالة */
function changeText(){
  setInterval(()=>{
    message.innerText =
    messages[Math.floor(Math.random()*messages.length)];
  },2000);
}