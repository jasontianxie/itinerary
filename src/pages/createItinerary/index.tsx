import React from "react";
import DocumentTitle from "react-document-title";
import "./index.scss";
import BMap from "BMap";
import { Form, Input, InputNumber, DatePicker, Button, Col, Select, AutoComplete, Icon } from "antd";
import LazyOptions from "../../components/cascader";
import axios from "axios";
import { config } from "../../common/ajaxConfig.js";
import Cookies from "js-cookie";

let id = 1;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const AOption = AutoComplete.Option;

class CreateItinerary extends React.Component<any, any> {
    public baiduMap: any = null;
    constructor(props: any) {
        super(props);
        this.baiduMap = React.createRef();
    }
    public handleSubmit(e: any) {
        // e.persist();
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                console.log({ ...this.state, ...{ startSpot: values.startSpot, endSpot: values.endSpot } });
                this.setState({ startSpot: values.startSpot, endSpot: values.endSpot });
                axios.post(config.mainDomain + "/newRouteForm", this.state).then((response) => {
                    console.log("success");
                })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    }
    public datePickerOnChange(date: any, dateString: any) {
        console.log(date, dateString);

    }
    public getlazyloadCascader(startSelect: number, state: any) {
        console.log("getlazyloadCascader");
    }
    public onSelect(index: number, value: any) {
        console.log("onSelect id is:", index === 1 ? "startSpot" : "endSpot", value);
    }
    public handleSearch = (index: number, value: any) => {
        console.log("handle search");
    }
    public spotNameChange(index: number, value: any) {
        console.log("spotNameChange");
    }
    public remove = (k: any) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue("keys");
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter((key: any) => key !== k),
        });
      }
    public add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue("keys");
        const nextKeys = keys.concat(++id);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
          keys: nextKeys,
        });
      }
    public componentDidMount() {
        const map = new BMap.Map(this.baiduMap.current);
        const point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        window.addEventListener("message", () => {
            if (window.addEventListener) {
                window.addEventListener("message", handleMessage, false);
            } else {
                window.attachEvent("onmessage", handleMessage);
            }
            function handleMessage(event: any) {// 一个奇怪的现象，当收到postMessage消息后，这个handleMessage方法会被调用两次 ？？？
                // 问题记录 http://note.youdao.com/noteshare?id=9d7e9ad73eb4f3740553eabc2d777476
                event = event || window.event;

                if (typeof(event.data) === "string" && event.data.indexOf("startSpot") > 0) {
                    // 监听了message消息过后，除了我们用postMessage发送的消息，
                    // 浏览器还会发送其他message消息，都会在这里被监听，所以要判断一下哪些消息才是我们需要的消息
                    console.log(JSON.parse(event.data));
                }
            }
        });
    }
    public render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const children1 = <AOption key="111">111</AOption>;
        const children2 = <AOption key="222">222</AOption>;
        const formItemLayout = {
            labelCol: {
                sm: { span: 8 },
                xs: { span: 24 },
            },
            wrapperCol: {
                sm: { span: 16 },
                xs: { span: 24 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                sm: {
                    offset: 8,
                    span: 16,
                },
                xs: {
                    offset: 0,
                    span: 24,
                },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            },
          };
        getFieldDecorator("keys", { initialValue: [1] });
        const keys = getFieldValue("keys");
        const formItems = keys.map((k: any, index: any) => (
            <div styleName="new-item" key={index}>
                <div styleName = "form-item-wrap">
                    <FormItem
                        label={`选择目的地${index + 1}`}
                        {...formItemLayout}
                    >
                        <LazyOptions getlazyloadCascader={this.getlazyloadCascader} index={2} />
                    </FormItem>
                    <FormItem
                        label={`目的地${index + 1}具体名称`}
                        {...formItemLayout}
                    >
                        {getFieldDecorator("endSpot", {
                            rules: [{
                                message: "输入目的地!", required: true,
                            }],
                        })(
                            <AutoComplete
                                style={{ width: "100%" }}
                                onSelect={(value) => this.onSelect(2, value)}
                                onSearch={(value) => this.handleSearch(2, value)}
                                onChange={(value) => this.spotNameChange(2, value)}
                                placeholder={`目的地${index + 1}地点名称`}
                            >
                                {children2}
                            </AutoComplete>,
                        )}
                    </FormItem>
                </div>
                {keys.length > 1 ? (
                <Button onClick={() => this.remove(k)} style={{float: "right"}}>删除目的地{index + 1}</Button>
                ) : null}
            </div>
        ));

        return (
            <DocumentTitle title="创建行程">
                <div styleName="wrap">
                    <div styleName="map" ref={this.baiduMap}>this is baidu map container</div>
                    <div styleName="routes">
                        <Form onSubmit={this.handleSubmit} style={{width: "520px"}}>
                            <FormItem
                                style={{padding: "0 10px"}}
                                label="行程时间"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("startEndDateTime", {
                                    rules: [{
                                        message: "请输入起止时间!", required: true,
                                    }],
                                })(
                                    <RangePicker
                                        onChange={this.datePickerOnChange}
                                        showTime={true} format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={["开始时间", "结束时间"]}
                                    />,
                                )}
                            </FormItem>
                            <FormItem
                                style={{padding: "0 10px"}}
                                label="选择出发地"
                                {...formItemLayout}
                            >
                                <LazyOptions getlazyloadCascader={this.getlazyloadCascader} index={1} />
                            </FormItem>
                            <FormItem
                                style={{padding: "0 10px"}}
                                label="出发地具体名称"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("startSpot", {
                                    rules: [{
                                        message: "输入出发地!", required: true,
                                    }],
                                })(
                                    <AutoComplete
                                        style={{ width: "100%" }}
                                        onSelect={(value) => this.onSelect(1, value)}
                                        onSearch={(value) => this.handleSearch(1, value)}
                                        onChange={(value) => this.spotNameChange(1, value)}
                                        placeholder="开始地点名称"
                                    >
                                        {children1}
                                    </AutoComplete>,
                                )}
                            </FormItem>
                            {formItems}
                            <Form.Item {...formItemLayoutWithOutLabel}>
                                <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                                    <Icon type="plus" /> 添加一个新的目的地
                                </Button>
                            </Form.Item>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </DocumentTitle>
            );
    }
}

export default Form.create()(CreateItinerary);
