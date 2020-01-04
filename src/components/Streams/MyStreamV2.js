import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import { getAllStreams, clearStream, deleteStream } from "../../actions/index";

class MyStreamV2 extends React.Component {
  state = {
    activeModal: false
  };

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
            <button
              onClick={() => this.setState({ activeModal: true })}
              className='ui right floated negative button'
            >
              Delete
            </button>
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
            <div>
              {this.renderModal(
                () => this.renderToModalHeader(),
                () => this.renderToModalContent(stream.streamTitle),
                () => this.renderToModalActions(stream.id),
                stream.id
              )}
            </div>
          </div>
        );
      }

      return null;
    });
  };

  renderToModalHeader = () => {
    return <div>Delete Stream</div>;
  };

  renderToModalContent = (streamTitle) => {
    return (
      <div>
        Are You Sure You Want To Delete <strong>{streamTitle}</strong> ?
      </div>
    );
  };

  renderToModalActions = (streamId) => {
    return (
      <React.Fragment>
        <button
          className='ui button negative'
          onClick={() => this.props.deleteStream(streamId)}
        >
          Yes
        </button>
        <button
          className='ui button gray'
          onClick={() => this.setState({ activeModal: false })}
        >
          No
        </button>
      </React.Fragment>
    );
  };

  renderModal(renderToModalHeader, renderToModalContent, renderToModalActions) {
    if (this.state.activeModal) {
      return (
        <div>
          <Modal
            renderToModalHeader={renderToModalHeader()}
            renderToModalContent={renderToModalContent()}
            renderToModalActions={renderToModalActions()}
            handleParentModalClick={() =>
              this.setState({
                activeModal: false
              })
            }
          />
        </div>
      );
    }
  }

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

export default connect(mapStateToProps, {
  getAllStreams,
  clearStream,
  deleteStream
})(MyStreamV2);
