import React from "react";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import PricesList, { IItem } from "../components/PricesList";
import { Tab, Tabs } from "../components/Tabs";
import TotalPrice from "../components/TotalPrice";
import { FormatMonth, parseToYearAndMonth } from "../utility";
import WithContext from "../WithContext";
import { withRouter } from "react-router-dom";
import Loading from "../components/Loading";

interface IState {
  viewModal: number;
}
enum tabsText {
  list,
  chart,
}
class Home extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewModal: 0,
    };
  }
  componentDidMount() {
    this.props.actions.getInitData();
  }
  changeActiveTab = (index: number) => {
    this.setState({
      viewModal: index,
    });
  };
  changeYearAndMonth = (year: number, month: number) => {
    this.props.actions.selectNewMonth(year, month);
  };
  addItem = () => {
    this.props.history.push("/create");
  };
  delItem = (delItem: IItem) => {
    this.props.actions.deleteItem(delItem);
  };
  modifyItem = (modifiedItem: IItem) => {
    this.props.history.push(`/edit/${modifiedItem.id}`);
  };

  render() {
    const { data } = this.props;
    const { items, categories, currentDate, isLoading } = data;
    const { viewModal } = this.state;
    const itemsWithCategory = Object.keys(items)
      .map((id) => {
        items[id].category = categories[items[id].cid];
        return items[id];
      })
      .filter((item) =>
        item.date.includes(
          `${currentDate.year}-${FormatMonth(currentDate.month)}`
        )
      );
    let totalIncome = 0,
      totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === "outcome") {
        totalOutcome += Number(item.price);
      } else {
        totalIncome += Number(item.price);
      }
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
          {isLoading && <Loading />}
          {!isLoading && (
            <>
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
                  items={itemsWithCategory}
                  handleChangeItem={this.modifyItem}
                  handleDelItem={this.delItem}
                />
              )}
              {viewModal === 1 && (
                <h1 className="chart-title">this is chart modal</h1>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(WithContext(Home));
