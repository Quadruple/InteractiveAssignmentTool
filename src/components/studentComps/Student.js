import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTimes, fetchStudentCourse } from "../../actions"; 

class TimeList extends React.Component {
  componentDidMount() {
    this.props.fetchTimes();
    this.props.fetchStudentCourse();
  }
 
  renderPreferences() {
    const timeArray = this.props.times.map(time => 
      <div key={time.id} style={{marginBottom: "50px"}}>
        <div className="content">
          {time.preference}
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
            Create Time Preferences 
          </Link>
        </div>
      );
    }
  }

  render() {
    var string = this.props.isSignedIn ? "Time Preferences" : "";
    return (
      <div>
        <h3 style={{marginBottom: "25px"}}>{string}</h3>
        <div className="ui celled list">
          {this.renderPreferences()}
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

export default connect(mapStateToProps, { fetchTimes, fetchStudentCourse })(TimeList);