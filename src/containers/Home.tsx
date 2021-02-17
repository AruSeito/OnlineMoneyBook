import React from "react";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import NavBar from "../components/NavBar";
import PricesList, { IItem } from "../components/PricesList";
import TotalPrice from "../components/TotalPrice";
import { FormatMonth, parseToYearAndMonth } from "../utility";

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
  {
    id: "3",
    title: "银行利息",
    price: 100,
    date: "2020-03-05",
    category: {
      id: "2",
      name: "理财",
      type: "income",
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

  changeActiveTab = (tabName: "chart" | "list") => {
    this.setState({
      viewModal: tabName,
    });
  };
  changeYearAndMonth = (year: number, month: number) => {
    this.setState({
      currentDate: { year, month },
    });
  };
  addItem = () => {
    const item: IItem = {
      id: "4",
      title: "新建的数据",
      price: 100,
      date: "2020-03-23",
      category: {
        id: "2",
        name: "理财",
        type: "income",
        iconName: "fa-plane",
      },
    };
    const newItemList = [item, ...this.state.itemList];
    this.setState({
      itemList: newItemList,
    });
  };
  delItem = (delItem: IItem) => {
    const filteredItem = this.state.itemList.filter((item) => {
      return item.id !== delItem.id;
    });
    this.setState({
      itemList: filteredItem,
    });
  };
  modifyItem = (modifiedItem: IItem) => {
    const modifiedItemList = this.state.itemList.map((item) => {
      if (item.id === modifiedItem.id) {
        return { ...item, title: "修改后的标题" };
      } else {
        return item;
      }
    });
    this.setState({
      itemList: modifiedItemList,
    });
  };

  render() {
    const { itemList, viewModal, currentDate } = this.state;
    let totalIncome = 0,
      totalOutcome = 0;
    const itemListTmp = itemList.filter((item) => {
      console.log(`${currentDate.year}-${FormatMonth(currentDate.month)}`);
      return item.date.includes(
        `${currentDate.year}-${FormatMonth(currentDate.month)}`
      );
    });
    itemListTmp.forEach((item) => {
      if (item.category.type === "income") totalIncome += item.price;
      else totalOutcome += item.price;
    });

    return (
      <div>
        <div className="row">
          <div className="col">
            <MonthPicker
              year={currentDate.year}
              month={currentDate.month}
              changeDate={this.changeYearAndMonth}
            />
          </div>
          <div className="col">
            <TotalPrice income={totalIncome} outcome={totalOutcome} />
          </div>
        </div>
        <NavBar activeTab={viewModal} handleChangeTab={this.changeActiveTab} />
        <CreateBtn addItem={this.addItem} />
        {viewModal === "list" && (
          <PricesList
            items={itemListTmp}
            handleChangeItem={this.modifyItem}
            handleDelItem={this.delItem}
          />
        )}
        {viewModal === "chart" && <h1>this is chart modal</h1>}
      </div>
    );
  }
}

export default Home;
