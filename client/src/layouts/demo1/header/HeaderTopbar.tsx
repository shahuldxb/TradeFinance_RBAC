
import React, { useRef, useState } from 'react';
import { KeenIcon } from '@/components/keenicons';
import { toAbsoluteUrl } from '@/utils';
import { Menu, MenuItem, MenuToggle } from '@/components';
import { DropdownUser } from '@/partials/dropdowns/user';
import { DropdownNotifications } from '@/partials/dropdowns/notifications';
import { DropdownApps } from '@/partials/dropdowns/apps';
import { DropdownChat } from '@/partials/dropdowns/chat';
import { ModalSearch } from '@/partials/modals/search/ModalSearch';
import { useLanguage } from '@/i18n';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';


const HeaderTopbar = () => {
  const { isRTL } = useLanguage();
  const itemUserRef = useRef<any>(null);
  const handleShow = () => {
    window.dispatchEvent(new Event('resize'));
  };

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleOpen = () => setSearchModalOpen(true);
  const handleClose = () => {
    setSearchModalOpen(false);
  };


  const [demoMode, setDemoMode] = useState<'Y' | 'N'>(() => {
    const stored = (localStorage.getItem('demoMode') || 'Y').toUpperCase();
    return stored === 'Y' ? 'Y' : 'N';
  });



const handleDemoModeChange = async (value: 'Y' | 'N') => {
  // update UI immediately
  setDemoMode(value);
  localStorage.setItem('demoMode', value);

  // push change to all pages using useQuery(['demoMode'])
  queryClient.setQueryData(['demoMode'], value);

  try {
    const res = await fetch('/api/lc/demo-mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ demoMode: value })
    });
    if (!res.ok) throw new Error('Failed to update demo mode');

    // optional: confirm with server value
    queryClient.invalidateQueries({ queryKey: ['demoMode'] });
  } catch (e) {
    console.error(e);
  }
};

 

  return (
    <div className="flex items-center gap-2 lg:gap-3.5">

      <div className="flex items-center gap-2 border rounded-md px-3 py-1">
        <span className="text-sm font-semibold  whitespace-nowrap">
          Demo Mode
        </span>

        <Select value={demoMode} onValueChange={(value: 'Y' | 'N') => handleDemoModeChange(value)}>
          <SelectTrigger className="h-7 w-[80px] text-sm">
            <SelectValue />
          </SelectTrigger>

          <SelectContent className="bg-white dark:bg-black">
            <SelectItem value="Y">Yes</SelectItem>
            <SelectItem value="N">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
     

      <Menu>
        <MenuItem
          ref={itemUserRef}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: isRTL() ? 'bottom-start' : 'bottom-end',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: isRTL() ? [-20, 10] : [20, 10] // [skid, distance]
                }
              }
            ]
          }}
        >
          <MenuToggle className="btn btn-icon rounded-full">
            <img
              className="size-9 rounded-full border-2 border-success shrink-0"
              src={toAbsoluteUrl('/media/avatars/300-2.png')}
              alt=""
            />
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu>
    </div>
  );
};

export { HeaderTopbar };