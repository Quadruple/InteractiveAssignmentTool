import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { Link } from "react-router-dom";

class LoginScreen extends React.Component {
  renderIfLoggedIn() {
    if(this.props.isSignedIn) {
      return(
        <div>
          Welcome to Interactive Assignment Tool <br></br><br></br><br></br>
          <Link to="/login" className="item"> Login Page</Link> <br></br><br></br>
          <Link to="/instructor" className="item"> Instructor Page</Link> <br></br><br></br>
          <Link to="/student" className="item"> Student Page</Link>
        </div> 
      );
    } else {
      return <div>Please Log In to use Interactive Assignment Tool</div>
    }
  }

  render() {
    return (
      <div>
        {this.renderIfLoggedIn()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn, signOut })(LoginScreen);