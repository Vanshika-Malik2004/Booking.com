import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./components/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Forms from "./components/Forms";
import Details from "./components/Details";

function App() {
  return (
    <Router>
      <div className="main_container">
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/forms">
            <Forms />
          </Route>
          <Route path="/Details">
            <Details />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
