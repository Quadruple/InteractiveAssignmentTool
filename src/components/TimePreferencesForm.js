import React from "react";
import { Field, reduxForm } from "redux-form";

class TimePreferencesForm extends React.Component {
  renderError({ error, touched }) {
    if(touched && error) {
      return(
        <div className="ui message">
          <div className="header">
            {error}
          </div>
        </div>
      );
    }
  }
  
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`
   
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = formValues => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
        <label style={{fontWeight: "bold"}}>Day of the Week:</label>
        <div style={{width: "845px"}}>
          <Field name="day" component="select">
            <option />
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </Field>
        </div><br></br> 
        <label style={{fontWeight: "bold"}}>Start Time:</label>
        <div style={{width: "845px"}}>
          <Field name="startTime" component="select">
            <option />
            <option value="08:40">08:40</option>
            <option value="09:40">09:40</option>
            <option value="10:40">10:40</option>
            <option value="11:40">11:40</option>
            <option value="12:40">12:40</option>
            <option value="13:40">13:40</option>
            <option value="14:40">14:40</option>
            <option value="15:40">15:40</option>
            <option value="16:40">16:40</option>
            <option value="17:40">17:40</option>
            <option value="18:40">18:40</option>
          </Field>
        </div><br></br> 
        <label style={{fontWeight: "bold"}}>End Time:</label>
        <div style={{width: "845px"}}>
          <Field name="endTime" component="select">
            <option />
            <option value="09:30">09:30</option>
            <option value="10:30">10:30</option>
            <option value="11:30">11:30</option>
            <option value="12:30">12:30</option>
            <option value="13:30">13:30</option>
            <option value="14:30">14:30</option>
            <option value="15:30">15:30</option>
            <option value="16:30">16:30</option>
            <option value="17:30">17:30</option>
            <option value="18:30">18:30</option>
            <option value="19:30">19:30</option>
          </Field>
        </div><br></br> 
        <label style={{fontWeight: "bold"}}>Preference Order:</label>
        <div style={{width: "845px"}}>
          <Field name="preferenceOrder" component="select">
            <option />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </Field>
        </div><br></br> 
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate  = formValues => {
  const errors = {};
 
  if(!formValues.time1) {
    errors.time1 = `You must enter a value`;
  }

  if(!formValues.time2) {
    errors.time2 = "You must enter a value";
  }
  console.log(errors);
  return errors;
}

export default reduxForm({
  form: "TimePreferencesForm",
  validate
})(TimePreferencesForm);