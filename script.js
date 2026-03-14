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

let currentRotation = 0;

function drawWheel(){

const arc = Math.PI * 2 / segments.length;

for(let i=0;i<segments.length;i++){

ctx.beginPath();
ctx.fillStyle = colors[i];
ctx.moveTo(150,150);
ctx.arc(150,150,150,arc*i,arc*(i+1));
ctx.fill();

ctx.save();
ctx.translate(150,150);
ctx.rotate(arc*i + arc/2);

ctx.fillStyle="white";
ctx.font="bold 18px sans-serif";
ctx.fillText(segments[i],60,10);

ctx.restore();

}

}

drawWheel();

document.getElementById("spin").onclick=function(){

/* pilih hadiah kecil */
const hadiahIndex = Math.random() < 0.7 ? 1 : 2;

const arc = 360 / segments.length;

/* hitung posisi berhenti */
const stopAngle = 360 - (hadiahIndex * arc) - (arc/2);

/* putaran tambahan */
const spin = 360 * 5 + stopAngle;

currentRotation = spin;

canvas.style.transition="transform 4s ease-out";
canvas.style.transform=`rotate(${spin}deg)`;

setTimeout(()=>{
showResult(hadiahIndex);
},4000);

}

function showResult(index){

let hadiah = index === 1 ? "Rp2.000" : "Rp5.000";

document.getElementById("result").innerHTML =
"🎉 Kamu dapat THR " + hadiah;

}
