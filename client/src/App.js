import React from "react";
import Dashboard from "./assets/component/Dashboard";
import Team from "./assets/component/Team";
import Income from "./assets/component/Income";
import PaymentHistory from "./assets/component/PaymentHistory";
import ContactUs from "./assets/component/ContactUs";
import FreeLink from "./assets/component/FreeLink";
import Home from "./assets/component/Home";
import Login from "./assets/component/Login";
import Registration from "./assets/component/Registration";
import { Redirect, Route, Switch } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Forgotpass from "./assets/component/Forgotpass";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgotpass' component={Forgotpass} />
        <Route exact path='/registration/:refferid?' component={Registration} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/team' component={Team} />
        <Route exact path='/income' component={Income} />
        <Route exact path='/paymenthistory' component={PaymentHistory} />
        <Route exact path='/contactus' component={ContactUs} />
        <Route exact path='/contactus' component={ContactUs} />
        <Route exact path='/freelink' component={FreeLink} />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
