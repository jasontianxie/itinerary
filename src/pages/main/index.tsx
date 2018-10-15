import * as React from 'react';
import style from './index.scss';
import './index.noneModules.css';
import { CarouselCustom } from '../../components/carousel';
import {config} from '../../common/ajaxConfig.js';
import axios from 'axios';
import { Tabs, DatePicker } from 'antd';

let a = style;
const TabPane = Tabs.TabPane;
const {  RangePicker } = DatePicker;

class Main extends React.Component<any,any> {
  constructor(props:any){
    super(props);
    this.state = {
      carouselData:[1,2,3,4,5]
    }
    this.datePickerOnChange = this.datePickerOnChange.bind(this);
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
  datePickerOnChange(date:any,dateString:any){
    console.log(date, dateString);
  }
  render() {
    return (<div styleName="style.wrap">
      <div>
        <CarouselCustom slideData={this.state.carouselData} />
        <div styleName="style.tabWrap">
          <Tabs type="card" size="small">
            <TabPane tab="Tab 1" key="1">
              <RangePicker onChange={this.datePickerOnChange} showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={['startDateTime','endDateTime']}/>
            </TabPane>
            <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
          </Tabs>
        </div>
      </div>
    </div>);
  }
}
export { Main };