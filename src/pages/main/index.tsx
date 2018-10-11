import * as React from 'react';
import style from './index.scss';
import './index.noneModules.css';
import { CarouselCustom } from '../../components/carousel';
import {config} from '../../common/ajaxConfig.js';
import axios from 'axios';
// import aa from '../../images/15380434541828.jpeg';
// import ab from '../../images/15381044615697.jpeg';
// import ac from '../../images/15381045921996.jpeg';
// import ad from '../../images/15381046688621.jpeg';
// import ae from '../../images/15381048978867.jpeg';

let a = style;
class Main extends React.Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {
      carouselData:[1,2,3,4,5]
    }
  }
  componentWillMount(){
    this.fetchCarouselData();
  }
  fetchCarouselData(){
    axios.get(config.mainDomain+'/mainPageSlideData.json').then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (<div styleName="style.wrap">
              <CarouselCustom slideData={this.state.carouselData}/>
            </div>);
  }
}
export { Main };