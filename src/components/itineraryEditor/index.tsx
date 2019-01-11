import * as React from "react";
import "./index.scss";
import axios from "axios";
import { config } from "../../../src/common/ajaxConfig.js";
import { Button } from "antd";
import Cookies from "js-cookie";

type PropsStyle = (input: string) => void;

export default class ItineraryEditor extends React.Component<PropsStyle, any> {
    private textInput: any;
    constructor(props: any) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            focused: false,
            selection: null,
            range: null,
        };
    }
    public insertPicOrPaste(e: any) {
        let str = "";
        const {selection, range} = this.state;

        if (!this.state.focused || !range) { // 当用户没有点击输入框的时候，如果点击插入图片，则插入操作不生效
            return;
        }
        if (e === "insertPic") { // 如果是插入图片或者表情
            const background = "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&amp;fm=27&amp;gp=0.jpg";
            str = "<img src='" + background + "' style='width:100px;height:100px;'/>";
        } else { // 如果是用户粘贴内容
            e.preventDefault(); // 不使用默认的粘贴方法，而是使用下面的range来插入内容
            str = window.clipboardData && window.clipboardData.getData ?
            window.clipboardData.getData("Text") // ie浏览器，getData("Text")只会获取纯文本，除了Text，还有其他参数吗？？
            : e.clipboardData.getData("Text"); // 非ie浏览器，getData("Text")只会获取纯文本
            str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // 将script标签替换成文本
        }
        if (!window.getSelection) {// ie 浏览器
            this.textInput.current.focus();
            range.pasteHTML(str);
            range.collapse(false);
            range.select();
        } else {
            const hasR = range.createContextualFragment(str);
            let hasRlastChild = hasR.lastChild;

            this.textInput.current.focus();
            range.collapse(false);
            while (hasRlastChild && hasRlastChild.nodeName.toLowerCase() === "br"
            && hasRlastChild.previousSibling && hasRlastChild.previousSibling.nodeName.toLowerCase() === "br") {
                const element: any = hasRlastChild;
                hasRlastChild = hasRlastChild.previousSibling;
                hasR.removeChild(element);
            }
            range.insertNode(hasR);
            if (hasRlastChild) {
                range.setEndAfter(hasRlastChild);
                range.setStartAfter(hasRlastChild);
            }
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    public input(e: any) {
        const selection = window.getSelection ? window.getSelection() : document.selection;
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
    }
    public keyup(e: any) {
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) { // 上下左右键
            const selection = window.getSelection ? window.getSelection() : document.selection;
            const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
            this.setState({ selection, range });
        }
    }
    public focus(bool: any) {
        this.setState({ focused: bool });
    }
    public click(e: any) {
        const selection = window.getSelection ? window.getSelection() : document.selection;
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
    }
    public submit() {
        axios.post(config.mainDomain + "/itineraries", {userId: Cookies.get("userid"), contentHtml: this.textInput.current.innerHTML}).then((response) => {
           console.log("success");
        })
        .catch((error) => {
            console.log(error);
        });
    }
    public render() {
        return (
        <div styleName="edit-wrap">
            <div onClick={() => this.insertPicOrPaste("insertPic")}>插入测试图片</div>
            <div contentEditable={true} styleName = "edit" ref={this.textInput}
            onPaste={(e) => this.insertPicOrPaste(e)} onClick={(e) => this.click(e)}
            onKeyUp={(e) => this.keyup(e)}
            onFocus={() => this.focus(true)} onInput={(e) => this.input(e)}>
            </div>
            <Button type="primary" styleName = "edit-submit" onClick={() => this.submit()}>保存</Button>
        </div>
        );
    }
}
