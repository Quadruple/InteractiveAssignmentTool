import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStudent, deleteStudent } from "../actions";
import Modal from "./Modal";
import history from "../history";

class DeleteStudent extends React.Component {
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  renderContent = () => {
    if(!this.props.student) {
      return "Are you sure?"
    }
    return `Are you sure to delete STUDENT_NAME: ${this.props.student}`
  }
  
  renderActions() {
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => this.props.deleteStudent(this.props.student)}>Delete</button>
        <Link to={"/instructor"} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }
  
  render() {
    return (
      <Modal 
        title="Delete Student" 
        content={this.renderContent()}
        actions={this.renderActions()} 
        onDismiss={() => history.push("/instructor")}       
      />
      
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { student: state.students[ownProps.match.params.id] };
}
 
export default connect(mapStateToProps, { fetchStudent, deleteStudent })(DeleteStudent);