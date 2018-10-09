import * as React from 'react';
import './index.scss';
import  './index.noneModules.css';
import { Carousel } from 'antd';
import aa from '../../images/15380434541828.jpeg';
import ab from '../../images/15381044615697.jpeg';
import ac from '../../images/15381045921996.jpeg';
import ad from '../../images/15381046688621.jpeg';
import ae from '../../images/15381048978867.jpeg';


class Main extends React.Component {
  render() {
    return (<div styleName="wrap">
      <Carousel autoplay={true}>
        <div><img src={aa} alt=""/></div>
        <div><img src={ab} alt=""/></div>
        <div><img src={ac} alt=""/></div>
        <div><img src={ad} alt=""/></div>
        <div><img src={ae} alt=""/></div>
      </Carousel>
    </div>);
  }
}
export { Main };