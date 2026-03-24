import { IScrollspyMenuItems, ScrollspyMenu } from '@/partials/menu';
type Props = {
  isIssuance: boolean;
};
const AccountSettingsSidebar = ({ isIssuance }: Props) => {
  const items: IScrollspyMenuItems = [
    {
      title: 'Find Discrepancy',
      children: [
        {
          title: 'Customer Details',
          target: 'CustomerDetails',
          active:true
        },
        {
          title: 'LC Details',
          target: 'LCDetails'
        },
        {
          title: 'Instrument and LifeCycle',
          target: 'InstrumentLifeCycle'
        },
        {
          title: 'Prompts',
          target: 'prompts'
        },
         ...(isIssuance
          ? [
              {
                title: 'LC Document',
                target: 'LCDocument'
              },
              {
                title: 'Sub LC Documents',
                target: 'SubLCdocuments'
              }
            ]
          : []),
          {
          title: 'AnalysisResult',
          target: 'AnalysisResult'
        },
      ]
    }
  ];

  return <ScrollspyMenu items={items} />;
};

export { AccountSettingsSidebar };
