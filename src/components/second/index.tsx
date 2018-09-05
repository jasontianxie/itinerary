import * as React from 'react';
import './index.scss';

class Second extends React.Component {
    render() {
      return <div className="wrap">
      <div styleName="h1">Hello second blue component</div>
      <div styleName="h2">Hello yellow purple component </div>
      </div>;
    }
  }
  export {Second};