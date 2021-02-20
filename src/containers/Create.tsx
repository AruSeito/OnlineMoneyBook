import React from "react";

interface IState {
  type: "income" | "outcome";
}

export default class Create extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      type: "income",
    };
  }
  render() {
    return <div>Create Page{this.props.match.params.id}</div>;
  }
}
