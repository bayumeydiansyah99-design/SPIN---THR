const prizes=[
"100rb",
"50rb",
"20rb",
"10rb",
"5rb",
"Zonk",
"20rb",
"10rb"
]

const allowed=[
"20rb",
"10rb",
"5rb",
"Zonk"
]

let rotation=0

document.getElementById("spinBtn").onclick=function(){

const result=allowed[Math.floor(Math.random()*allowed.length)]

const index=prizes.indexOf(result)

const slice=360/prizes.length

const offset= slice/2

rotation += (360*5) + (index*slice) + offset

document.getElementById("wheel").style.transform=
"rotate("+rotation+"deg)"

setTimeout(()=>{

document.getElementById("result").innerText=
"Kamu dapat: "+result

},4000)

}
