const canvas = document.getElementById("wheel")
const ctx = canvas.getContext("2d")

canvas.width = 400
canvas.height = 400

const prizes = [
"100rb",
"50rb",
"20rb",
"10rb",
"5rb",
"Zonk",
"20rb",
"10rb"
]

const allowed = [
"20rb",
"10rb",
"5rb",
"Zonk"
]

let rotation = 0

function drawWheel(){

const angle = (Math.PI * 2) / prizes.length

for(let i=0;i<prizes.length;i++){

ctx.beginPath()

ctx.moveTo(200,200)

ctx.arc(
200,
200,
200,
i*angle,
(i+1)*angle
)

ctx.fillStyle = i%2 ? "#ff3b3b" : "#ff8c00"

ctx.fill()

ctx.save()

ctx.translate(200,200)

ctx.rotate(i*angle + angle/2)

ctx.fillStyle="white"

ctx.font="bold 18px Arial"

ctx.fillText(prizes[i],90,10)

ctx.restore()

}

}

drawWheel()

document.getElementById("spinBtn").onclick=()=>{

const result = allowed[Math.floor(Math.random()*allowed.length)]

const index = prizes.indexOf(result)

rotation += 360*5 + index*(360/prizes.length)

canvas.style.transition="transform 4s"

canvas.style.transform=`rotate(${rotation}deg)`

setTimeout(()=>{

document.getElementById("result").innerText="Kamu dapat: "+result

},4000)

}
