///<reference path="./common.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import {Greeting} from './components/main/index'
// const style = require("./index.scss");

ReactDOM.render(
    // <h1 styleName={Math.random()>0.5?"h2":"h1"}>hello world!</h1>,
    <Greeting/>,
    document.getElementById('appContainer')
)