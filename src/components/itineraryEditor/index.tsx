import * as React from "react";
import "./index.scss";


export default class ItineraryEditor extends React.Component<any, any> {
    public render() {
        return (
        <div styleName="edit-wrap">
            <div contentEditable={true} styleName = "edit"></div>
        </div>
        );
    }
}