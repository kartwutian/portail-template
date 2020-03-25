import React, { PureComponent } from "react";
import WithDva from "../utils/store";

class Page extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log("init");
    this.initMediaQuery();
  }

  /**
   * 组件销毁时，需要销毁相应实例
   */
  componentWillUnmount() {
    this.destoryMediaQuery();
  }

  initMediaQuery() {
    const {
      global: { screen },
      dispatch
    } = this.props;
    const enquire = (this.enquire = require("enquire.js"));
    enquire.register("screen and (max-width: 480px)", {
      match: () => {
        // console.log("mobile");
        if (screen === "mobile") return;
        dispatch({
          type: "global/updateState",
          payload: {
            screen: "mobile"
          }
        });
      }
    });
    enquire.register("screen and (min-width: 481px) and (max-width: 767px)", {
      match: () => {
        // console.log("mini");
        if (screen === "mini") return;
        dispatch({
          type: "global/updateState",
          payload: {
            screen: "mini"
          }
        });
      }
    });
    enquire.register("screen and (min-width: 768px) and (max-width: 980px)", {
      match: () => {
        // console.log("small");
        if (screen === "small") return;
        dispatch({
          type: "global/updateState",
          payload: {
            screen: "small"
          }
        });
      }
    });
    enquire.register("screen and (min-width: 981px) and (max-width: 1200px)", {
      match: () => {
        // console.log("middle");
        if (screen === "medium") return;
        dispatch({
          type: "global/updateState",
          payload: {
            screen: "medium"
          }
        });
      }
    });
    enquire.register("screen and (min-width: 1201px)", {
      match: function() {
        console.log("large");
        if (screen === "large") return;
        dispatch({
          type: "global/updateState",
          payload: {
            screen: "large"
          }
        });
      } // OPTIONAL
      // If supplied, triggered when the media query transitions
      // *from an unmatched to a matched state*

      // unmatch: function() {
      //   console.log("unmatch");
      // }, // OPTIONAL
      // If supplied, triggered when the media query transitions
      // *from a matched state to an unmatched state*.
      // Also may be called when handler is unregistered (if destroy is not available)

      // setup: function() {
      //   console.log("setup");
      // }, // OPTIONAL
      // If supplied, triggered once immediately upon registration of the handler

      // destroy: function() {
      //   console.log("destroy");
      // }, // OPTIONAL
      // If supplied, triggered when handler is unregistered. Place cleanup code here

      // deferSetup: true // OPTIONAL, defaults to false
      // If set to true, defers execution the setup function
      // until the media query is first matched. still triggered just once
    });
  }

  destoryMediaQuery() {
    this.enquire.unregister("screen and (max-width: 480px)");
    this.enquire.unregister(
      "screen and (min-width: 481px) and (max-width: 767px)"
    );
    this.enquire.unregister(
      "screen and (min-width: 768px) and (max-width: 980px)"
    );
    this.enquire.unregister(
      "screen and (min-width: 981px) and (max-width: 1200px)"
    );
    this.enquire.unregister("screen and (min-width: 1201px)");
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default WithDva(({ global }) => {
  return { global };
})(Page);
