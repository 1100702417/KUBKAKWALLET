async function connectWallet() {
  if (window.ethereum) {
    try {
      // เชื่อม MetaMask กับ Bitkub Chain (Chain ID 0x38c)
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x38c',
          chainName: 'Bitkub Chain',
          nativeCurrency: {
            name: 'Bitkub Coin',
            symbol: 'KUB',
            decimals: 18
          },
          rpcUrls: ['https://rpc.bitkubchain.io'],
          blockExplorerUrls: ['https://bkcscan.com/']
        }]
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      document.getElementById("wallet-address").textContent = `Connected: ${address}`;

      // ดึงยอด BKC
      const balance = await provider.getBalance(address);
      const bkcBalance = ethers.utils.formatEther(balance);
      document.getElementById("wallet-balance").textContent = `Balance: ${bkcBalance} KUB`;
    } catch (err) {
      console.error("Error connecting wallet:", err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ MetaMask");
    }
  } else {
    alert("กรุณาติดตั้ง MetaMask ก่อนใช้งาน");
  }
}
