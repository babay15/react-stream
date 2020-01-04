import React from "react";
import { connect } from "react-redux";
import StreamForm from "./Forms/StreamForm";
import _ from "lodash";

import { getStream, patchStream } from "../../actions/index";

class StreamEdit extends React.Component {
  componentDidMount = () => {
    this.props.getStream(this.props.match.params.id);
  };

  renderCheckUser = () => {
    if (this.props.stream && this.props.currentUser) {
      if (this.props.currentUser === this.props.stream.userName) {
        return (
          <div>
            <StreamForm
              onSubmit={(streamValue) =>
                this.props.patchStream(this.props.stream.id, streamValue)
              }
              initialValues={_.pick(this.props.stream, [
                "streamTitle",
                "streamDescription"
              ])}
            />
          </div>
        );
      } else {
        return <h2>Oops! Can't find anything!</h2>;
      }
    }

    return <h2>Loading</h2>;
  };

  render() {
    return <div>{this.renderCheckUser()}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentUser: state.user.userName
  };
};

export default connect(mapStateToProps, {
  patchStream,
  getStream
})(StreamEdit);
