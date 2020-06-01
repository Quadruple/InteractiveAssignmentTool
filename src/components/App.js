import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Instructor from "./instructorComps/Instructor";
import CreateStudent from "./instructorComps/CreateStudent";
import EditStudent from "./instructorComps/EditStudent";
import Student from "./studentComps/Student";
import Assignment from "./instructorComps/assignment/Assignment";
import Header from "./Header"; 
import history from '../history'; 
import AdminScreen from "./adminComps/AdminScreen";
import TimePreferences from "./studentComps/TimePreferences";

const App = () => {
  return (
    <div style={{marginLeft: "10%", marginRight: "10%"}}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={LoginScreen} />
          <Route path="/instructor" exact component={Instructor} />
          <Route path="/admin" exact component={AdminScreen} />
          <Route path="/instructor/newStudent" exact component={CreateStudent} />
          <Route path="/instructor/editStudent/:studentemail" exact component={EditStudent} />
          <Route path="/assignment" exact component={Assignment} />
          <Route path="/student" exact component={Student} />
          <Route path="/student/newTime" exact component={TimePreferences} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;