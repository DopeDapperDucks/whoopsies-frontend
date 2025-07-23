
import React, { useState } from 'react';
import { ethers } from 'ethers';
import whoopsiesImg from './whoopsies-character.png';

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [betAmount, setBetAmount] = useState(0.01);
  const [isRunning, setIsRunning] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [hasCashedOut, setHasCashedOut] = useState(false);

  const connectWallet = async () => {
    alert("Wallet connection temporarily disabled (Abstract SDK removed)");
    setWalletConnected(true);
  };

  const startRun = async () => {
    setIsRunning(true);
    setHasCashedOut(false);
    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const newMult = prev + 0.01;
        if (newMult >= 5.0) clearInterval(interval);
        return newMult;
      });
    }, 100);
    setTimeout(() => {
      if (!hasCashedOut) {
        setIsRunning(false);
        alert('Whoopsie! You lost.');
        setMultiplier(1.0);
      }
    }, Math.random() * 10000 + 5000);
  };

  const cashOut = () => {
    setHasCashedOut(true);
    setIsRunning(false);
    alert(`You won! Multiplier: ${multiplier.toFixed(2)}x`);
    setMultiplier(1.0);
  };

  return (
    <div style={{ minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>WHOOPSIES</h1>
      <p style={{ marginBottom: '1.5rem' }}>Bet big. Run fast. Don’t slip up.</p>

      {!walletConnected ? (
        <button style={{ backgroundColor: '#22c55e', padding: '0.5rem 1rem', borderRadius: '0.5rem' }} onClick={connectWallet}>
          Connect Wallet (Disabled)
        </button>
      ) : (
        <>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.5rem', maxWidth: '300px', marginBottom: '1rem', width: '100%' }}>
            <label>Bet Amount (ETH)</label>
            <input
              type="number"
              value={betAmount}
              min="0.001"
              step="0.001"
              onChange={(e) => setBetAmount(parseFloat(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', marginTop: '0.5rem' }}
            />
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <img src={whoopsiesImg} alt="Runner" className="character-img" />
            <p style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Multiplier: {multiplier.toFixed(2)}x</p>
          </div>

          {!isRunning ? (
            <button style={{ backgroundColor: '#2563eb', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontSize: '1.25rem' }} onClick={startRun}>
              Start Run
            </button>
          ) : (
            <button style={{ backgroundColor: '#dc2626', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontSize: '1.25rem' }} onClick={cashOut}>
              CASH OUT
            </button>
          )}
        </>
      )}

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>🏆 Leaderboard (Coming Soon)</h2>
      </div>
    </div>
  );
}
