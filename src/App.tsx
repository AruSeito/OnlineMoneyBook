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
    createItem: (item: any, categoryId: string) => Promise<Record<string, any>>;
    updateItem: (item: any, categoryId: string) => void;
    getInitData: () => void;
    selectNewMonth: (year: number, month: number) => void;
    getEditData: (
      id: string
    ) => Promise<{
      categories: Record<string, any>;
      editItem: Record<string, any>;
    }>;
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
      createItem: async (item, categoryId) => {
        const newId = ID();
        const parseDate = parseToYearAndMonth(item.date);
        item.monthCategory = `${parseDate.year}-${FormatMonth(
          parseDate.month
        )}`;
        item.timestamp = new Date(item.date).getTime();

        const newItem = await axios.post("/items", {
          ...item,
          id: newId,
          cid: categoryId,
        });
        this.setState({
          items: { ...this.state.items, [newId]: newItem.data },
        });
        return newItem.data;
      },
      updateItem: async (item, updateCategoryId) => {
        const updateData = {
          ...item,
          cid: updateCategoryId,
          timestamp: new Date(item.date).getTime(),
        };
        const modifyItem = await axios.put(`/items/${item.id}`, updateData);
        this.setState({
          items: { ...this.state.items, [modifyItem.data.id]: modifyItem.data },
        });
        return modifyItem.data;
      },
      getInitData: () => {
        this.setState({
          isLoading: true,
        });
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
        this.setState({
          isLoading: true,
        });
        const getURLWithData = `/items?monthCategory=${year}-${FormatMonth(
          month
        )}&_sort=timestamp&_order=desc`;
        axios.get(getURLWithData).then((items) => {
          this.setState({
            currentDate: { year, month },
            items: flattenArr(items.data),
            isLoading: false,
          });
        });
      },
      getEditData: async (id: string) => {
        let promiseArr = [axios.get("/categories")];
        if (id) {
          const getURLWithID = `/items/${id}`;
          promiseArr.push(axios.get(getURLWithID));
        }
        const [categories, editItems] = await Promise.all(promiseArr);
        if (id) {
          this.setState({
            categories: flattenArr(categories.data),
            isLoading: false,
            items: { ...this.state.items, [id]: editItems.data },
          });
        } else {
          this.setState({
            categories: flattenArr(categories.data),
            isLoading: false,
          });
        }
        return {
          categories: flattenArr(categories.data),
          editItem: editItems.data,
        };
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
