import * as React from 'react';
import style from './index.scss';
import './index.noneModules.css';
import { CarouselCustom } from '../../components/carousel';
import { config } from '../../common/ajaxConfig.js';
import axios from 'axios';
import { Tabs, DatePicker, Form, Button, AutoComplete, Input , List, Avatar, Icon} from 'antd';

let a = style;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Search = Input.Search;
let timerHandler:any =null;
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
const listData:any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }:any) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

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
  
    if(timerHandler) {
      window.clearTimeout(timerHandler);
    }
    if(value === ''){
      this.setState({ dataSource: []});
      return;
    }
    timerHandler = window.setTimeout(()=>{
      axios.get(config.mainDomain + '/mainPageSpotsData.json?search='+value).then((response) => {
        this.setState({ dataSource: response.data })
      })
        .catch(function (error) {
          console.log(error);
        });
    },1000);//search delay for 1 second
  }
  onSelect(value: any) {
    console.log('onSelect', value);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.state;

    return (
      <div styleName="style.wrap">
        <div styleName="style.header">
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
        <div styleName="style.content">
          <div styleName="style.notification">left side pane</div>
          <div styleName="style.listWrap">
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 6,
              }}
              dataSource={listData}
              footer={<div><b>ant design</b> footer part</div>}
              renderItem={(item:any) => (
                <List.Item
                  key={item.title}
                  actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                  extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>        
        </div>
      </div>);
  }
}
const Main = Form.create()(DecorateMain);
export { Main };