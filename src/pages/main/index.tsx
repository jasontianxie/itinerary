import React from "react";
import style from "./index.scss";
import "./index.noneModules.css";
import { CarouselCustom } from "../../components/carousel";
import { config } from "../../common/ajaxConfig.js";
import ListItem from "../../components/listItem";
import axios from "axios";
import { Tabs, DatePicker, Form, Button, AutoComplete, Input, List, Avatar, Icon , Dropdown, Menu} from "antd";
import { Provider, connect } from "react-redux";
import { getSearchData } from "../../../redux/actions/mainPageState.js";
import {checkLogin} from "../../utils/checkLogin.js";

let a = style;
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Search = Input.Search;
let timerHandler: any = null;
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
const listData: any[] = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  });
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">1st menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">2nd menu item</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">3rd menu item</a>
    </Menu.Item>
  </Menu>
);

class DecorateMain extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      carouselData: [1, 2, 3, 4, 5],
      dataSource: [],
    };
    this.datePickerOnChange = this.datePickerOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }
  public componentWillMount() {
    this.fetchCarouselData();
  }
  public fetchCarouselData() {
    axios.get(config.mainDomain + "/mainPageSlideData").then((response) => {
      this.setState({ carouselData: response.data })
    })
      .catch((error) => {
        console.log(error);
      });
  }
  public datePickerOnChange(date: any, dateString: any) {
    console.log(date, dateString);
  }
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }
  public handleSearch = (index: number, value: any) => {

    if (timerHandler) {
      window.clearTimeout(timerHandler);
    }
    if (value === "") {
      return;
    }
    timerHandler = window.setTimeout(() => {
      this.props.handleSearch(index, value);
    }, 1000); // search delay for 1 second
  }
  public onSelect(value: any) {
    console.log("onSelect", value);
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { searchResult, logged } = this.props;

    return (
      <div styleName="style.wrap">
        <div styleName="style.header">
          <div styleName="style.headerTop">
          </div>
          <CarouselCustom slideData={this.state.carouselData} />
          <div styleName="style.tabWrap">
            <Tabs type="card">
              <TabPane tab="看别人" key="2">
                <Search
                  placeholder="输入想去的目的地"
                  onSearch={(value) => console.log(value)}
                  enterButton
                />
              </TabPane>
              <TabPane tab="自己去" key="1">
                <Form onSubmit={this.handleSubmit}>
                  <FormItem label="输入起止时间：" {...formItemLayout}>
                    {getFieldDecorator("startEndDateTime", {
                      rules: [{
                        required: true, message: "请输入起止时间!",
                      }],
                    })(
                      <RangePicker onChange={this.datePickerOnChange} showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={["开始时间", "结束时间"]} />
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="输入出发点名称：">
                    {getFieldDecorator("startSpot", {
                      rules: [{
                        required: true, message: "请输入出发点名称!",
                      }],
                    })(
                      <AutoComplete
                        dataSource={searchResult.dataSource1}
                        style={{ width: 350 }}
                        onSelect={this.onSelect}
                        onSearch={(value) => this.handleSearch(1, value)}
                        placeholder="开始地点名称"
                      />,
                    )}
                  </FormItem>
                  <FormItem {...formItemLayout} label="输入到达点名称：">
                    {getFieldDecorator("endSpot", {
                      rules: [{
                        required: true, message: "请输入到达点名称!",
                      }],
                    })(
                      <AutoComplete
                        dataSource={searchResult.dataSource2}
                        style={{ width: 350 }}
                        onSelect={this.onSelect}
                        onSearch={(value) => this.handleSearch(2, value)}
                        placeholder="结束地点名称"
                      />,
                    )}
                  </FormItem>
                  <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">快速搜索</Button>
                    <Button type="default" htmlType="submit" style={{marginLeft: "20px"}}>高级定制</Button>
                  </FormItem>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div styleName="style.content">
          <div styleName="style.contentHeader">
            {(!!logged.data || checkLogin()) ? <Button href="/#/second" target="_blank">写游记</Button> : null}
          </div>
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
              renderItem={(item: any) => (
                <ListItem item={item} />
              )}
            />
          </div>
        </div>
      </div>);
  }
}
const Main = Form.create()(DecorateMain);
const mapStateToProps = (state: any) => {
  return({
  searchResult: state.mainPageState,
  logged: state.login,
}); };
const mapDispatchToProps = (dispatch: any) => ({
  handleSearch: (index: number, value: string) => dispatch(getSearchData(index, value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
