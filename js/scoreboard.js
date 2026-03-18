import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const playersRef = ref(db, "players");

onValue(playersRef, (snapshot)=>{

let players = snapshot.val();

players = Object.values(players);

players.sort((a,b)=> b.score - a.score);

renderTop(players.slice(0,5));
renderRest(players.slice(5));

});

function renderTop(players){

const container = document.querySelector("#top5");

container.innerHTML="";

players.forEach(p=>{

const div = document.createElement("div");

div.className="contestant";

div.innerHTML=`
<div class="name">${p.name}</div>
<div class="score">${p.score}</div>
`;

container.appendChild(div);

});

}

function renderRest(players){

const container=document.querySelector("#others");

container.innerHTML="";

players.forEach(p=>{

const row=document.createElement("div");

row.className="other-player";

row.innerHTML=`${p.name} — ${p.score}`;

container.appendChild(row);

});

}