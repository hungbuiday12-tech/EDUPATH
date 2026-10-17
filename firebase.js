
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBX6zpa1E92aSMHoyW6FJraaWnWejqLIGU",
    authDomain: "edupath-fd066.firebaseapp.com",
    projectId: "edupath-fd066",
    storageBucket: "edupath-fd066.firebasestorage.app",
    messagingSenderId: "435083550464",
    appId: "1:435083550464:web:89d5ba0a7c71cf58df9de5",
    measurementId: "G-6SCP2GTZ6W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

isSupported().then((supported) => {
    if (supported) {
        getAnalytics(app);
    }
}).catch(() => {});
