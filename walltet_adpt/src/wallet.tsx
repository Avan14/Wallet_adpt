import { useWallet } from "@solana/wallet-adapter-react";

export const wallet = () => {
  const wallet = useWallet();
  alert(wallet.publicKey?.toString());
  return (
    <div>
      <div> {wallet.publicKey?.toString()}</div>
      
    </div>
  );
};
