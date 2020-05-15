import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";
import { createPreferences } from "../../actions"; 

function TimePreferences(props) {
  const [recitationHours, setRecitationHours] = useState([]);
  const [preferences, setPreferences] = useState([]);

  console.log(preferences)
  useEffect(() => {
    axios.get(`http://localhost:4000/getRecitationHours/${props.courseName}`)
      .then((response) => {
        setRecitationHours(_.uniq(response.data));
      });

  }, [props.courseName]);

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
    <>
      {renderSections()}
      {!!recitationHours.length && <button className="ui button primary" style={{ float: 'right' }} onClick={() => props.createPreferences(preferences, props.email)}>Submit Preferences</button>}
    </>
  );
}

const mapStateToProps = (state) => {
  return { 
    courseName: state.students.courseName, 
    email: state.auth.userMail
  }
}

export default connect(mapStateToProps, { createPreferences })(TimePreferences);