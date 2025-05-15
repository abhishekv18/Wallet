import React, { useState } from 'react'

import Wallet from './components/Wallet'
import { generateMnemonic } from 'bip39';
import { N } from 'ethers';
import Navbar from './components/Navbar';
import Footer from './components/footer';

function App() {
  const [mnemonic, setMnemonic] = useState("")
  return (
    <>
      {/* <input type="text" value={mnemonic}/>
      <button onClick={async function() {
        const m=generateMnemonic(128);
        setMnemonic(m)
      }}>
        Create Seed Phase
      </button>
      <SolanaWallet mnemonic={mnemonic}/> */}
      <Navbar/>
      <Wallet/>
      <Footer/>
    </>
  )
}

export default App
