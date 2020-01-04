import React from "react";
import { connect } from "react-redux";

import { postStream } from "../../actions/index";
import StreamForm from "./Forms/StreamForm";

class StreamCreate extends React.Component {
  render = () => {
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm
          onSubmit={(formValues) => this.props.postStream(formValues)}
        />
      </div>
    );
  };
}

export default connect(null, { postStream })(StreamCreate);
