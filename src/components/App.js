import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Instructor from "./instructorComps/Instructor";
import CreateStudent from "./instructorComps/CreateStudent";
import EditStudent from "./instructorComps/EditStudent";
import DeleteStudent from "./instructorComps/DeleteStudent";
import Student from "./studentComps/Student";
import CreateTime from "./studentComps/CreateTime";
import EditTime from "./studentComps/EditTime";
import DeleteTime from "./studentComps/DeleteTime";
import Header from "./Header"; 
import history from '../history'; 

import Demo from "./Demo";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={LoginScreen} />
          <Route path="/login" exact component={Demo} />
          <Route path="/instructor" exact component={Instructor} />
          <Route path="/instructor/newStudent" exact component={CreateStudent} />
          <Route path="/instructor/editStudent/:studentId" exact component={EditStudent} />
          <Route path="/instructor/deleteStudent/:studentId" exact component={DeleteStudent} />
          <Route path="/student" exact component={Student} />
          <Route path="/student/newTime" exact component={CreateTime} />
          <Route path="/student/editTime/:timeId" exact component={EditTime} />
          <Route path="/student/deleteTime/:timeId" exact component={DeleteTime} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;