import * as React from "react";
import "./index.scss";

// interface PropsStyle {
//     (input: string): void
// }
type PropsStyle = (input: string) => void;

export default class ItineraryEditor extends React.Component<PropsStyle, any> {
    private textInput: any;
    constructor(props: any) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            contentFirstHalf: "",
            contentSecondHalf: "",
            editContent : "",
            selection: null,
            range: null,
        };
    }
    public insertPic() {
        const str =
        "<img style='width:100px;height:100px' src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&amp;fm=27&amp;gp=0.jpg'/>";
        const {selection, range} = this.state;

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
            while (hasRlastChild && hasRlastChild.nodeName.toLowerCase() == "br" && hasRlastChild.previousSibling && hasRlastChild.previousSibling.nodeName.toLowerCase() == "br") {
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
    public click(e: any) {
        const selection = window.getSelection ? window.getSelection() : document.selection;
        const range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        this.setState({ selection, range });
    }
    public render() {
        return (
        <div styleName="edit-wrap">
            <div onClick={() => this.insertPic()}>click me</div>
            <div contentEditable={true} styleName = "edit" ref={this.textInput} onClick={(e) => this.click(e)}>
            </div>
        </div>
        );
    }
}
