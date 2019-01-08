import { Cascader } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { getCountryCityDistrict } from "../../../redux/actions/getCountryCityDistrict.js";

const options = [{
  value: "china",
  label: "中国",
  isLeaf: false,
}, {
  value: "russia",
  label: "俄罗斯",
  isLeaf: false,
}];

class LazyOptions extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { options };
    this.onChange = this.onChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  public onChange = (value: any, selectedOptions: any) => {
    // console.log(value, selectedOptions);
    this.props.getlazyloadCascader(this.props.index, value);
  }

  public loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    this.props.getCountryCityDistrict(targetOption.value)
    // load options lazily
    // setTimeout(() => {
    targetOption.loading = false;
    // targetOption.children = [{
    //   label: targetOption.label == "重庆" ? "永川区" : "西安市",
    //   value: targetOption.label == "重庆" ? "永川区" : "西安市"
    // }, {
    //   label: targetOption.label == "重庆" ? "大足区" : "咸阳市",
    //   value: targetOption.label == "重庆" ? "大足区" : "咸阳市",
    // }];
    targetOption.children = this.props.countryCityDistricts;
    this.setState({
      options: [...this.state.options],
    });
    // }, 500);
  }

  public render() {
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return({
    countryCityDistricts: state.countryCityDistricts,
}); };
const mapDispatchToProps = (dispatch: any) => ({
  getCountryCityDistrict: (values: string) => dispatch(getCountryCityDistrict(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LazyOptions);
