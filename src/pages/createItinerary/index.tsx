import React from "react";
import DocumentTitle from "react-document-title";

export default class DecorateMain extends React.Component<any, any> {
    public componentDidMount() {
        window.addEventListener("message", () => {
            if (window.addEventListener) {
                window.addEventListener("message", handleMessage, false);
            } else {
                window.attachEvent("onmessage", handleMessage);
            }
            function handleMessage(event: any) {// 一个奇怪的现象，当收到postMessage消息后，这个handleMessage方法会被调用两次 ？？？
                // 问题记录 http://note.youdao.com/noteshare?id=9d7e9ad73eb4f3740553eabc2d777476
                event = event || window.event;

                if (typeof(event.data) === "string" && event.data.indexOf("startSpot") > 0) {
                    // 监听了message消息过后，除了我们用postMessage发送的消息，
                    // 浏览器还会发送其他message消息，都会在这里被监听，所以要判断一下哪些消息才是我们需要的消息
                    console.log(JSON.parse(event.data));
                }
            }
        });
    }
    public render() {
    return (
        <DocumentTitle title="创建行程">
            <div>create a itinerary</div>
        </DocumentTitle>
        );
    }
}
