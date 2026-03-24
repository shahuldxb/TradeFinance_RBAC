import { IScrollspyMenuItems, ScrollspyMenu } from '@/partials/menu';

const AccountSettingsSidebar = () => {
  const items: IScrollspyMenuItems = [
   
       {
      title: 'Sanction segments',
      children: [
        // {
        //   title: 'Connection',
        //   target: 'CheckConnection',
        //   active: true
        // },
        {
          title: 'Sanction',
          target: 'Sanction',
          
        },
        {
          title: 'Manual Entry',
          target: 'ManualEntry'
        },
        {
          title: 'Retrieve Past Screening',
          target: 'RetrivePastScreening'
        },
       
      ]
    }
  ];

  return <ScrollspyMenu items={items} />;
};


export default AccountSettingsSidebar;