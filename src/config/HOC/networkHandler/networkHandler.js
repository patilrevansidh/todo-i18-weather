import React from "react";

export function withNetworkHandler(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <WrappedComponent networkStatus={"HOC Demonstration"} {...this.props} />
      );
    }
  };
}
