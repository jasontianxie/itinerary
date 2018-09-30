///<reference path="./common.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Main} from './pages/main/index';
import Second from './pages/second/loadabale';
import {HashRouter,Route} from 'react-router-dom';
import './index.scss';

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path='/' component={Main}/>
            <Route path='/second' component={Second}/>
        </div>
    </HashRouter>
    ,
    document.getElementById('appContainer')
)