import { IScrollspyMenuItems, ScrollspyMenu } from '@/partials/menu';

const AccountSettingsSidebar = () => {
  const items: IScrollspyMenuItems = [
   
       {
      title: 'TBML segments',
      children: [
        // {
        //   title: 'Connection',
        //   target: 'CheckConnection',
        //   active: true
        // },
        {
          title: 'TBML',
          target: 'TBML',
          
        },
        {
          title: 'High Risk Entity Entry',
          target: 'ManualEntry'
        },
        {
          title: 'Controlled Goods Entry',
          target: 'ControlledGoodsEntry'
        },
        // {
        //   title: 'Retrieve Past Screening',
        //   target: 'RetrivePastScreening'
        // },
       
      ]
    }
  ];

  return <ScrollspyMenu items={items} />;
};


export default AccountSettingsSidebar;