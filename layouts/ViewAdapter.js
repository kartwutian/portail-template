import React, { Fragment, Component } from "react";
import withDva from "../utils/store";

class ViewAdapter extends Component {
  render() {
    const {
      mobile,
      mini,
      small,
      medium,
      large,
      children,
      global: { screen }
    } = this.props;
    const largeView = large || children;
    const mediumView = medium || largeView;
    const smallView = small || mediumView;
    const miniView = mini || smallView;
    const mobileView = mobile || miniView;
    console.log(screen);
    console.log(this.props);

    return (
      <Fragment>
        {screen === "mobile" && mobileView}
        {screen === "mini" && miniView}
        {screen === "small" && smallView}
        {screen === "medium" && medium}
        {screen === "large" && largeView}
      </Fragment>
    );
  }
}

export default withDva(({ global }) => ({ global }))(ViewAdapter);
