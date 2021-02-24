import React from "react";
import Create from "./containers/Create";
import Home from "./containers/Home";
import "./App.css";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { flattenArr, FormatMonth, ID, parseToYearAndMonth } from "./utility";

interface IState {
  items: Record<string, any>;
  categories: Record<string, any>;
  currentDate: { year: number; month: number };
  isLoading: boolean;
}

export const AppContext = React.createContext({
  state: {
    items: {},
    categories: {},
    currentDate: parseToYearAndMonth(),
    isLoading: true,
  },
  actions: {},
});
class App extends React.Component<{}, IState> {
  actions: {
    deleteItem: (item: { id: string }) => void;
    createItem: (item: any, categoryId: string) => void;
    updateItem: (item: any, categoryId: string) => void;
    getInitData: () => void;
    selectNewMonth: (year: number, month: number) => void;
  };
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth(),
      isLoading: true,
    };
    this.actions = {
      deleteItem: (item: { id: string }) => {
        axios.delete(`/items/${item.id}`).then(() => {
          delete this.state.items[item.id];
          this.setState({
            items: this.state.items,
          });
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
      updateItem: (item, updateCategoryId) => {
        const modifyItem = {
          ...item,
          cid: updateCategoryId,
          timestamp: new Date(item.date).getTime(),
        };
        axios.put(`/items/${item.id}`, modifyItem).then(() => {
          this.setState({
            items: { ...this.state.items, [modifyItem.id]: modifyItem },
          });
        });
      },
      getInitData: () => {
        const { currentDate } = this.state;
        const getURLWithData = `/items?monthCategory=${
          currentDate.year
        }-${FormatMonth(currentDate.month)}&_sort=timestamp&_order=desc`;
        const promiseArr = [
          axios.get("/categories"),
          axios.get(getURLWithData),
        ];
        Promise.all(promiseArr).then((arr) => {
          const [categories, items] = arr;
          this.setState({
            items: flattenArr(items.data),
            categories: flattenArr(categories.data),
            isLoading: false,
          });
        });
      },
      selectNewMonth: (year, month) => {
        const getURLWithData = `/items?monthCategory=${year}-${FormatMonth(
          month
        )}&_sort=timestamp&_order=desc`;
        axios.get(getURLWithData).then((items) => {
          this.setState({
            currentDate: { year, month },
            items: flattenArr(items.data),
          });
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
