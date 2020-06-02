import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { createPreferences } from "../../actions"; 
import { useSelector } from 'react-redux';

function TimePreferences(props) {
  const [recitationHours, setRecitationHours] = useState([]);
  const [preferences, setPreferences] = useState([]);

  const email = useSelector(state => state.auth.userMail);
  const courseName = useSelector(state => state.students.course);
  const userType = useSelector(state => state.auth.userType);

  useEffect(() => {
    courseName && axios.get(`http://localhost:4000/getRecitationHours/${courseName}`)
      .then((response) => {
        setRecitationHours(_.uniq(response.data));
      });

  }, [courseName]);

  const renderSections = () => {
    const sectionOptions = recitationHours.map(hour =>
      <div style={{marginBottom: "25px"}}>
        {hour}
        <select class="ui dropdown" style={{marginLeft: "20px"}} onChange={e => setPreferences( [...preferences, {preferenceHour: JSON.parse(e.target.value).hour, preferenceScore: JSON.parse(e.target.value).score}] )}>
          <option value="">Score</option>
          <option value={JSON.stringify({hour, score: 1})}>1</option>
          <option value={JSON.stringify({hour, score: 2})}>2</option>
          <option value={JSON.stringify({hour, score: 3})}>3</option>
          <option value={JSON.stringify({hour, score: 4})}>4</option>
          <option value={JSON.stringify({hour, score: 5})}>5</option>
          <option value={JSON.stringify({hour, score: 6})}>6</option>
          <option value={JSON.stringify({hour, score: 7})}>7</option>
          <option value={JSON.stringify({hour, score: 8})}>8</option>
          <option value={JSON.stringify({hour, score: 9})}>9</option>
          <option value={JSON.stringify({hour, score: 10})}>10</option>
        </select>
      </div>
    );
    return sectionOptions
  } 

  return (
    userType === "STUDENT" ? 
      <>
        {renderSections()}
        {!!recitationHours.length && <button className="ui button primary" style={{ float: 'right' }} onClick={() => props.createPreferences(preferences, email, courseName)}>Submit Preferences</button>}
      </> : <h1>YOU ARE NOT A STUDENT</h1>
  );
}

export default connect(null, { createPreferences })(TimePreferences);