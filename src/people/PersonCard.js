import React, { Component } from "react";
import { Row, Col } from "react-flexbox-grid";

export const USER_ROLE = {
  member: "member",
  admin: "admin",
};
export class PersonCard extends Component {
  edit = e => {
    this.props.edit(this.props.person);
  };
  render() {
    let { person } = this.props;
    let isAdmin = person.get("userRole") === USER_ROLE.admin;
    return (
      <Row className="card">
        <Col className="photo" xs={4} sm={2} md={1}>
          <img src={person.img || "/user.png"} alt={"profile"} />
        </Col>
        <Col className="detail" xs={8} sm={10} md={11}>
          <Row className="title" start="xs">
            <Col xs={12}>
              <span className="user-link" onClick={this.edit}>{`${person.get("firstName") || ""} ${person.get(
                "lastName",
              ) || ""} ${isAdmin ? "(admin)" : ""}`}</span>
            </Col>
          </Row>
          <Row className="light-grey" start="xs">
            <Col xs={12}>{`${person.get("phone")}`}</Col>
          </Row>
          <Row className="light-grey" start="xs">
            <Col xs={12}>{`${person.get("email")}`}</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
