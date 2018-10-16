import * as React from 'react';
import style from './index.scss';
import './index.noneModules.css';
import { CarouselCustom } from '../../components/carousel';
import { config } from '../../common/ajaxConfig.js';
import axios from 'axios';
import { Tabs, DatePicker, Form, Button, AutoComplete, Input } from 'antd';

let a = style;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Search = Input.Search;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 17,
      offset: 7,
    },
  },
};

class DecorateMain extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      carouselData: [1, 2, 3, 4, 5],
      dataSource: []
    }
    this.datePickerOnChange = this.datePickerOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  componentWillMount() {
    this.fetchCarouselData();
  }
  fetchCarouselData() {
    axios.get(config.mainDomain + '/mainPageSlideData.json').then((response) => {
      this.setState({ carouselData: response.data })
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  datePickerOnChange(date: any, dateString: any) {
    console.log(date, dateString);
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSearch = (value: any) => {
    this.setState({
      dataSource: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }
  onSelect(value: any) {
    console.log('onSelect', value);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.state;

    return (<div styleName="style.wrap">
      <div>
        <CarouselCustom slideData={this.state.carouselData} />
        <div styleName="style.tabWrap">
          <Tabs type="card">
            <TabPane tab="看别人" key="2">
              <Search
                placeholder="输入想去的目的地"
                onSearch={value => console.log(value)}
                enterButton
              />
            </TabPane>
            <TabPane tab="自己去" key="1">
              <Form onSubmit={this.handleSubmit}>
                <FormItem label="输入起止时间：" {...formItemLayout}>
                  {getFieldDecorator('startEndDateTime', {
                    rules: [{
                      required: true, message: '请输入起止时间!',
                    }],
                  })(
                    <RangePicker onChange={this.datePickerOnChange} showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="输入出发点名称：">
                  {getFieldDecorator('startSpot', {
                    rules: [{
                      required: true, message: '请输入出发点名称!',
                    }],
                  })(
                    <AutoComplete
                      dataSource={dataSource}
                      style={{ width: 350 }}
                      onSelect={this.onSelect}
                      onSearch={this.handleSearch}
                      placeholder="开始地点名称"
                    />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="输入到达点名称：">
                  {getFieldDecorator('endSpot', {
                    rules: [{
                      required: true, message: '请输入到达点名称!',
                    }],
                  })(
                    <AutoComplete
                      dataSource={dataSource}
                      style={{ width: 350 }}
                      onSelect={this.onSelect}
                      onSearch={this.handleSearch}
                      placeholder="结束地点名称"
                    />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">搜索</Button>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>);
  }
}
const Main = Form.create()(DecorateMain);
export { Main };