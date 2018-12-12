import * as React from 'react';
import './index.scss';
import { Form, Input, InputNumber, DatePicker, Button, Col, Select, AutoComplete } from 'antd';
import { LazyOptions } from '../../components/cascader';
import axios from 'axios';
import { config } from '../../common/ajaxConfig.js';
import Cookies from 'js-cookie';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { TextArea } = Input;
let timerHandler: any = null;
const AOption = AutoComplete.Option;

class AddNewRouteForm extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            country:"中国",
            user: Cookies.get('username'),
            passord: Cookies.get('userpass'),
            userid: Cookies.get('userid'),
            itineraryid: 1,
            startSelect: [],
            endSelect: [],
            startSpot: '',
            startSpotId: '',
            endSpot: '',
            endSpotId: '',
            startTime: '',
            endTime: '',
            timeSpent: '',
            waitTimeHours: 0,
            waitTimeMinutes: 0,
            vehicle: 'flight',
            cost: 0,
            comments: '',
            dataSource1: [],
            dataSource2: [],
        }
        this.datePickerOnChange = this.datePickerOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setWaitTimeHours = this.setWaitTimeHours.bind(this);
        this.setWaitTimeMinutes = this.setWaitTimeMinutes.bind(this);
        this.setCost = this.setCost.bind(this);
        this.getlazyloadCascader = this.getlazyloadCascader.bind(this);
        this.getVehicle = this.getVehicle.bind(this);
        this.getComments = this.getComments.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }
    handleSubmit(e: any) {
        // e.persist();
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                console.log({ ...this.state, ...{ startSpot: values.startSpot, endSpot: values.endSpot } });
                this.setState({ startSpot: values.startSpot, endSpot: values.endSpot });
                axios.post(config.mainDomain + "/addNewRouteForm.json", this.state).then((response) => {
                    alert("success");
                })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }
    datePickerOnChange(date: any, dateString: any) {
        // console.log(date, dateString);
        this.setState({ startTime: dateString[0], endTime: dateString[1] })
    }
    setWaitTimeHours(value: any) {
        this.setState({ waitTimeHours: value })
    }
    setWaitTimeMinutes(value: any) {
        this.setState({ waitTimeMinutes: value })
    }
    setCost(value: any) {
        this.setState({ cost: value })
    }
    getlazyloadCascader(startSelect: number, state: any) {
        if (startSelect === 1) {
            this.setState({ startSelect: state })
        } else {
            this.setState({ endSelect: state })
        }
    }
    getVehicle(value: any) {
        this.setState({ vehicle: value })
    }
    getComments(e: any) {
        this.setState({ comments: e.target.value })
    }
    handleSearch = (index: number, value: any) => {

        if (timerHandler) {
            window.clearTimeout(timerHandler);
        }
        if (value === '') {
            this.setState({ ['dataSource' + index]: [] });
            return;
        }
        timerHandler = window.setTimeout(() => {
            axios.post(config.mainDomain + '/mainPageSpotsData.json', { value: this.state[index === 1 ? 'startSelect' : 'endSelect'].concat(value) }).then((response) => {
                this.setState({ ['dataSource' + index]: response.data ,[index === 1?'startSpotId':'endSpotId']:''})
            })
                .catch(function (error) {
                    console.log(error);
                });
        }, 1000);//search delay for 1 second
    }
    onSelect(index: number, value: any) {
        console.log('onSelect id is:', index === 1 ? 'startSpot' : 'endSpot', value);
        this.setState({ [index === 1 ? 'startSpotId' : 'endSpotId']: value })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { dataSource1, dataSource2 } = this.state;
        const children1 = dataSource1.map((item: any) => <AOption key={item.id} data-spot-id={item.id}>{item.fullname}</AOption>);
        const children2 = dataSource2.map((item: any) => <AOption key={item.id} data-spot-id={item.id}>{item.fullname}</AOption>);
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
            <div styleName="fromWrap">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="选择出发地"
                        {...formItemLayout}
                    >
                        <LazyOptions getlazyloadCascader={this.getlazyloadCascader} index={1} />
                    </FormItem>
                    <FormItem
                        label="出发地具体名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('startSpot', {
                            rules: [{
                                required: true, message: '输入出发地!',
                            }],
                        })(
                            <AutoComplete
                                // dataSource={dataSource1.map((item:any)=>item.fullname)}
                                style={{ width: '100%' }}
                                onSelect={(value) => this.onSelect(1, value)}
                                onSearch={(value) => this.handleSearch(1, value)}
                                placeholder="开始地点名称"
                            >
                                {children1}
                            </AutoComplete>
                        )}
                    </FormItem>
                    <FormItem
                        label="选择目的地"
                        {...formItemLayout}
                    >
                        <LazyOptions getlazyloadCascader={this.getlazyloadCascader} index={2} />
                    </FormItem>
                    <FormItem
                        label="目的地具体名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('endSpot', {
                            rules: [{
                                required: true, message: '输入目的地!',
                            }],
                        })(
                            <AutoComplete
                                // dataSource={dataSource2.map((item:any)=>item.fullname)}
                                style={{ width: '100%' }}
                                onSelect={(value) => this.onSelect(2, value)}
                                onSearch={(value) => this.handleSearch(2, value)}
                                placeholder="开始地点名称"
                            >
                                {children2}
                            </AutoComplete>
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
                                <InputNumber styleName="waitTime" min={0} onChange={this.setWaitTimeHours} defaultValue={0} />
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <span>小时</span>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                <InputNumber styleName="waitTime" min={0} onChange={this.setWaitTimeMinutes} defaultValue={0} />
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
                        <Select defaultValue="flight" onChange={this.getVehicle}>
                            <Option value="flight">飞机</Option>
                            <Option value="train">火车</Option>
                            <Option value="CRH">高铁动车</Option>
                            <Option value="LongBus">长途汽车</Option>
                            <Option value="bus">公交车</Option>
                            <Option value="metro">地铁</Option>
                            <Option value="lightRailway">轻轨</Option>
                            <Option value="taxi">出租车</Option>
                            <Option value="drive">自驾</Option>
                            <Option value="guide">跟团</Option>
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
                        <InputNumber styleName="waitTime" min={0} defaultValue={0} onChange={this.setCost} />RMB
              </FormItem>
                    <FormItem
                        label="备注"
                        {...formItemLayout}
                    >
                        <TextArea onChange={this.getComments} value={this.state.comments} rows={4} placeholder="输入关于该行程的相关信息，比如：公交是几路车，地铁是几号线，航班号等" />
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddNewRouteForm);