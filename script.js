const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = [
"100rb",
"2rb",
"5rb",
"50rb",
"100rb",
"500rb",
"10rb",
"20rb"
];

const colors = [
"#ff5252",
"#ff9800",
"#4caf50",
"#2196f3",
"#9c27b0",
"#ffc107",
"#00bcd4",
"#8bc34a"
];

let currentIndex = 0;
let spinning = false;

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
ctx.font="bold 18px sans-serif";

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

/* pilih hadiah kecil */
const target = Math.random()<0.7 ? 1 : 2;

const interval=setInterval(()=>{

drawWheel(currentIndex);

currentIndex++;
if(currentIndex>=segments.length){
currentIndex=0;
}

totalSpin++;

if(totalSpin>40 && currentIndex===target){

clearInterval(interval);

drawWheel(target);

showResult(target);

spinning=false;

}

},speed);

}

/* ===== HASIL ===== */

function showResult(index){

let hadiah=index===1?"Rp2.000":"Rp5.000";

document.getElementById("result").innerHTML=
"🎉 Kamu dapat THR "+hadiah;

}
