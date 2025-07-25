// เริ่มต้น Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "kubkakwallet.firebaseapp.com",
  databaseURL: "https://kubkakwallet-default-rtdb.firebaseio.com",
  projectId: "kubkakwallet",
  storageBucket: "kubkakwallet.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
