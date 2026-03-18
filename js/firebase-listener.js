import { initializeApp } from "https://www.gstatic.com";
import { getDatabase, ref, onValue } from "https://www.gstatic.com";

const firebaseConfig = {
    apiKey: "AIzaSyB-qvtvHOIM2vTWkKtbxEBG47qIO3qg8OI",
    authDomain: "taskmaster-scoreboard-de7b5.firebaseapp.com",
    databaseURL: "https://taskmaster-scoreboard-de7b5-default-rtdb.firebaseio.com",
    projectId: "taskmaster-scoreboard-de7b5",
    storageBucket: "taskmaster-scoreboard-de7b5.firebasestorage.app",
    messagingSenderId: "458963855671",
    appId: "1:458963855671:web:523c967813b9dd4ffc12b2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

onValue(ref(db, 'scores'), (snapshot) => {
    const data = snapshot.val();
    if (data && window.contestants) {
        // Update the scores in the background array
        // We assume p1 = contestant 0, p2 = contestant 1, etc.
        window.contestants[0].score = data.p1 || 0;
        window.contestants[1].score = data.p2 || 0;
        window.contestants[2].score = data.p3 || 0;
        window.contestants[3].score = data.p4 || 0;
        window.contestants[4].score = data.p5 || 0;

        // Trigger the animation
        if (typeof window.play === "function") {
            window.play();
        }
    }
});
