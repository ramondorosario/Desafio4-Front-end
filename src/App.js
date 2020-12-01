import React from "react";
import "./index.css";

import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { Header } from "./components/Header";
import { MenuBar } from "./components/MenuBar";
import { HomePage } from "./components/HomePage";
import { CustomersPage } from "./components/CustomersPage";
import { AddCustomersPage } from "./components/AddCustomersPage";
import { EditCustomerPage } from "./components/EditCustomerPage";
import { ChargesPage } from "./components/ChargesPage";
import { CreateChargePage } from "./components/CreateChargePage";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { LoginContainer } from "./index";

export default function App() {
  const { token } = LoginContainer.useContainer();

  return (
    <BrowserRouter>
      <Switch>
        {!token && (
          <>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="*" render={() => <Redirect to="/login" />} />
          </>
        )}
      </Switch>
      {token && (
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
                <Route
                  exact
                  path="/charges/new-charge"
                  component={CreateChargePage}
                />
                <Route exact path="*" render={() => <Redirect to="/home" />} />
              </Switch>
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  );
}
