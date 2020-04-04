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
        <select class="ui dropdown" style={{marginLeft: "20px"}} onChange={e => setPreferences( [...preferences, e.target.value] )}>
          <option value="">Score</option>
          <option value={`${hour} Preference Score: 1`}>1</option>
          <option value={`${hour} Preference Score: 2`}>2</option>
          <option value={`${hour} Preference Score: 3`}>3</option>
          <option value={`${hour} Preference Score: 4`}>4</option>
          <option value={`${hour} Preference Score: 5`}>5</option>
          <option value={`${hour} Preference Score: 6`}>6</option>
          <option value={`${hour} Preference Score: 7`}>7</option>
          <option value={`${hour} Preference Score: 8`}>8</option>
          <option value={`${hour} Preference Score: 9`}>9</option>
          <option value={`${hour} Preference Score: 10`}>10</option>
        </select>
      </div>
    );
    return sectionOptions
  } 

  return (
    <>
      {renderSections()}
      {!!recitationHours.length && <button className="ui button primary" style={{ float: 'right' }} onClick={() => props.createPreferences(preferences)}>Submit Preferences</button>}
    </>
  );
}

const mapStateToProps = (state) => {
  return { courseName: state.students.courseName }
}

export default connect(mapStateToProps, { createPreferences })(TimePreferences);