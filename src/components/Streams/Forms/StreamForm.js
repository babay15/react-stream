import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  renderError = (meta) => {
    if (meta.touched && meta.error) {
      return <div className='ui error message'>{meta.error}</div>;
    }
  };

  renderInput = ({ input, label, meta }) => {
    const className = meta.error && meta.touched ? "field error" : "field";
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    );
  };

  renderTextArea = ({ input, label, meta }) => {
    const className = meta.error && meta.touched ? "field error" : "field";

    return (
      <div className={className}>
        <label>{label}</label>
        <textarea {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className='ui form error'
      >
        <Field
          name='streamTitle'
          type='text'
          component={this.renderInput}
          label='Title'
        />
        <Field
          name='streamDescription'
          type='text'
          component={this.renderTextArea}
          label='Description'
        />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  let errors = {};
  if (!formValues.streamTitle) {
    errors.streamTitle = "Insert a title please";
  } else {
    if (formValues.streamTitle.length <= 3) {
      errors.streamTitle = "Title must be more than three characters";
    }
  }

  if (!formValues.streamDescription) {
    errors.streamDescription = "Insert a description please";
  } else {
    if (formValues.streamDescription.length <= 5) {
      errors.streamDescription =
        "Description must be more than five characters";
    }
  }
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate: validate
})(StreamForm);

export default formWrapped;
