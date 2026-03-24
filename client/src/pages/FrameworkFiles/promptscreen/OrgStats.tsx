import { Fragment } from "react";

interface IOrgStatsItem {
  icon: string;
  info: string | number;
  desc: string;
  bg: string;
  bgDark: string;
  color: string;
}

interface OrgStatsProps {
  items?: IOrgStatsItem[];
  companies?: any[];
  divisions?: any[];
  departments?: any[];
  workTeams?: any[];
}

const OrgStats = ({
  items,
  companies = [],
  divisions = [],
  departments = [],
  workTeams = []
}: OrgStatsProps) => {

  const defaultItems = [
    {
      icon: "/media/images/2600x1600/building.png",
      info: companies.length,
      desc: "Companies",
      bg: "/media/images/2600x1600/bg-3.png",
      bgDark: "/media/images/2600x1600/bg-3-dark.png",
      color: "light:bg-primary"
    },
    {
      icon: "/media/images/2600x1600/layers.png",
      info: divisions.length,
      desc: "Divisions",
      bg: "/media/images/2600x1600/bg-3.png",
      bgDark: "/media/images/2600x1600/bg-3-dark.png",
      color: "light:bg-success"
    },
    {
      icon: "/media/images/2600x1600/it-department.png",
      info: departments.length,
      desc: "Departments",
      bg: "/media/images/2600x1600/bg-3.png",
      bgDark: "/media/images/2600x1600/bg-3-dark.png",
      color: "light:bg-purple-500"
    },
    {
      icon: "/media/images/2600x1600/profile.png",
      info: workTeams.length,
      desc: "Work Teams",
      bg: "/media/images/2600x1600/bg-3.png",
      bgDark: "/media/images/2600x1600/bg-3-dark.png",
      color: "light:bg-red-500"
    },
    
  ];

  const stats = items || defaultItems;

  return (
    <Fragment>
      <style>
        {stats.map(
          (item, idx) => `
            .dark .org-stats-bg-${idx} {
              background-image: url('${item.bgDark}');
            }
          `
        ).join("\n")}
      </style>

      <div className="grid gap-6 py-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`card flex-col justify-between gap-6 h-full bg-cover bg-no-repeat org-stats-bg-${index} ${item.color} transition hover:shadow-lg`}
          >
            <div className="mt-4  flex justify-center ">
              <img src={item.icon} alt={item.desc} className="w-16 h-16 object-contain" />
            </div>

            <div className="flex flex-row gap-1 pb-4  items-center justify-center">
              <span className="text-lg sm:text-md font-bold text-white dark:text-gray-900">
                {item.info}
              </span>
              <span className="text-lg sm:text-md font-bold text-white dark:text-gray-900">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default OrgStats;