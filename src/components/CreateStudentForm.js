import React from "react";
import { Field, reduxForm } from "redux-form";
import { fetchStudents } from "../actions";
import { connect } from "react-redux";

class CreateStudentForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
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
    formValues = { ...formValues, studentemail: formValues.studentemail + "@sabanciuniv.edu", course: this.props.instructorCourse }
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)} >
        <label style={{ fontWeight: "bold" }}>E-Mail:</label>
        <div>
          <Field name="studentemail" component={"input"} label="E-Mail: " className="twelve wide field" /> <p style={{ display: "inline", fontSize: "15px" }}>@sabanciuniv.edu</p>
        </div>
        <Field name="studentname" component={this.renderInput} label="Name: " />
        <Field name="studentnumber" component={this.renderInput} label="Number: " />
        <label style={{ fontWeight: "bold" }}>Role:</label>
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
        <label style={{ fontWeight: "bold" }}>Work Hours:</label>
        <div>
          <label>
            <Field name="workhours" component="input" type="radio" value="1" />{' '}
            1
          </label> <br></br>
          <label>
            <Field name="workhours" component="input" type="radio" value="2" />{' '}
            2
          </label> <br></br>
          <label>
            <Field name="workhours" component="input" type="radio" value="3" />{' '}
            3
          </label> <br></br>
        </div> <br></br>
        <Field name="assistantscore" component={this.renderInput} label="Score: " />
        <br></br>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.number) {
    errors.number = `You must enter a number`;
  }

  if (!formValues.role) {
    errors.role = "You must enter a role";
  }
  return errors;
}


const mapStateToProps = state => {
  return {
    students: Object.values(state.students),
    instructorCourse: state.instructorCourse.instructorCourse
  }
}

export default reduxForm({
  form: "CreateStudentForm",
  validate
})(connect(mapStateToProps, { fetchStudents })(CreateStudentForm));