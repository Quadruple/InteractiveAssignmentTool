import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTime, deleteTime } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class DeleteTime extends React.Component {
  componentDidMount() {
    this.props.fetchTime(this.props.match.params.timeId);
  }

  renderContent = () => {
    if(!this.props.time) {
      return "Are you sure?"
    }
    return `Are you sure to delete TIME: ${this.props.time.time1}` + " " + this.props.time.time2;
  }
  
  renderActions() {
    console.log(this.props.time);
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => this.props.deleteTime(this.props.time.id)}>Delete</button>
        <Link to={"/student"} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }
  
  render() {
    return (
      <Modal 
        title="Delete Time" 
        content={this.renderContent()}
        actions={this.renderActions()} 
        onDismiss={() => history.push("/student")}       
      />
      
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { time: state.times[ownProps.match.params.timeId] };
}
 
export default connect(mapStateToProps, { fetchTime, deleteTime })(DeleteTime);