import React from "react";
import "./index.scss";
import Cover from "../../components/fullPageCover";
import Login from "../../components/login";
import { Provider, connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import {store} from "../../index";
import {checkLogin} from "../../utils/checkLogin.js";

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

class Header extends React.Component<any, any> {
    public login() {
        Cover.open(<Provider store={store}><Login/></Provider>);
      }
    public componentDidUpdate() {
        if (!!this.props.logged.data) {
            Cover.close();
        }
    }
    public render() {
        const { logged } = this.props;
        return (
            <div styleName="wrap">
                <div styleName="login">
                    {(!!logged.data || checkLogin()) ? (<Dropdown overlay={menu}>
                        <span>用户中心</span>
                    </Dropdown>) :
                        <div onClick={() => this.login()}>登陆</div>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return({
    logged: state.login,
  }); };
const mapDispatchToProps = (dispatch: any) => ({
  });
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
