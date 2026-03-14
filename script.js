const canvas = document.getElementById("wheel");
const tick = document.getElementById("tick");
const ctx = canvas.getContext("2d");

/* SEGMENT LEBIH BANYAK */

const segments = [
"100rb","2rb","5rb","50rb",
"100rb","500rb","10rb","20rb",

"100rb","2rb","5rb","50rb",
"100rb","500rb","10rb","20rb"
];

const colors = [
"#ff5252","#ff9800","#4caf50","#2196f3",
"#9c27b0","#ffc107","#00bcd4","#8bc34a",

"#ff7043","#66bb6a","#42a5f5","#ab47bc",
"#ffa726","#26c6da","#d4e157","#ef5350"
];

let currentIndex = 0;
let spinning = false;

/* GAMBAR RODA */

function drawWheel(highlight=-1){

const arc = Math.PI*2/segments.length;

ctx.clearRect(0,0,300,300);

for(let i=0;i<segments.length;i++){

ctx.beginPath();

ctx.fillStyle = i===highlight ? "#ffffff" : colors[i];

ctx.moveTo(150,150);
ctx.arc(150,150,150,arc*i,arc*(i+1));
ctx.fill();

ctx.save();

ctx.translate(150,150);
ctx.rotate(arc*i + arc/2);

ctx.fillStyle = i===highlight ? "black" : "white";
ctx.font="bold 16px sans-serif";

ctx.fillText(segments[i],60,10);

ctx.restore();

}

}

drawWheel();

/* ===== SPIN ===== */

document.getElementById("spin").onclick=function(){

if(spinning) return;

spinning=true;

let speed=80;
let totalSpin=0;

/* TARGET HANYA HADIAH KECIL */

const targetList = [1,2,9,10];
const target = targetList[Math.floor(Math.random()*targetList.length)];

const interval=setInterval(()=>{

drawWheel(currentIndex);

/* suara klik */
tick.currentTime = 0;
tick.play();

currentIndex++;

if(currentIndex>=segments.length){
currentIndex=0;
}

totalSpin++;

if(totalSpin>50 && currentIndex===target){

clearInterval(interval);

drawWheel(target);

showResult(target);

spinning=false;

}

},speed);

}

/* ===== HASIL ===== */

function showResult(index){

let hadiah;

if(index===1 || index===9){
hadiah="Rp2.000";
}else{
hadiah="Rp5.000";
}

document.getElementById("result").innerHTML=
"🎉 Kamu dapat THR "+hadiah;

}
