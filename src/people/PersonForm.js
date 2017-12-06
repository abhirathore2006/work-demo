import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Grid, Row, Col } from "react-flexbox-grid";
import FA from "react-fontawesome";

const required = value => (value ? undefined : "Required");
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;

const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
  <div>
    {label ? <label>{label}</label> : null}
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class PersonFormComponent extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Grid className="app-container list">
        <FA className="corner icon" name="close" size="2x" onClick={this.props.exit} />
        <Row start="xs">
          <Col xs={12}>
            <h2>
              {this.props.isEdit ? "Edit team member" : "Add a team member"}
              <br />
              <span>{this.props.isEdit ? "Edit contact info, location and  role" : "Set email,locaton and role"}</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <h3>Info</h3>
              <Field
                name="firstName"
                validate={[required]}
                component={renderField}
                type="text"
                placeholder="First Name"
              />
              <Field
                name="lastName"
                validate={[required]}
                component={renderField}
                type="text"
                placeholder="Last Name"
              />
              <Field
                name="email"
                validate={[required, email]}
                component={renderField}
                type="text"
                placeholder="Email"
              />
              <Field name="phone" validate={[required]} component={renderField} type="text" placeholder="Phone" />

              <h3>Role</h3>
              <div>
                <div>
                  <label>
                    <Field name="userRole" component="input" type="radio" value="member" />
                    Regular - Can't delete members
                  </label>
                  <label>
                    <Field name="userRole" component="input" type="radio" value="admin" />
                    Admin - Can delete members
                  </label>
                </div>
              </div>
              <div>
                {this.props.delete ? (
                  <button type="button" onClick={this.props.delete}>
                    Delete
                  </button>
                ) : null}
                <button type="submit" disabled={pristine || submitting}>
                  Submit
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
let PersonForm = reduxForm({
  form: "person", // a unique identifier for this form
})(PersonFormComponent);

// You have to connect() to any reducers that you wish to connect to yourself
const PersonForm1 = connect(state => ({
  initialValues: state.app.get("person").toJS(),
}))(PersonForm);

export default PersonForm1;
