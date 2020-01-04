import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import GoogleAuth from "../GoogleAuth";

class Header extends React.Component {
  render() {
    if (!this.props.currentId) {
      return (
        <div>
          <div className='ui secondary pointing menu'>
            <NavLink to='/' exact={true} className='item'>
              Home
            </NavLink>
            <div className='right menu'>
              <label className='ui item'>{this.props.currentUser}</label>
              <NavLink to='/'>
                <GoogleAuth />
              </NavLink>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='ui secondary pointing menu'>
            <NavLink to='/' exact={true} className='item'>
              Home
            </NavLink>
            <NavLink to='/streams/new' className='item'>
              New Stream
            </NavLink>
            <NavLink to='/streams/mystream' className='item'>
              My Streams
            </NavLink>
            <div className='right menu'>
              <label className='ui item'>{this.props.currentUser}</label>
              <NavLink to='/'>
                <GoogleAuth />
              </NavLink>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentId: state.user.userId,
    currentUser: state.user.userName
  };
};

export default connect(mapStateToProps, {})(Header);
