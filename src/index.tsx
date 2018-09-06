///<reference path="./common.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Main} from './components/main/index';
import Second from './components/second/loadabale';
import {BrowserRouter,HashRouter,Route,Link} from 'react-router-dom';
import './index.scss';

ReactDOM.render(
    <HashRouter>
        <div>
            <Link to="/" styleName='button1'>main</Link>
            <Link to="/second" styleName='button2'>second</Link>
            <Route exact path='/' component={Main}/>
            <Route path='/second' component={Second}/>
        </div>
    </HashRouter>
    ,
    document.getElementById('appContainer')
)