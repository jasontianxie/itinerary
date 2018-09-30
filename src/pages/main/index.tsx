import * as React from 'react';
import style from './index.scss';
import  './index.noneModules.css';
import { Carousel } from 'antd';

let a = style;

class Main extends React.Component {
  render() {
    return (<div className="wrap">
      <Carousel autoplay={true}>
        <div><h3>11</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>
    </div>);
  }
}
export { Main };