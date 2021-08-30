import Game from "./Game";
import Rules from "./rules";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game" exact>
          <Game />
        </Route>
        <Route path="/" exact component={Rules} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
