import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import TvList from "./pages/TvList/TvList.js";
import FilterChannel from "./pages/Home/FilterChannel.js";
import SingleList from "./pages/SinglePage/SingleList.js";
import { Container } from "reactstrap";

function App() {
  return (
    <Router>
      <>
        <TopNav />
        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/signup"
              render={props => <Auth {...props} action="signup" />}
            />
            <Route
              exact
              path="/login"
              render={props => <Auth {...props} action="login" />}
            />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/tvlist" component={TvList} />

            <Route
              exact
              path="/tvlist/:id"
              render={props => <SingleList {...props} />}
            />

            <Route
              path="/category/:categ/:area"
              render={props => <FilterChannel {...props} />}
            />
            <Route
              path="/category/:categ"
              render={props => <Profile {...props} />}
            />

            <Route component={NoMatch} />
          </Switch>
        </Container>
        <Footer />
      </>
    </Router>
  );
}

export default App;
