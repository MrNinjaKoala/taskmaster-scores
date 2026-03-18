/*
 * Taskmaster Scoreboard - Core Logic
 */

(function() {
    // We attach these to window so firebase-listener.js can see them
    window.contestants = [];
    window.locked = false;

    var main = document.querySelector("main");
    var fileInput = document.querySelector("#file-input");
    window.playButton = document.querySelector("#play-button");

    function addContestant(image) {
        var contestant = {};
        contestant.image = !!image ? image : "./images/blank.jpg";
        contestant.score = 0;
        contestant.oldScore = 0;
        window.contestants.push(contestant);
        return window.contestants.length;
    }

    function removeContestant(idx) {
        window.contestants.splice(idx, 1);
    }

    function createContestantEl(con, id) {
        var el = document.createElement("div");
        el.classList.add("contestant");
        var frameScaler = document.createElement("div");
        frameScaler.classList.add("frame-scaler");
        var frameContainer = document.createElement("div");
        frameContainer.classList.add("frame-container");
        frameContainer.style.animationDelay = -id * 1.25 + "s";

        var fill = document.createElement("div");
        fill.classList.add("fill");
        fill.style.backgroundImage = "url(" + con.image + ")";

        var shadow = document.createElement("div");
        shadow.classList.add("shadow");

        var frame = document.createElement("img");
        frame.src = "./images/frame.png";
        frame.classList.add("frame");

        fill.appendChild(shadow);
        frameContainer.appendChild(fill);
        frameContainer.appendChild(frame);
        frameScaler.appendChild(frameContainer);

        var scoreContainer = document.createElement("div");
        scoreContainer.classList.add("score-container");
        var seal = document.createElement("img");
        seal.classList.add("seal");
        seal.src = "./images/seal.png";

        var score = document.createElement("h1");
        score.classList.add("score");
        score.innerText = con.oldScore;

        scoreContainer.appendChild(seal);
        scoreContainer.appendChild(score);
        el.appendChild(frameScaler);
        el.appendChild(scoreContainer);

        return el;
    }

    window.transformContestants = function() {
        window.contestants.sort(function(a, b) { return a.score - b.score; });
        var maxScore = window.contestants[window.contestants.length - 1].score;
        for (var i = 0, l = window.contestants.length; i < l; ++i) {
            var con = window.contestants[i];
            con.el.style.transform = "translateX(" + (275 * i + 30) + "px)";
            if (con.score == maxScore && maxScore > 0) {
                con.el.children[0].classList.add("large");
            } else {
                con.el.children[0].classList.remove("large");
            }
        }
    }

    window.refreshContestants = function() {
        main.innerHTML = "";
        for (var i = window.contestants.length; i > 0; --i) {
            var con = window.contestants[i-1];
            con.el = createContestantEl(con, i);
        }
        window.transformContestants();
        for (var i = window.contestants.length; i > 0; --i) {
            main.appendChild(window.contestants[i-1].el);
        }
    }

    function ease(t, a, b) {
        var eased = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        return (b - a) * eased + a;
    }

    window.play = function() {
        window.playButton.style.display = "none";
        if (!window.locked) {
            window.locked = true;
            document.body.classList.add("locked");
            resize();
        }

        setTimeout(function() {
            var start = 0;
            var loop = function(dt) {
                if (start == 0) start = dt;
                for (var i = 0, l = window.contestants.length; i < l; ++i) {
                    var con = window.contestants[i];
                    var scoreEl = con.el.querySelector(".score");
                    var val = Math.round(ease(Math.min((dt - start) / 2000, 1), con.oldScore, con.score));
                    scoreEl.innerText = val;
                }
                if (dt - start < 2000) {
                    window.requestAnimationFrame(loop);
                } else {
                    for (var i = 0; i < window.contestants.length; i++) {
                        window.contestants[i].oldScore = window.contestants[i].score;
                    }
                }
            };
            window.requestAnimationFrame(loop);
            window.transformContestants();
        }, 1000);
    };

    window.playButton.addEventListener("mouseup", window.play);

    for (var i = 0; i < 5; ++i) addContestant();
    window.refreshContestants();

    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var wm = 1400 * (window.contestants.length / 5);
        var m = Math.min(w / wm, h / 1080);
        main.style.transform = "scale(" + m + ")";
        main.style.left = (w - wm * m) / 2 + "px";
    }

    window.addEventListener("resize", resize);
    resize();
})();
