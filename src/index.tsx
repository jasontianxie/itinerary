import "./common.d.ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Main from "./pages/main/index";
import Second from "./pages/second/loadabale";
import {HashRouter, Route} from "react-router-dom";
import "./index.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers/index.js";
import thunk from "redux-thunk";
import Header from "./components/header/index";

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
    <HashRouter>
        <div>
            <Header/>
            <Route exact path="/" component={Main}/>
            <Route path="/second" component={Second}/>
        </div>
    </HashRouter>
    </Provider>
    ,
    document.getElementById("appContainer")
)