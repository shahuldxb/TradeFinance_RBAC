import { useResponsive, useScrollPosition } from '@/hooks';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Scrollspy } from '@/components/scrollspy/Scrollspy';
// import { AccountSettingsSidebar } from '@/pages/account/home/settings-sidebar';
import { useLayout } from '@/providers';

import AccountSettingsSidebar from './AccountSettingsSidebar';
import Sanction from './SanctionComponents/Sanction';

import { CheckConnection } from './SanctionComponents/CheckConnection';

import ManualEntry from './SanctionComponents/ManualEntry';
import RetrivePastScreening from './SanctionComponents/RetrivePastScreening';
import { Container } from '@/components';


// import { AccountSettingsSidebar } from './AccountSettingsSidebar';

const stickySidebarClasses: Record<string, string> = {
  'demo1-layout': 'top-[calc(var(--tw-header-height)+1rem)]',
  'demo2-layout': 'top-[calc(var(--tw-header-height)+1rem)]',
  'demo3-layout': 'top-[calc(var(--tw-header-height)+var(--tw-navbar-height)+1rem)]',
  'demo4-layout': 'top-[3rem]',
  'demo5-layout': 'top-[calc(var(--tw-header-height)+1.5rem)]',
  'demo6-layout': 'top-[3rem]',
  'demo7-layout': 'top-[calc(var(--tw-header-height)+1rem)]',
  'demo8-layout': 'top-[3rem]',
  'demo9-layout': 'top-[calc(var(--tw-header-height)+1rem)]',
  'demo10-layout': 'top-[1.5rem]'
};

const AccountSettingsSidebarContent = () => {
  const desktopMode = useResponsive('up', 'lg');
  const { currentLayout } = useLayout();
  const [sidebarSticky, setSidebarSticky] = useState(false);

  // Initialize ref for parentEl
  const parentRef = useRef<HTMLElement | Document>(document); // Default to document
  const scrollPosition = useScrollPosition({ targetRef: parentRef });

  // Effect to update parentRef after the component mounts
  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) {
      parentRef.current = scrollableElement;
    }
  }, []); // Run only once on component mount

  // Handle scroll position and sidebar stickiness
  useEffect(() => {
    setSidebarSticky(scrollPosition > 100);
  }, [scrollPosition, currentLayout?.options]);

  // Get the sticky class based on the current layout, provide a default if not found
  const stickyClass = currentLayout?.name
    ? stickySidebarClasses[currentLayout.name] || 'top-[calc(var(--tw-header-height)+1rem)]'
    : 'top-[calc(var(--tw-header-height)+1rem)]';

  return (
    <div className="w-full p-6 space-y-6 card ">
      <div className="flex grow gap-5 lg:gap-7.5">
      {desktopMode && (
        <div className="w-[230px] shrink-0">
          <div
            className={clsx('w-[230px]', sidebarSticky && `fixed z-10 start-auto ${stickyClass}`)}
          >
            <Scrollspy offset={100} targetRef={parentRef}>
              <AccountSettingsSidebar />
            </Scrollspy>
          </div>
        </div>
      )}
<Container> 
    <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5 " >
        {/* <div id="CheckConnection">
          <CheckConnection />
        </div> */}

        <div id="Sanction">
          <Sanction />
        </div>

        <div id="ManualEntry">
          <ManualEntry />
        </div>

        <div id="RetrivePastScreening">
          <RetrivePastScreening />
        </div>


      </div>
      </Container>
   


    </div>
    </div>

  );
};

// export { AccountSettingsSidebarContent };
export default AccountSettingsSidebarContent;
