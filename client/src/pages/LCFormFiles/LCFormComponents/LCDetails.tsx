import React,{useEffect,useState} from 'react';
interface LCDetailsProps {
  lcNumber: string;
  onChangeLCNumber: (value: string) => void;
  errors: any;
}
const LCDetails: React.FC<LCDetailsProps> = ({
  lcNumber,
  onChangeLCNumber,
  errors,
}) => {
  const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
    useEffect(() => {
      const loadDemoMode = async () => {
        try {
          const res = await fetch('/api/lc/control/demo-mode');
          const data = await res.json();
          console.log('demo', data);
          setDemoMode(data.demomode === 'Y' ? 'Y' : 'N');
        } catch (err) {
          console.error('Failed to load demo mode', err);
          setDemoMode('N'); // safe default
        }
      };
  
      loadDemoMode();
    }, []);
  return (
    <div className="card pb-2.5">
      <div className="card-header p-2" id="LCDetails">
        <h3 className="card-title text-md md:text-lg">LC Details</h3>
      </div>
      <div className="md:card-body p-2 grid gap-5">
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap">
            <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
              LC/LG Number:<span className="text-danger text-xl">*</span>
            </label>
            <input
              className="input"
              type="text"
              placeholder="Enter LC/LG Number"
              value={lcNumber}
              maxLength={16}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '');
                onChangeLCNumber(value);
              }}
              readOnly
            />
          </div>
          <div className="flex items-baseline flex-wrap lg:flex-nowrap">
            <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md"></label>
            {errors.lcNumber && <p className="text-danger text-xs mt-1">{errors.lcNumber}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LCDetails;
