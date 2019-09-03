import React from "react";
import withQuery from "@components/withQuery";
import Label from "@components/Label";
import Section from "@components/Section";

@withQuery
export default class User extends React.Component {
  render() {
    const { title, value } = this.props.query;
    return (
      <Section title="Label">
        <Label title={title} value={value} />
      </Section>
    )
  }
}