import React from "react";

const changeActiveTab = (currentTab: string, activeTab: string) => {
  return currentTab === activeTab ? "nav-link active" : null;
};

interface IProps {
  activeTab: "list" | "chart";
  handleChangeTab: (view: "list" | "chart") => void;
}

const NavBar = (props: IProps) => {
  const { activeTab, handleChangeTab } = props;
  return (
    <ul className="nav nav-tabs nav-fill">
      <li className="nav-item">
        <a
          className={`nav-link ${changeActiveTab(activeTab, "list")}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChangeTab("list");
          }}
        >
          <i className="fa fa-list" />
          列表模式
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${changeActiveTab(activeTab, "chart")}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChangeTab("chart");
          }}
        >
          <i className="fa fa-pie-chart" />
          图表模式
        </a>
      </li>
    </ul>
  );
};

export default NavBar;
