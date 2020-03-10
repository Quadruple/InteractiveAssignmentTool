import React from "react";
import { Layout, SideBar } from "./styles";

import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Assistant from "./Assistant";
import Calendar from "./Calendar";
import Slot from "./Calendar"
import { connect } from "react-redux";
import { fetchStudents } from "../../../actions"; 


class Assignment extends React.Component {
  componentDidMount() {
    this.props.fetchStudents();
  }
  renderAssistants = () => {
    const studentArray = this.props.students.map(student => 
      <div><Assistant name={student.name} /></div>
    );
    
    console.log(this.props.students);
    return studentArray;
  }

  render() {
    return(
      <DndProvider backend={Backend}>
        <Layout>
          <SideBar>
            {this.renderAssistants()}
          </SideBar>
          <Calendar />
        </Layout>
      </DndProvider>
    );
  }
}

const mapStateToProps = state => {
  return { 
    students: Object.values(state.students),
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStudents })(Assignment);