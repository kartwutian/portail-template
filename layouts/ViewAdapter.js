import React, { Fragment, Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('appGlobalModel')
@observer
class ViewAdapter extends Component {
  constructor(props) {
    super(props);
    this.globalStore = props.appGlobalModel;
  }

  render() {
    const { mobile, mini, small, medium, large, children } = this.props;
    const { screen } = this.globalStore;
    const largeView = large || children;
    const mediumView = medium || largeView;
    const smallView = small || mediumView;
    const miniView = mini || smallView;
    const mobileView = mobile || miniView;
    console.log(screen);
    console.log(this.props);

    return (
      <Fragment>
        {screen === 'mobile' && mobileView}
        {screen === 'mini' && miniView}
        {screen === 'small' && smallView}
        {screen === 'medium' && medium}
        {screen === 'large' && largeView}
      </Fragment>
    );
  }
}

export default ViewAdapter;
