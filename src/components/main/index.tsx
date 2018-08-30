import * as React from 'react';
import style from './index.scss';
// const style = require('./index.scss');

let a = style;

class Greeting extends React.Component {
    render() {
      return <div className="wrap">
      <div styleName="style.h1">Hello main red component <input placeholder="synchronous"/></div>
      <div styleName="style.h2">Hello main green component <input placeholder="synchronous"/></div>
      </div>;
    }
  }
  export {Greeting};