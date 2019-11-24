import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTimes } from "../../actions"; 

class TimeList extends React.Component {
  componentDidMount() {
    this.props.fetchTimes();
  }

  renderAdmin(time) {
    if(this.props.isSignedIn) {
      return(
        <div className="right floated content">
          <Link to={`/student/editTime/${time.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/student/deleteTime/${time.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
  }
  
  renderStudents() {
    const timeArray = this.props.times.map(time => 
      <div className="item" key={time.id}>
        {this.renderAdmin(time)}
        <i className="large middle aligned icon camera" />
        <div className="content">
          <Link to={`/times/${time.id}`} className="header">
            {time.time1}
          </Link>
          <div className="description">
            {time.time2}
          </div>
        </div>
      </div>  
    );
    
    if(this.props.isSignedIn) {
      return timeArray;
    }
  }

  renderCreate() {
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/student/newTime" className="ui button primary">
            Add Time Preference 
          </Link>
        </div>
      );
    }
  }

  render() {
    var string = this.props.isSignedIn ? "Time Preferences" : "";
    return (
      <div>
        <h3>{string}</h3>
        <div className="ui celled list">
          {this.renderStudents()}
        </div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    times: Object.values(state.times),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchTimes })(TimeList);