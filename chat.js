// เริ่มต้น Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQFmvFUxXl4O0S5WSKo9IZsxu9Esmbp6c",          // เปลี่ยนเป็น API Key ของคุณ
  authDomain: "kubkakwallet.firebaseapp.com",
  databaseURL: "https://kubkakwallet-default-rtdb.firebaseio.com",
  projectId: "kubkakwallet",
  storageBucket: "kubkakwallet.appspot.com",
  messagingSenderId: "325567266889",                            // เปลี่ยนเป็น Sender ID ของคุณ
  appId: "1:325567266889:web:d74a2ccb4506bfa47bbf98"           // เปลี่ยนเป็น App ID ของคุณ
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ฟังข้อความแชท
function listenForMessages() {
  const chatBox = document.getElementById("chat-box");
  db.ref("messages").on("child_added", (snapshot) => {
    const data = snapshot.val();
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${data.name}:</strong> ${data.text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// ส่งข้อความแชท
function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  const address = document.getElementById("wallet-address").textContent.replace("Connected: ", "");
  db.ref("messages").push({
    name: address,
    text: text,
    time: new Date().toISOString()
  });

  input.value = "";
}

// เรียกฟังทันทีเมื่อโหลด
window.addEventListener("load", () => {
  listenForMessages();
});
