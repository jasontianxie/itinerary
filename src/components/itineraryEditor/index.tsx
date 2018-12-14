import * as React from "react";
import "./index.scss";

export default class ItineraryEditor extends React.Component<any, any> {
    private textInput: any;
    constructor(props: any) {
        super(props);
        this.textInput = React.createRef();
        // this.state = {
        //     editContent : "",
        // };
    }
    public click() {
        // this.setState({editContent: "<img src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&amp;fm=27&amp;gp=0.jpg'/>"});
        this.textInput.current.innerHTML =
        "<img src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2310514390,3580363630&amp;fm=27&amp;gp=0.jpg'/>";
    }
    public render() {
        return (
        <div styleName="edit-wrap">
            <div onClick={() => this.click()}>click me</div>
            <div contentEditable={true} styleName = "edit" ref={this.textInput}>
            </div>
        </div>
        );
    }
}
