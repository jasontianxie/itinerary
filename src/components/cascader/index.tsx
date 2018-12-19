import { Cascader } from 'antd';
import * as React from 'react';

const options = [{
  value: '重庆',
  label: '重庆',
  isLeaf: false,
}, {
  value: '陕西',
  label: '陕西',
  isLeaf: false,
}];

export class LazyOptions extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { options }
    this.onChange = this.onChange.bind(this);
  }

  onChange = (value: any, selectedOptions: any) => {
    // console.log(value, selectedOptions);
    this.props.getlazyloadCascader(this.props.index, value);
  }

  loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: targetOption.label == '重庆' ? '永川区' : '西安市',
        value: targetOption.label == '重庆' ? '永川区' : '西安市'
      }, {
        label: targetOption.label == '重庆' ? '大足区' : '咸阳市',
        value: targetOption.label == '重庆' ? '大足区' : '咸阳市',
      }];
      this.setState({
        options: [...this.state.options],
      });
    }, 500);
  }

  render() {
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