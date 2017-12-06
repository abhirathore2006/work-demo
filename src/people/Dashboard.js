import React, { Component } from "react";
import { PersonCard } from "./PersonCard";
import { Grid, Row, Col } from "react-flexbox-grid";
import FA from "react-fontawesome";
export class PeopleDashboard extends Component {
  render() {
    let people = [];
    this.props.people.forEach((p, key) => {
      people.push(<PersonCard {...this.props} key={key} person={p} />);
    });
    return (
      <Grid className="app-container list">
        <FA className="corner icon" name="plus" size="2x" onClick={this.props.add} />
        <Row>
          <Col xs={12}>
            <h2>
              Team Members <br /> <span>You Have {people.length} team members</span>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>{people}</Col>
        </Row>
      </Grid>
    );
  }
}
