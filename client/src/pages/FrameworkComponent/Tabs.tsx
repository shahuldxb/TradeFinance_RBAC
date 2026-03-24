export type TabItem<T extends string> = {
  label: string;
  value: T;
  icon?: React.ReactNode;
};

type TabsProps<T extends string> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (value: T) => void;
};

export default function Tabs<T extends string>( {
    tabs,
  activeTab,
  onChange,
}: TabsProps<T>) {
  return (
    <>
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`px-6 py-4 rounded-md ${activeTab === tab.value ? 'bg-blue-400 font-bold text-white text-lg':'bg-gray-200 text-gray-700 font-bold'}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </>
  );
}



