import { useState } from 'react';
import { connectWallet, getPKH } from "./utils/wallet";
import Navbar from './components/navbar';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState();

  const btnConnect = async () => {
    const w = await connectWallet();
    const addr = await getPKH();
    setWalletAddress(addr);
  }

  return (
    <div>
      <Navbar />
      {/* <button onClick={btnConnect}>connect</button>
      <p>{walletAddress ? walletAddress : "Not Logged in"}</p> */}
    </div>
  )
}
