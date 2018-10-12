import * as React from 'react';
import { Carousel } from 'antd';
import './index.noneModules.css';
import style from './index.scss';

let varStyle = style;

interface SlideInfo {
    pic:string
    href:string
    description:string
}

interface PropsStyle {
    slideData: (number | SlideInfo)[]
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
                  return (<div styleName='style.imgWrap' key={index}>
                      {typeof (item) === 'number' ? 'Loading' : <a href={item.href}><img src={item.pic} alt="" /></a>}
                  </div>);
            })} 
        </Carousel>
      </div>);
    }
  }
  export { CarouselCustom };