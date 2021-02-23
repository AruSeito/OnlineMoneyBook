import React from "react";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import PricesList, { IItem } from "../components/PricesList";
import { Tab, Tabs } from "../components/Tabs";
import TotalPrice from "../components/TotalPrice";
import { FormatMonth, parseToYearAndMonth } from "../utility";

const itemList: Array<IItem> = [
  {
    id: "1",
    title: "旅行青岛",
    price: 500,
    date: "2021-02-04",
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
    date: "2021-03-05",
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
    date: "2021-03-05",
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
  viewModal: number;
  currentDate: { year: number; month: number };
}

class Home extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemList,
      viewModal: 0,
      currentDate: parseToYearAndMonth(),
    };
  }

  changeActiveTab = (index: number) => {
    this.setState({
      viewModal: index,
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
      date: "2021-02-23",
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
      return item.date.includes(
        `${currentDate.year}-${FormatMonth(currentDate.month)}`
      );
    });
    itemListTmp.forEach((item) => {
      if (item.category.type === "income") totalIncome += item.price;
      else totalOutcome += item.price;
    });

    return (
      <>
        <div className="App-header">
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
        </div>
        <div className="content-area py-3 px-3">
          <Tabs activeIndex={0} onTabChange={this.changeActiveTab}>
            <Tab>
              <i className="fa fa-list" />
              列表模式
            </Tab>
            <Tab>
              <i className="fa fa-pie-chart" />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn addItem={this.addItem} />
          {viewModal === 0 && (
            <PricesList
              items={itemListTmp}
              handleChangeItem={this.modifyItem}
              handleDelItem={this.delItem}
            />
          )}
          {viewModal === 1 && (
            <h1 className="chart-title">this is chart modal</h1>
          )}
        </div>
      </>
    );
  }
}

export default Home;
