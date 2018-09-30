import * as React from 'react';
import style from './index.scss';
// const style = require('./index.scss');
import '../../images/set.svg';
import '../../images/form.svg';
import './set.svg';
import pic from '../../images/111.jpg';

let a = style;

class Main extends React.Component {
    render() {
      return <div className="wrap">
      <div styleName="style.h1">Hello main red component11111 <svg><use xlinkHref="#main-set"/></svg><input placeholder="synchronous"/></div>
      <div styleName="style.h2">Hello main green component <img src={pic}/><svg><use xlinkHref="#images-form"/></svg><input placeholder="synchronous"/></div>
      </div>;
    }
  }
  export {Main};