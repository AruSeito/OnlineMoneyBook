import React from "react";
import { LIST_VIEW, CHART_VIEW } from "../utility";

const changeActiveTab = (currentTab: string, activeTab: string) => {
  return currentTab === activeTab ? "nav-link active" : null;
};

interface IProps {
  activeTab: "list" | "chart";
  handleChangeTab: (view: string) => void;
}

const NavBar = (props: IProps) => {
  const { activeTab, handleChangeTab } = props;
  return (
    <ul className="nav nav-tabs nav-fill">
      <li className="nav-item">
        <a
          className={`nav-link ${changeActiveTab(activeTab, LIST_VIEW)}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChangeTab(LIST_VIEW);
          }}
        >
          <i className="fa fa-list" />
          列表模式
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${changeActiveTab(activeTab, CHART_VIEW)}`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChangeTab(CHART_VIEW);
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
