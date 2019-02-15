import { Cascader } from "antd";
import * as React from "react";
import axios from "axios";
import { config } from "../../../src/common/ajaxConfig.js";

const options = [{
  value: "china",
  label: "中国",
  isLeaf: false,
}, {
  value: "russia",
  label: "俄罗斯",
  isLeaf: false,
}];

export default class LazyOptions extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { options };
    this.onChange = this.onChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  public onChange = (value: any, selectedOptions: any) => {
    this.props.getlazyloadCascader(this.props.index, value);
  }
  public loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    axios.get(config.mainDomain + "/public/country-province-city-district/" + targetOption.value + ".json").then((res) => {
      targetOption.loading = false;
      targetOption.children = res.data;
      this.setState({
          options: [...this.state.options],
        });
    });
  }
  public render() {
    return (
      <Cascader
        // defaultValue = {this.props.defaultValue} // defaultVale的数组中的值必须是和options中的value值对应
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}
