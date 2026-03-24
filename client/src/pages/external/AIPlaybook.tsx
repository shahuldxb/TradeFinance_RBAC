import { FC } from 'react';

const VesselTracking: FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 'calc(100vh - 64px)', // adjust if header height differs
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <iframe
        src="https://f63e1783-3c91-4f04-b0e1-0fc522d55343-00-aiydfa2kqhu1.spock.replit.dev/"
        title="Vessel Tracking"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="fullscreen; clipboard-read; clipboard-write"
      />
    </div>
  );
};

export default VesselTracking;
