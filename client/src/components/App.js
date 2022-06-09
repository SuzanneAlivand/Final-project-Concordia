import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import TopGames from "./topGames/TopGames";
import BestYearGames from "./topGames/BestYearGames";
import PopularGames from "./topGames/PopularGames";
import Action from "./genres/Action.js";
import Strategy from "./genres/Strategy";
import Shooter from "./genres/Shooter.js";
import RPG from "./genres/RPG.js";
import Adventure from "./genres/Adventure.js";
import Racing from "./genres/Racing.js";
import Puzzle from "./genres/Puzzle.js";
import Sports from "./genres/Sports.js";
import AllGames from "./topGames/AllGames";
import SearchResult from "./SearchResult";
import Abandoned from "./library/Abandoned";
import Completed from "./library/Completed";
import InProgress from "./library/InProgress";
import Backlog from "./library/Backlog";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Div>
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/top250games" component={TopGames} />
          <Route path="/popular2021" component={PopularGames} />
          <Route path="/best-of-the-year" component={BestYearGames} />
          <Route exath path="/genre/action" component={Action} />
          <Route exath path="/genre/strategy" component={Strategy} />
          <Route exath path="/genre/rpg" component={RPG} />
          <Route exath path="/genre/shooter" component={Shooter} />
          <Route exath path="/genre/adventure" component={Adventure} />
          <Route exath path="/genre/puzzle" component={Puzzle} />
          <Route exath path="/genre/racing" component={Racing} />
          <Route exath path="/genre/sports" component={Sports} />
          <Route exath path="/games" component={AllGames} />
          <Route exath path="/search" component={SearchResult} />
          <Route exath path="/backlog" component={Backlog} />
          <Route exath path="/inProgress" component={InProgress} />
          <Route exath path="/completed" component={Completed} />
          <Route exath path="/abandoned" component={Abandoned} />
        </Switch>
      </Div>
    </Router>
  );
};

export default App;

const Div = styled.div`
  height: 100vh;
  max-width: 1600px;
  margin-right: auto;
  margin-left: auto;
`;
