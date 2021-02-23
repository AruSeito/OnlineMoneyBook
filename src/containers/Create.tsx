import React from "react";
import { AppContext } from "../App";
import CategorySelector, { category } from "../components/CategorySelector";
import PriceForm from "../components/PriceForm";
import { Tab, Tabs } from "../components/Tabs";

interface IState {
  type: "income" | "outcome";
}

export default class Create extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      type: "income",
    };
  }
  render() {
    return (
      <AppContext.Consumer>
        {({ state }) => {
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
                categories={state.categories}
                handleSelectCategory={() => {}}
              />
              <PriceForm
                handleCancelSubmit={() => {}}
                handleFormSubmit={() => {}}
              />
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}
