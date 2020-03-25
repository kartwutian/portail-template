import React from 'react';
import { observer, inject } from 'mobx-react';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {11}/{11}
      </div>
    );
  }
}
