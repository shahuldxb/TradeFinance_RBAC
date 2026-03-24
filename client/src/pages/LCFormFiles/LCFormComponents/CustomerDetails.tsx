import React, { useState, useRef} from 'react';
type CustomerDetailsProps = {
  customerId: string;
  customerName: string;
  onChange: (field: 'customerId' | 'customerName', value: string) => void;
  errors: any;
  setCustomerName: any;
  accountName?: string;
  accountNumber?: string;
  setAccountName?: any;
  setAccountNumber?: any;
};
const CustomerDetails = ({
  customerId,
  customerName,
  onChange,
  errors,
  setCustomerName,
  accountName,
  accountNumber,
  setAccountName,
  setAccountNumber
}: CustomerDetailsProps) => {
  const timerRef = useRef<any>(null);
  const [customerNotFound, setCustomerNotFound] = useState('');

  const resetCustomerDetails = () => {
    setCustomerName('');
    setAccountName('');
    setAccountNumber('');
  };


  return (
    <div className="card pb-2.5">
      <div className="card-header p-2" id="CustomerDetails">
        <h3 className="card-title text-md md:text-lg">Customer Details</h3>
      </div>
      <div className="md:card-body p-2 grid gap-5">
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap ">
            <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
              Customer ID:<span className="text-danger text-xl">*</span>
            </label>
            <input
              className="input"
              type="text"
              placeholder="Enter the Customer ID"
              value={customerId}
              readOnly
              onChange={(e) => {
                const value = e.target.value;
                onChange('customerId', value);
                setCustomerNotFound('');
                if (value.trim() === '') {
                  resetCustomerDetails();
                  return;
                }
                clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                }, 600);
              }}
            />
          </div>
          <div className="flex items-baseline flex-wrap lg:flex-nowrap ">
            {customerNotFound && (
              <>
                <label className="form-label flex items-center gap-1 max-w-40 text-md"></label>{' '}
                <p className="text-danger text-xs mt-1">{customerNotFound}</p>
              </>
            )}
          </div>
        </div>
          <>
            <div className="w-full">
              <div className="flex items-baseline flex-wrap lg:flex-nowrap">
                <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
                  Customer Name:<span className="text-danger text-xl">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter the Customer Number"
                  value={customerName}
                  onChange={(e) => onChange('customerName', e.target.value)}
                  readOnly
                />
              </div>
              <div className="flex items-baseline flex-wrap lg:flex-nowrap ">
                <label className="form-label flex items-center gap-1 max-w-40 text-md"></label>
                {errors.customerName && (
                  <p className="text-danger text-xs mt-1">{errors.customerName}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-baseline flex-wrap lg:flex-nowrap">
                <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
                  Account Name:<span className="text-danger text-xl">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter the Customer Number"
                  value={accountName}
                  readOnly
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-baseline flex-wrap lg:flex-nowrap">
                <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
                  Account Number:<span className="text-danger text-xl">*</span>
                </label>
                <input
                  className="input"
                  type="text"
                  placeholder="Enter the Customer Number"
                  value={accountNumber}
                  readOnly
                />
              </div>
            </div>
          </>
      </div>
    </div>
  );
};

export default CustomerDetails;


