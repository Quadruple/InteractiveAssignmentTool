import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import { Link } from "react-router-dom";
import history from "../history";

class LoginScreen extends React.Component {
  renderIfLoggedIn() {
    switch(this.props.userType) {
      case "ADMIN":
        history.push("/admin");
        return <Link to="/instructor" className="item"> Instructor Page</Link>
      case "INSTRUCTOR":
        history.push("/instructor");
        return <Link to="/instructor" className="item"> Instructor Page</Link>
      case "STUDENT":
        history.push("/student");
        return <Link to="/student" className="item"> Student Page</Link>
      default:
        return <div>Something went wrong :(</div>;
    }
  }

  render() {
    return (
      <div>
        <h3>Interactive assignment tool is a...</h3>
        <h4> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ipsum ac turpis vehicula varius nec a est. Aliquam a sodales augue, vel ultrices diam. Duis at mauris dapibus, luctus arcu vel, tempus orci. Vestibulum eget maximus mauris, vitae porta nunc. Proin tempor libero sit amet purus fringilla placerat. Quisque ex libero, molestie sed venenatis eget, vehicula et elit. Cras sed lorem augue.
        Aliquam sollicitudin est sed est mattis, non mattis justo laoreet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut enim ligula, finibus ac risus ac, vestibulum ullamcorper augue. Nunc viverra libero tortor, nec malesuada dui gravida maximus. Suspendisse id ultricies turpis. Curabitur blandit nibh sollicitudin sem placerat bibendum sit amet id est. Suspendisse quis ultricies metus, et lacinia urna. Vivamus non nisl mollis, imperdiet augue et, posuere felis. </h4>
        <h4>Added Features: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ipsum ac turpis vehicula varius nec a est. </h4>
        <h4>Latest Bug Fixes: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ipsum ac turpis vehicula varius nec a est. </h4> <br></br> <br></br>
        <h3>Please Log In to use Interactive Assignment Tool</h3>
        <img style={{width: "25%", margin: "auto", display: "block"}} src="http://www.vektorelcizimsitesi.com/wp-content/uploads/2019/01/Sabanci-Universitesi-Vekt%C3%B6rel-%C3%87izim-Logo-736x414.jpg" alt="Italian Trulli"></img>
      
        <div style={{fontSize: "40px", textAlign: "center"}}>
          {this.props.isSignedIn && this.renderIfLoggedIn()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    isSignedIn: state.auth.isSignedIn,
    userType: state.auth.userType
  }
}

export default connect(mapStateToProps, { signIn, signOut })(LoginScreen);