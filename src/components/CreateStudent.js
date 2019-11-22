import React from "react";
import { connect } from "react-redux";
import { createStudent } from "../actions";
import Form from "./Form";

class CreateStudent extends React.Component {
  onSubmit = formValues => {
    this.props.createStudent(formValues);
  }

  render() {
    return (
      <div>
        <h2>Create a stream!</h2>
        <Form onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStudent })(CreateStudent);