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

const scoresRef = ref(db, 'scores');

// Listen for updates
onValue(scoresRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // 1. Update the input values in your existing UI
        document.getElementById('p1-score').value = data.p1;
        document.getElementById('p2-score').value = data.p2;
        document.getElementById('p3-score').value = data.p3;
        document.getElementById('p4-score').value = data.p4;
        document.getElementById('p5-score').value = data.p5;

        // 2. Trigger your existing play function
        // Ensure your main script exposes the 'play' function to the global window object
        if (typeof window.play === "function") {
            window.play();
        }
    }
});
