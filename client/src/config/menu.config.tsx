import { type TMenuConfig } from '@/components/menu';

export const MENU_SIDEBAR: TMenuConfig = [
  
  {
    id: 'Document_management_system',
    title: 'Document Management System',
    icon: 'profile-circle',
    children: [
      {
        id: 'ocr_factory',
        title: 'OCR Factory',
        icon: 'briefcase',
        children: [
          {
            title: 'Dashboard',
            path: '/tf_genie/discrepancy/dashboard',
          },
          {
            title: 'Create Sessions',
            path: '/tf_genie/discrepancy/create-session',
          },
          {
            title: 'Sessions',
            path: '/tf_genie/discrepancy/ocr-factory',
          }
        ]
      },
      {
        title: 'Image BOX',
        path: '/magic-box',
      },
      {
        title: 'Paddle OCR',
        path: '/paddleocr',
      },

    ]
  },
  {
    id: 'Prompt_management',
    title: 'Prompt Management',
    icon: 'profile-circle',
    children: [
      {
        title: 'Prompt Management',
        path: '/framework/prompt-management',
      },
    ]
  },
  {
    id: 'MOC_Mapping',
    title: 'MOC Mapping',
    icon: 'profile-circle',
    children: [
      {
        title: 'MOC Mapping',
        path: '/MOC_Mapping',
      }
    ]
  },
  {
    id: 'Pre Issuance',
    title: 'Pre Issuance',
    icon: 'profile-circle',
    children: [
      {
        title: '46A',
        path: '/form/46A',
      },

      {
        title: 'Sanction ',
        path: '/sanction',
      },
      {
        title: 'Do Not Deal',
        path: '/GoodsMatcher',
      },
      {
        title: 'Vessel Tracking',
        path: '/vessel-tracking-app',
      },
    ]
  },
  {
    id: 'TBML',
    title: 'TBML Management',
    icon: 'shield-cross',
    children: [
      {
        title: 'Trade Based Money Laundering',
        path: '/TBML_Detector',
      },

      {
        title: 'Preshipment Analysis',
        path: '/TBML',

      }]

  },

  {
    id: 'Discrepancy Learning',
    title: 'Discrepancy Learning',
    icon: 'bill',
    children: [
      {
        title: 'Discrepancy Learning',
        path: '/discrepancy_learning_system',
      },
    ]
  },

  {
    id: 'letter_of_credit',
    title: 'Letter of Credit',
    icon: 'questionnaire-tablet',
    children: [
      {
        id: 'ilc-cross-doc',
        title: 'ILC',
        instrument: 'ILC',

        children: [
          {
            id: 'ilc-cross-doc',
            title: 'Cross Document Check',
            path: '/cross_doc_check/ILC',
            instrument: 'ILC',
           
          },
          {
            id: 'ilc-amendment',
            title: 'Amendment Verification',
            path: '/AmendmentVerification/ILC',
            instrument: 'ILC',
           
          },
          {
            id: 'ilc-discrepancy',
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/ILC',
            instrument: 'ILC',
           
          },
          {
            id: 'ilc-discrepancy-table',
            title: 'Discrepancy Table',
            path: '/discrepancytable/ILC',
            instrument: 'ILC',
           
          }
        ]
      },
      {
        id: 'ELC',
        title: 'ELC',
        icon: 'element-11',
        instrument: 'ELC',
       
        children: [
          {
            id: 'elc-cross-doc',
            title: 'Cross Document Check',
            path: '/cross_doc_check/ELC',
            instrument: 'ELC',
            
          },
          {
            id: 'elc-amendment',
            title: 'Amendment Verification',
            path: '/AmendmentVerification/ELC',
            instrument: 'ELC',
            
          },
          {
            id: 'elc-discrepancy',
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/ELC',
            instrument: 'ELC',
            
          },
          {
            id: 'elc-discrepancy-table',
            title: 'Discrepancy Table',
            path: '/discrepancytable/ELC',
            instrument: 'ELC',
            
          }
        ]
      },
    ]
  },

  {
    id: 'letter_of_Credit_specialize',
    title: 'Special Letter of Credit',
    icon: 'questionnaire-tablet',
    children: [
      {
        id: 'TLC',
        title: 'TLC',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/TLC',
            instrument: "TLC"
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/TLC',
            instrument: 'TLC'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/TLC',
            instrument: 'TLC'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/TLC',
            instrument: 'TLC'
          }
        ]
      },
      {
        id: 'BBLC',
        title: 'BBLC',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/BBLC',
            instrument: 'BBLC'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/BBLC',
            instrument: 'BBLC'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/BBLC',
            instrument: 'BBLC'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/BBLC',
            instrument: 'BBLC'
          }
        ]
      },
      {
        id: 'RLC',
        title: 'RLC',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/RLC',
            instrument: 'RLC'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/RLC',
            instrument: 'RLC'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/RLC',
            instrument: 'RLC'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/RLC',
            instrument: 'RLC'
          }
        ]
      },
      {
        id: 'SBLC',
        title: 'SBLC',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/SBLC',
            instrument: 'SBLC'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/SBLC',
            instrument: "SBLC"
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/SBLC',
            instrument: 'SBLC'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/SBLC',
            instrument: 'SBLC'
          }
        ]
      }
    ]
  },

  {
    id: 'Bill_of_collections',
    title: 'Bill of Collections',
    icon: 'questionnaire-tablet',
    children: [
      {
        id: 'Import_bill_of_collection',
        title: 'Import Bill of Collection',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/IBC',
            instrument: 'IBC'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/IBC',
            instrument: 'IBC'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/IBC',
            instrument: 'IBC'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/IBC',
            instrument: 'IBC'
          }
        ]
      },
      {
        id: 'Export_bill_of_collection',
        title: 'Export Bill of Collection',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/EBC',
            instrument: 'EBC'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/EBC',
            instrument: 'EBC'

          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/EBC',
            instrument: 'EBC'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/EBC',
            instrument: 'EBC'
          }
        ]
      }
    ]
  },

  {
    id: 'Guarantee',
    title: 'Guarantee',
    icon: 'questionnaire-tablet',
    children: [
      {
        id: 'Advance_payment_guarantee',
        title: 'Advance Payment Guarantee',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/APG',
            instrument: 'APG'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/APG',
            instrument: 'APG'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/APG',
            instrument: 'APG'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/APG',
            instrument: 'APG'
          }
        ]
      },
      {
        id: 'performance_guarantee',
        title: 'Performance Guarantee',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/PG',
            instrument: 'AG'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/PG',
            instrument: 'PG'

          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/PG',
            instrument: 'PG'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/PG',
            instrument: 'PG'
          }
        ]
      },
      {
        id: 'Bank_guarantee',
        title: 'Bank Guarantee',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/BG',
            instrument: 'BG'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/BG',
            instrument: 'BG'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/BG',
            instrument: 'BG'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/BG',
            instrument: 'BG'
          }
        ]
      },
      {
        id: 'Retention_guarantee',
        title: 'Retention Guarantee',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/RG',
            instrument: 'RG'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/RG',
            instrument: "RG"
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/RG',
            instrument: 'RG'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/RG',
            instrument: 'RG'
          }
        ]
      },
      {
        id: 'Shipping Guarantee',
        title: 'Shipping Guarantee',
        icon: 'element-11',
        children: [
          {
            title: 'Cross Document Check',
            path: '/cross_doc_check/SG',
            instrument: 'SG'
          },
          {
            title: 'Amendment Verification',
            path: '/AmendmentVerification/SG',
            instrument: 'SG'
          },
          {
            title: 'Discrepancy Management',
            path: '/discrepancymanagement/SG',
            instrument: 'SG'
          },
          {
            title: 'Discrepancy Table',
            path: '/discrepancytable/SG',
            instrument: 'SG'
          }
        ]
      }
    ]
  },
  {
    id: 'MTManagement',
    title: 'MT Management',
    icon: 'abstract-44',
    children: [
        {
        title: 'MT Generator',
        path: '/MTConverter',
       
      },
      {
        title: 'MT Validator',
        path: '/MTValidator',
        
      }
    ]
  },
  {
    id: 'Cure_Management',
    title: 'Cure Management',
    asset_key: 'MTConverter',
    icon: 'abstract-44',
    children: [
      {
        title: 'Cure Management',
        path: '/cure',
       
      },
      {
        title: 'Cure Table',
        path: '/curetable',
      },
    ]
  },
  
  
  {
    id: 'Trade_Finance_Standards',
    title: 'Trade Finance Standards',
    icon: 'bill',
    children: [
      {
        title: 'Trade Finance Standards',
        path: '/trade-finance-standards',
      },
      {
        title: 'Standards Ingestion',
        path: '/standards-ingestion',
      },
      {
        title: 'Standards Ingestion CRUD',
        path: '/standards-ingestion/crud',
      },
    ]
  },
  
  {
    id: 'Knowledge_Base_Management',
    title: 'Knowledge Base Management',
    icon: 'bill',
    children: [
      {
        title: 'Trade Knowledge Base',
        path: '/Knowledge_Base_Management',
      },
    ]
  },


  {
    id: 'MLC Validation',
    title: 'MLC Lifecycle',
    icon: 'verify',
    path: '/mlc/home',
  }


];

export const MENU_MEGA: TMenuConfig = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Profiles',
    children: [
      {
        title: 'Profiles',
        children: [
          {
            children: [
              {
                title: 'Default',
                icon: 'badge',
                path: '/public-profile/profiles/default'
              },
              {
                title: 'Creator',
                icon: 'coffee',
                path: '/public-profile/profiles/creator'
              },
              {
                title: 'Company',
                icon: 'abstract-41',
                path: '/public-profile/profiles/company'
              },
              {
                title: 'NFT',
                icon: 'bitcoin',
                path: '/public-profile/profiles/nft'
              },
              {
                title: 'Blogger',
                icon: 'message-text',
                path: '/public-profile/profiles/blogger'
              },
              {
                title: 'CRM',
                icon: 'devices',
                path: '/public-profile/profiles/crm'
              },
              {
                title: 'Gamer',
                icon: 'ghost',
                path: '/public-profile/profiles/gamer'
              }
            ]
          },
          {
            children: [
              {
                title: 'Feeds',
                icon: 'book',
                path: '/public-profile/profiles/feeds'
              },
              {
                title: 'Plain',
                icon: 'files',
                path: '/public-profile/profiles/plain'
              },
              {
                title: 'Modal',
                icon: 'mouse-square',
                path: '/public-profile/profiles/modal'
              },
              {
                title: 'Freelancer',
                icon: 'financial-schedule',
                path: '#',
                disabled: true
              },
              {
                title: 'Developer',
                icon: 'technology-4',
                path: '#',
                disabled: true
              },
              {
                title: 'Team',
                icon: 'users',
                path: '#',
                disabled: true
              },
              {
                title: 'Events',
                icon: 'calendar-tick',
                path: '#',
                disabled: true
              }
            ]
          }
        ]
      },
      {
        title: 'Other Pages',
        children: [
          {
            children: [
              {
                title: 'Projects - 3 Columns',
                icon: 'element-6',
                path: '/public-profile/projects/3-columns'
              },
              {
                title: 'Projects - 2 Columns',
                icon: 'element-4',
                path: '/public-profile/projects/2-columns'
              },
              {
                title: 'Works',
                icon: 'office-bag',
                path: '/public-profile/works'
              },
              {
                title: 'Teams',
                icon: 'people',
                path: '/public-profile/teams'
              },
              {
                title: 'Network',
                icon: 'icon',
                path: '/public-profile/network'
              },
              {
                title: 'Activity',
                icon: 'chart-line-up-2',
                path: '/public-profile/activity'
              },
              {
                title: 'Campaigns - Card',
                icon: 'element-11',
                path: '/public-profile/campaigns/card'
              }
            ]
          },
          {
            children: [
              {
                title: 'Campaigns - List',
                icon: 'kanban',
                path: '/public-profile/campaigns/list'
              },
              {
                title: 'Empty',
                icon: 'file-sheet',
                path: '/public-profile/empty'
              },
              {
                title: 'Documents',
                icon: 'document',
                path: '#',
                disabled: true
              },
              {
                title: 'Badges',
                icon: 'award',
                path: '#',
                disabled: true
              },
              {
                title: 'Awards',
                icon: 'gift',
                path: '#',
                disabled: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'My Account',
    children: [
      {
        title: 'General Pages',
        children: [
          { title: 'Integrations', icon: 'technology-2', path: '/account/integrations' },
          { title: 'Notifications', icon: 'notification-1', path: '/account/notifications' },
          { title: 'API Keys', icon: 'key', path: '/account/api-keys' },
          { title: 'Appearance', icon: 'eye', path: '/account/appearance' },
          { title: 'Invite a Friend', icon: 'user-tick', path: '/account/invite-a-friend' },
          { title: 'Activity', icon: 'support', path: '/account/activity' },
          { title: 'Brand', icon: 'verify', disabled: true },
          { title: 'Get Paid', icon: 'euro', disabled: true }
        ]
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'Account Home',
            children: [
              { title: 'Get Started + ', path: '/account/home/get-started' },
              { title: 'User Profile', path: '/account/home/user-profile' },
              { title: 'Company Profile', path: '/account/home/company-profile' },
              { title: 'With Sidebar', path: '/account/home/settings-sidebar' },
              { title: 'Enterprise', path: '/account/home/settings-enterprise' },
              { title: 'Plain', path: '/account/home/settings-plain' },
              { title: 'Modal', path: '/account/home/settings-modal' }
            ]
          },
          {
            title: 'Billing',
            children: [
              { title: 'Basic Billing', path: '/account/billing/basic' },
              { title: 'Enterprise', path: '/account/billing/enterprise' },
              { title: 'Plans', path: '/account/billing/plans' },
              { title: 'Billing History', path: '/account/billing/history' },
              { title: 'Tax Info', disabled: true },
              { title: 'Invoices', disabled: true },
              { title: 'Gateaways', disabled: true }
            ]
          },
          {
            title: 'Security',
            children: [
              { title: 'Get Started', path: '/account/security/get-started' },
              { title: 'Security Overview', path: '/account/security/overview' },
              { title: 'IP Addresses', path: '/account/security/allowed-ip-addresses' },
              { title: 'Privacy Settings', path: '/account/security/privacy-settings' },
              { title: 'Device Management', path: '/account/security/device-management' },
              { title: 'Backup & Recovery', path: '/account/security/backup-and-recovery' },
              { title: 'Current Sessions', path: '/account/security/current-sessions' },
              { title: 'Security Log', path: '/account/security/security-log' }
            ]
          },
          {
            title: 'Members & Roles',
            children: [
              { title: 'Teams Starter', path: '/account/members/team-starter' },
              { title: 'Teams', path: '/account/members/teams' },
              { title: 'Team Info', path: '/account/members/team-info' },
              { title: 'Members Starter', path: '/account/members/members-starter' },
              { title: 'Team Members', path: '/account/members/team-members' },
              { title: 'Import Members', path: '/account/members/import-members' },
              { title: 'Roles', path: '/account/members/roles' },
              { title: 'Permissions - Toggler', path: '/account/members/permissions-toggle' },
              { title: 'Permissions - Check', path: '/account/members/permissions-check' }
            ]
          },
          {
            title: 'Other Pages',
            children: [
              { title: 'Integrations', path: '/account/integrations' },
              { title: 'Notifications', path: '/account/notifications' },
              { title: 'API Keys', path: '/account/api-keys' },
              { title: 'Appearance', path: '/account/appearance' },
              { title: 'Invite a Friend', path: '/account/invite-a-friend' },
              { title: 'Activity', path: '/account/activity' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Network',
    children: [
      {
        title: 'General Pages',
        children: [
          { title: 'Get Started', icon: 'flag', path: '/network/get-started' },
          { title: 'Colleagues', icon: 'users', path: '#', disabled: true },
          { title: 'Donators', icon: 'heart', path: '#', disabled: true },
          { title: 'Leads', icon: 'abstract-21', path: '#', disabled: true }
        ]
      },
      {
        title: 'Other pages',
        children: [
          {
            title: 'User Cards',
            children: [
              { title: 'Mini Cards', path: '/network/user-cards/mini-cards' },
              { title: 'Team Members', path: '/network/user-cards/team-crew' },
              { title: 'Authors', path: '/network/user-cards/author' },
              { title: 'NFT Users', path: '/network/user-cards/nft' },
              { title: 'Social Users', path: '/network/user-cards/social' },
              { title: 'Gamers', path: '#', disabled: true }
            ]
          },
          {
            title: 'User Base',
            badge: 'Datatables',
            children: [
              { title: 'Team Crew', path: '/network/user-table/team-crew' },
              { title: 'App Roster', path: '/network/user-table/app-roster' },
              { title: 'Market Authors', path: '/network/user-table/market-authors' },
              { title: 'SaaS Users', path: '/network/user-table/saas-users' },
              { title: 'Store Clients', path: '/network/user-table/store-clients' },
              { title: 'Visitors', path: '/network/user-table/visitors' }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Authentication',
    children: [
      {
        title: 'General pages',
        children: [
          {
            title: 'Classic Layout',
            children: [
              { title: 'Sign In', path: '/auth/classic/login' },
              { title: 'Sign Up', path: '/auth/classic/signup' },
              { title: '2FA', path: '/auth/classic/2fa' },
              { title: 'Check Email', path: '/auth/classic/check-email' },
              {
                title: 'Reset Password',
                children: [
                  {
                    title: 'Enter Email',
                    path: '/auth/classic/reset-password/enter-email'
                  },
                  {
                    title: 'Check Email',
                    path: '/auth/classic/reset-password/check-email'
                  },
                  {
                    title: 'Change Password',
                    path: '/auth/classic/reset-password/change'
                  },
                  {
                    title: 'Password is Changed',
                    path: '/auth/classic/reset-password/changed'
                  }
                ]
              }
            ]
          },
          {
            title: 'Branded Layout',
            children: [
              { title: 'Sign In', path: '/auth/login' },
              { title: 'Sign Up', path: '/auth/signup' },
              { title: '2FA', path: '/auth/2fa' },
              { title: 'Check Email', path: '/auth/check-email' },
              {
                title: 'Reset Password',
                children: [
                  {
                    title: 'Enter Email',
                    path: '/auth/reset-password/enter-email'
                  },
                  {
                    title: 'Check Email',
                    path: '/auth/reset-password/check-email'
                  },
                  {
                    title: 'Change Password',
                    path: '/auth/reset-password/change'
                  },
                  {
                    title: 'Password is Changed',
                    path: '/auth/reset-password/changed'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'Other Pages',
        children: [
          { title: 'Welcome Message', icon: 'like-2', path: '/auth/welcome-message' },
          {
            title: 'Account Deactivated',
            icon: 'shield-cross',
            path: '/auth/account-deactivated'
          },
          { title: 'Error 404', icon: 'message-question', path: '/error/404' },
          { title: 'Error 500', icon: 'information', path: '/error/500' }
        ]
      }
    ]
  },
  {
    title: 'Help',
    children: [
      {
        title: 'Getting Started',
        icon: 'coffee',
        path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/installation'
      },
      {
        title: 'Support Forum',
        icon: 'information',
        children: [
          {
            title: 'All Questions',
            icon: 'questionnaire-tablet',
            path: 'https://devs.keenthemes.com'
          },
          {
            title: 'Popular Questions',
            icon: 'star',
            path: 'https://devs.keenthemes.com/popular'
          },
          {
            title: 'Ask Question',
            icon: 'message-question',
            path: 'https://devs.keenthemes.com/question/create'
          }
        ]
      },
      {
        title: 'Licenses & FAQ',
        tooltip: {
          title: 'Learn more about licenses',
          placement: 'right'
        },
        icon: 'subtitle',
        path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/license'
      },
      {
        title: 'Documentation',
        icon: 'questionnaire-tablet',
        path: 'https://keenthemes.com/metronic/tailwind/docs'
      },
      { separator: true },
      {
        title: 'Contact Us',
        icon: 'share',
        path: 'https://keenthemes.com/contact'
      }
    ]
  }
];

export const MENU_ROOT: TMenuConfig = [
  {
    title: 'Public Profile',
    icon: 'profile-circle',
    rootPath: '/public-profile/',
    path: 'public-profile/profiles/default',
    childrenIndex: 2
  },
  {
    title: 'Account',
    icon: 'setting-2',
    rootPath: '/account/',
    path: '/',
    childrenIndex: 3
  },
  {
    title: 'Network',
    icon: 'users',
    rootPath: '/network/',
    path: 'network/get-started',
    childrenIndex: 4
  },
  {
    title: 'Authentication',
    icon: 'security-user',
    rootPath: '/authentication/',
    path: 'authentication/get-started',
    childrenIndex: 5
  }
];
