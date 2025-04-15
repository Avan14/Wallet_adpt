import { useState } from "react";
import "./App.css";
import React from "react";
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,

} from "@solana/wallet-adapter-react-ui";


// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  const [money, setMoney] = useState<number>(0);
   const wallet = useWallet();
   const { connection } = useConnection();

  const handleClick = async () => {
    alert(`Attempting to send ${money} SOL...`);
    if(wallet.publicKey){

      await connection.requestAirdrop(wallet.publicKey, money*1000000)
      alert("done");
    }
    else alert('wallet not connected');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setMoney(value);
    } else {
      setMoney(0);
    }
  };

  return (
    <>
      <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div style={{
              margin:300
            }}>
              <h3>Get Free Drops</h3>

              <br></br>
              <WalletMultiButton></WalletMultiButton>
              <WalletDisconnectButton></WalletDisconnectButton>
              <br></br>
              <br></br>
              <input
                placeholder="Enter the amount of Solana"
                onChange={handleChange}
                type="number"
              />
              <button onClick={handleClick}>Send</button>
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
