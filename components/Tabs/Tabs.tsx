import React from "react";
import tabStyles from "./Tabs.module.css";

type TabsArray = {
  name: string;
  value: string;
};

type TabsProps = {
  tabsArray: TabsArray[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
};

export const Tabs = ({
  tabsArray,
  currentTab,
  setCurrentTab,
}: TabsProps): JSX.Element => {
  return (
    <div className={tabStyles.tabsContainer}>
      <ul className={tabStyles.tabsGroup}>
        {tabsArray.map((tab) => (
          <li
            className={
              currentTab === tab.value
                ? tabStyles.tabItemActive
                : tabStyles.tabItem
            }
            onClick={() => setCurrentTab(tab.value)}
          >
            {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
