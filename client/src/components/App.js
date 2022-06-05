import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import TopGames from "./TopGames";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Div>
      <Header />
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/top250games" component={TopGames}/>
      </Switch>
      </Div>
    </Router>
  );
};

export default App;

const Div=styled.div`
height: 100vh;
  max-width: 1800px;
  margin-right: auto;
  margin-left: auto;
`