import React from "react";
import CategorySelector, { category } from "../components/CategorySelector";
import PriceForm from "../components/PriceForm";
import { Tab, Tabs } from "../components/Tabs";

interface IState {
  type: "income" | "outcome";
}
const testCategories: Array<category> = [
  {
    id: "1",
    name: "旅行",
    type: "outcome",
    inconName: "fa-plane",
  },
  {
    id: "2",
    name: "理财",
    type: "income",
    inconName: "fa-bank",
  },
  {
    id: "3",
    name: "贷款",
    type: "income",
    inconName: "fa-money",
  },
];
export default class Create extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      type: "income",
    };
  }
  render() {
    const categories = testCategories.filter((category) => {
      return category.type === this.state.type;
    });
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ backgroundColor: "#fff" }}
      >
        <Tabs activeIndex={0} onTabChange={() => {}}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelector
          categories={categories}
          handleSelectCategory={() => {}}
        />
        <PriceForm handleCancelSubmit={() => {}} handleFormSubmit={() => {}} />
      </div>
    );
  }
}
