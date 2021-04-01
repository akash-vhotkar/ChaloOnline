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
import Store from './store';
import { Provider } from 'react-redux'
import Forgotpasschange from './assets/component/Forgotpasschange';
import Privateroute from "./private/Privateroute";
import Activateacc from "./assets/component/Activateacc";

const App = () => {
  return (
    <Provider store={Store}>
      <React.Fragment>
        <Switch>
          <Route exact path='/' exact component={Home} />
          <Route exact path='/login' exact component={Login} />
          <Route exact path='/forgotpass' exact component={Forgotpass} />
          <Route exact path='/genratepass/:link' component={Forgotpasschange} />
          <Route exact path='/registration/:refferid?' exact component={Registration} />
          <Privateroute exact path='/activateacc' exact component={Activateacc} />
          <Privateroute exact path='/dashboard' exact component={Dashboard} />
          <Privateroute exact path='/team' exact component={Team} />
          <Privateroute exact path='/income' component={Income} />
          <Privateroute exact path='/paymenthistory' exact component={PaymentHistory} />
          <Privateroute exact path='/contactus' exact component={ContactUs} />
          <Privateroute exact path='/freelink' exact component={FreeLink} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    </Provider>
  );
}

export default App;
