import * as React from 'react';
import './index.scss';
import { List, Form, Input, InputNumber, DatePicker, Button, Col, Select } from 'antd';
import {LazyOptions} from '../../components/cascader'

const data = [
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
  {startSpot:'chonging',endSpot:'chengdu',startTime:'2018-11-01 12:00:00',endTime:'2018-11-01 13:00:00',spentTime:'0d1h0m0s',waitTime:'1h',vehicle:'高铁',cost:'100RMB',comments:''},
];
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;

class Second extends React.Component<any,any> {
    constructor(props:any){
      super(props);
      this.state = {
        waitTimeHours:0,
        waitTimeMinutes:0,
        cost:0
      }
      this.datePickerOnChange = this.datePickerOnChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setWaitTimeHours = this.setWaitTimeHours.bind(this);
      this.setWaitTimeMinutes = this.setWaitTimeMinutes.bind(this);
      this.setCost = this.setCost.bind(this);
    }
    componentWillMount(){
      document.title = '新增游记'
    }
    handleSubmit(e:any){
      // e.persist();
      e.preventDefault();
      console.log(this.state);
    }
    datePickerOnChange(date: any, dateString: any) {
      console.log(date, dateString);
    }
    setWaitTimeHours(value:any){
      this.setState({waitTimeHours:value})
    }
    setWaitTimeMinutes(value:any){
      this.setState({waitTimeMinutes:value})
    }
    setCost(value:any){
      this.setState({cost:value})
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 18,
            offset: 6,
          },
        },
      };

      return (
      <div className="wrap">
        <div styleName="detailRecord">this panel is for itinerary details</div>
          <div styleName="itinerary">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                label="选择出发地"
                {...formItemLayout}
              >
                <LazyOptions />
              </FormItem>
              <FormItem
                label="出发地具体名称"
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
                label="选择目的地"
                {...formItemLayout}
              >
                <LazyOptions />
              </FormItem>
              <FormItem
                label="目的地具体名称"
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
                {...formItemLayout}
              >
                222
              </FormItem>
              <FormItem
                label="等待时间"
                {...formItemLayout}
              >
                <Col span={6}>
                  <FormItem>
                    <InputNumber styleName="waitTime" min={0} onChange={this.setWaitTimeHours} defaultValue={0}/>
                  </FormItem>
                </Col>
                <Col span={3}>
                  <span>小时</span>
                </Col>
                <Col span={6}>
                  <FormItem>
                    <InputNumber styleName="waitTime" min={0} onChange={this.setWaitTimeMinutes} defaultValue={0}/>
                  </FormItem>
                </Col>
                <Col span={3}>
                  <span>分钟</span>
                </Col>
              </FormItem>
              <FormItem
                label="交通工具"
                {...formItemLayout}
              >
                <Select defaultValue="flight">
                  <Option value="flight">飞机</Option>
                  <Option value="train">火车</Option>
                  <Option value="CRH">高铁动车</Option>
                  <Option value="LongBus">长途汽车</Option>
                  <Option value="bus">公交车</Option>
                  <Option value="metro">地铁</Option>
                  <Option value="lightRailway">轻轨</Option>
                  <Option value="taxi">出租车</Option>
                  <Option value="drive">自驾</Option>
                  <Option value="bike">自行车</Option>
                  <Option value="moterBike">摩托车</Option>
                  <Option value="electricBike">电动车</Option>
                  <Option value="walk">步行</Option>
                  <Option value="ferry">渡船</Option>
                  <Option value="barge">游艇</Option>
                  <Option value="moterShip">快艇</Option>
                  <Option value="hangedBus">缆车</Option>
                  <Option value="carriage">马车</Option>
                  <Option value="bull-carriage">牛车</Option>
                  <Option value="others">其他</Option>
                </Select>
              </FormItem>
              <FormItem
                label="费用"
                {...formItemLayout}
              >
                <InputNumber styleName="waitTime" min={0} defaultValue={0} onChange={this.setCost}/>RMB
              </FormItem>
              <FormItem
                label="备注"
                {...formItemLayout}
              >
                <TextArea rows={4} placeholder="输入关于该行程的相关信息，比如：公交是几路车，地铁是几号线，航班号等"/>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
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