import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import { fetchTimes, fetchStudentCourse } from "../../actions";

function TimeList(props) {
  const times = useSelector(state => state.times);
  const email = useSelector(state => state.auth.userMail);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const userType = useSelector(state => state.auth.userType);
  
  useEffect(() => {
    email && props.fetchTimes(email);
    email && props.fetchStudentCourse(email);
  }, [props, email]);

  const renderPreferences = () => {
    const timeArray = times.map(time =>
      <div style={{ marginBottom: "50px" }}>
        <div className="content">
          {`Score for ${time.preferencestring}: ${time.preferencedegree}`}
        </div>
      </div>
    );

    if (isSignedIn) {
      return timeArray;
    }
  }

  const renderCreate = () => {
    if (isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/student/newTime" className="ui button primary">
            Create Time Preferences
          </Link>
        </div>
      );
    }
  }

  var string = isSignedIn ? "Time Preferences" : "";
  return (
    userType === "STUDENT" ?
      <div>
        <h3 style={{ marginBottom: "25px" }}>{string}</h3>
        <div className="ui celled list">
          {!!times.length && renderPreferences()}
        </div>
        {renderCreate()}
      </div> : <h1>YOU ARE NOT A STUDENT</h1>
  );
}

export default connect(null, { fetchTimes, fetchStudentCourse })(TimeList);