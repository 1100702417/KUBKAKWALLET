// กำหนดค่า Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQFmvFUxXl4O0S5WSKo9IZsxu9Esmbp6c",
  authDomain: "kubkakwallet.firebaseapp.com",
  databaseURL: "https://kubkakwallet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kubkakwallet",
  storageBucket: "kubkakwallet.appspot.com",
  messagingSenderId: "325567266889",
  appId: "1:325567266889:web:d74a2ccb4506bfa47bbf98",
  measurementId: "G-HVNMX35LRQ"
};

// เริ่มต้น Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
