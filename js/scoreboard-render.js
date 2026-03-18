async function renderScoreboard() {

    let players = await loadScores();

    players.sort((a,b)=> b.score - a.score);

    const top5 = players.slice(0,5);
    const rest = players.slice(5);

    renderTop(top5);
    renderRest(rest);

}

function renderTop(players){

    const container = document.querySelector("#top5");

    container.innerHTML = "";

    players.forEach(p=>{

        const div = document.createElement("div");
        div.className = "contestant";

        div.innerHTML = `
            <div class="name">${p.name}</div>
            <div class="score">${p.score}</div>
        `;

        container.appendChild(div);

    });

}

function renderRest(players){

    const container = document.querySelector("#others");

    container.innerHTML="";

    players.forEach(p=>{

        const row = document.createElement("div");

        row.className="other-player";

        row.innerHTML = `${p.name} — ${p.score}`;

        container.appendChild(row);

    });

}

renderScoreboard();
setInterval(renderScoreboard,3000);