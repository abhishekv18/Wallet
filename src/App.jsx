import React, { useState } from 'react'

import Wallet from './components/Wallet'

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [mnemonic, setMnemonic] = useState("")
  return (
    <>
    
      <Navbar/>
      <Wallet/>
      <Footer/>
    </>
  )
}

export default App
