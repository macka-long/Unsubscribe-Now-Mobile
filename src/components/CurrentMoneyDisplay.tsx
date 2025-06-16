import React, { useState } from 'react';
import { useMoneyStore } from '../store/moneyStore';

const CurrentMoneyDisplay: React.FC = () => {
  const money = useMoneyStore((state) => state.money);
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      style={{
        margin: '1rem 0',
        padding: '0.5rem',
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'bold',
        width: 'fit-content',
        minWidth: '240px',
        opacity: isActive ? 1 : 0.4,
        transition: 'opacity 0.3s ease-in-out',
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ letterSpacing: '0.3em', fontSize: '1rem', marginBottom: '0.25rem', fontFamily: "MyFont" }}>現在の所持金</span>
        <div style={{ alignSelf: 'flex-end' }}>
          <span style={{ letterSpacing: '0.3em', fontSize: '1.5rem', color: 'red', fontFamily: "MyFont" }}>
            {money.toLocaleString()}円
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentMoneyDisplay;