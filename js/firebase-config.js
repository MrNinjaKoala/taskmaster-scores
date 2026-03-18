import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-qvtvHOIM2vTWkKtbxEBG47qIO3qg8OI",
  authDomain: "taskmaster-scoreboard-de7b5.firebaseapp.com",
  projectId: "taskmaster-scoreboard-de7b5",
  storageBucket: "taskmaster-scoreboard-de7b5.firebasestorage.app",
  messagingSenderId: "458963855671",
  appId: "1:458963855671:web:523c967813b9dd4ffc12b2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);