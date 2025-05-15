
// import { generateMnemonic, mnemonicToSeed } from 'bip39';
// import React, { useEffect, useState } from 'react';
// import { Wallet, HDNodeWallet } from "ethers";
// import { derivePath } from "ed25519-hd-key";
// import { Keypair } from "@solana/web3.js";
// import { PublicKey } from "@solana/web3.js";
// import nacl from "tweetnacl"
// const WalletGenerator = () => {
//   const [mnemonic, setMnemonic] = useState(() => {
//   return localStorage.getItem("mnemonic") || "";
// });
//   const [selectedChain, setSelectedChain] = useState(null);
//   const [showSeedButton, setShowSeedButton] = useState(false);
//   const [index, setIndex] = useState(0);
//   const [ethIndex, setEthIndex] = useState(0);
//   const [publicKeys, setPublicKeys] = useState([]);
//   const [ethPublicKeys, setEthPublicKeys] = useState([]);
//   const [error, setError] = useState("");
//  const [isLocked, setIsLocked] = useState(() => {
//   const stored = localStorage.getItem("isLocked");
//   return stored ? JSON.parse(stored) : false;
// });

  

// useEffect(() => {
//   const savedMnemonic = localStorage.getItem('mnemonic');
//   const savedChain = localStorage.getItem('selectedChain');
//   const savedSolanaKeys = localStorage.getItem('publicKeys');
//   const savedEthKeys = localStorage.getItem('ethPublicKeys');
//   const savedIndex = localStorage.getItem('index');
//   const savedEthIndex = localStorage.getItem('ethIndex');

//   if (savedMnemonic) setMnemonic(savedMnemonic);
//   if (savedChain) setSelectedChain(savedChain);

// if (savedSolanaKeys) {
//  const parsed = JSON.parse(savedSolanaKeys);
// // keyStr is now an object with both publicKey and privateKey
// setPublicKeys(parsed);
// }
//   if (savedEthKeys) setEthPublicKeys(JSON.parse(savedEthKeys));
//   if (savedIndex) setIndex(parseInt(savedIndex));
//   if (savedEthIndex) setEthIndex(parseInt(savedEthIndex));
// }, []);

// useEffect(() => {
//   const savedLock = localStorage.getItem('isLocked');
//   if (savedLock) setIsLocked(JSON.parse(savedLock));
// }, []);

// useEffect(() => {
//   localStorage.setItem('mnemonic', mnemonic);
//   localStorage.setItem('selectedChain', selectedChain || "");
//   localStorage.setItem('publicKeys', JSON.stringify(publicKeys));//it store array in local storage
//   localStorage.setItem('ethPublicKeys', JSON.stringify(ethPublicKeys));
//   localStorage.setItem('index', index.toString());
//   localStorage.setItem('ethIndex', ethIndex.toString());
// }, [mnemonic, selectedChain, publicKeys, ethPublicKeys, index, ethIndex]);

// useEffect(() => {
//   localStorage.setItem('isLocked', JSON.stringify(isLocked));
// }, [isLocked]);



//   const handleChainSelect = (chain) => {
//     setSelectedChain(chain);
//     setShowSeedButton(true);
//     setPublicKeys([]);
//     setEthPublicKeys([]);
//     setMnemonic("");
//     setIndex(0);
//     setEthIndex(0);
//     setError("");
//   };
 
//   const generateSeed = () => {
//     const m = generateMnemonic(128);
//     setMnemonic(m);
  
//     setShowSeedButton(false);
//       setIsLocked(true);
//   };

//   const clearAllWallets = () => {
//     localStorage.clear();
//     setSelectedChain(null);
//     setShowSeedButton(false);
//     setPublicKeys([]);
//     setEthPublicKeys([]);
//     setMnemonic("");
//     setIndex(0);
//     setEthIndex(0);
//     setError("");
//     setIsLocked(false);
//   };

//   const addSolanaWallet = async() => {
//     if (!mnemonic.trim() || mnemonic.trim().split(" ").length < 12) {
//       setError("Invalid or empty mnemonic - must contain at least 12 words");
//       return;
//     }
//     setError("");
    
//     // Simulate deriving a Solana public key
//     const seed = await mnemonicToSeed(mnemonic);
//             const path = `m/44'/501'/${index}'/0'`;
//             const derivedSeed = derivePath(path, seed.toString("hex")).key;
//             const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
//             const keypair = Keypair.fromSecretKey(secret);
//     setIndex(index + 1);
//    setPublicKeys([...publicKeys, {
//   publicKey: keypair.publicKey.toBase58(),
//   privateKey: Buffer.from(keypair.secretKey).toString('hex')
// }]);
//   };

//   const addEthWallet = async() => {
//     if (!mnemonic.trim() || mnemonic.trim().split(" ").length < 12) {
//       setError("Invalid or empty mnemonic - must contain at least 12 words");
//       return;
//     }
//     setError("");
    
//     // Simulate deriving an Ethereum address
//   const seed = await mnemonicToSeed(mnemonic);
//                 const derivationPath = `m/44'/60'/${ethIndex}'/0'`;
//                  const hdNode = HDNodeWallet.fromSeed(seed);
//                  const child = hdNode.derivePath(derivationPath);
//                  const privateKey = child.privateKey;
//                  const wallet = new Wallet(privateKey);
//         setEthIndex(ethIndex + 1);
//      setEthPublicKeys([...ethPublicKeys, {
//   address: wallet.address,
//   privateKey: wallet.privateKey
// }]);
         
//   };

//   return (
//     <div className="max-w-xl mx-auto p-5 font-sans">
//       <h2 className="text-center mb-5 text-xl font-bold">🪙 Multi-Chain Wallet Generator</h2>

//       {!selectedChain ? (
//         <div className="flex justify-center gap-3 mb-5">
//           <button
//             onClick={() => handleChainSelect('solana')}
//             className="px-5 py-2 bg-indigo-500 text-white rounded cursor-pointer">
//             Solana
//           </button>
//           <button
//             onClick={() => handleChainSelect('ethereum')}
//             className="px-5 py-2 bg-green-500 text-white rounded cursor-pointer">
//             Ethereum
//           </button>
//         </div>
//       ) : (
//         <>
//             <div className="flex justify-between items-center mb-5">
//           <h3 className="font-medium">
//             {selectedChain === 'solana' ? 'Solana' : 'Ethereum'} Wallet Generator
//           </h3>
//           <button
//             onClick={clearAllWallets}
//             className="px-3 py-1 bg-red-500 text-white rounded text-sm">
//               {publicKeys.length > 0 || ethPublicKeys.length > 0 || mnemonic ? "Clear All Wallets" : "Back"}
//           </button>
//         </div>

//         <div className="mb-5">
//           <label className="font-bold block mb-2">🔐 Enter or Edit Mnemonic:</label>
//           <textarea
//             value={mnemonic}
//             disabled={isLocked}
//             onChange={(e) =>{ 
//               const value= e.target.value;
//               setMnemonic(value)
//               const words = value.trim().split(/\s+/);
//   if (words.length >= 12) {
//     setIsLocked(true);
//   }
//             }}
//             placeholder='Enter your secrte phrase (or leave blank to generate)'
//             rows={3} 
//             className="w-full p-3 border border-gray-300 rounded text-sm"
//           />
//         {!isLocked && (
//   <div className="text-center mb-5">
//     <button
//       onClick={generateSeed}
//       className='mt-2 px-5 py-2 bg-amber-500 text-white rounded cursor-pointer'>
//       🔁 Generate Wallet
//     </button>
//   </div>
// )}

//         </div>

         
//           {mnemonic && (
//             <div className="mb-5 text-center">
//               {selectedChain === 'solana' ? (
//                 <button
//                   onClick={addSolanaWallet}
//                   className="px-5 py-2 bg-indigo-500 text-white rounded cursor-pointer">
//                   ➕ Add Solana Wallet
//                 </button>
//               ) : (
//                 <button
//                   onClick={addEthWallet}
//                   className="px-5 py-2 bg-green-500 text-white rounded cursor-pointer">
//                   ➕ Add Ethereum Wallet
//                 </button>
//               )}
//             </div>
//           )}

//           {error && <p className="text-red-500 text-center mb-5">{error}</p>}

//           <div className="mt-5">
//             {selectedChain === 'solana' &&
//              publicKeys.map((keyPair, i) => (
//   <div key={i} className="bg-gray-100 p-3 mb-3 rounded break-words">
//     <p>🔑 <strong>Public Key:</strong> {keyPair.publicKey}</p>
//     <p>🗝️ <strong>Private Key:</strong> {keyPair.privateKey}</p>

//     <div className="flex gap-2 mt-2">
//       <button
//         onClick={() => navigator.clipboard.writeText(keyPair.publicKey)}
//         className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
//         Copy Public
//       </button>
//       <button
//         onClick={() => navigator.clipboard.writeText(keyPair.privateKey)}
//         className="px-2 py-1 text-xs bg-purple-500 text-white rounded">
//         Copy Private
//       </button>
//       <button
//         onClick={() =>
//           setPublicKeys(publicKeys.filter((_, index) => index !== i))
//         }
//         className="px-2 py-1 text-xs bg-red-500 text-white rounded">
//         Delete
//       </button>
//     </div>
//   </div>
// ))}


//             {selectedChain === 'ethereum' &&
//              ethPublicKeys.map((wallet, i) => (
//   <div key={i} className="bg-gray-100 p-3 mb-3 rounded break-words">
//     <p>💼 <strong>Address:</strong> {wallet.address}</p>
//     <p>🗝️ <strong>Private Key:</strong> {wallet.privateKey}</p>

//     <div className="flex gap-2 mt-2">
//       <button
//         onClick={() => navigator.clipboard.writeText(wallet.address)}
//         className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
//         Copy Address
//       </button>
//       <button
//         onClick={() => navigator.clipboard.writeText(wallet.privateKey)}
//         className="px-2 py-1 text-xs bg-purple-500 text-white rounded">
//         Copy Private
//       </button>
//       <button
//         onClick={() =>
//           setEthPublicKeys(ethPublicKeys.filter((_, index) => index !== i))
//         }
//         className="px-2 py-1 text-xs bg-red-500 text-white rounded">
//         Delete
//       </button>
//     </div>
//   </div>
// ))}

//           </div>
//         </>
//       )}
//     </div>
//   );



// };

// export default WalletGenerator;


import { generateMnemonic, mnemonicToSeed } from 'bip39';
import React, { useEffect, useState } from 'react';
import { Wallet, HDNodeWallet } from "ethers";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl"







const WalletGenerator = () => {
  const [mnemonic, setMnemonic] = useState(() => {
    return localStorage.getItem("mnemonic") || "";
  });
  const [selectedChain, setSelectedChain] = useState(null);
  const [showSeedButton, setShowSeedButton] = useState(false);
  const [index, setIndex] = useState(0);
  const [ethIndex, setEthIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [ethPublicKeys, setEthPublicKeys] = useState([]);
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(() => {
    const stored = localStorage.getItem("isLocked");
    return stored ? JSON.parse(stored) : false;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedMnemonic = localStorage.getItem('mnemonic');
    const savedChain = localStorage.getItem('selectedChain');
    const savedSolanaKeys = localStorage.getItem('publicKeys');
    const savedEthKeys = localStorage.getItem('ethPublicKeys');
    const savedIndex = localStorage.getItem('index');
    const savedEthIndex = localStorage.getItem('ethIndex');

    if (savedMnemonic) setMnemonic(savedMnemonic);
    if (savedChain) setSelectedChain(savedChain);

    if (savedSolanaKeys) {
      const parsed = JSON.parse(savedSolanaKeys);
      setPublicKeys(parsed);
    }
    if (savedEthKeys) setEthPublicKeys(JSON.parse(savedEthKeys));
    if (savedIndex) setIndex(parseInt(savedIndex));
    if (savedEthIndex) setEthIndex(parseInt(savedEthIndex));
  }, []);

  useEffect(() => {
    const savedLock = localStorage.getItem('isLocked');
    if (savedLock) setIsLocked(JSON.parse(savedLock));
  }, []);

  useEffect(() => {
    localStorage.setItem('mnemonic', mnemonic);
    localStorage.setItem('selectedChain', selectedChain || "");
    localStorage.setItem('publicKeys', JSON.stringify(publicKeys));
    localStorage.setItem('ethPublicKeys', JSON.stringify(ethPublicKeys));
    localStorage.setItem('index', index.toString());
    localStorage.setItem('ethIndex', ethIndex.toString());
  }, [mnemonic, selectedChain, publicKeys, ethPublicKeys, index, ethIndex]);

  useEffect(() => {
    localStorage.setItem('isLocked', JSON.stringify(isLocked));
  }, [isLocked]);

  const handleChainSelect = (chain) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedChain(chain);
      setShowSeedButton(true);
      setPublicKeys([]);
      setEthPublicKeys([]);
      setMnemonic("");
      setIndex(0);
      setEthIndex(0);
      setError("");
      setIsAnimating(false);
    }, 300);
  };
 
  const generateSeed = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const m = generateMnemonic(128);
      setMnemonic(m);
      setShowSeedButton(false);
      setIsLocked(true);
      setIsGenerating(false);
    }, 800);
  };

  const clearAllWallets = () => {
    localStorage.clear();
    setSelectedChain(null);
    setShowSeedButton(false);
    setPublicKeys([]);
    setEthPublicKeys([]);
    setMnemonic("");
    setIndex(0);
    setEthIndex(0);
    setError("");
    setIsLocked(false);
  };

  const addSolanaWallet = async() => {
    if (!mnemonic.trim() || mnemonic.trim().split(" ").length < 12) {
      setError("Invalid or empty mnemonic - must contain at least 12 words");
      return;
    }
    setError("");
    setIsGenerating(true);
    
    try {
      // Simulate deriving a Solana public key
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${index}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setIndex(index + 1);
      setPublicKeys([...publicKeys, {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('hex')
      }]);
    } catch (err) {
      setError("Error generating wallet: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const addEthWallet = async() => {
    if (!mnemonic.trim() || mnemonic.trim().split(" ").length < 12) {
      setError("Invalid or empty mnemonic - must contain at least 12 words");
      return;
    }
    setError("");
    setIsGenerating(true);
    
    try {
      // Simulate deriving an Ethereum address
      const seed = await mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/60'/${ethIndex}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      setEthIndex(ethIndex + 1);
      setEthPublicKeys([...ethPublicKeys, {
        address: wallet.address,
        privateKey: wallet.privateKey
      }]);
    } catch (err) {
      setError("Error generating wallet: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(`${type} copied!`);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="container mx-auto p-6">
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            <span className="animate-pulse">🪙</span> Multi-Chain Wallet Generator
          </h1>
        </div>

        {!selectedChain ? (
          <div className={`flex flex-col items-center justify-center h-96 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-xl text-gray-400 mb-8">Select a blockchain to begin:</p>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10 w-full max-w-md">
              <button
                onClick={() => handleChainSelect('solana')}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-xl cursor-pointer hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 flex items-center justify-center text-xl">
                <span className="mr-3 text-2xl">☀️</span> Solana
              </button>
              <button
                onClick={() => handleChainSelect('ethereum')}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-xl cursor-pointer hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center text-xl">
                <span className="mr-3 text-2xl">⟠</span> Ethereum
              </button>
            </div>
          </div>
        ) : (
          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-medium">
                {selectedChain === 'solana' ? 
                  <span className="flex items-center"><span className="text-yellow-400 mr-2">☀️</span> Solana Wallet Generator</span> : 
                  <span className="flex items-center"><span className="text-green-400 mr-2">⟠</span> Ethereum Wallet Generator</span>}
              </h3>
              <button
                onClick={clearAllWallets}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-400 text-white rounded-lg hover:shadow-md hover:shadow-red-500/50 transition-all duration-300 text-base flex items-center">
                <span className="mr-2">🔙</span> {publicKeys.length > 0 || ethPublicKeys.length > 0 || mnemonic ? "Clear All Wallets" : "Back"}
              </button>
            </div>

            <div className="mb-6 bg-gray-800 p-6 rounded-xl shadow-lg">
              <label className="font-bold block mb-3 text-xl flex items-center">
                <span className="text-2xl mr-2">🔐</span> Secret Recovery Phrase:
              </label>
              <textarea
                value={mnemonic}
                disabled={isLocked}
                onChange={(e) => { 
                  const value = e.target.value;
                  setMnemonic(value);
                  const words = value.trim().split(/\s+/);
                  if (words.length >= 12) {
                    setIsLocked(true);
                  }
                }}
                placeholder='Enter your secret phrase (or leave blank to generate)'
                rows={4} 
                className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              { mnemonic &&
                 <button
                        onClick={() => handleCopy(mnemonic, "Mnemonic")}
                        className="px-2 py-1 my-1 bg-transparent font-semibold  hover:bg-purple-500 text-gray-200 rounded-lg transition-colors flex-1 flex items-center justify-center">
                        <span className="mr-1">📋</span> Copy
                      </button>
}
              {!isLocked && (
                <div className="text-center mt-4">
                  <button
                    onClick={generateSeed}
                    disabled={isGenerating}
                    className={`px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:shadow-md hover:shadow-amber-500/50 transition-all duration-300 text-lg flex items-center mx-auto ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}>
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🔁</span> Generate Wallet
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {mnemonic && (
              <div className="mb-6 text-center">
                {selectedChain === 'solana' ? (
                  <button
                    onClick={addSolanaWallet}
                    disabled={isGenerating}
                    className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white rounded-lg hover:shadow-md hover:shadow-indigo-500/50 transition-all duration-300 text-lg flex items-center mx-auto ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}>
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">➕</span> Add Solana Wallet
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={addEthWallet}
                    disabled={isGenerating}
                    className={`px-6 py-3 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg hover:shadow-md hover:shadow-green-500/50 transition-all duration-300 text-lg flex items-center mx-auto ${isGenerating ? 'opacity-70 cursor-wait' : ''}`}>
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">➕</span> Add Ethereum Wallet
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="mb-6 text-center">
                <p className="text-red-400 bg-red-900/30 py-3 px-4 rounded-lg inline-flex items-center">
                  <span className="text-xl mr-2">⚠️</span> {error}
                </p>
              </div>
            )}

            {copySuccess && (
              <div className="fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg animate-fade-in-out">
                {copySuccess}
              </div>
            )}

            <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
              {selectedChain === 'solana' &&
                publicKeys.map((keyPair, i) => (
                  <div key={i} className="bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-indigo-500/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-xl mr-2">💼</span>
                      <h4 className="text-lg font-medium">Wallet #{i+1}</h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-400 mb-1">Public Key:</p>
                      <p className="font-mono bg-gray-700 p-2 rounded text-sm break-all">
                        {keyPair.publicKey}
                      </p>
                    </div>
                 <div className="mb-4">
  <p className="text-sm text-gray-400 mb-1">Private Key:</p>
  <p className="font-mono bg-gray-700 p-2 rounded text-sm break-all">
    {keyPair.privateKey.slice(0, 12)}{`*`.repeat(keyPair.privateKey.length - 12)}
  </p>
</div>

                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleCopy(keyPair.publicKey, "Public key")}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex-1 flex items-center justify-center">
                        <span className="mr-1">📋</span> Copy Public
                      </button>
                      <button
                        onClick={() => handleCopy(keyPair.privateKey, "Private key")}
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex-1 flex items-center justify-center">
                        <span className="mr-1">🔑</span> Copy Private
                      </button>
                      <button
                        onClick={() =>
                          setPublicKeys(publicKeys.filter((_, index) => index !== i))
                        }
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center justify-center">
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                ))}

              {selectedChain === 'ethereum' &&
                ethPublicKeys.map((wallet, i) => (
                  <div key={i} className="bg-gray-800 p-5 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-green-500/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-xl mr-2">💼</span>
                      <h4 className="text-lg font-medium">Wallet #{i+1}</h4>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-400 mb-1">Address:</p>
                      <p className="font-mono bg-gray-700 p-2 rounded text-sm break-all">
                        {wallet.address}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-1">Private Key:</p>
                      <p className="font-mono bg-gray-700 p-2 rounded text-sm break-all">
                         {wallet.privateKey.slice(0, 12)}{`*`.repeat(wallet.privateKey.length - 12)}
                      </p>
                    </div>

                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleCopy(wallet.address, "Address")}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex-1 flex items-center justify-center">
                        <span className="mr-1">📋</span> Copy Address
                      </button>
                      <button
                        onClick={() => handleCopy(wallet.privateKey, "Private key")}
                        className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex-1 flex items-center justify-center">
                        <span className="mr-1">🔑</span> Copy Private
                      </button>
                      <button
                        onClick={() =>
                          setEthPublicKeys(ethPublicKeys.filter((_, index) => index !== i))
                        }
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center justify-center">
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletGenerator;

/* Add this to your CSS for the animation */
