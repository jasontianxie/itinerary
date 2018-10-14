import * as React from 'react';
import style from './index.scss';
import './index.noneModules.css';
import { CarouselCustom } from '../../components/carousel';
import {config} from '../../common/ajaxConfig.js';
import axios from 'axios';

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
    axios.get(config.mainDomain+'/mainPageSlideData.json').then( (response) => {
      this.setState({carouselData:response.data})
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