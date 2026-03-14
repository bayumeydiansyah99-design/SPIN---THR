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
"#ffc107"
];

let angle = 0;

function drawWheel(){

const arc = Math.PI * 2 / segments.length;

for(let i=0;i<segments.length;i++){

ctx.beginPath();
ctx.fillStyle = colors[i];
ctx.moveTo(150,150);
ctx.arc(150,150,150,arc*i,arc*(i+1));
ctx.fill();

ctx.fillStyle="white";
ctx.font="20px sans-serif";

ctx.save();

ctx.translate(150,150);
ctx.rotate(arc*i + arc/2);
ctx.fillText(segments[i],60,10);

ctx.restore();

}

}

drawWheel();

document.getElementById("spin").onclick = function(){

const spin = Math.floor(Math.random()*360)+720;

angle += spin;

canvas.style.transition="transform 4s";
canvas.style.transform=`rotate(${angle}deg)`;

setTimeout(resultSpin,4000);

}

function resultSpin(){

// hanya pilih hadiah kecil
const hadiahAsli = Math.random();

let result;

if(hadiahAsli < 0.7){
result = "Rp2.000";
}else{
result = "Rp5.000";
}

document.getElementById("result").innerHTML =
"🎉 Kamu dapat THR "+result;

}
