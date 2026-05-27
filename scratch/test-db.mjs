import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, orderBy, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg8dEgVfQ8VUyxcHSqderICPZw119KGWo",
  authDomain: "alistech-b4226.firebaseapp.com",
  projectId: "alistech-b4226",
  storageBucket: "alistech-b4226.firebasestorage.app",
  messagingSenderId: "218435178173",
  appId: "1:218435178173:web:cd4eeab01dd5555bb4f1d4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  try {
    console.log("Fetching published projects WITH orderBy...");
    const q = query(
      collection(db, "projects"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    console.log("Found", snap.size, "published projects:");
    snap.forEach(d => {
      console.log("- ", d.id, d.data().title);
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
  }
}

run();
