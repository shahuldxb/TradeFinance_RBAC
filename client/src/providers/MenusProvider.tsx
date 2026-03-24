/* eslint-disable no-unused-vars */
import { createContext, type PropsWithChildren, useContext, useState ,useEffect} from 'react';
import { IMenuItemConfig, TMenuConfig } from '@/components/menu';
import { MENU_SIDEBAR, MENU_MEGA, MENU_ROOT } from '@/config/menu.config';
export interface IMenusProps {
  configs: Map<string, TMenuConfig | null>;
  setMenuConfig: (name: string, config: TMenuConfig | null) => void;
  getMenuConfig: (name: string) => TMenuConfig | null;
  setCurrentMenuItem: (config: IMenuItemConfig | null) => void;
  getCurrentMenuItem: () => IMenuItemConfig | null;
}

const initialProps: IMenusProps = {
  configs: new Map(),
  setMenuConfig: () => {},
  getMenuConfig: () => null,
  setCurrentMenuItem: () => {},
  getCurrentMenuItem: () => null
};

const MenuContext = createContext<IMenusProps>(initialProps);
const useMenus = () => useContext(MenuContext);

const MenusProvider = ({ children }: PropsWithChildren) => {
  const [currentMenuItem, setCurrentMenuItem] = useState<IMenuItemConfig | null>(null);
  const configs = initialProps.configs;

  const setMenuConfig = (name: string, config: TMenuConfig | null) => {
    configs.set(name, config);
  };

  const getCurrentMenuItem = (): IMenuItemConfig | null => {
    return currentMenuItem;
  };

  const getMenuConfig = (name: string): TMenuConfig | null => {
    return configs.get(name) ?? null;
  };
 // ⭐ IMPORTANT: Register your MENU_SIDEBAR as "primary"
  useEffect(() => {
    setMenuConfig('primary', MENU_SIDEBAR);
    setMenuConfig('mega', MENU_MEGA);
    setMenuConfig('root', MENU_ROOT);
  }, []);
useEffect(() => {
  console.log("MENU_SIDEBAR LOADED:", MENU_SIDEBAR);
  setMenuConfig('primary', MENU_SIDEBAR);
}, []);

  return (
    <MenuContext.Provider
      value={{ configs, setMenuConfig, getMenuConfig, setCurrentMenuItem, getCurrentMenuItem }}
    >
      {children}
    </MenuContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { MenusProvider, useMenus };
