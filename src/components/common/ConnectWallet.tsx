import { BrowserProvider, formatEther } from "ethers";
import { useState, useEffect } from "react";

type WalletState = {
  address: string;
  balance: string;
};

const ConnectWallet = () => {
  const [wallet, setWallet] = useState<WalletState | null>(null);

  console.log("wallet", wallet);
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const address = accounts[0];

        const provider = new BrowserProvider(window.ethereum!);
        const balanceInWei = await provider.getBalance(address);

        setWallet({
          address,
          balance: formatEther(balanceInWei),
        });
      } catch (error) {
        console.error("Kết nối MetaMask thất bại:", error);
      }
    } else {
      alert("Vui lòng cài đặt MetaMask.");
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const address = accounts[0];
          const provider = new BrowserProvider(window.ethereum!);
          const balanceInWei = await provider.getBalance(address);

          setWallet({
            address,
            balance: formatEther(balanceInWei),
          });
        }
      } catch (error) {
        console.error("Không thể kiểm tra trạng thái ví:", error);
      }
    }
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          connectWallet();
        } else {
          setWallet(null);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      checkIfWalletIsConnected();
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!wallet && (
        <>
          <h1>Kết nối MetaMask</h1>
          <button
            onClick={connectWallet}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              margin: "20px 0",
            }}
          >
            Kết nối Ví
          </button>
        </>
      )}
      {wallet ? (
        <div>
          <p>
            <strong>Địa chỉ ví:</strong> {wallet.address}
          </p>
          <p>
            <strong>Số dư:</strong> {wallet.balance} ETH
          </p>
        </div>
      ) : (
        <p>Chưa kết nối ví</p>
      )}
    </div>
  );
};

export default ConnectWallet;
