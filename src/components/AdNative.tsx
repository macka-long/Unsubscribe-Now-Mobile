import React from 'react';
import { NativeAdData } from '../plugins/NativeAd';

const AdNative: React.FC<NativeAdData> = ({ headline, body, advertiser, callToAction }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#fefefe',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        {headline}
      </div>
      {body && <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>{body}</div>}
      {advertiser && (
        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
          提供：{advertiser}
        </div>
      )}
      {callToAction && (
        <button
          style={{
            backgroundColor: '#f9a825',
            color: '#000',
            padding: '0.5rem 1rem',
            fontWeight: 'bold',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {callToAction}
        </button>
      )}
    </div>
  );
};

export default AdNative;
