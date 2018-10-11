import * as React from 'react';
import { Carousel } from 'antd';
import './index.noneModules.css';
import style from './index.scss';

let varStyle = style;
interface PropsStyle {
    slideData:any[]
}
class CarouselCustom extends React.Component <PropsStyle,any>{
    constructor(props:PropsStyle){
        super(props);
    }
    render() {
        const {slideData} = this.props;
      return (<div>
        <Carousel autoplay={true}>
           {slideData.map((item:any,index:number)=>{
                return (<div styleName='style.imgWrap' key = {index}>{typeof(item) ==='number'?'Loading': <img src={item.pic} alt=""/>}</div>);
            })} 
        </Carousel>
      </div>);
    }
  }
  export { CarouselCustom };