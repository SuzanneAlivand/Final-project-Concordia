import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
