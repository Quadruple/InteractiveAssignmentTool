import React from "react";
import { connect } from "react-redux";
import { createTime } from "../../actions";
import FormTime from "../FormTime";

class CreateTime extends React.Component {
  onSubmit = formValues => {
    this.props.createTime(formValues);
  }

  render() {
    return (
      <div>
        <h2>Add a time preference</h2>
        <FormTime onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createTime })(CreateTime);