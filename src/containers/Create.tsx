import React from "react";
import CategorySelector, { category } from "../components/CategorySelector";
import PriceForm from "../components/PriceForm";
import { Tab, Tabs } from "../components/Tabs";
import WithContext from "../WithContext";
import { withRouter } from "react-router-dom";

interface IState {
  selectedTab: React.ReactText;
  selectedCategory: category | null;
}

enum tabsText {
  outcome,
  income,
}
class Create extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    const { id } = props.match.params;
    const { items, categories } = props.data;
    this.state = {
      selectedTab:
        id && items[id] ? tabsText[categories[items[id].cid].type] : 0,
      selectedCategory: id && items[id] ? categories[items[id].cid] : null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.props.actions.getEditData(id).then((data: any) => {
        const { editItem, categories } = data;
        this.setState({
          selectedTab:
            id && editItem ? tabsText[categories[editItem.cid].type] : 0,
          selectedCategory: id && editItem ? categories[editItem.cid] : null,
        });
      });
    }
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
      this.props.actions
        .createItem(data, this.state.selectedCategory?.id)
        .then(() => {
          this.props.history.push("/");
        });
    } else {
      this.props.actions
        .updateItem(data, this.state.selectedCategory?.id)
        .then(() => {
          this.props.history.push("/");
        });
    }
  };
  render() {
    const { data } = this.props;
    const { categories, items } = data;
    const { id } = this.props.match.params;
    const editItem = id && items[id] ? items[id] : {};
    const { selectedTab, selectedCategory } = this.state;
    const fillterCategories = Object.keys(categories)
      .filter((id) => categories[id].type === tabsText[selectedTab as number])
      .map((id) => categories[id]);
    return (
      <div
        className="create-page py-3 px-3 rounded mt-3"
        style={{ backgroundColor: "#fff" }}
      >
        <Tabs
          activeIndex={selectedTab as number}
          onTabChange={this.onTabChange}
        >
          <Tab>支出</Tab>
          <Tab>收入</Tab>
        </Tabs>
        <CategorySelector
          categories={fillterCategories}
          handleSelectCategory={this.handleSelectCategory}
          selectedCategory={selectedCategory}
        />
        <PriceForm
          handleFormCancel={this.handleFormCancel}
          handleFormSubmit={this.handleFormSubmit}
          item={editItem}
        />
      </div>
    );
  }
}

export default withRouter(WithContext(Create));
