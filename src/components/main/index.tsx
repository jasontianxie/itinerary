import * as React from 'react';
import style from './index.scss';
// const style = require('./index.scss');
import '../../images/set.svg';
import '../../images/form.svg';
import './set.svg';
import pic from '../../images/111.jpg';

let a = style;

class Greeting extends React.Component {
    render() {
      return <div className="wrap">
      <div styleName="style.h1">Hello main red component11111 <svg><use xlinkHref="#G:\git projects\itinerary\src\components\main\set.svg" x="50" y="50" /></svg><input placeholder="synchronous"/></div>
      <div styleName="style.h2">Hello main green component <img src={pic}/><svg><use xlinkHref="#G:\git projects\itinerary\src\images\form.svg" x="50" y="50" /></svg><input placeholder="synchronous"/></div>
      </div>;
    }
  }
  export {Greeting};