import firebase from "firebase";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDl8exN4m1F52c8fe9dGlMKKhuWotvzF9U",
	authDomain: "shayyek-cc93c.firebaseapp.com",
	projectId: "shayyek-cc93c",
	storageBucket: "shayyek-cc93c.appspot.com",
	messagingSenderId: "22834068986",
	appId: "1:22834068986:web:d85ffc0deb26fd755bf843",
	measurementId: "G-JCL13JT214",
};

const app = firebase.initializeApp(firebaseConfig);

export default firebase;
