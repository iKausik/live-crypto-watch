import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Coins />
          </Route>
          <Route exact path="/coins">
            <Coins />
          </Route>
          <Route exact path="/coins/:id">
            <CoinDetails />
          </Route>
        </Switch>
        <Footer />
      </Router>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
