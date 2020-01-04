import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllStreams, clearStream } from "../../actions/index";

class MyStream extends React.Component {
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

  renderListOfStreams = (streams) => {
    return streams.map((stream) => {
      if (stream.userName === this.props.userName) {
        return (
          <div className='item' key={stream.id}>
            <Link
              to={`/streams/delete/${stream.id}`}
              className='ui right floated negative button'
            >
              Delete
            </Link>
            <Link
              to={`/streams/edit/${stream.id}`}
              className='ui right floated primary button'
            >
              Edit
            </Link>
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
        <h2>{this.props.userName}</h2>

        <div className='ui celled list'>
          {this.renderListOfStreams(this.props.streams)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
    streams: Object.values(state.streams),
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { getAllStreams, clearStream })(
  MyStream
);
