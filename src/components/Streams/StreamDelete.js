import React from "react";
import { connect } from "react-redux";
import { getStream, deleteStream } from "../../actions/index";
import history from "../../history";
import Modal from "../Modal";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  onCancelDelete = () => {
    history.push("/streams/mystream");
  };

  onDeleteStream = () => {
    this.props.deleteStream(this.props.stream.id);
  };

  handleParentModalClick = () => {
    history.push("/streams/mystream");
  };

  renderToModalHeader = () => {
    return <div>Delete Stream</div>;
  };

  renderToModalContent = () => {
    return (
      <div>
        Are You Sure You Want To Delete{" "}
        <strong>{this.props.stream.streamTitle}</strong> ?
      </div>
    );
  };

  renderToModalActions = () => {
    return (
      <React.Fragment>
        <button className='ui button negative' onClick={this.onDeleteStream}>
          Yes
        </button>
        <button className='ui button gray' onClick={this.onCancelDelete}>
          No
        </button>
      </React.Fragment>
    );
  };

  renderCheckUser = () => {
    if (this.props.stream.userName && this.props.currentUser) {
      if (this.props.currentUser === this.props.stream.userName) {
        return (
          <div>
            <Modal
              renderToModalHeader={this.renderToModalHeader()}
              renderToModalContent={this.renderToModalContent()}
              renderToModalActions={this.renderToModalActions()}
              handleParentModalClick={this.handleParentModalClick}
            />
          </div>
        );
      } else {
        return <h2>Oops! Can't find anything!</h2>;
      }
    }
  };

  render() {
    if (this.props.stream) {
      return <div>{this.renderCheckUser()}</div>;
    }

    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUser: state.user.userName
  };
};

export default connect(mapStateToProps, {
  getStream,
  deleteStream
})(StreamDelete);
