import React from "react";
import { Field, reduxForm } from "redux-form";

class FormTime extends React.Component {
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
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
        <Field name="time1" component={this.renderInput} label="Enter Slot 1: " />
        <Field name="time2" component={this.renderInput} label="Enter Slot 2: " />
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
  form: "FormTime",
  validate
})(FormTime);