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
        src="https://3000-i5y6m9vzimd3ehzroagva-4966348d.sg1.manus.computer/"
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
