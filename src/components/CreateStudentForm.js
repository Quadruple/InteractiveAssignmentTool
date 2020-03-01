import React from "react";
import { Field, reduxForm } from "redux-form";

class CreateStudentForm extends React.Component {
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
    const className = `twelve wide field ${meta.error && meta.touched ? "error" : ""}`
   
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = formValues => {
    console.log(formValues)
    formValues = {...formValues, email: formValues.email + "@sabanciuniv.edu"}
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
        <label style={{fontWeight: "bold"}}>E-Mail:</label> 
        <div>
          <Field name="email" component={"input"} label="E-Mail: " className="twelve wide field"/> <p style={{display: "inline", fontSize:"15px"}}>@sabanciuniv.edu</p>
        </div>
        <Field name="name" component={this.renderInput} label="Name: " />
        <Field name="number" component={this.renderInput} label="Number: " />
        <label style={{fontWeight: "bold"}}>Role:</label> 
        <div>
          <label>
            <Field name="role" component={"input"} type="radio" value="TA" />{' '}
            TA
          </label> <br></br>
          <label>
            <Field name="role" component="input" type="radio" value="LA" />{' '}
            LA
          </label>
        </div> <br></br>
        <label style={{fontWeight: "bold"}}>Work Hours:</label> 
        <div>
          <label>
            <Field name="hours" component="input" type="radio" value="10" />{' '}
            10
          </label> <br></br>
          <label>
            <Field name="hours" component="input" type="radio" value="20" />{' '}
            20
          </label>
        </div> <br></br>
        <Field name="score" component={this.renderInput} label="Score: " />
        <label style={{fontWeight: "bold"}}>Term:</label>
        <div style={{width: "845px"}}>
          <Field name="term" component="select">
            <option />
            <option value="2019-2020 Spring">2019-2020 Spring</option>
            <option value="2019-2020 Fall">2019-2020 Fall</option>
            <option value="2018-2019 Summer">2018-2019 Summer</option>
          </Field>
        </div><br></br>      
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate  = formValues => {
  const errors = {};
 
  if(!formValues.number) {
    errors.number = `You must enter a number`;
  }

  if(!formValues.role) {
    errors.role = "You must enter a role";
  }
  return errors;
}

export default reduxForm({
  form: "CreateStudentForm",
  validate
})(CreateStudentForm);