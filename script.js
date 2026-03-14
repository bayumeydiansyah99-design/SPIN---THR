const canvas = document.getElementById("wheel");
const tick = document.getElementById("tick");
const takbir = document.getElementById("takbir");
const ctx = canvas.getContext("2d");

const segments = [
"5rb","2rb","5rb","50rb",
"5rb","500rb","10rb","20rb",
"10rb","5rb","5rb","50rb",
"10rb","100rb","10rb","20rb"
];

const colors = [
"#ff5252","#ff9800","#4caf50","#2196f3",
"#9c27b0","#ffc107","#00bcd4","#8bc34a",
"#ff7043","#66bb6a","#42a5f5","#ab47bc",
"#ffa726","#26c6da","#d4e157","#ef5350"
];

let rotation = 0;
let spinning = false;

const arc = Math.PI*2/segments.length;


/* ================= DRAW WHEEL ================= */

function drawWheel(){

ctx.clearRect(0,0,300,300);

ctx.save();
ctx.translate(150,150);
ctx.rotate(rotation);

for(let i=0;i<segments.length;i++){

ctx.beginPath();

ctx.fillStyle = colors[i];

ctx.moveTo(0,0);
ctx.arc(0,0,150,arc*i,arc*(i+1));
ctx.fill();

ctx.save();

ctx.rotate(arc*i + arc/2);

ctx.fillStyle="white";
ctx.font="bold 16px sans-serif";
ctx.textAlign="right";

ctx.fillText(segments[i],120,5);

ctx.restore();

}

ctx.restore();

}

drawWheel();


/* ================= SPIN ================= */

function startSpin(){

if(spinning) return;

spinning = true;

/* hanya hadiah kecil */

const targetList = [1,2,9,10];
const target = targetList[Math.floor(Math.random()*targetList.length)];

/* hitung sudut target */

const targetAngle =
(2*Math.PI) - (target*arc) - arc/2;

const extraSpin = 6 * 2 * Math.PI;

const finalRotation = rotation + extraSpin + targetAngle;

const duration = 4000;
const start = performance.now();

function animate(time){

const progress = (time-start)/duration;

if(progress < 1){

rotation = rotation + (finalRotation-rotation)*0.1;

drawWheel();

tick.currentTime = 0;
tick.play();

requestAnimationFrame(animate);

}else{

rotation = finalRotation;

drawWheel();

showResult(target);

spinning=false;

}

}

requestAnimationFrame(animate);

}


/* ================= RESULT ================= */

function showResult(index){

let hadiah;

if(index===1 || index===9){
hadiah="Rp2.000";
}else{
hadiah="Rp5.000";
}

document.getElementById("result").innerHTML =
"🎉 Kamu dapat THR "+hadiah;

document.getElementById("popupText").innerHTML =
"🎉 Kamu dapat THR "+hadiah;

document.getElementById("popup").style.display="flex";

takbir.currentTime = 0;
takbir.play();

}


/* ================= CLOSE POPUP ================= */

function closePopup(){
document.getElementById("popup").style.display="none";
}


/* ================= SWIPE SPIN ================= */

let startX=0;
let startY=0;

canvas.addEventListener("touchstart",(e)=>{

startX = e.touches[0].clientX;
startY = e.touches[0].clientY;

});

canvas.addEventListener("touchmove",(e)=>{

if(spinning) return;

const moveX = e.touches[0].clientX;
const moveY = e.touches[0].clientY;

const diffX = Math.abs(moveX-startX);
const diffY = Math.abs(moveY-startY);

if(diffX>30 || diffY>30){

startSpin();

}

});
