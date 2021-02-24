import React from "react";
import CategorySelector, { category } from "../components/CategorySelector";
import PriceForm from "../components/PriceForm";
import { Tab, Tabs } from "../components/Tabs";
import WithContext from "../WithContext";
import { withRouter } from "react-router-dom";

interface IState {
  selectedTab: number;
  selectedCategory: category | null;
}

enum tabsText {
  outcome,
  income,
}

class Create extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedCategory: null,
    };
  }

  onTabChange = (index: number) => {
    this.setState({
      selectedTab: index,
    });
  };
  handleFormCancel = () => {
    this.props.history.push("/");
  };
  handleSelectCategory = (category: category) => {
    this.setState({
      selectedCategory: category,
    });
  };
  handleFormSubmit = (data: Record<string, any>, isEdit: boolean) => {
    if (!isEdit) {
      this.props.actions.createItem(data, this.state.selectedCategory?.id);
    } else {
    }
    this.props.history.push("/");
  };
  render() {
    const { data } = this.props;
    const { categories } = data;
    const { selectedTab } = this.state;
    const fillterCategories = Object.keys(categories)
      .filter((id) => categories[id].type === tabsText[selectedTab])
      .map((id) => categories[id]);

    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ backgroundColor: "#fff" }}
      >
        <Tabs activeIndex={0} onTabChange={this.onTabChange}>
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelector
          categories={fillterCategories}
          handleSelectCategory={this.handleSelectCategory}
        />
        <PriceForm
          handleFormCancel={this.handleFormCancel}
          handleFormSubmit={this.handleFormSubmit}
        />
      </div>
    );
  }
}

export default withRouter(WithContext(Create));
