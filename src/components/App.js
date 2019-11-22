import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import Instructor from "./Instructor";
import CreateStudent from "./CreateStudent";
import EditStudent from "./EditStudent";
import DeleteStudent from "./DeleteStudent";
import Student from "./Student";
import Header from "./Header"; 
import history from '../history'; 

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={LoginScreen} />
          <Route path="/instructor" exact component={Instructor} />
          <Route path="/instructor/newStudent" exact component={CreateStudent} />
          <Route path="/instructor/editStudent/:studentId" exact component={EditStudent} />
          <Route path="/instructor/deleteStudent/:studentId" exact component={DeleteStudent} />
          <Route path="/student" exact component={Student} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;