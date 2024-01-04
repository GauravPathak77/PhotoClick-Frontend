import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB8nmgjnUXjFvJeemgcZyePCNetWdg0xsA",
  authDomain: "vim-recyclers-aa737.firebaseapp.com",
  databaseURL: "https://vim-recyclers-aa737-default-rtdb.firebaseio.com",
  projectId: "vim-recyclers-aa737",
  storageBucket: "vim-recyclers-aa737.appspot.com",
  messagingSenderId: "431689033782",
  appId: "1:431689033782:web:05cf983723240cd1281097",
  measurementId: "G-5VP7W1MYEX"
};


const app = initializeApp(firebaseConfig);

export { app };