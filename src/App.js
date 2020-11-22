import React from "react";
import "./index.css";

import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { HomePage } from "./components/HomePage";
import { CustomersPage } from "./components/CustomersPage";
import { AddCustomersPage } from "./components/AddCustomersPage";
import { EditCustomerPage } from "./components/EditCustomerPage";
import { ChargesPage } from "./components/ChargesPage";
import { Header } from "./components/Header";

import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { MenuBar } from "./components/MenuBar";

export default function App() {
  const [logged, setLogged] = React.useState(true);

  return (
    <BrowserRouter>
      <Switch>
        {!logged && (
          <>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
          </>
        )}
      </Switch>
      {logged && (
        <>
          <div className="columns">
            <div className="column-menu-bar">
              <MenuBar />
            </div>
            <div className="column-main">
              <Header />
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/customers" component={CustomersPage} />
                <Route
                  exact
                  path="/customers/add"
                  component={AddCustomersPage}
                />
                <Route
                  exact
                  path="/customers/edit"
                  component={EditCustomerPage}
                />
                <Route exact path="/charges" component={ChargesPage} />
              </Switch>
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
