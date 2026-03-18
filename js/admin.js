import { db } from "./firebase-config.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

let players=[];

const playersRef = ref(db,"players");

onValue(playersRef,(snapshot)=>{

players = snapshot.val();

render();

});

function render(){

const container=document.getElementById("controls");

container.innerHTML="";

Object.keys(players).forEach(key=>{

const p = players[key];

const row=document.createElement("div");

row.innerHTML=`
${p.name}

<button onclick="change('${key}',-1)">-</button>

<span>${p.score}</span>

<button onclick="change('${key}',1)">+</button>
`;

container.appendChild(row);

});

}

window.change = function(id,val){

players[id].score += val;

update(playersRef,{
[id]: players[id]
});

}