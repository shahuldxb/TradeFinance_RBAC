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
        src="https://disclearn-jejcyadh.manus.space/"
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
