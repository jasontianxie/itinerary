import React from "react";
import DocumentTitle from "react-document-title";

export default class DecorateMain extends React.Component<any, any> {
    public render() {
    return (
        <DocumentTitle title="创建行程">
            <div>create a itinerary</div>
        </DocumentTitle>
        );
    }
}
