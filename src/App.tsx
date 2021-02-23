import React from "react";
import Create from "./containers/Create";
import Home from "./containers/Home";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { flattenArr } from "./utility";
import { testCategories, testItems } from "./testData";

interface IState {
  items: Record<string, any>;
  categories: Record<string, any>;
}

export const AppContext = React.createContext({
  state: { items: {}, categories: {} },
});
class App extends React.Component<{}, IState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      items: flattenArr(testItems),
      categories: flattenArr(testCategories),
    };
  }
  render() {
    return (
      <AppContext.Provider value={{ state: this.state }}>
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
