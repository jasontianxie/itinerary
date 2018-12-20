import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.scss';
import axios from 'axios';
import { config } from '../../common/ajaxConfig.js';
import Cookies from 'js-cookie';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component<any, any> {
  handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(config.mainDomain + '/users',values).then((response) => {
          console.log(response.data);
          if(response.data.length > 0){
            Cookies.set('username',response.data[0].name);
            Cookies.set('userpass',response.data[0].pass);
            Cookies.set('userid',response.data[0].id);
          }
        })
          .catch(function (error) {
            console.log(error);
          });
        
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} styleName="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
  }
}

export default  Form.create()(NormalLoginForm);