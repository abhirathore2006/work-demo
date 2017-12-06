import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions } from "./AppAction";
import { Loader } from "../common";
import { PeopleDashboard } from "../people/Dashboard";
import { Grid, Row, Col } from "react-flexbox-grid";
import PersonForm from "../people/PersonForm";
import { Map } from "immutable";
export const VIEW = {
  LIST: 0,
  ADD: 1,
  EDIT: 2,
};
class App extends Component {
  constructor(props) {
    super(props);
    this.action = bindActionCreators(Object.assign({}, actions), props.dispatch);
  }
  componentDidMount() {
    this.action.getTeamMembers();
  }
  getView() {
    switch (this.props.view) {
      case VIEW.LIST: {
        return <PeopleDashboard add={this.add} edit={this.edit} people={this.props.people} />;
      }
      case VIEW.EDIT: {
        return <PersonForm delete={this.delete} exit={this.exitAddEdit} onSubmit={this.save} />;
      }
      case VIEW.ADD: {
        return <PersonForm exit={this.exitAddEdit} onSubmit={this.save} />;
      }
      // no default
    }
  }
  edit = person => {
    this.action.AddOrEdit(person, VIEW.EDIT);
  };
  add = () => {
    this.action.AddOrEdit(
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userRole: "member",
        img: null,
      },
      VIEW.ADD,
    );
  };
  exitAddEdit = () => {
    this.action.changeView(VIEW.LIST);
  };
  save = person => {
    person.id = person.id || this.props.people.size + 1;
    this.action.update(Map(person), "SAVE");
  };
  delete = () => {
    this.action.update(this.props.person, "DELETE");
  };
  render() {
    return (
      <div className="App">
        <Loader show={this.props.isLoading} />
        <header className="App-header">
          <h1 className="App-title">Welcome to Team App</h1>
        </header>
        <Grid>
          <Row>
            <Col className="app-box" xs={12} sm={10} smOffset={1} lg={8} lgOffset={2}>
              {this.getView()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export const mapStateToProps = (state, ownProps) => ({
  people: state.app.get("people"),
  isLoading: state.app.get("isLoading"),
  view: state.app.get("view"),
  person: state.app.get("person"),
});
export default connect(mapStateToProps)(App);
