import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import history from "../history";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId: '976909452236-aesh2ots06cpm2a5jjubr4b47sn19ftv.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if(isSignedIn) {
      console.log(this.auth.currentUser.get());

      console.log(this.auth.currentUser.get().Tt);
      //console.log(this.auth.currentUser.get().Tt.zu);
      console.log(this.auth.currentUser.get().getId());  

      const userMail = this.auth.currentUser.get().Tt.Du;
      console.log("GoogleAuth:", userMail);
      this.props.signIn(userMail);
            
    } else {
      this.props.signOut();
      history.push("/");
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }
  
  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
        return (
          <button className="ui yellow google button" onClick={this.onSignOutClick}>
            <i className="google icon" />
            Log Out
          </button>
        );
    } else {
        return (
          <button className="ui green google button" onClick={this.onSignInClick}>
            <i className="google icon" />
            Log In
          </button>
      );
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);