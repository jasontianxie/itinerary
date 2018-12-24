import * as React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./index.scss";
import { connect } from "react-redux";
import { login } from "../../../redux/actions/login.js";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component<any, any> {
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      this.props.login(values);
    });
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} styleName="login-form">
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>,
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

const Login = Form.create()(NormalLoginForm);
const mapStateToProps = (state: any) => {
  return({
  loggedUser: state.login,
}); };
const mapDispatchToProps = (dispatch: any) => ({
  login: (values: string) => dispatch(login(values)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
