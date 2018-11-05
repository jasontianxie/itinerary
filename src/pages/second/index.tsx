import * as React from 'react';
import './index.scss';
import { List, Form, Input, DatePicker, Button } from 'antd';

const data = [
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
];
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class Second extends React.Component<any,any> {
    constructor(props:any){
      super(props);
      this.datePickerOnChange = this.datePickerOnChange.bind(this);
    }
    componentWillMount(){
      document.title = '新增游记'
    }
    handleSubmit(){

    }
    datePickerOnChange(date: any, dateString: any) {
      console.log(date, dateString);
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      const formItemLayoutTwoInRow = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

      return (
      <div className="wrap">
        <div styleName="detailRecord">这里是写游记区域</div>
          <div styleName="itinerary">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                label="出发地"
                {...formItemLayout}
              >
                {getFieldDecorator('startSpot', {
                  rules: [ {
                    required: true, message: '输入出发地!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="目的地"
                {...formItemLayout}
              >
                {getFieldDecorator('endSpot', {
                  rules: [ {
                    required: true, message: '输入目的地!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                label="行程时间"
                {...formItemLayout}
              >
                {getFieldDecorator('startEndDateTime', {
                      rules: [{
                        required: true, message: '请输入起止时间!',
                      }],
                    })(
                      <RangePicker onChange={this.datePickerOnChange} showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} />
                    )}
              </FormItem>
              <FormItem
                label="耗时"
                {...formItemLayoutTwoInRow}
              >
                222
              </FormItem>
              <FormItem
                label="等待时间"
                {...formItemLayout}
              >
                {getFieldDecorator('waitHours', {})(
                  <Input styleName="waitTime"/>
                )}<span>小时</span>
                {getFieldDecorator('waitMinutes', {})(
                  <Input styleName="waitTime"/>
                )}<span>分钟</span>
              </FormItem>
              <FormItem
                label="交通工具"
                {...formItemLayoutTwoInRow}
              >
                222
              </FormItem>
              <FormItem
                label="费用"
                {...formItemLayoutTwoInRow}
              >
                222
              </FormItem>
              <FormItem
                label="备注"
                {...formItemLayout}
              >
                222
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                  </FormItem>
            </Form>
            <List
            dataSource={data}
            renderItem={(item:any) => (
            <List.Item>
              <div>出发地：{item.startSpot}</div>
              <div>目的地：{item.endSpot}</div>
              <div>出发时间：{item.startTime}</div>
              <div>到达时间：{item.endTime}</div>
              <div>耗时：{item.spentTime}</div>
              <div>等待时间：{item.waitTime}</div>
              <div>交通工具：{item.vehicle}</div>
              <div>费用：{item.cost}</div>
              <div>备注：{item.comments}</div>
            </List.Item>
          )}
          />
        </div>
      </div>
      )
    }
  }

  export default Form.create()(Second);
  // export {Second};