import React from "react";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import NavBar from "../components/NavBar";
import PricesList, { IItem } from "../components/PricesList";
import TotalPrice from "../components/TotalPrice";
import { parseToYearAndMonth } from "../utility";

const itemList: Array<IItem> = [
  {
    id: "1",
    title: "旅行青岛",
    price: 500,
    date: "2020-03-04",
    category: {
      id: "1",
      name: "旅行",
      type: "outcome",
      iconName: "fa-plane",
    },
  },
  {
    id: "2",
    title: "旅行青岛2",
    price: 100,
    date: "2020-03-05",
    category: {
      id: "1",
      name: "旅行",
      type: "outcome",
      iconName: "fa-plane",
    },
  },
];
interface IState {
  itemList: Array<IItem>;
  viewModal: "chart" | "list";
  currentDate: { year: number; month: number };
}

class Home extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemList,
      viewModal: "chart",
      currentDate: parseToYearAndMonth(),
    };
  }

  render() {
    const { itemList, viewModal, currentDate } = this.state;
    let totalIncome = 0,
      totalOutcome = 0;
    itemList.forEach((item) => {
      const { type } = item.category;
      if (type === "outcome") {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });

    return (
      <div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month}
              changeDate={() => {}}
            />
          </div>
          <div className="col">
            <TotalPrice income={totalIncome} outcome={totalOutcome} />
          </div>
        </div>
        <NavBar activeTab={viewModal} handleChangeTab={() => {}} />
        <CreateBtn addItem={() => {}} />
        <PricesList
          items={itemList}
          handleChangeItem={() => {}}
          handleDelItem={() => {}}
        />
      </div>
    );
  }
}

export default Home;
