import * as React from 'react';
import { Carousel } from 'antd';
import './index.noneModules.css';
import style from './index.scss';

let varStyle = style;

class CarouselCustom extends React.Component <any,any>{
    constructor(props:any){
        super(props);
        this.state = {
            slides: null
        }
    }
    componentWillMount(){

    }
    render() {
      return (<div>
        <Carousel autoplay={true}>
           {(this.state.slides || [1,2,3,4,5]).map((item:any,index:number)=>{
                return (<div styleName='style.imgWrap' key = {index}>{typeof(item) ==='number'?'Loading': <img src={item.pic} alt=""/>}</div>);
            })} 
        </Carousel>
      </div>);
    }
  }
  export { CarouselCustom };