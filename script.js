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

let angle = 0;

/* ===== GAMBAR RODA ===== */

function drawWheel(){

const arc = Math.PI * 2 / segments.length;

for(let i=0;i<segments.length;i++){

ctx.beginPath();
ctx.fillStyle = colors[i % colors.length];
ctx.moveTo(150,150);
ctx.arc(150,150,150,arc*i,arc*(i+1));
ctx.fill();

ctx.fillStyle="white";
ctx.font="bold 18px sans-serif";

ctx.save();

ctx.translate(150,150);
ctx.rotate(arc*i + arc/2);
ctx.fillText(segments[i],60,10);

ctx.restore();

}

}

drawWheel();

/* ===== SPIN ===== */

document.getElementById("spin").onclick = function(){

// pilih hadiah kecil saja
const hadiah = Math.random() < 0.7 ? 1 : 2;
// index 1 = 2rb
// index 2 = 5rb

const arcDeg = 360 / segments.length;

// hitung sudut agar berhenti tepat di segment
const stopAngle = 360 - (hadiah * arcDeg) - (arcDeg/2);

// putaran tambahan supaya terlihat random
const extraSpin = 360 * 5;

angle = extraSpin + stopAngle;

canvas.style.transition="transform 4s cubic-bezier(.17,.67,.83,.67)";
canvas.style.transform=`rotate(${angle}deg)`;

setTimeout(()=>{
showResult(hadiah);
},4000);

}

/* ===== HASIL ===== */

function showResult(index){

let result;

if(index === 1){
result = "Rp2.000";
}else{
result = "Rp5.000";
}

document.getElementById("result").innerHTML =
"🎉 Kamu dapat THR " + result;

}
