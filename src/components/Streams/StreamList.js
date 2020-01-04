import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllStreams, clearStream, getUser } from "../../actions/index";

class StreamList extends React.Component {
  componentDidMount = () => {
    this.props.clearStream();
    this.props.getAllStreams();
  };

  renderCreateStream = () => {
    if (this.props.isSignedIn) {
      return (
        <Link to='/streams/new' className='ui right floated primary button'>
          Create New Stream
        </Link>
      );
    }
  };

  renderUserInfo = (streams) => {
    if (streams.userName === this.props.userName) {
      return (
        <div className='extra'>
          <div className='ui right floated content'>
            <Link to={"/streams/mystream"} className='desciprtion'>
              My Stream
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className='extra'>
          <div className='ui right floated content'>
            <div className='desciprtion'>{streams.userName}</div>
          </div>
        </div>
      );
    }
  };

  renderListOfStreams = (streams) => {
    return streams.map((stream) => {
      if (stream.id) {
        return (
          <div className='item' key={stream.id}>
            {this.renderUserInfo(stream)}
            <i className='large middle aligned icon camera' />
            <div className='middle aligned content'>
              <Link to={`/streams/show/${stream.id}`} className='header'>
                {stream.streamTitle}
              </Link>
              <div className='description'>{stream.streamDescription}</div>
            </div>
          </div>
        );
      }

      return null;
    });
  };

  render() {
    return (
      <div>
        {this.renderCreateStream()}
        <h2>Stream List</h2>
        <div className='ui celled list'>
          {this.renderListOfStreams(this.props.streams)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    isSignedIn: state.auth.isSignedIn,
    userName: state.user.userName
  };
};

export default connect(mapStateToProps, {
  getAllStreams,
  clearStream,
  getUser
})(StreamList);
