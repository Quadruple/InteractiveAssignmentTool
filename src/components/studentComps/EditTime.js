import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchTimes, editTime } from "../../actions";
import TimePreferencesForm from "../TimePreferencesForm";

class EditTime extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.timeId);
    this.props.fetchTimes(this.props.match.params.timeId);
  }

  onSubmit = (formValues) => {
    this.props.editTime(this.props.match.params.timeId, formValues);
  }

  render() {
    if(!this.props.time) {
      return <div>LOADING</div>
    } else {
        return (
          <div>
            <h2>Edit Time</h2>
            <TimePreferencesForm initialValues={_.pick(this.props.time, 'day', 'startTime', 'endTime', 'preferenceOrder')} onSubmit={this.onSubmit} /> 
          </div>
        );
    }
   
  }
}

const mapStateToProps = (state, ownProps) => {
  return { time: state.times[ownProps.match.params.timeId] }
}

export default connect(mapStateToProps, { fetchTimes, editTime })(EditTime);