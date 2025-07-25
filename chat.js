let userWallet = "";

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    userWallet = await signer.getAddress();
    document.getElementById("wallet-address").textContent = "Connected: " + userWallet;
  } else {
    alert("MetaMask ไม่พร้อมใช้งาน กรุณาติดตั้งก่อน");
  }
}

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value.trim();
  if (messageText === "" || userWallet === "") return;

  const messageData = {
    address: userWallet,
    message: messageText,
    timestamp: Date.now()
  };

  firebase.database().ref("messages").push(messageData);
  messageInput.value = "";
}

function listenForMessages() {
  firebase.database().ref("messages").on("child_added", (snapshot) => {
    const data = snapshot.val();
    const chatBox = document.getElementById("chat-box");
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message";
    msgDiv.innerHTML = `<span class="wallet">${data.address}</span>: ${data.message}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

listenForMessages();
