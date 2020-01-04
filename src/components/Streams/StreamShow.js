import React from "react";
import { connect } from "react-redux";
import { getStream } from "../../actions/index";
import flvjs from "flv.js";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer = () => {
    if (this.player || !this.props.stream) {
      return;
    }
    this.player = flvjs.createPlayer({
      type: "flv",
      url: `http://localhost:3002/liveStreamy/${this.props.match.params.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  };

  render() {
    if (!this.props.stream) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <div>
        <h1>Now Showing</h1>
        <video style={{ width: "100%" }} controls={true} ref={this.videoRef} />
        <div className='ui container'>
          <h2 className='header'>{this.props.stream.streamTitle}</h2>
          <div className='description'>
            {this.props.stream.streamDescription}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { getStream })(StreamShow);
