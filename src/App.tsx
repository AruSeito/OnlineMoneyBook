import Create from "./containers/Create";
import Home from "./containers/Home";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/editor/:id" component={Create} />
      </div>
    </Router>
  );
}

export default App;
