// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDM98TOvUK1SZmpCEU9cngSD9Kvywm-jgU",
    authDomain: "utak-71693.firebaseapp.com",
    databaseURL: "https://utak-71693-default-rtdb.firebaseio.com/",
    projectId: "utak-71693",
    storageBucket: "utak-71693.appspot.com",
    messagingSenderId: "801287795591",
    appId: "1:801287795591:web:503165bd6e7d1ada539922",
    measurementId: "G-PCCZPKMK4V"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
