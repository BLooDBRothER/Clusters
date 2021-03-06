import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDzPle3URDYs1O1M-jTMUy64ZzVfXWKb5g",
  authDomain: "web-clusters.firebaseapp.com",
  projectId: "web-clusters",
  storageBucket: "web-clusters.appspot.com",
  messagingSenderId: "757696261414",
  appId: "1:757696261414:web:482a68317384eaee57a5e7",
  measurementId: "G-6J5W1FPTTH",
  databaseURL: "https://web-clusters-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
