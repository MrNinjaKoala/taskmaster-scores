let players=[];

async function load(){

    const res = await fetch("data/scores.json");
    const data = await res.json();

    players = data.players;

    render();

}

function render(){

    const container = document.getElementById("controls");

    container.innerHTML="";

    players.forEach((p,i)=>{

        const row=document.createElement("div");

        row.innerHTML=`
            ${p.name}

            <button onclick="change(${i},-1)">-</button>

            <span id="score${i}">${p.score}</span>

            <button onclick="change(${i},1)">+</button>
        `;

        container.appendChild(row);

    });

}

function change(i,val){

    players[i].score += val;

    document.getElementById("score"+i).innerText = players[i].score;

}

function exportScores(){

    const data = JSON.stringify({players},null,2);

    const blob = new Blob([data], {type:"application/json"});

    const url = URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;
    a.download="scores.json";

    a.click();

}

load();