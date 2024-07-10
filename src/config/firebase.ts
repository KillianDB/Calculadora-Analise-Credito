import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: "AIzaSyBDEsuURVJT-x4QKVa_DYcFsejMWs6-UNM",
	authDomain: "credito-real-financeira.firebaseapp.com",
	projectId: "credito-real-financeira",
	storageBucket: "credito-real-financeira.appspot.com",
	messagingSenderId: "620456926378",
	appId: "1:620456926378:web:38abf10286c956824704d3",
	measurementId: "G-5SP452ENCH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);
