import React from "react";
import Create from "./containers/Create";
import Home from "./containers/Home";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { flattenArr, ID, parseToYearAndMonth } from "./utility";
import { testCategories, testItems } from "./testData";

interface IState {
  items: Record<string, any>;
  categories: Record<string, any>;
}

export const AppContext = React.createContext({
  state: { items: {}, categories: {} },
  actions: {},
});
class App extends React.Component<{}, IState> {
  actions: {
    deleteItem: (item: { id: string }) => void;
    createItem: (item: any, categoryId: any) => void;
  };
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      items: flattenArr(testItems),
      categories: flattenArr(testCategories),
    };
    this.actions = {
      deleteItem: (item: { id: string }) => {
        delete this.state.items[item.id];
        this.setState({
          items: this.state.items,
        });
      },
      createItem: (item, categoryId) => {
        const newId = ID();
        const parseDate = parseToYearAndMonth(item.date);
        item.monthCategory = `${parseDate.year}-${parseDate.month}`;
        item.timestamp = new Date(item.date).getTime();
        const newItem = { ...item, id: newId, cid: categoryId };
        this.setState({
          items: { ...this.state.items, [newId]: newItem },
        });
      },
    };
  }
  render() {
    return (
      <AppContext.Provider value={{ state: this.state, actions: this.actions }}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/editor/:id" component={Create} />
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
