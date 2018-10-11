import * as React from 'react';
import style from './index.scss';
import  './index.noneModules.css';
import { CarouselCustom } from '../../components/carousel';
// import aa from '../../images/15380434541828.jpeg';
// import ab from '../../images/15381044615697.jpeg';
// import ac from '../../images/15381045921996.jpeg';
// import ad from '../../images/15381046688621.jpeg';
// import ae from '../../images/15381048978867.jpeg';

let a = style;
class Main extends React.Component {
  render() {
    return (<div styleName="style.wrap">
      <CarouselCustom/>
    </div>);
  }
}
export { Main };