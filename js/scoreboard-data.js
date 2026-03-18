async function loadScores() {

    const res = await fetch("data/scores.json?cache=" + Date.now());
    const data = await res.json();

    return data.players;

}