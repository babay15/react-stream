import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, getUser, clearUser } from "../actions/index";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn();
      this.props.getUser(this.auth.currentUser.get());
    } else {
      this.props.signOut();
      this.props.clearUser();
    }
  };

  onClickSignIn = () => {
    this.auth.signIn();
  };

  onClickSignOut = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className='ui gray google button' onClick={this.onClickSignOut}>
          <i className='google icon' />
          Log Out
        </button>
      );
    } else {
      return (
        <button className='ui green google button' onClick={this.onClickSignIn}>
          <i className='google icon' />
          Sign In With Google
        </button>
      );
    }
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  getUser,
  clearUser
})(GoogleAuth);
